<template>
  <div class="ra-search-panel">

    <div class="ra-search-panel-outer"
         @click="close"></div>

    <transition name="slide-top"
                appear>

      <div class="ra-search-panel__wrapper"
           v-if="show">

        <div class="ra-search-panel__header">

          <input type="text"
                 @keypress.esc="close"
                 v-focus
                 :disabled="loading"
                 @change="search"
                 @keydown.enter="search"
                 :placeholder="$t('search')"
                 class="ra-search-panel__input"
                 v-model="request">

          <button type="submit"
                  :disabled="loading"
                  @click="search"
                  class="ra-button ra-button__icon--small  ra-button__icon">
            <IconSearch width="20"/>
          </button>

        </div>

        <button type="button"
                @click="close"
                class="ra-button ra-button--danger ra-button--pill ra-button__icon--small ra-search-panel__close ra-button__icon">
          <IconClose width="14"/>
        </button>

        <div class="ra-search-panel__body">
          <Loader v-if="loading"/>

          <div class="ra-search-panel__items">

            <!--<RouterLink :to="go(item)"-->
            <!--            class="ra-search-panel__item"-->
            <!--            v-for="item in response">-->
            <a @click.prevent="go(item.path)"
               class="ra-search-panel__item"
               v-for="item in response">
              <span class="ra-search-panel__item-title"
                    v-text="item.title"></span>
              <span class="ra-search-panel__item-meta"
                    v-text="name[item.type].label"></span>

            </a>
          </div>
        </div>

      </div>

    </transition>
  </div>
</template>

<script>
import mapbox      from '~/api/query/mapbox'
import strapi      from '~/api/query/strapi'
import IconSearch  from '~/assets/svg/search.svg?inline'
import IconClose   from '~/assets/svg/close.svg?inline'
import SearchInput from '~/components/search/SearchInput'
import Loader      from '~/components/ui/Loader'

export default {
  name: 'SearchPanel',

  components: {
    Loader,
    SearchInput,
    IconSearch,
    IconClose
  },

  async mounted () {
    if (process.browser) {
      this.$store.commit('BLOCK_BODY')
      this.request = '' + this.$store.state.modules.layout.search.request
      setTimeout(() => this.show = true, this.delay)
      if (!this.request) return
      await this.search()
    }
  },

  beforeDestroy () {
    this.$store.commit('UNBLOCK_BODY')
  },

  data () {
    return {
      request:  '',
      response: null,
      limit:    50,
      start:    0,
      show:     false,
      delay:    200,
      loading:  false,
      result:   {
        'info-pages':   null,
        'news-line':    null,
        'universities': null,
        'gallery':      null
      },
      name:     {
        'application::info-pages.info-pages':     { label: this.$t('filter_info'), url: '' },
        'application::news-line.news-line':       { label: this.$t('filter_news'), url: '/news/' },
        'application::universities.universities': { label: this.$t('filter_universities'), url: '/university/' }
      },

      selectedFilter: null
    }
  },

  computed: {

    nav () {
      const nav   = this.$store.state.topMenu
      let navFlat = []
      nav.forEach(i => {
        navFlat = [ ...navFlat, i.path ]
        if (i.items.length) {
          navFlat = [ ...navFlat, ...i.items.map(i => i.path) ]
        }
      })
      return navFlat
    },

    locale () {return this.$i18n.localeProperties.code}
  },

  methods: {
    go ( path ) {
      this.$router.push(this.localeLocation(path))
      this.$store.commit('modules/layout/TOGGLE_SEARCH_RESULT', false)
    },

    toggle ( label ) {this.selectedFilter = ( this.selectedFilter === label ) ? null : this.selectedFilter = label},

    close () {
      this.show = false
      setTimeout(() => this.$store.commit('modules/layout/TOGGLE_SEARCH_RESULT'), this.delay)
    },

    setLinks ( items ) {
      items.forEach(i => {
        if (i.type === 'application::info-pages.info-pages') {

        }
        else {
          i.path = this.name[ i.type ].url + i.slug
        }
      })

      return items
    },

    async search () {
      if (this.request.length < 3) return
      this.loading   = true
      this.response  = null
      const response = await strapi.api('GET', '/content-search', {
        _q:     this.request,
        locale: this.locale,
        _limit: this.limit
      })
      Promise.all([ response ])
             .then(() => {
               this.response = this.setLinks(response)
               this.loading  = false
             })
             .catch(e => {
               this.response = null
               this.loading  = false
             })

    }
  }

}
</script>

<style lang="sass">
@import "assets/sass/variables"
@import "assets/sass/mixins"

.ra-search-panel,
.ra-search-panel-outer
  @include cover
  position: fixed
  z-index: $ra-z-index + 1
  overflow: hidden

.ra-search-panel-outer
  backdrop-filter: blur(4px)
  background-color: rgba($ra-color-text-inverse, .3)

.ra-search-panel
  &__close
    position: absolute
    right: 0
    top: -40px

  &__wrapper
    z-index: $ra-z-index + 2
    position: relative
    max-width: $device-tablet-portrait
    background-color: $ra-color-text-inverse
    height: calc(100% - 50px)
    width: 98%
    bottom: 0
    margin: 50px auto 0 auto
    border-radius: $ra-border-radius * 2 $ra-border-radius * 2 0 0
    box-shadow: 0 0 40px $ra-color-shadow
    display: flex
    flex-direction: column

  &__header
    padding: $ra-gutter $ra-gutter 0 $ra-gutter-medium
    flex: none
    display: flex
    align-items: center

  &__input
    border-bottom: 2px solid transparent
    line-height: 2.5rem
    font-size: 1.4rem
    font-weight: 700
    flex: 1
    margin-right: $ra-gutter
    text-align: center

    &:focus
      border-bottom-color: $ra-color-info

  &__filters
    display: flex
    padding: $ra-gutter $ra-gutter-medium
    gap: $ra-gutter-small
    flex-wrap: wrap

  &__filter-item
    border-radius: 500px
    //border: 1px solid lighten($ra-color-text-muted, 30%)
    font-size: .9rem
    padding: 0 0 0 $ra-gutter-small
    line-height: 1.6rem
    height: 1.6rem
    background-color: $ra-color-background-muted

    &:hover
      color: $ra-color-danger

    &--active
      color: $ra-color-danger

  &__filter-count
    background-color: $ra-color-danger
    color: $ra-color-text-inverse
    display: inline-block
    min-width: 1.6rem
    padding: 0 5px
    height: 1.6rem
    border-radius: 500px
    font-size: .8rem
    margin-left: 5px

  &__body
    background-color: $ra-color-background-muted
    padding: $ra-gutter-small $ra-gutter-small $ra-gutter-medium $ra-gutter-small
    overflow-x: hidden
    overflow-y: auto
    flex: 1
    min-height: 100px

  &__items
    display: flex
    flex-direction: column

  &__item
    text-decoration: none
    color: $ra-color-text
    display: flex
    flex-direction: column
    background-color: $ra-color-background
    padding: $ra-gutter
    border-radius: $ra-border-radius
    margin-bottom: $ra-gutter-small

    &:last-child
      margin-bottom: 0

  &__item-title
    font-weight: 700

  &__item-meta
    font-size: .8rem
    color: $ra-color-text-muted
</style>
