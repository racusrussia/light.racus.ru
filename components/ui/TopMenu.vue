<template>
  <nav class="ra-menu-top"
       :class="{'ra-menu-top--padding-top': topMargin}">

    <ul class="ra-menu-top__items"
        v-if="topMenu">

      <li class="ra-menu-top__item"
          :class="{'ra-menu-top__item--small': small}"
          v-for="item in topMenu"
          :key="`root_${item.path}`">

        <!--<a class="ra-menu-top__link static"-->
        <!--   v-if="hasChildren(item)"-->
        <!--   @click.prevent="hoverDrop(item)"-->
        <!--   :class="{'ra-menu-top__link&#45;&#45;hover' : hover === item.path}"-->
        <!--   @mouseenter="hoverDrop(item)"-->
        <!--   v-text="item.title"/>-->

        <span class="ra-menu-top__link ra-menu-top__link--child"
              v-if="hasChildren(item)"
              :class="{
                 'ra-menu-top__link--small': small,
                 'ra-menu-top__link--hover' : hover === item.path
              }"
              @click="go(item.path)"
              @mouseenter="hoverDrop(item)"
              v-text="getTitle(item)"></span>

        <NuxtLink v-if="!hasChildren(item)"
                  :class="{
                    'ra-menu-top__link--small': small,
                    'ra-menu-top__link--hover' : hover === item.path}"
                  @mouseenter="hoverLink(item)"
                  @mouseleave="close"
                  class="ra-menu-top__link link"
                  :to="localePath(item.path)"
                  v-text="getTitle(item)"/>

        <transition name="slide-top"
                    appear
                    mode="in-out">
          <ul class="ra-drop ra-menu-top__drop"
              @mouseleave="close"
              v-if="active === item.path"
              v-click-outside="close">

            <NuxtLink class="ra-drop__link"
                      :to="localePath(item.path)"
                      v-text="getTitle(item)"/>

            <li class="ra-drop__item"
                v-for="child in item.items"
                :key="child.id">

              <NuxtLink class="ra-drop__link"
                        :to="localePath(child.path)"
                        v-text="getTitle(child)"/>

            </li>
          </ul>
        </transition>

      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'TopMenu',

  data () {
    return {
      active: null,
      hover:  null
    }
  },

  props: {

    small: {
      type:    Boolean,
      default: false
    },

    topMargin: {
      type:    Boolean,
      default: true
    },

    data: {
      type: Array,
      default () {}
    }

  },

  computed: {
    code () {return this.$i18n.localeProperties.code},
    topMenu () {return ( this.data ) ? this.data : this.$store.state.topMenuAttached}
  },

  methods: {

    getTitle ( item ) {
      if (this.code === 'en') return item.title
      if (item.localizations && item.localizations.length) {
        const localTitle = item.localizations.find(i => i.locale === this.code)
        return ( localTitle ) ? localTitle.title : item.title
      }
      else {
        return item.title
      }
    },

    go ( path ) {
      this.$router.push(this.localePath({ path: path }))
    },

    hasChildren ( item ) {
      return !!( item.items && item.items.length )
    },

    hoverDrop ( item ) {
      if (this.hasChildren(item)) {
        this.active = item.path
        this.hover  = item.path
      }
    },

    hoverLink ( item ) {
      if (this.hasChildren(item)) {
        this.active = null
        this.hover  = item.path
      }
    },

    close () {
      this.active = null
      this.hover  = null
    }
  }
}
</script>

<style lang="sass">
@import "assets/sass/variables"
@import "assets/sass/mixins"

.ra-menu-top
  &--padding-top
    padding-top: $ra-gutter-medium

  a
    color: $ra-color-text-inverse
    text-decoration: none

  &__items
    display: flex
    align-items: center
    justify-content: center
    flex-wrap: wrap

  &__item
    margin-right: $ra-gutter-small
    position: relative

    &--small
      margin-right: 0

    &:last-child
      margin-right: 0

  &__link
    white-space: nowrap
    cursor: pointer
    color: $ra-color-text-inverse
    text-decoration: none
    padding: $ra-gutter * .8 $ra-gutter
    border-radius: 500px
    display: block
    font-size: 1.15rem
    @include transition-all(.4s)
    text-shadow: 0 1px 3px rgba($ra-color-base, .3)
    @media (max-width: $device-desktop-large)
      font-size: 1rem
      padding: $ra-gutter * .8 $ra-gutter * .5

    &--child
      background-color: rgba($ra-color-base, .1)
    &:hover,
    &--hover
      text-decoration: none
      color: $ra-color-text-inverse
      background-color: rgba($ra-color-base, .5)
      backdrop-filter: blur(10px)


  &__link
    &--small
      &:hover
        background-color: $ra-color-danger

  ul.ra-drop, .ra-drop
    margin-top: $ra-gutter-medium
    background-color: $ra-color-base
</style>
