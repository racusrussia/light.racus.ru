<template>
  <div>

    <!--City-->
    <div class="ra-content ra-cities-list"
         v-if="city"></div>

    <!--City list-->
    <div class="ra-content ra-cities-list">

      <!--MAP-->
      <div class="ra-cities__map-outer"
           :class="{'ra-cities__map-outer--open': showMap}">

        <div class="ra-cities__map"
             ref="map"></div>

        <a v-if="!showMap"
           class="ra-h ra-h--light ra-h--1 ra-cities__map-title"
           @click="toggleMap()"
           v-text="$t('russian_cities')"></a>

        <transition name="slide-left"
                    appear>
          <div class="ra-cities-detail"
               :class="{'ra-cities-detail--open': showDetail}">

            <a class="ra-cities-detail__header"
               @click="close">

              <h4 class="ra-cities-detail__name"
                  v-if="citySelected"
                  v-text="getCityName(citySelected)"></h4>

              <IconClose width="20"
                         height="20"/>
            </a>

            <div class="ra-cities-detail__body">

              <Loader :size="3"
                      v-if="loading"/>

              <div v-if="cityUniversities">

                <a @click.prevent="goToUniversity(un)"
                   class="ra-cities-university"
                   v-for="un in cityUniversities"
                   :key="un.id">

                  <div class="ra-cities-university__logo">
                    <img v-if="un.logo"
                         :src="un.logo.url"
                         :alt="getUniversityName(un)"/>
                  </div>
                  <div class="ra-cities-university__title"
                       v-text="getUniversityName(un)"></div>
                </a>
              </div>

            </div>

          </div>
        </transition>

      </div>

      <!--GALLERY-->
      <a class="ra-cities-list__item"
         :style="bgr(city)"
         @click.prevent="loadCity(city, true)"
         @mouseenter="hover = city.id"
         @mouseleave="hover = null"
         :class="{'ra-cities-list__item--hover': hover === city.id}"
         v-for="city in cities"
         :key="city.id">

        <span class="ra-h ra-h--light ra-h--1 ra-cities-list__title"
              v-text="getCityName(city)"></span>
      </a>

    </div>

  </div>
</template>

<script>
import graphQl             from '~/api/graphQl'
import { CitiesAll, City } from '~/api/graphql/pages'
import Loader              from '~/components/ui/Loader'

export default {
  name:       'InfoCities',
  components: {
    Loader,
    IconClose: () => import(/* webpackChunkName: "IconClose" */ '~/assets/svg/close.svg?inline')
  },
  props:      {

    data: {
      type: Object,
      default () {}
    }
  },

  data () {
    return {
      cities:           null,
      city:             null,
      universities:     null,
      citySelected:     null,
      cityUniversities: null,
      hover:            null,
      loading:          true,
      leaflet:          null,
      map:              null,
      showMap:          false,
      showDetail:       false,
      empty:            [ 59.942668, 30.315871 ],
      geoPoints:        null,
      GeoPolygonsGroup: null,
      mapSize:          {
        w: 0,
        h: 0
      },
      mapBoxStyleUrl:   'yurgeman/ckv3u686r51sp15o9uog1o3rt',
      mapBoxToken:      'pk.eyJ1IjoieXVyZ2VtYW4iLCJhIjoiQkdab0FGWSJ9.Y7NDiEEk4oSryLe0JKYQPw',
      tooltipOptions:   {
        permanent:   true,
        className:   'ra-map-tooltip',
        opacity:     1,
        interactive: true
      }
    }
  },

  async mounted () {
    if (process.browser) {
      //await this.load()
      await this.loadAll()
      const observer = new ResizeObserver(entries => {
        entries.forEach(entry => {
          const cr       = entry.contentRect
          this.mapSize.w = Number(cr.width.toFixed(0))
          this.mapSize.h = Number(cr.height.toFixed(0))
        })
      })

      if (this.$refs.map) {
        observer.observe(this.$refs.map)
      }
    }
  },

  computed: {
    device () {return this.$store.getters[ 'modules/layout/device' ]},
    locale () {return this.$i18n.localeProperties?.code}
  },

  methods: {

    bgr ( city ) {
      const { cover } = city
      return ( cover ) ? `background-image: url(${ this.getFormat(cover, 'desktop-large') })` : null
    },

    getFormat ( image, format, postfix ) {
      if (!image) return null
      const fName = ( postfix ) ? format + '_' + postfix : format
      return image.formats[ fName ]?.url
    },

    async loadCity ( item ) {
      this.loading = true
      if (!this.universities) {
        this.loading = false
        return
      }
      const city = await graphQl.data(City, { id: item.id })
      this.openGallery(city)
      this.loading = false
    },

    async loadAll () {
      this.loading                   = true
      const { cities, universities } = await graphQl.data(CitiesAll)
      Promise.all([ cities, universities ])
             .then(() => {
               if (!this.geoPoints) {
                 this.cities       = ( cities ) ? cities.filter(i => i.universities.length) : cities
                 this.geoPoints    = cities.map(i => [ i.geo.latitude, i.geo.longitude ])
                 this.loading      = false
                 this.universities = universities
                 this.init()
               }
             })
             .catch(( e ) => {
               this.loading = false
               console.error(e)
             })

    },

    getUniversityName ( item ) {
      let name = ( this.locale === 'en' ) ? item : item.localizations.find(i => i.locale === this.locale)
      return ( name && name.title ) ? name.title : item.title
    },

    getCityName ( city ) {
      let name = ( this.locale === 'en' ) ? city : city.localizations.find(i => i.locale === this.locale)
      return ( name && name.title ) ? name.title : city.title
    },

    toggleMap () {
      if (!this.cities) return
      if (!this.showMap) {
        setTimeout(() => {
          this.showMap = true
          this.drawPoints()
          this.fitBounce()
        }, 100)
      }
      else {
        this.showMap = false
      }
    },

    init () {
      if (this.map) return
      this.leaflet = require('leaflet')
      this.map     = L.map(this.$refs.map, {
        center:             this.empty,
        zoomControl:        false,
        dragging:           false,
        scrollWheelZoom:    false,
        doubleClickZoom:    false,
        polygon:            null,
        zoomSnap:           0.3,
        attributionControl: false
      }).setView(this.empty, 3)

      this.tileLayer = L.tileLayer(
        `https://api.mapbox.com/styles/v1/${ this.mapBoxStyleUrl }/tiles/512/{z}/{x}/{y}?access_token={accessToken}`,
        {
          attribution: false,
          maxZoom:     18,
          accessToken: this.mapBoxToken
        }
      ).addTo(this.map)

      this.map.on('click', ( e ) => this.showDetail = false)
    },

    drawPoints () {
      let LeafIcon    = L.Icon.extend({
        options: {
          iconUrl:      '/images/map/marker-icon-success.svg',
          shadowUrl:    '/images/map/marker-shadow.svg',
          iconSize:     [ 25, 35 ], // size of the icon
          shadowSize:   [ 25, 25 ], // size of the shadow
          iconAnchor:   [ 13, 35 ], // point of the icon which will correspond to marker's location
          shadowAnchor: [ 7, 25 ],  // the same for the shadow
          popupAnchor:  [ 0, -22 ] // point from which the popup should open relative to the iconAnchor
        }
      })
      let iconDefault = new LeafIcon({ iconUrl: '/images/map/marker-icon-success.svg' })
      this.cities.forEach(i => {
        const { latitude, longitude } = i.geo
        if (!latitude || !longitude) return
        L.marker([ latitude, longitude ], this.markerOptions(i, iconDefault))
         .bindTooltip(this.getCityName(i), this.tooltipOptions)
          //.openTooltip()
         .addTo(this.map)
         .on('click', ( e ) => this.onClick(i))
      })
    },

    markerOptions ( point, icon ) {
      return {
        title:       point.title,
        icon:        icon,
        riseOnHover: true
      }
    },

    fitBounce () {this.map.fitBounds(this.geoPoints, { padding: [ 20, 20 ] })},

    async onClick ( item ) {
      this.citySelected     = item
      this.cityUniversities = this.universities.filter(i => item.id === i.city.id)
      this.showDetail       = false
      setTimeout(() => this.showDetail = true, 300)
    },

    goToUniversity ( item ) {
      const link = ( this.locale === 'en' ) ? item : item.localizations.find(i => i.locale === this.locale)
      if (!link) return
      const localeLink = `/university/${ link.slug }`
      this.$router.push(this.localePath(localeLink))
    },

    close () {
      this.showDetail       = false
      this.cityUniversities = null
    },

    openGallery ( item ) {

      this.$store.commit('modules/layout/MODAL', {
        title: item?.city?.title,
        type:  'gallery',
        src:   item?.city?.images
      })
    }
  }
}
</script>

<style lang="sass">
@import "assets/sass/variables"
@import "assets/sass/mixins"

.ra-cities

  &__map-outer
    overflow: hidden
    position: relative
    border-radius: $ra-border-radius * 3
    height: 12rem
    @include transition-all(.3s)
    margin-bottom: $ra-gutter

    &--open
      height: 30rem
      box-shadow: $shadow-large

  &__map
    position: absolute
    top: 50%
    flex: 1
    min-width: 100%
    transform: translateY(-50%)
    height: 30rem
    z-index: 1

  &__map-title
    min-height: 10rem
    position: relative
    z-index: 1000
    padding: 5rem 1rem
    margin: 0
    display: block
    text-align: center
    color: $ra-color-base
    text-decoration: none
    background-color: rgba(255, 255, 255, .9)
    @include transition-param(background-color)
    @media (max-width: $device-phone)
      padding: 3rem 1rem

.ra-cities-detail
  flex: none
  background-color: $ra-color-text-inverse
  width: 400px
  box-shadow: $shadow-large
  position: absolute
  top: 0
  right: 0
  bottom: 0
  z-index: 2
  transform: translateX(100%)
  @include transition-all(.3s)
  display: flex
  flex-direction: column
  @media (max-width: $device-tablet-small)
    width: 100%

  &__name
    flex: 1
    margin: 0
    text-align: center
    @include text-overflow

  &--open
    transform: translateX(0)

  &__header,
  &__body
    padding: $ra-gutter

  &__header
    flex: none
    display: flex
    gap: $ra-gutter
    align-items: center

  [dir=rtl] &__header
    text-align: left

  &__body
    flex: 1
    min-height: 100px
    overflow-y: auto

.ra-cities-list
  padding-top: 0

  &__title
    padding: 5rem 1rem
    margin: 0
    display: block
    text-align: center
    color: $ra-color-base
    text-decoration: none
    background-color: rgba(255, 255, 255, .7)
    backdrop-filter: blur(4px)
    @include transition-param(background-color)
    @media (max-width: $device-phone)
      padding: 3rem 1rem

  &__item
    background: 50% 50% no-repeat
    background-size: cover
    display: block
    overflow: hidden
    position: relative
    border-radius: $ra-border-radius * 3
    margin-bottom: $ra-gutter

    &--hover
      color: $ra-color-text-inverse
      background-color: $ra-color-base

      & > *
        color: $ra-color-text-inverse
        text-decoration: none
        background-color: rgba(255, 255, 255, 0)
        backdrop-filter: blur(0)
        text-shadow: 0 1px 3px rgba($ra-color-base, .3)

.ra-cities-university
  display: flex
  align-items: center
  color: $ra-color-text
  text-decoration: none

  &:not(:last-child)
    margin-bottom: $ra-gutter-medium

  &:hover
    color: $ra-color-danger

  &__logo
    flex: none
    width: 50px

  &__title
    margin-left: $ra-gutter
    line-height: 1.2

    [dir=rtl] &
      margin-left: 0
      margin-right: $ra-gutter

</style>
