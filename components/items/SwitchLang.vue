<template>
  <div class="ra-switch-lang">
    <nuxt-link
      class="ra-switch-lang__item"
      :class="{'ra-switch-lang__item--active': code === locale.code}"
      v-for="locale in availableLocales"
      :key="locale.code"
      :to="switchLocalePath(locale.code)">
      <img class="ra-switch-lang__flag"
           :src="`/lang/${locale.code}.svg`"
           alt="locale.name"/>
      <span class="ra-switch-lang__name">{{ locale.name }}</span>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  name: 'SwitchLang',

  props: {
    hideActive: {
      type:    Boolean,
      default: false
    }
  },

  computed: {

    code () {return this.$i18n.localeProperties.code},
    availableLocales () {
      return ( this.hideActive )
        ? this.$i18n.locales.filter(i => i.code !== this.$i18n.locale)
        : this.$i18n.locales
    }
  },

  methods: {
    closeMenu () {this.$store.commit('modules/layout/SIDEBAR_TOGGLE', false)},
  }
}
</script>

<style lang="sass">
@import "assets/sass/variables"

.ra-switch-lang
  padding: $ra-gutter
  display: inline-block

  &__item
    display: inline-block
    margin-right: .6rem
    text-align: center
    text-decoration: none
    position: relative
    z-index: 100

    &:hover
      text-decoration: none

    [dir=rtl] &:first-child
      margin-right: 0

    [dir=ltr] &:last-child
      margin-right: 0

    &--active
      cursor: default
      position: relative

      &:before
        display: block
        content: ""
        background-color: rgba($ra-color-base, .2)
        position: absolute
        border-radius: .3rem
        border: 2px solid $ra-color-text-inverse
        width: calc(100% + .6rem)
        height: calc(100% + .6rem)
        top: -.3rem
        right: -.3rem

  &__flag
    display: block
    width: 1.6rem
    height: 1.6rem  * .75
    margin: 0 auto

  &__name
    position: absolute
    visibility: hidden
    opacity: 0
    left: 50%
    top: 100%
    transform: translateX(-50%)
    border-radius: .3rem
    border: 1px solid #dedede
    white-space: nowrap
    line-height: 1.6rem
    padding: 0 .5rem
    background-color: #ffffff
    color: #444444
    margin-top: .3rem
    display: block

  &__item:hover &__name
    visibility: visible
    opacity: 1

</style>
