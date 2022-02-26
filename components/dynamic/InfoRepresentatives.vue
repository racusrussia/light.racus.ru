<template>
  <div class="ra-representatives">

    <!--Map-->
    <div class="ra-representatives__map"
         ref="map"
         id="representatives"></div>

    <!--Contact-->

    <div class="ra-representatives__contacts">
      <div v-if="selectedCountry">

        <!--address-->
        <div class="ra-representatives__row"
             v-if="selectedCountry.address">
          <h6 class="ra-representatives__row-label"
              v-text="$t('contacts_address')"></h6>
          <div class="ra-representatives__row-value"
               v-text="selectedCountry.address"></div>
          <div class="ra-representatives__row-action">
            <button type="button"
                    @click.prevent="showModalForm"
                    class="ra-button ra-button--danger ra-button--pill"
                    v-text="$t('contacts_how_to_get_there')"></button>
          </div>
        </div>

        <!--phones-->
        <div class="ra-representatives__contact-item"
             v-if="selectedCountry.phones && selectedCountry.phones.length">
          <h6 class="ra-representatives__row-label"
              v-text="$t('contacts_telephones')"></h6>
          <div class="ra-representatives__row-grid">
            <div class="ra-representatives__row-grid-item"
                 v-for="item in selectedCountry.phones">
              <a :href="`tel:${item.number}`"
                 class="ra-representatives__row-grid-value"
                 v-text="item.number"></a>
              <div class="ra-representatives__row-grid-label"
                   v-text="item.label"></div>
            </div>
          </div>
        </div>

        <!--emails-->
        <div class="ra-representatives__contact-item"
             v-if="selectedCountry.emails && selectedCountry.emails.length">
          <h6 class="ra-representatives__row-label"
              v-text="$t('contacts_email_addresses')"></h6>
          <div class="ra-representatives__row-grid">
            <div class="ra-representatives__row-grid-item"
                 v-for="item in selectedCountry.emails">
              <a :href="`mailto:${item.email}`"
                 class="ra-representatives__row-grid-value"
                 v-text="item.email"></a>
              <div class="ra-representatives__row-grid-label"
                   v-text="item.label"></div>
            </div>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import graphQl                                from '~/api/graphQl'
import { Contacts }                           from '~/api/graphql/pages'
import { GetCoordinates }                     from '~/utils/geo'
import { CodesIso2, CodesIso3Id, CodesIso3L } from '~/utils/lang'

export default {
  name: 'InfoRepresentatives',

  data () {
    return {
      contacts: null,

      leaflet:          null,
      map:              null,
      empty:            [ 59.942668, 30.315871 ],
      GeoPoints:        [],
      GeoPointsGroup:   null,
      GeoPolygonsGroup: null,
      mapBoxStyleUrl:   'yurgeman/ckv3u686r51sp15o9uog1o3rt',
      mapBoxToken:      'pk.eyJ1IjoieXVyZ2VtYW4iLCJhIjoiQkdab0FGWSJ9.Y7NDiEEk4oSryLe0JKYQPw',
      mapSize:          {
        w: 0,
        h: 0
      },
      selectedCountry:  null,

      tooltipOptions: {
        permanent:   true,
        className:   'ra-map-tooltip',
        opacity:     1,
        interactive: true
      },
      polygon:        null,
      polygonStyle:   {
        color:   '#f3b224',
        weight:  6,
        opacity: 0.9
      }
    }
  },

  async mounted () {
    if (process.browser) {
      const { contacts } = await graphQl.data(Contacts, { locale: this.code })
      this.contacts      = GetCoordinates(contacts, this.code)

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
      this.init()
      this.drawPoints()
      //this.fitBounce()
    }
  },

  watch: {
    'mapSize.w' () {
      setTimeout(() => this.fitBounce(), 300)
    }
  },

  computed: {
    logo () {return this.$store.getters.logo?.url},
    code () {return this.$i18n.localeProperties.code},
    coordinates () {
      if (!this.contacts) return
      return this.contacts.map(i => i.geo)
    }
  },

  methods: {

    init () {
      this.leaflet   = require('leaflet')
      const point    = ( this.points ) ? this.points.geo : this.empty
      this.map       = L.map('representatives', {
        maxZoom: 17,
        //boundary:           null,
        center:  [ 51.505, -0.09 ],
        minZoom: 1.8,
        //zoom:               13,
        zoomControl:        true,
        dragging:           true,
        scrollWheelZoom:    false,
        doubleClickZoom:    true,
        polygon:            null,
        zoomSnap:           0.3,
        attributionControl: false
      }).setView(point, 3)
      this.tileLayer = L.tileLayer(
        `https://api.mapbox.com/styles/v1/${ this.mapBoxStyleUrl }/tiles/512/{z}/{x}/{y}?access_token={accessToken}`,
        {
          attribution: false,
          maxZoom:     18,
          accessToken: this.mapBoxToken
        }
      ).addTo(this.map)

      this.map.setMaxBounds(L.latLngBounds(
        L.latLng(85, -180),
        L.latLng(-85, 180)
      ))
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

      this.contacts.forEach(i => {
        L.marker(i.geo, this.markerOptions(i, iconDefault))
         .bindTooltip(this.tooltipText(i), this.tooltipOptions)
         .openTooltip()
         .addTo(this.map)
         .on('click', ( e ) => {
           this.onClick(e, i)
         })
      })

      this.GeoPointsGroup = L.featureGroup(this.GeoPoints)
      this.map.addLayer(this.GeoPointsGroup)
    },

    clearPolygons () {
      if (this.GeoPolygonsGroup) {
        this.GeoPolygonsGroup.removeFrom(this.map)
        this.GeoPolygonsGroup.clearLayers()
        this.GeoPolygonsGroup.remove()
      }
    },

    drawPolygons ( data ) {
      const { ADMIN, ISO_A3, geometry } = data
      this.clearPolygons()
      const geoJson         = {
        type:     'FeatureCollection',
        features: [ { type: 'Feature', properties: { ADMIN, ISO_A3 }, geometry } ]
      }
      const layer           = L.geoJSON(geoJson, { style: this.polygonStyle })
      this.GeoPolygonsGroup = L.featureGroup()
      this.GeoPolygonsGroup.addLayer(layer)
      this.map.addLayer(this.GeoPolygonsGroup)
          .on('click', ( e ) => {
            this.clearPolygons()
            this.fitBounce()
            this.selectedCountry = null
          })
          .fitBounds(layer.getBounds(), {
            maxZoom: 12,
            padding: [ 1, 1 ]
          })
    },

    tooltipText ( i ) {
      const flag = ( i.country && i.country.flag ) ? i.country.flag : ''
      return `
        <span class="ra-map-tooltip__name">${ ( i.name ) ? i.name : '' }</span>
        <span class="ra-map-tooltip__flag">${ flag }</span>
      `
    },

    fitBounce () {
      this.map.fitBounds(this.coordinates, {
        maxZoom: 18,
        padding: [ 20, 20 ]
      })
    },

    onClick ( e, i ) {
      this.selectedCountry = i
      this.polygon         = i.country?.countryCodes_tld
      if (this.polygon) {
        const codeIso   = CodesIso2[ this.polygon.toUpperCase() ]
        const polygonId = CodesIso3Id[ codeIso ]
        if (polygonId) {
          this.loadPolygon(polygonId)
        }
      }
    },

    showModalForm () {
      this.$store.commit('modules/layout/MODAL_FORM', {
        title:  this.$t('submit_application'),
        action: this.$t('start_the_application')
      })
    },

    async loadPolygon ( id ) {
      const polygon = await this.$store.dispatch('modules/map/GET_POLYGON', id)
      this.polygon  = polygon
      this.drawPolygons(polygon)
    },

    markerOptions ( geo, icon ) {
      return {
        title:       geo.name,
        icon:        icon,
        riseOnHover: true
      }
    }

  }
}
</script>

<style lang="sass">
@import "assets/sass/variables"
@import "assets/sass/mixins"
.ra-representatives

  display: flex
  padding: $ra-gutter-medium
  @media (max-width: $device-tablet-landscape)
    flex-direction: column

  &__map
    flex: 1
    min-width: 300px
    min-height: 600px
    @media (max-width: $device-tablet-landscape)
      min-height: 500px
    @media (max-width: $device-tablet-small)
      min-height: 400px
    @media (max-width: $device-phone)
      min-height: 300px

  &__contacts
    width: 460px
    min-height: 600px
    padding: $ra-gutter-medium
    box-shadow: $shadow-xlarge
    border-radius: $ra-border-radius * 2
    @media (max-width: $device-tablet-landscape)
      width: 100%
      min-height: 0

  &__row,
  &__contact-item
    margin-bottom: $ra-gutter-medium
    @media (max-width: $device-tablet-small)
      margin-bottom: $ra-gutter

    &:last-child
      margin-bottom: 0

  &__row-label
    font-size: 1.6rem
    line-height: 1
    margin: 0 0 $ra-gutter 0

  &__row-value,
  &__row-grid
    font-size: 1.2rem

  &__row-grid
    display: flex
    flex-wrap: wrap
    //gap: $ra-gutter
    width: 100%

  &__row-grid-value
    color: $ra-color-text
    text-decoration: none

    &:hover
      color: $ra-color-danger

  &__row-grid-label
    color: $ra-color-text-muted
    font-size: .9rem

  &__row-grid-item
    width: 50%

  &__row-action
    margin-top: $ra-gutter-medium
    @media (max-width: $device-tablet-small)
      margin-top: $ra-gutter

.ra-map-tooltip
  //background-color: $ra-color-danger
  color: $ra-color-danger
  font-weight: bold
  display: flex
  align-items: center
  gap: $ra-gutter-small

  &__name
    @include text-overflow
    max-width: 70px
    @media (max-width: $device-tablet-landscape)
      display: none

  &__flag
    font-size: 1.2rem
    line-height: 1

</style>
