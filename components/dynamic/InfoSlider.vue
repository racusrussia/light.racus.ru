<template>
  <div class="ra-slider">

    <div ref="slider"></div>

    <div class="ra-slider__nav">
      <button @click="prev"
              class="ra-button ra-button--danger ra-button__icon ra-button--pill">
        <IconPrev width="20"/>
      </button>

      <span class="ra-slider__nav-count"
            v-text="currentPage"></span>
      <span>...</span>

      <span class="ra-slider__nav-count"
            v-text="pageCount"></span>
      <button @click="next"
              class="ra-button ra-button--danger ra-button__icon ra-button--pill">
        <IconNext width="20"/>
      </button>

    </div>
  </div>
</template>

<script>
import { PageFlip }    from 'page-flip'
import { sortByField } from '~/utils/helpers'

export default {
  name: 'InfoSlider',

  components: {
    IconPrev: () => import(/* webpackChunkName: "IconPrev" */ '~/assets/svg/arrow-left-line.svg?inline'),
    IconNext: () => import(/* webpackChunkName: "IconPrev" */ '~/assets/svg/arrow-right-line.svg?inline')
  },

  data () {
    return {
      slides:      null,
      currentPage: 1,
      slidesUrl:   null,
      parent:      null,
      pageFlip:    null,
      size:        'large',
      settings:    {
        width:               1200,
        height:              853,
        showCover:           true,
        size:                'stretch', // ("fixed", "stretch")
        minWidth:            320,
        maxWidth:            1440,
        minHeight:           228,
        maxHeight:           1023,
        drawShadow:          true,
        flippingTime:        800,
        usePortrait:         true,
        autoSize:            true,
        maxShadowOpacity:    .7,
        mobileScrollSupport: true,
        disableFlipByClick:  false
      }
    }
  },

  props: {
    images: {
      type: Array,
      default () {}
    }
  },

  computed: {
    orientation () {return ( this.pageFlip ) ? this.pageFlip.getOrientation() : null},
    pageCount () {return ( this.pageFlip ) ? this.pageFlip.getPageCount() : null}

  },

  mounted () {
    if (process.browser) {
      if (!this.images) return
      this.slides = []
      this.images.forEach(i => {
        const order = i.name.split('.')
        const slide = { ...i, order: ( order ) ? Number(order[ 0 ]) : 0 }
        this.slides = [ ...this.slides, slide ]
      })
      this.slides    = sortByField(this.slides, 'order', true)
      this.slidesUrl = this.slides.map(i => i.formats[ this.size ]?.url)
      this.pageFlip  = new PageFlip(this.$refs.slider, this.settings)
      this.pageFlip.loadFromImages(this.slidesUrl)
      this.pageFlip.on('flip', e => this.currentPage = e.data + 1)
    }
  },

  methods: {
    prev () {this.pageFlip.flipPrev()},
    next () {this.pageFlip.flipNext()}
  }
}
</script>

<style lang="sass">
@import "assets/sass/variables"
.ra-slider
  padding: $ra-gutter-medium 0
  margin: 0 auto

  &__nav
    padding: $ra-gutter $ra-gutter-medium 0 $ra-gutter-medium
    display: flex
    gap: $ra-gutter-small
    align-items: center
    justify-content: center

  &__nav-count
    font-weight: 700
    color: $ra-color-danger
</style>
