<template>
  <header class="ra-header-university">

    <div class="ra-header-university__bgr"
         :style="bgr">
      <div class="ra-header-university__circle ra-header-university__circle--top"
           :class="{'ra-header-university__circle--open': circle}"></div>
      <div class="ra-header-university__circle ra-header-university__circle--bottom"
           :class="{'ra-header-university__circle--open': circle}"></div>
    </div>

    <div class="ra-header-university__body">

      <h1 class="ra-header-university__title">
        <span v-if="title"
              v-text="title"></span>
      </h1>

      <div class="ra-header-university__items">
        <aside class="ra-header-university__item"
               @click="click(item)"
               role="button"
               @mouseenter="serActive(index)"
               v-for="(item, index) in sliderNotEmpty"
               :key="item.title">
          <span class="ra-header-university__item-title"
                v-text="item.title"></span>
          <img class="ra-header-university__item-arrow"
               src="/images/arrow-down.png"
               :alt="item.title"
               width="13"/>
        </aside>
      </div>

    </div>
  </header>
</template>

<script>

export default {
  name: 'UniversityHeader',

  components: {},

  props: {

    page: {
      type: Object,
      default () {}
    },

    galleries: {
      type: Array,
      default () {}
    },

    title: {
      type:    String,
      default: null
    }

  },

  data () {
    return {
      active: 0,
      circle: false
    }
  },

  computed: {

    logo () {return this.page?.logo?.url},
    device () {return this.$store.getters[ 'modules/layout/device' ]},
    bgr () {
      if (!process.browser) return
      if (!this.sliderNotEmpty) return
      if (!this.sliderNotEmpty.length) return
      const active = this.sliderNotEmpty[ this.active ]
      const image  = ( active ) ? active.image : null
      if (!image) return
      const desktopImage = image?.large?.url
      return ( this.device && image )
        ? `backgroundImage: url(${ image[ `${ this.device }_wp` ]?.url })`
        : ( desktopImage ) ? `backgroundImage: url(${ desktopImage })` : null

    },

    sliderNotEmpty () {
      if (!this.page) return
      const slider = this.page?.sliderImages
      if (!slider) return

      let slides = [ {
        title:  this.$t('header_about'),
        action: 'scroll',
        data:   'header_about',
        image:  slider.about?.formats
      } ]

      if (this.galleries && this.galleries.length) {
        slides = [ ...slides, {
          title:  this.$t('header_gallery'),
          action: 'scroll',
          data:   'header_gallery',
          image:  slider?.galllery?.formats
        } ]
      }
      if (this.page.prices && this.page.prices.length) {
        slides = [ ...slides, {
          title:  this.$t('header_programs'),
          action: 'scroll',
          data:   'header_programs',
          image:  slider?.programs?.formats
        } ]
      }
      if (this.page.studentLive && this.page.studentLive.length) {
        slides = [ ...slides, {
          title:  this.$t('header_live'),
          action: 'scroll',
          data:   'header_live',
          image:  slider?.studentLife?.formats
        } ]
      }
      //if (this.page.youtube) {
      //  slides = [ ...slides, {
      //    title:  this.$t('header_youtube'),
      //    action: 'scroll',
      //    data:   'header_youtube',
      //    image:  slider?.video?.formats
      //  } ]
      //}
      return slides

    }
  },

  methods: {

    serActive ( index ) {
      this.circle = true
      setTimeout(() => {
        this.active = index
        this.circle = false
      }, 400)
    },

    play ( url ) {
      this.$store.commit('modules/layout/MODAL', {
        title: null,
        type:  'youtube',
        src:   url
      })
    },

    click ( item ) {
      if (!item) return
      if (item.action === 'scroll') {this.$emit('scroll', item.data)}
      else if (item.action === 'play') {
        if (!item.data) return
        this.play(item.data)
      }
    }
  }
}
</script>

<style lang="sass">
@import "assets/sass/variables"
@import "assets/sass/mixins"

.ra-header-university
  min-height: 600px
  background: $ra-color-base no-repeat center center
  position: relative
  display: flex
  overflow: hidden
  width: 100%
  justify-content: flex-end
  @media (max-width: $device-tablet-portrait)
    flex-direction: column

  &__bgr
    overflow: hidden
    background-position: center center
    @include cover
    background-size: cover
    @media (max-width: $device-tablet-portrait)
      height: 60vh
      position: relative

    @media (max-width: $device-phone)
      height: 40vh
      position: relative

  &__circle
    position: absolute
    border-radius: 300vw
    width: 0
    height: 0
    transition: all .35s ease-in-out
    backdrop-filter: blur(10px)
    will-change: transform

    &--top
      top: 0
      left: 0
      transform: translate(-50%, -50%)
      background-color: rgba($ra-color-danger, .8)

    &--bottom
      transform: translate(50%, 50%)
      bottom: 0
      right: 0
      background-color: rgba($ra-color-base, .8)

    &--open
      width: 250vw
      height: 250vw

  &__body
    margin-top: 30vh
    position: relative
    z-index: 1
    flex: none
    width: 800px
    align-self: flex-end
    color: $ra-color-text-inverse
    background-color: rgba($ra-color-base, .4)
    @include transition-all(.3s)
    backdrop-filter: blur(1px)
    @media (max-width: $device-desktop)
      width: 60%
    @media (max-width: $device-tablet-landscape)
      width: 70%
    @media (max-width: $device-tablet-portrait)
      margin-top: 0
      width: 100%

    &:hover
      backdrop-filter: blur(3px)

  &__title
    color: $ra-color-text-inverse
    font-weight: 400
    font-family: $font-family
    border-bottom: $ra-border-width solid rgba($ra-color-text-inverse, .3)
    padding: 0 0 $ra-gutter-medium 0
    font-size: 2.1rem
    margin: $ra-gutter-medium $ra-gutter-medium 0 $ra-gutter-medium
    display: flex
    align-items: center
    text-shadow: 0 1px 3px rgba(0, 0, 0, .4)
    @media (max-width: $device-tablet-portrait)
      font-size: 1.6rem
    @media (max-width: $device-phone)
      font-size: 1.4rem
      margin: $ra-gutter $ra-gutter 0 $ra-gutter
      padding: 0 0 $ra-gutter 0

  &__items
    margin: 0 $ra-gutter-medium $ra-gutter-medium $ra-gutter-medium
    display: flex
    flex-wrap: wrap
    overflow: hidden
    //align-items: stretch
    justify-content: stretch
    @media (max-width: $device-phone)
      margin: 0 $ra-gutter $ra-gutter $ra-gutter

  &__item
    padding: 0 $ra-gutter
    height: 6rem
    width: 50%
    cursor: pointer
    display: flex
    align-items: center
    font-size: 1.5rem
    position: relative
    margin-bottom: -1px
    margin-right: -1px
    transform: translateX(2px)
    line-height: 1.1
    border-right: $ra-border-width solid rgba($ra-color-text-inverse, .3)
    border-bottom: $ra-border-width solid rgba($ra-color-text-inverse, .3)

    @media (max-width: $device-tablet-portrait)
      font-size: 1.2rem
    @media (max-width: $device-phone)
      font-size: 1.1rem
      height: 5rem

    &:last-child
      &:nth-child(3n)
        width: 100%

    & > *
      position: relative

    &:before
      content: ""
      display: block
      @include cover
      @include transition-all(.5s)
      background-color: $ra-color-danger
      transform: scaleY(.1)
      //border-radius: $ra-border-radius
      opacity: 0

    &:hover
      &:before
        opacity: 1
        transform: scale(1)

    &:hover
      .ra-header-university__item-arrow
        opacity: 1
        transform: rotate(-90deg) translateY(0)

  &__item-title
    flex: 1
    min-width: 100px

  &__item-arrow
    margin-left: $ra-gutter-medium
    flex: none
    transform: rotate(-90deg) translateY(100%)
    opacity: 0
    @include transition-all(.5s)

</style>
