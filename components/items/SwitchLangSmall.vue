<template>
  <div class="ra-switch-small-lang">

    <button class="ra-switch-small-lang__item--active"
            @click="active =! active">
      <img class="ra-switch-lang__flag"
           :src="`/lang/${activeLocale.code}.svg`"
           alt="locale.name"/>

      <IconArrowTop v-if="active"
                    width="12"/>
      <IconArrowBottom v-else
                       width="12"/>
    </button>

    <transition name="slide-top"
                appear
                mode="in-out">
      <ul class="ra-drop ra-drop--base ra-menu-top__drop"
          @mouseleave="close"
          v-if="active"
          v-click-outside="close">

        <li class="ra-drop__item"
            v-for="locale in availableLocales"
            @click="close"
            :key="locale.code">

          <nuxt-link
            class="ra-switch-small-lang__item ra-drop__link"
            :to="switchLocalePath(locale.code)">
            <img class="ra-switch-small-lang__flag"
                 :src="`/lang/${locale.code}.svg`"
                 alt="locale.name"/>
            <span class="ra-switch-small-lang__name">{{ locale.name }}</span>
          </nuxt-link>

        </li>
      </ul>
    </transition>

  </div>
</template>

<script>
export default {
  name: 'SwitchLangSmall',

  components: {
    IconArrowTop:    () => import(/* webpackChunkName: "IconClose" */ '~/assets/svg/arrow-top.svg?inline'),
    IconArrowBottom: () => import(/* webpackChunkName: "IconClose" */ '~/assets/svg/arrow-bottom.svg?inline')
  },

  props: {
    hideActive: {
      type:    Boolean,
      default: true
    }
  },

  data () {
    return {
      active: false
    }
  },

  computed: {

    code () {return this.$i18n.locale},
    locales () {return this.$i18n.locales},
    availableLocales () {
      return ( this.hideActive )
        ? this.$i18n.locales.filter(i => i.code !== this.$i18n.locale)
        : this.$i18n.locales
    },
    activeLocale () {
      return this.$i18n.locales.find(i => i.code === this.$i18n.locale)
    }
  },

  methods: {

    close () {
      this.active = false
    }
  }
}
</script>

<style lang="sass">
@import "assets/sass/variables"

.ra-switch-small-lang
  //display: inline-block
  position: relative

  &__item
    display: flex
    text-align: center
    text-decoration: none
    //padding: 0 $ra-gutter
    &--active
      position: relative
      padding: 0
      color: $ra-color-text-inverse
      display: flex
      align-items: center

      svg
        margin: 0 $ra-gutter-small

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

    &:hover
      text-decoration: none

  //[dir=rtl] &:first-child
  //  margin-right: 0
  //
  //[dir=ltr] &:last-child
  //  margin-right: 0

  &__flag
    display: block
    width: 1.6rem
    height: 1.6rem  * .75

  &__name
    margin-left: $ra-gutter

  [dir=rtl] &__name
    margin-right: $ra-gutter
//position: absolute
//visibility: hidden
//opacity: 0
//left: 50%
//top: 100%
//transform: translateX(-50%)
//border-radius: .3rem
//border: 1px solid #dedede
//white-space: nowrap
//line-height: 1.6rem
//padding: 0 .5rem
//background-color: #ffffff
//color: #444444
//margin-top: .3rem
//display: block



</style>
