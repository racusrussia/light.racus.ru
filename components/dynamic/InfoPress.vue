<template>
  <div class="ra-press-outer">

    <div class="ra-press">

      <NuxtLink :to="`/press-about-us/${item.slug}`"
                v-for="item in press"
                :key="item.id"
                class="ra-press__item">

        <div class="ra-press__date"
             v-text="dateLocale(item.date)"></div>

        <div class="ra-press__title"
             v-text="getLocaleContent(item, 'title')"></div>

        <div class="ra-press__name"
             v-text="getLocaleContent(item, 'mediaName')"></div>

      </NuxtLink>
    </div>
  </div>
</template>

<script>
import graphQl           from '~/api/graphQl'
import { PressAboutUse } from '~/api/graphql/pages'

export default {
  name: 'InfoPress',

  data () {
    return {
      loading: true,
      press:   null
    }
  },

  async mounted () {
    this.loading             = true
    const { pressAboutuses } = await graphQl.data(PressAboutUse)
    this.press               = pressAboutuses

    Promise.all([ pressAboutuses ])
           .then(() => this.loading = false)

  },

  computed: {

    locale () {return this.$i18n.localeProperties}
  },

  methods: {

    getLocaleContent ( item, key ) {
      const { code } = this.locale
      if (code === 'en') return item[ key ]
      const locale = item.localizations.find(i => i.locale === code)
      return ( locale ) ? locale[ key ] : item[ key ]
    },

    dateLocale ( date ) {
      const dateNew = new Date(date)
      return dateNew.toLocaleDateString(this.locale.iso)
    }
  }
}
</script>

<style lang="sass">
@import "assets/sass/variables"
@import "assets/sass/mixins"

.ra-press-outer
  padding: $ra-gutter-medium $ra-gutter

.ra-press
  max-width: $device-desktop-large
  border-radius: $ra-border-radius * 4
  margin: 0 auto
  padding: $ra-gutter-medium
  background-color: $ra-color-background-muted
  display: flex
  flex-wrap: wrap
  justify-content: space-between

  @media (max-width: $device-tablet-portrait)
    padding: $ra-gutter

  &__item
    width: calc(33% - $ra-gutter-small)
    margin-bottom: $ra-gutter
    background-color: $ra-color-background
    border-radius: $ra-border-radius * 2
    box-shadow: $shadow-xsmall
    padding: $ra-gutter-medium
    text-decoration: none
    color: $ra-color-text
    @include transition-all(.4s)

    @media (max-width: $device-tablet-landscape)
      width: calc(50% - $ra-gutter-small)
    @media (max-width: $device-tablet-portrait)
      width: 100%

    &:hover
      box-shadow: $shadow-xlarge
      color: $ra-color-text
      transform: scale(1.02)

    &:hover
      .ra-press__title
        color: $ra-color-danger

  &__title
    font-size: 1.2rem
    line-height: 1.2
    margin-bottom: $ra-gutter

  &__date
    color: $ra-color-text-muted
    margin-bottom: $ra-gutter-small

  &__name
    font-size: 0.9rem
    line-height: 1.2
    font-weight: 900
</style>
