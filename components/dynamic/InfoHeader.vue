<template>
  <header class="ra-header-info"
          :style="{backgroundImage: `url(${bgr})`}">

    <div class="ra-header-info__body">

      <h1 class="ra-header-info__title">
        <span class="ra-h ra-h--2"
              v-if="title"
              v-text="title"></span>
        <span class="ra-h ra-h--2 ra-h--light"
              v-if="subTitle"
              v-text="subTitle"></span>
      </h1>

    </div>
  </header>
</template>

<script>

import BreadCrumbInfo from '~/components/ui/BreadCrumbInfo'
import ChooseProgram  from '~/components/ui/ChooseProgram'

export default {
  name: 'InfoHeader',

  components: {
    BreadCrumbInfo,
    ChooseProgram
  },

  props: {

    header:   {
      type:    Object,
      default: ''
    },

    title:    {
      type:    String,
      default: ''
    },

    subTitle: {
      type: String,
      default () {}
    }
  },

  data () {
    return {
      chooseProgram: false
    }
  },

  computed: {

    device () {return this.$store.getters[ 'modules/layout/device' ]},

    bgr () {
      if ( !this.header ) return
      if ( !this.header.image ) return
      if ( !this.header.image.formats ) return
      return ( this.device )
        ? this.header.image.formats[ `${ this.device }_wp` ].url
        : this.header.image.formats.desktop.url
    }
  }
}
</script>

<style lang="sass">
@import "assets/sass/variables"

.ra-header-info
  min-height: 600px
  background: $ra-color-base no-repeat center center
  background-size: cover
  display: flex
  align-items: center
  justify-content: center

  &__body
    max-width: $device-tablet-landscape
    text-align: center

  &__title
    color: $ra-color-text-inverse
    margin-bottom: $ra-gutter-medium
    text-shadow: 0 2px 3px rgba(0, 0, 0, .2)
    display: flex
    flex-direction: column

    & > *
      color: $ra-color-text-inverse

  &__action
    display: inline-block
    position: relative
</style>
