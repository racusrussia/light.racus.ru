<template>
  <section class="ra-header">

    <div class="ra-welcome">

      <HeaderHomeTop :show-top-nav="showTopNav"/>

      <div class="ra-welcome__bg-slider">
        <div class="ra-welcome__bg"
             :class="{'ra-welcome__bg--active': index === sliderActive}"
             v-for="(slide, index) in slider"
             :key="slide.id"
             :style="{backgroundImage: `url(${deviceImage(slide)})`}"></div>
      </div>

      <div class="ra-welcome__inner">

        <TopMenu :data="topNav"
                 v-if="showTopNav"/>

        <h1 class="ra-welcome__head"
            v-html="data.title"></h1>

        <div class="ra-university__about-center">
          <!--<p class="ra-welcome__play-text"-->
          <!--   v-text="$t('header_youtube')"></p>-->
          <span class="ra-welcome__play"
                @click="play"
                v-if="video"></span>
        </div>

        <div class="ra-welcome__ways">
          <ChooseProgram :universities-types="universitiesTypes"/>
        </div>

        <div class="ra-welcome__nav">
          <span class="ra-welcome__nav-link"
                :class="{'ra-welcome__nav-link--active': index === sliderActive}"
                v-for="(nav, index) in slider"
                :key="nav.id"></span>
        </div>
      </div>

      <div class="ra-welcome__promo">

        <div class="ra-welcome__promo-bg"></div>

        <div class="ra-welcome__promo-inner">
          <div class="ra-welcome__promo-head"
               v-text="$t('have_a_question')"></div>
          <div class="ra-welcome__promo-desc"
               v-text="$t('contact_our_manager')"></div>
          <div class="ra-welcome__promo-button-wrapper">
            <span class="ra-button ra-button--border ra-button--pill"
                  @click="shoeModalForm"
                  v-text="$t('contact_us')"></span>
          </div>

          <div class="ra-welcome__promo-tabs">

            <div class="ra-welcome__promo-tabs-nav">
              <div class="ra-welcome__promo-tabs-nav-link-wrapper"
                   v-for="(tab, index) in tabs"
                   :key="tab.id">
                <span class="ra-welcome__promo-tabs-nav-link"
                      @click="tabActive = index"
                      role="link"
                      :class="{'ra-welcome__promo-tabs-nav-link--active': index === tabActive}"
                      v-text="tab.title">Study in Russia</span>
              </div>

            </div>

            <div class="ra-welcome__promo-tabs-cont"
                 v-if="tabActiveContent">

              <div class="ra-welcome__promo-tabs-tab-text"
                   v-text="tabActiveContent.content"></div>

              <nuxt-link class="ra-button--danger ra-button ra-button--pill ra-welcome__promo-more"
                         :to="localePath(tabActiveContent.actionLink)"
                         v-text="tabActiveContent.actionLabel"></nuxt-link>

            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

</template>

<script>
import HeaderHomeTop    from '~/components/layouts/HeaderHomeTop'
import ChooseProgram    from '~/components/ui/ChooseProgram'
import TopMenu          from '~/components/ui/TopMenu'
import { showOnDevice } from '~/utils/helpers'

export default {
  name:       'HeaderHome',
  components: {
    HeaderHomeTop,
    ChooseProgram,
    TopMenu,
    Drop: () => import(/* webpackChunkName: "Drop" */ '~/components/ui/Drop')
  },

  props: {

    data: {
      type: Object,
      default () {}
    },

    universitiesTypes: {
      type: Array,
      default () {}
    },

    topNav: {
      type: Array,
      default () {}
    }
  },

  data () {
    return {
      tabActive:    1,
      sliderActive: 0,
      sliderDelay:  7000,
      timer:        0,

      chooseProgram:    false,
      chooseProgramNav: [ {
        link:  '',
        label: ''
      } ],

      topNavVisibleOn: [ 'desktop', 'desktop-large' ]
    }
  },

  mounted () {

    if (process.browser) {
      this.startSlider()
    }
  },

  computed: {

    showTopNav () {return ( this.device ) ? showOnDevice(this.topNavVisibleOn, this.device) : true},

    tabs () {return this.data?.header?.tabs},

    tabActiveContent () {
      if (!this.tabs) return
      return this.tabs[ this.tabActive ]
    },

    sliderLength () {
      if (!this.slider) return null
      return this.slider.length
    },

    video () {
      const youtube = this.data?.header?.youtubeVideo
      const video   = this.data?.video
      if (!youtube && !video) return false
      return ( youtube )
        ? { type: 'youtube', src: youtube }
        : ( video ) ? { type: 'video', src: video } : false
    },

    slider () {return this.data?.slider},
    device () {return this.$store.getters[ 'modules/layout/device' ]}
  },

  methods: {

    selectProgram ( el ) {
      this.chooseProgram = false
    },

    startSlider () {
      if (!this.data) return
      if (!this.data.slider) return
      if (!this.data.slider.length) return
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        this.sliderActive = ( this.sliderActive === this.sliderLength - 1 )
          ? 0
          : this.sliderActive = this.sliderActive + 1
      }, this.sliderDelay)
    },

    deviceImage ( slide ) {
      if (!slide) return
      if (!slide.formats) return
      return ( this.device )
        ? slide.formats[ `${ this.device }_wp` ].url
        : slide.formats.desktop.url
    },

    play () {
      this.$store.commit('modules/layout/MODAL', {
        title: null,
        type:  this.video.type,
        src:   this.video.src
      })
    },

    shoeModalForm () {}
  }
}
</script>

<!--<style lang="sass">-->
<!--@import "assets/sass/variables"-->
<!--@import "assets/sass/mixins"-->

<!--//.ra-header-->

<!--.ra-welcome-->
<!--  position: relative-->
<!--  color: $ra-color-text-inverse-->

<!--  //&__bg-slider-->

<!--  &__bg-->
<!--    //background-size: cover-->
<!--    background: no-repeat fixed-->
<!--    @include cover-->
<!--    will-change: transform-->
<!--    transition: opacity 1s ease-in-out-->
<!--    opacity: 0-->
<!--    background-size: cover-->

<!--    &&#45;&#45;active-->
<!--      opacity: 1-->

<!--  &__nav-->
<!--    display: flex-->
<!--    align-items: center-->
<!--    justify-content: center-->
<!--    gap: $ra-gutter-medium-->
<!--    margin-top: $ra-gutter-large-->

<!--  &__nav-link-->
<!--    width: 10px-->
<!--    height: 10px-->
<!--    border-radius: 500px-->
<!--    background-color: $ra-color-text-inverse-->
<!--    opacity: .5-->
<!--    @include transition-param(opacity)-->

<!--    &&#45;&#45;active-->
<!--      opacity: 1-->

<!--  &__inner,-->
<!--  &__promo-->
<!--    max-width: $device-tablet-landscape-->
<!--    margin: 0 auto-->
<!--    position: relative-->

<!--  &__head-->
<!--    font-size: 8rem-->
<!--    text-align: center-->
<!--    padding-top: 3rem-->
<!--    max-width: $device-tablet-small-->
<!--    margin: 0 auto-->
<!--    color: $ra-color-text-inverse-->

<!--    @media (max-width: $device-tablet-landscape)-->
<!--      font-size: 7rem-->
<!--    @media (max-width: $device-tablet-portrait)-->
<!--      font-size: 6rem-->
<!--    @media (max-width: $device-tablet-small)-->
<!--      font-size: 5rem-->
<!--    @media (max-width: $device-phone)-->
<!--      font-size: 3rem-->

<!--  &__play-->
<!--    display: block-->
<!--    width: 80px-->
<!--    height: 80px-->
<!--    background-position: top center-->
<!--    margin: 0 auto-->
<!--    background-size: 100% auto-->
<!--    cursor: pointer-->
<!--    overflow: hidden-->
<!--    background-image: url(/images/youtube.png)-->
<!--    -webkit-transition: none-->
<!--    opacity: .9-->
<!--    @include transition-param(opacity)-->

<!--    &:hover-->
<!--      background-position: bottom center-->
<!--      opacity: 1-->

<!--  &__play-center-->
<!--    padding: $ra-gutter-medium-->
<!--    border-radius: $ra-border-radius * 3-->
<!--    background-color: rgba($ra-color-base, .4)-->
<!--    color: $ra-color-text-inverse-->
<!--    font-family: $font-family-heading-->
<!--    font-size: 1.2rem-->
<!--    font-weight: 900-->

<!--  &__ways-->
<!--    text-align: center-->
<!--    margin-top: $ra-gutter-medium-->

<!--  &__ways-action-->
<!--    display: inline-block-->
<!--    position: relative-->

<!--  &__promo-->
<!--    padding: $ra-gutter-large-->
<!--    max-width: 985px-->
<!--    position: relative-->
<!--    margin: $ra-gutter-large auto 0 auto-->

<!--    @media (max-width: $device-tablet-small)-->
<!--      margin-top: $ra-gutter-medium-->
<!--      padding: $ra-gutter-medium-->

<!--    @media (max-width: $device-phone)-->
<!--      margin-top: $ra-gutter-->
<!--      padding: $ra-gutter-->

<!--  &__promo-bg-->
<!--    @include cover-->
<!--    border-radius: 2rem 2rem 0 0-->
<!--    z-index: 0-->
<!--    filter: blur(10px)-->
<!--    backdrop-filter: blur(10px)-->

<!--  &__promo-inner-->
<!--    position: relative-->
<!--    z-index: 2-->
<!--    max-width: $device-tablet-portrait-->
<!--    margin: 0 auto-->

<!--  &__promo-head-->
<!--    text-align: center-->
<!--    font-weight: 700-->
<!--    text-transform: uppercase-->
<!--    font-size: 2rem-->
<!--    font-family: $font-family-heading-->

<!--  &__promo-desc-->
<!--    margin-top: $ra-gutter-small-->
<!--    text-align: center-->
<!--    font-size: 1.4rem-->

<!--  &__promo-button-wrapper-->
<!--    margin-top: $ra-gutter-->
<!--    text-align: center-->

<!--  &__promo-tabs-->
<!--    margin-top: $ra-gutter-xlarge-->
<!--    @media (max-width: $device-tablet-portrait)-->
<!--      margin-top: $ra-gutter-large-->
<!--    @media (max-width: $device-tablet-small)-->
<!--      margin-top: $ra-gutter-medium-->
<!--    @media (max-width: $device-phone)-->
<!--      margin-top: $ra-gutter-->

<!--  &__promo-tabs-nav-->
<!--    display: flex-->
<!--    align-items: flex-end-->
<!--    justify-content: space-between-->
<!--    min-height: 155px-->
<!--    @media (max-width: $device-tablet-small)-->
<!--      flex-direction: column-->
<!--      align-items: center-->
<!--      justify-content: center-->

<!--  &__promo-tabs-nav-link-wrapper-->
<!--    max-width: 40%-->
<!--    @media (max-width: $device-tablet-small)-->
<!--      max-width: 80%-->
<!--      margin: $ra-gutter-->

<!--  &__promo-tabs-nav-link-->
<!--    cursor: pointer-->
<!--    display: block-->
<!--    font-size: 1.2rem-->
<!--    text-transform: uppercase-->
<!--    text-align: center-->
<!--    font-weight: 700-->
<!--    font-family: $font-family-heading-->
<!--    border-bottom: 2px solid $ra-color-text-muted-->
<!--    transition: all .4s ease-in-out-->
<!--    @media (max-width: $device-tablet-small)-->
<!--      font-size: 1rem-->
<!--      line-height: 2-->

<!--    &&#45;&#45;active-->
<!--      font-weight: 300-->
<!--      line-height: 1-->
<!--      font-size: 4rem-->
<!--      border-bottom-color: transparent-->
<!--      @media (max-width: $device-tablet-landscape)-->
<!--        font-size: 3.2rem-->
<!--      @media (max-width: $device-tablet-portrait)-->
<!--        font-size: 2.8rem-->
<!--      @media (max-width: $device-tablet-small)-->
<!--        font-size: 2.2rem-->

<!--  &__promo-tabs-cont-->
<!--    margin-top: $ra-gutter-large-->
<!--    text-align: center-->

<!--  &__promo-tabs-tab-text-->
<!--    font-size: 1.4rem-->

<!--  &__promo-more-->
<!--    margin-top: $ra-gutter-large-->

<!--</style>-->
