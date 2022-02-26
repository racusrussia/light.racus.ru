<template>
  <div class="cx-modal"
       aria-modal="true"
       role="dialog">

    <div class="cx-modal__header">

      <!--<a @click.prevent="prev"-->
      <!--   v-if="listLength> 1">-->
      <!--  <IconPrev width="24"-->
      <!--            height="24"/>-->
      <!--</a>-->

      <!--<a @click.prevent="next"-->
      <!--   v-if="listLength> 1">-->
      <!--  <IconNext width="24"-->
      <!--            height="24"/>-->
      <!--</a>-->

      <div class="cx-modal__nav">
        <div class="cx-modal__nav-item"
             role="link"
             v-for="(item, index) in listImages"
             @click="selIndex = index"
             :class="{active: index === selIndex}"></div>
      </div>

      <a @click.prevent="close">
        <IconClose width="18"
                   height="18"/>
      </a>
    </div>

    <div class="cx-modal__body"
         v-touch:swipe="swipe">

      <!--Youtube-->
      <div class="cx-modal__iframe-wrapper"
           v-if="youtubeSrc">

        <iframe class="cx-modal__iframe"
                width="1920"
                height="1080"
                :src="youtubeSrc"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen></iframe>
      </div>

      <!--Gallery-->
      <div class="cx-modal__gallery"
           v-if="listLength"
           :style="{backgroundImage: `url(${indexImage})`}"></div>

      <div class="cx-modal__nav-bottom"
           v-if="listLength> 1">
        <a @click.prevent="prev">
          <IconPrev width="20"
                    height="20"/>
        </a>

        <a @click.prevent="next">
          <IconNext width="20"
                    height="20"/>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { getParams, imageUrl } from '~/utils/helpers'

export default {
  name: 'ModalMedia',

  components: {
    IconPrev:  () => import(/* webpackChunkName: "IconPrev" */ '~/assets/svg/arrow-left.svg?inline'),
    IconNext:  () => import(/* webpackChunkName: "IconNext" */ '~/assets/svg/arrow-right.svg?inline'),
    IconClose: () => import(/* webpackChunkName: "IconClose" */ '~/assets/svg/close.svg?inline')
  },

  data () {
    return {
      selIndex: 0,

      youtubeParams: {
        controls:       0,
        autoplay:       1,
        enablejsapi:    0,
        hl:             'en',
        iv_load_policy: 3,
        modestbranding: 1,
        rel:            0,
        showinfo:       0
      }
    }
  },

  mounted () {
    this.selIndex = 0

    if (process.browser) {
      document.onkeydown = evt => {
        evt = evt || window.event
        evt.preventDefault()
        if (evt.key === 'Escape') {
          this.close()
        }
        if (evt.key === 'ArrowLeft' || evt.key === 'ArrowUp') {
          this.prev()
        }
        if (evt.key === 'ArrowRight' || evt.key === 'ArrowDown') {
          this.next()
        }
      }
    }

    const { code }        = this.$i18n.localeProperties
    this.youtubeParams.hl = ( code ) ? code : 'en'

  },

  computed: {

    type () {return this.$store.state.modules.layout.modal.type},

    youtubeSrc () {
      if (this.type !== 'youtube') return null
      const url = this.src.src
      if (url && typeof url === 'string') {
        const id = url.replace('https://youtu.be/', '')
        return `https://www.youtube.com/embed/${ id }${ getParams(this.youtubeParams) }`
      }
    },

    src () {return this.$store.state.modules.layout.modal},

    listLength () {return this.listImages?.length},
    indexImage () {return this.listImages[ this.selIndex ]},

    listImages () {
      if (this.type !== 'gallery') return null
      const images = this.src.src
      if (!images || !images.length) return
      return images.map(i => imageUrl(i, 'large'))
    }

  },

  methods: {

    swipe ( dir ) {
      console.log(dir)
      if (this.type !== 'gallery') return
      if (dir === 'left') this.prev()
      if (dir === 'right') this.next()
      if (dir === 'bottom') this.close()
    },

    prev () {
      if (!this.listLength) return
      if (!this.selIndex || this.selIndex === 0) return
      this.selIndex = this.selIndex - 1
    },

    next () {
      if (!this.listLength) return
      if (this.listLength - 1 === this.selIndex) return
      this.selIndex = this.selIndex + 1
    },

    close () {
      this.$store.commit('modules/layout/MODAL_CLOSE')
    }
  }
}
</script>

<style lang="sass">
@import "assets/sass/variables"
@import "assets/sass/mixins"

$modal-header-size: 50px
.cx-modal
  z-index: $ra-z-index + 1000
  @include cover
  position: fixed
  background: rgba(0, 0, 0, .4)
  backdrop-filter: blur(4px)
  display: grid
  grid-template-rows: auto 1fr

  &__header
    height: $modal-header-size
    padding: 0 $ra-gutter
    display: flex
    align-items: center
    //box-shadow: $shadow
    background: rgba(0, 0, 0, .3)
    backdrop-filter: blur(3px)

    a
      color: rgba(255, 255, 255, .6)

      &:hover
        color: $ra-color-warning

  &__body
    overflow: hidden

  &__nav
    flex: 1
    margin: 0 $ra-gutter
    gap: $ra-gutter-small
    display: flex
    justify-content: center

  &__nav-item
    width: 10px
    height: 10px
    border-radius: 500px
    background-color: rgba(255, 255, 255, .3)
    cursor: pointer

    &.active
      background-color: $ra-color-warning

  &__nav-bottom
    position: absolute
    bottom: 0
    left: 50%
    padding: $ra-gutter-medium
    transform: translateX(-50%)
    display: flex
    align-items: center
    justify-content: center
    gap: $ra-gutter-medium

    & > a
      display: flex
      opacity: .8
      align-items: center
      justify-content: center
      width: 50px
      flex: none
      height: 50px
      border-radius: 500px
      background-color: #ffffff
      color: $ra-color-info

      &:hover
        opacity: 1

  &__iframe-wrapper
    position: relative
    overflow: hidden
    width: 100%
    padding-top: 56.25%
    height: 100%

  &__iframe
    @include cover
    width: 100%
    height: 100%

  &__gallery
    width: 100%
    height: 100%
    background-position: center
    background-repeat: no-repeat
    background-size: contain

</style>
