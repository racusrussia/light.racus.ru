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
                 @input="search"
                 :placeholder="$t('search')"
                 class="ra-search-panel__input"
                 v-model="request">

          <button type="button"
                  @click="close"
                  class="ra-button ra-button--danger ra-button--pill ra-button__icon--small ra-button__icon">
            <IconClose width="14"/>
          </button>
        </div>

        <div class="ra-search-panel__filters"
             v-if="filter">

          <button class="ra-search-panel__filter-item"
                  @click="toggle(item.label)"
                  :class="{'ra-search-panel__filter-item--active': selectedFilter === item.label}"
                  v-for="item in filter">
            {{ item.label }}
            <span class="ra-search-panel__filter-count"
                  v-text="item.nbHits"></span>
          </button>
        </div>

        <div class="ra-search-panel__body">

          <div class="ra-search-panel__items"
               v-if="!selectedFilter">

            <div class="ra-search-panel__item"
                 v-for="item in all">
              <p v-if="item.title"
                 class="ra-search-panel__item-title"
                 v-text="item.title"></p>
              <p v-else-if="item.question"
                 class="ra-search-panel__item-title"
                 v-text="item.question"></p>
              <span class="ra-search-panel__item-meta"
                    v-text="item.label"></span>
            </div>
          </div>
        </div>

      </div>

    </transition>
  </div>
</template>

<script>
import mapbox      from '~/api/query/mapbox'
import IconSearch  from '~/assets/svg/search.svg?inline'
import IconClose   from '~/assets/svg/close.svg?inline'
import SearchInput from '~/components/search/SearchInput'

export default {
  name: 'SearchPanel',

  components: {
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
      request:        '',
      show:           false,
      delay:          200,
      url:            'https://search.edurussia.ru',
      limit:          10,
      result:         {
        'info-pages':   null,
        'news-line':    null,
        'universities': null,
        'gallery':      null
      },
      labels:         {
        'info-pages':   this.$t('filter_info'),
        'news-line':    this.$t('filter_news'),
        'universities': this.$t('filter_universities'),
        'gallery':      this.$t('filter_media')
      },
      selectedFilter: null
    }
  },

  watch: {
    request () {
      if (!this.request) {

        for (const item in this.result) {
          this.result[ item ] = null
        }
        this.result = null
      }
    }
  },

  computed: {

    filter () {
      let notEmpty = []
      for (const item in this.result) {
        if (!this.result[ item ]) return
        if (!this.result[ item ].hits) return
        if (!this.result[ item ].hits.length) return
        this.result[ item ].label = this.labels[ item ]
        notEmpty                  = [ ...notEmpty, this.result[ item ] ]
      }
      return ( notEmpty.length ) ? notEmpty : null
    },

    all () {
      if (!this.filter) return
      let notEmpty = []
      for (const item in this.result) {

        if (!this.result[ item ]) return
        const res = this.result[ item ].hits.map(i => {
          return {
            ...i,
            label: this.labels[ item ]
          }
        })
        //this.result[ item ].label = this.labels[ item ]
        notEmpty  = [ ...notEmpty, res ]
      }
      return ( notEmpty.length ) ? notEmpty.flat() : null
    }
  },

  methods: {

    toggle ( label ) {
      this.selectedFilter = ( this.selectedFilter === label ) ? null : this.selectedFilter = label
    },

    close () {
      this.show = false
      setTimeout(() => this.$store.commit('modules/layout/TOGGLE_SEARCH_RESULT'), this.delay)
    },

    async search () {
      if (this.request.length < 1) return
      for (const item in this.result) {
        await this.searchItem(item)
      }

    },

    async searchItem ( index ) {
      this.result[ index ] = await mapbox.search(index, this.request, this.limit)
      return true
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
  &__wrapper
    z-index: $ra-z-index + 2
    position: relative
    max-width: $device-tablet-portrait
    background-color: $ra-color-text-inverse
    height: 96%
    width: 98%
    bottom: 0
    margin: 6% auto 0 auto
    border-radius: $ra-border-radius * 7 $ra-border-radius * 7 0 0
    box-shadow: 0 0 40px $ra-color-shadow
    display: flex
    flex-direction: column

  &__header
    padding: $ra-gutter $ra-gutter 0 $ra-gutter-medium
    flex: none
    display: flex
    align-items: flex-start

  &__input
    border-bottom: 2px solid $ra-color-background-muted
    line-height: 2.5rem
    font-size: 1.4rem
    font-weight: 700
    flex: 1
    margin-right: $ra-gutter
    text-align: center

    &:focus
      border-bottom-color: $ra-color-danger

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
    padding: $ra-gutter-small $ra-gutter-medium
    overflow-x: hidden
    overflow-y: auto
    flex: 1
    min-height: 100px

  &__item
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
