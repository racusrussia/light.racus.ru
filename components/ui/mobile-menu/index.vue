<template>
  <div class="ra-mobile-menu">

    <button @click.prevent="close"
            class="ra-mobile-menu__close ra-button ra-button--border ra-button--pill ra-button__icon--small ra-button__icon">
      <IconClose width="14"
                 height="14"/>
    </button>

    <div class="ra-mobile-menu__header">
      <SwitchLang/>
    </div>
    <div class="ra-mobile-menu__body">

      <TopMobileMenu :data="topNav"/>
    </div>
    <div class="ra-mobile-menu__footer">
      <HeaderSocial/>
    </div>
  </div>
</template>

<script>
import SwitchLang    from '~/components/items/SwitchLang'
import HeaderSocial  from '~/components/layouts/HeaderSocial'
import TopMobileMenu from '~/components/ui/TopMobileMenu'

export default {
  name:       'MobileMenu',
  components: {
    TopMobileMenu,
    HeaderSocial,
    SwitchLang,
    IconClose: () => import(/* webpackChunkName: "IconClose" */ '~/assets/svg/close.svg?inline')
  },

  computed: {
    topNav () {return this.$store.state.topMenuAttached}
  },

  methods: {
    close () {
      this.$store.commit('modules/layout/SIDEBAR_TOGGLE', false)
    }
  }
}
</script>

<style lang="sass">
@import "assets/sass/variables"
@import "assets/sass/mixins"

.ra-mobile-menu
  @include cover
  position: fixed
  background-color: $ra-color-base
  z-index: $ra-z-index + 100
  display: flex
  flex-direction: column
  align-content: space-between
  overflow: hidden

  &__close
    position: absolute
    top: $ra-gutter
    right: $ra-gutter

  &__header,
  &__body,
  &__footer
    max-width: $device-tablet-small
    margin: 0 auto

  &__header
    padding: $ra-gutter
    flex: none

  &__body
    flex: 1
    padding: $ra-gutter-medium
    min-height: 100px
    overflow: auto

  &__footer
    padding: $ra-gutter
    flex: none
</style>
