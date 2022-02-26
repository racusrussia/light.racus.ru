<template>
  <div class="ra-university-about">

    <div class="ra-university-about-complaint">

      <div class="ra-university-about-complaint__rows"
           v-if="complaint">

        <p class="ra-university-about-complaint__title"
           v-text="$t('short_facts')"></p>

        <!--position-->
        <aside class="ra-university-about-complaint__row"
               v-if="complaint.position">
          <div class="ra-university-about-complaint__row-label"
               v-text="$t('position')"></div>
          <div class="ra-university-about-complaint__row-text"
               v-text="complaint.position"></div>
        </aside>

        <!--status-->
        <aside class="ra-university-about-complaint__row"
               v-if="complaint.status">
          <div class="ra-university-about-complaint__row-label"
               v-text="$t('status')"></div>
          <div class="ra-university-about-complaint__row-text"
               v-text="complaint.status"></div>
        </aside>

        <!--founder-->
        <aside class="ra-university-about-complaint__row"
               v-if="complaint.founder">
          <div class="ra-university-about-complaint__row-label"
               v-text="$t('founder')"></div>
          <div class="ra-university-about-complaint__row-text"
               v-text="complaint.founder"></div>
        </aside>

        <!--rating-->
        <aside class="ra-university-about-complaint__row"
               v-if="complaint.rating">
          <div class="ra-university-about-complaint__row-label"
               v-text="$t('rating')"></div>
          <div class="ra-university-about-complaint__row-text"
               v-text="complaint.rating"></div>
        </aside>

      </div>

      <aside class="ra-university-about-complaint__logo">
        <img :src="logo"
             :alt="page.title">
      </aside>

      <div class="ra-university-about-complaint__items">
        <aside class="ra-university-about-complaint__item"
               v-for="item in ads"
               :key="item.id">
          <div class="ra-university-about-complaint__item-value"
               v-text="item.value"></div>
          <div class="ra-university-about-complaint__item-label"
               v-text="item.label"></div>
        </aside>
      </div>
    </div>

    <div class="ra-university-about-video">

      <Picture :image="videoThumb"
               format-large="medium"
               format-medium="medium"
               format-default="medium"/>

      <div class="ra-university-about-video__outer">
          <span class="ra-welcome__play"
                @click="play"
                v-if="video"></span>
      </div>
    </div>

  </div>
</template>

<script>

import Picture from '~/components/blocks/Picture'

export default {

  name:       'AboutUniversity',
  components: { Picture },
  props:      {

    page: {
      type: Object,
      default () {}
    }

  },

  computed: {

    videoThumb () {return this.page?.video_thumb},
    complaint () {return this.page?.complaint},
    ads () {return this.page?.complaint?.ads},
    logo () {return this.page?.logo?.url},
    video () {
      const video = this.page?.youtube
      return ( !video ) ? false : { type: 'youtube', src: video }
    },
    code () {return this.$i18n.localeProperties.code}
  },

  methods: {

    play () {
      this.$store.commit('modules/layout/MODAL', {
        title: null,
        type:  this.video.type,
        src:   this.video.src
      })
    }
  }

}

</script>

<style lang="sass">
@import "assets/sass/variables"
@import "assets/sass/mixins"
@import "assets/sass/content/var"

.ra-university-about
  max-width: $device-desktop
  margin: $ra-gutter-large auto
  display: flex
  align-items: center
  @media (max-width: $device-tablet-landscape)
    flex-direction: column

.ra-university-about-complaint
  position: relative
  z-index: 1
  border-radius: $ra-border-radius * 3
  background-color: $ra-color-background
  box-shadow: $shadow-large
  width: 400px
  flex: none
  padding: $ra-gutter-medium $ra-gutter
  text-align: center
  @media (max-width: $device-tablet-landscape)
    width: 98%
    display: flex
    flex-wrap: wrap
  @media (max-width: $device-tablet-small)
    width: 100%
    border-radius: 0

  &__rows,
  &__items
    @media (max-width: $device-tablet-landscape)
      width: calc((100% - 90px) / 2)
    @media (max-width: $device-tablet-portrait)
      width: 50%
    @media (max-width: $device-phone)
      width: 100%
      margin-top: $ra-gutter

  &__rows

    & > *
      margin-bottom: $ra-gutter

      &:last-child
        margin-bottom: 0

  &__row
    &:after
      content: ""
      display: block
      width: 60px
      height: 1px
      opacity: .6
      margin: $ra-gutter-small auto 0 auto
      background-color: $ra-color-text-muted

    &:last-child
      &:after
        display: none

  &__row-label
    line-height: 1
    color: $ra-color-text-muted
    text-transform: uppercase
    margin-bottom: $ra-gutter-small

  &__row-text
    font-style: italic

  &__title
    font-family: $font-family-heading
    color: $ra-color-danger
    font-weight: 900
    font-size: 1.2rem

  &__logo
    margin: $ra-gutter-medium 0
    @media (max-width: $device-tablet-landscape)
      margin: 0
      width: 100%
      flex: none
      order: -1

    & > *
      margin: 0 auto
      max-height: 90px

  &__items
    display: flex
    flex-wrap: wrap
    gap: $ra-gutter-small
    justify-content: center

  &__item
    width: calc(50% - $ra-gutter-small)
    flex: none

  &__item-value
    font-size: 2rem
    color: $ra-color-danger

  &__item-label
    font-size: .9rem

.ra-university-about-video
  z-index: 0
  flex: 1
  min-width: 100px
  position: relative
  overflow: hidden
  border-radius: 0 $ra-border-radius * 3 $ra-border-radius * 3 0
  @media (max-width: $device-tablet-landscape)
    order: -1
    flex: none
    width: 80%
    border-radius: $ra-border-radius * 3 $ra-border-radius * 3 0 0
  @media (max-width: $device-tablet-small)
    width: 100%
    border-radius: 0

  &__outer
    top: 0
    left: 0
    position: absolute
    margin: $ra-gutter-medium
    @include transition-all(.3s)
    transform-origin: center center

    &:hover
      transform: scale(1.1)
</style>
