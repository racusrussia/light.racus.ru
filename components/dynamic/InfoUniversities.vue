<template>
  <section class="ra-section ra-section--content ra-section--no-top">
    <div class="universities"
         :class="{'universities--no-shadow':  !showFilter}">

      <div v-if="showFilter">
        <nav class="ra-tabs"
             v-if="universities && !showDrop">
          <a class="ra-tabs__item"
             @click.prevent="active = null"
             :class="{'ra-tabs__item--active': !active}"
             v-text="all"></a>

          <a class="ra-tabs__item"
             @click.prevent="active = item"
             v-for="item in universities"
             :key="item.id"
             :class="{'ra-tabs__item--active': active === item}"
             v-text="item.name"></a>
        </nav>

        <div class="ra-tabs"
             v-else-if="universities && showDrop">
          <div class="ra-tabs__drop">
            <button class="ra-button ra-button--danger ra-button--pill ra-button__arrow"
                    :class="{'ra-button__arrow--active':  drop}"
                    @click="drop = !drop">
              <span v-text="(active) ? active.name : all"></span>
            </button>

            <transition name="slide-top"
                        appear
                        mode="in-out">
              <Drop v-if="drop"
                    @close="drop = false"
                    @click="active = $event"
                    key-name="name"
                    :data="universities"/>

            </transition>
          </div>
        </div>
      </div>

      <h3 class="ra-page__title universities-list__title"
          :class="{
        'universities-list__title--no-top': !showFilter
      }">
        <span class="ra-h ra-h--2"
              v-if="title"
              v-text="title"></span>
        <span class="ra-h ra-h--2 ra-h--light"
              v-if="subTitle"
              v-text="subTitle"></span>
      </h3>

      <transition name="fade">
        <Loader v-if="loading"/>

        <div class="universities-list"
             v-if="!loading && selectedUniversities">

          <a :href="`https://next.edurussia.ru/university/${getSlug(item)}`"
             target="_blank"
             class="universities-list__item"
             :key="item.id"
             :title="item.title"
             v-for="item in selectedUniversities">

            <div class="universities-list__item-logo"
                 :style="{backgroundImage: `url(${item.logo.url})`}"/>

            <div class="universities-list__item-name"
                 v-text="item.title"></div>

          </a>

        </div>
      </transition>
    </div>
  </section>
</template>

<script>
import graphQl               from '~/api/graphQl'
import { UniversitiesTypes } from '~/api/graphql/universities'
import Loader                from '~/components/ui/Loader'

export default {
  name:       'InfoUniversities',
  components: {
    Loader,
    Drop: () => import(/* webpackChunkName: "Drop" */ '~/components/ui/Drop')
    //IconOpen:  () => import(/* webpackChunkName: "IconPrev" */ '~/assets/svg/arrow-down.svg?inline'),
    //IconClose: () => import(/* webpackChunkName: "IconPrev" */ '~/assets/svg/arrow-up.svg?inline')
  },

  props: {
    data: {
      type: Object,
      default () {}
    }
  },

  data () {
    return {
      loading:         true,
      universitiesAll: null,
      universities:    null,
      active:          null,
      drop:            false,
      dropDevices:     [ 'phone', 'tablet-small', 'tablet-portrait', 'tablet-landscape' ]
    }
  },

  async mounted () {
    if ( process.browser ) {
      await this.load( true )
    }
  },

  watch: {
    async code () {
      await this.load()
    }
  },

  computed: {

    all () {return this.$t( 'all_universities' )},
    device () {return this.$store.getters[ 'modules/layout/device' ]},
    showDrop () {return this.dropDevices.includes( this.device )},
    hideBorder () {return this.data?.hideBorder},
    showFilter () {return !this.data?.hideFilter},
    title () {return this.data?.title},
    subTitle () {return this.data?.subTitle},
    code () {return this.$i18n.localeProperties.code},

    selectedUniversities () {
      if ( !this.universities ) return null
      if ( !this.universitiesAll ) return null
      return ( this.active )
        ? this.universities.find( i => i.id === this.active.id )?.universities
        : this.universitiesAll
    }

  },

  methods: {

    getQuery () {
      const { type } = this.$route.query
      if ( !this.universities ) return
      if ( type ) {
        const active = this.universities.find( i => i.name === type )
        if ( active ) {
          this.active = active
        }
      }
      this.loading = false
    },

    getSlug ( item ) {
      if ( !item ) return ''
      if ( this.code === 'en' ) {
        return item?.slug
      }
      else {
        const page = ( item.localizations ) ? item.localizations.find( i => i.locale === 'en' ) : ''
        return page?.slug
      }
    },

    async load ( query = false ) {
      this.loading                              = true
      const { universitiesTypes, universities } = await graphQl.data( UniversitiesTypes, { locale: this.code } )
      if ( !universitiesTypes && !!universitiesTypes.length ) return
      this.universities = universitiesTypes
      //.filter(i =>
      //+i.id !== 25 ||
      //+i.id !== 26 ||
      //+i.id !== 27 ||
      //+i.id !== 28 ||
      //+i.id !== 29 ||
      //+i.id !== 30)
      this.universitiesAll = universities
      if ( query ) {
        this.getQuery()
      }
    }
  }
}
</script>

<style lang="sass">
@import "assets/sass/variables"

.universities
  box-shadow: $shadow-small
  padding: $ra-gutter-large * 1.5
  border-radius: $ra-border-radius * 3

  &--no-shadow
    box-shadow: none

  @media (max-width: $device-tablet-landscape)
    padding: $ra-gutter-medium
  @media (max-width: $device-phone)
    padding: $ra-gutter

.universities-list
  display: flex
  flex-wrap: wrap
  gap: $ra-gutter-medium
  max-width: $device-desktop-large
  margin: $ra-gutter-large auto 0 auto

  @media (max-width: $device-tablet-landscape)
    gap: $ra-gutter
  @media (max-width: $device-tablet-portrait)
    gap: $ra-gutter-small
    flex-direction: column

  &__title
    margin: $ra-gutter-large auto

    &--no-top
      margin-top: 0

  &__item
    flex: 0 1 calc(33% - $ra-gutter-medium)
    display: flex
    padding: $ra-gutter-small
    text-decoration: none
    color: $ra-color-text
    font-size: 1.2rem
    align-items: center
    border-radius: $ra-border-radius * 2
    @media (max-width: $device-desktop)
      flex: 0 1 calc(50% - $ra-gutter-medium)
    @media (max-width: $device-tablet-portrait)
      flex: none

    &:hover
      box-shadow: $shadow

  &__item-logo
    width: 4rem
    height: 4rem
    flex: none
    background-repeat: no-repeat
    background-size: contain
    background-position: center center
    margin-right: $ra-gutter-medium

    & + *
      position: relative

      &:before
        content: ""
        display: block
        position: absolute
        top: 0
        bottom: 0
        left: -$ra-gutter
        border-left: $ra-border-width solid $ra-border

  &__item-index
    font-family: $font-family-heading
    font-size: 3rem
    flex: none
    margin-right: $ra-gutter

  &__item-name
    display: flex
    align-items: center
    flex: 1
    min-width: 10px
    line-height: 1.3

</style>
