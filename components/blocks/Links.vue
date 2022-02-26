<template>
  <div v-if="data"
       class="ra-links">

    <div class="ra-links-items">

      <div class="ra-links-item__head">
        <h4 class="ra-h ra-h--light ra-h--1 ra-links-item__title"
            v-text="$t('filter_media')"></h4>

        <!--<NuxtLink :to="localePath('/media')"-->
        <!--          class="ra-button ra-button&#45;&#45;pill ra-button&#45;&#45;danger-border ra-button&#45;&#45;small"-->
        <!--          v-text="$t('all_media')"></NuxtLink>-->
      </div>

      <div class="ra-links-item"
           :class="{'ra-links-item--fill': licksOdd && index === 0}"
           :style="{backgroundImage: `url(${getFormat(item.image, 'medium')})`}"
           v-for="(item, index) in data"
           :key="item.id">

        <NuxtLink v-if="item.link"
                  class="ra-links-item__link"
                  :target="getLink(item.link).target"
                  :to="getLink(item.link).link">


          <span class="ra-links-item__title">
            <span v-html="item.svg"
                  class="ra-links-item__title-icon"></span>
            <span v-text="item.title"
                  class="ra-links-item__title-text"></span>
          </span>

          <span class="ra-links-item__description"
                v-text="item.description"></span>

        </NuxtLink>

      </div>

    </div>

    <div class="ra-links-news">

      <div class="ra-links-news__header">
        <h4 class="ra-h ra-h--light ra-h--1 ra-links-news__title"
            v-text="$t('filter_news')"></h4>

        <NuxtLink :to="localePath('/news')"
                  class="ra-button ra-button--pill ra-button--danger-border ra-button--small"
                  v-text="$t('all_news')"></NuxtLink>
      </div>

      <Loader v-if="loading"/>

      <div v-else>

        <NuxtLink :to="localePath({path: `/news/${item.slug}`})"
                  class="ra-links-news-item"
                  v-for="item in news"
                  :key="item.id">
          <div class="ra-links-news-item__date"
               v-text="dateLocale(item.publishedAt)"></div>

          <div class="ra-links-news-item__title"
               v-text="item.title"></div>
        </NuxtLink>
      </div>
    </div>

  </div>
</template>

<script>

import graphQl           from '~/api/graphQl'
import { NewsLineSmall } from '~/api/graphql/pages'
import Loader            from '~/components/ui/Loader'

export default {
  name:       'Links',
  components: { Loader },
  props:      {

    data: {
      type: Array,
      default () {}
    }
  },

  data () {
    return {
      limit:   3,
      news:    null,
      loading: true
    }
  },

  computed: {
    locale () {return this.$i18n.localeProperties},
    code () {return this.$i18n.localeProperties.code},
    licksOdd () {
      if (!this.data || !this.data.length) return true
      const count = this.data.length
      return !!( count % 2 )
    }
  },

  async mounted () {
    await this.loadNews()
  },

  methods: {

    getFormat ( image, format ) {
      if (!image) return null
      const imageFormat = image.formats[ format ]?.url
      return ( imageFormat ) ? imageFormat : image?.url
    },

    dateLocale ( date ) {
      const dateNew = new Date(date)
      return dateNew.toLocaleDateString(this.locale.iso)
    },

    getLink ( item ) {
      const re     = new RegExp('^(http|https)://', 'i')
      const t      = re.test(item)
      const link   = ( t ) ? item : this.localePath(item)
      const target = ( t ) ? '_blank' : ''
      return { link, target }
    },

    async loadNews () {
      this.loading        = true
      const { newsLines } = await graphQl.data(NewsLineSmall, { limit: this.limit, locale: this.code })
      this.news           = newsLines
      this.loading        = false
    }
  }
}
</script>

<style lang="sass">
@import "assets/sass/variables"
@import "assets/sass/mixins"
@import "assets/sass/content/var"

.ra-links
  max-width: $ra-content-large-max-width
  margin: 0 auto
  display: flex
  align-items: center
  margin-bottom: $ra-gutter-large
  @media (max-width: $device-tablet-portrait)
    flex-direction: column

.ra-links-items
  flex: 1
  min-width: 100px
  display: flex
  flex-wrap: wrap
  overflow: hidden
  @media (max-width: $device-tablet-portrait)
    width: 96%

.ra-links-item
  width: 50%
  background: center center no-repeat
  background-size: cover
  height: 250px
  position: relative
  @media (max-width: $device-tablet-landscape)
    height: 200px
  @media (max-width: $device-tablet-portrait)
    height: 170px
  //width: 100%
  @media (max-width: $device-tablet-small)
    height: 150px
    width: 100%

  &--fill
    width: 100%

  &__head
    width: 100%
    margin-bottom: $ra-gutter-small
    padding: 0 $ra-gutter $ra-gutter $ra-gutter-medium
    display: flex
    gap: $ra-gutter
    align-items: center
    @media (max-width: $device-tablet-small)
      justify-content: space-between

    & > *
      margin: 0

  &__description
    font-size: 1.4rem

  &__title
    padding: 0
    display: flex
    gap: $ra-gutter-small
    align-items: center

  &__title-icon
    flex-wrap: none
    width: 2rem
    height: 2rem

    & > *
      max-width: 100%
      max-height: 100%

  &__title-text
    flex: 1
    min-width: 100px
    line-height: 1.2
    font-size: 1.6rem
    @media (max-width: $device-tablet-landscape)
      font-size: 1.4rem

  &__link
    @include cover
    background-color: rgba($ra-color-info, .2)
    display: flex
    flex-direction: column
    padding: $ra-gutter-medium
    color: $ra-color-text-inverse
    text-decoration: none
    justify-content: space-between
    @include transition-all(.6s)
    @media (max-width: $device-tablet-small)
      padding: $ra-gutter-medium $ra-gutter
      justify-content: flex-end

    &:hover
      color: $ra-color-text-inverse
      background-color: rgba($ra-color-info, .6)
      backdrop-filter: blur(3px)

.ra-links-news
  padding: $ra-gutter-large
  width: 450px
  background-color: $ra-color-background
  box-shadow: $shadow
  border-radius: $ra-border-radius * 3
  @media (max-width: $device-tablet-landscape)
    width: 400px
  @media (max-width: $device-tablet-portrait)
    width: 100%

  &__header
    display: flex
    align-items: center
    margin-bottom: $ra-gutter-medium
    gap: $ra-gutter
    @media (max-width: $device-tablet-landscape)
      margin-bottom: $ra-gutter
    @media (max-width: $device-tablet-small)
      justify-content: space-between

    & > *
      margin: 0

  &__title
    padding: 0

.ra-links-news-item
  border-bottom: $ra-border-width solid $ra-border
  padding-bottom: $ra-gutter
  margin-bottom: $ra-gutter
  display: block
  color: $ra-color-text
  text-decoration: none
  @media (max-width: $device-tablet-landscape)
    padding-bottom: $ra-gutter-small
    margin-bottom: $ra-gutter-small

  &:last-child
    margin: 0
    padding: 0
    border-bottom: none

  &__title
    font-size: 1.1rem
    @media (max-width: $device-tablet-landscape)
      font-size: 1rem

  &__date
    font-size: 2rem
    font-weight: 100
    margin-bottom: $ra-gutter
    @media (max-width: $device-tablet-landscape)
      font-size: 1.4rem
      margin-bottom: $ra-gutter-small
</style>
