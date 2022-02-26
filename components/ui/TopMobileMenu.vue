<template>
  <nav class="ra-menu-mobile">

    <ul class="ra-menu-mobile__items"
        v-if="topMenu">

      <li class="ra-menu-mobile__item"
          v-for="item in topMenu"
          :key="`root_${item.path}`">

        <span class="ra-menu-mobile__link ra-menu-mobile__link--child"
              v-if="hasChildren(item)"
              role="button"
              @click="toggle(item.path)">
          <span class="ra-menu-mobile__link--child-label"
                v-text="getTitle(item)"></span>
          <!--<IconArrowBottom class="ra-menu-mobile__link&#45;&#45;child-arrow"-->
          <!--                 :class="{'ra-menu-mobile__link-arrow&#45;&#45;active' : active = item.path}"-->
          <!--                 width="14"-->
          <!--                 height="14"/>-->
        </span>

        <a v-if="!hasChildren(item)"
           @click="go(item.path)"
           class="ra-menu-mobile__link link"
           v-text="getTitle(item)"></a>

        <ul class="ra-menu-mobile__drop"
            v-if="hasChildren(item)">

          <a class="ra-menu-mobile__drop-link"
             @click="go(item.path)"
             v-text="getTitle(item)"></a>

          <li class="ra-menu-mobile__drop-item"
              v-for="child in item.items"
              :key="child.path">

            <a class="ra-menu-mobile__drop-link"
               @click="go(child.path)"
               v-text="getTitle(child)"></a>

          </li>
        </ul>

      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'TopMobileMenu',

  components: {
    IconArrowBottom: () => import(/* webpackChunkName: "IconClose" */ '~/assets/svg/arrow-bottom.svg?inline')
  },

  data () {
    return {
      active: null
    }
  },

  props: {

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

    closeMenu () {this.$store.commit('modules/layout/SIDEBAR_TOGGLE', false)},

    hasChildren ( item ) {return !!( item.items && item.items.length )},

    go ( path ) {
      this.$router.push(this.localeLocation(path))
      this.closeMenu()
    },

    toggle ( path ) {this.active = ( this.active === path ) ? null : path}
  }
}
</script>

<style lang="sass">
@import "assets/sass/variables"
@import "assets/sass/mixins"

.ra-menu-mobile
  padding: $ra-gutter-medium 0

  a
    color: $ra-color-text-inverse
    text-decoration: none

  //&__items

  &__item
    position: relative
    margin-bottom: $ra-gutter

  &__link
    display: block
    white-space: nowrap
    cursor: pointer
    color: $ra-color-text-inverse
    text-decoration: none
    font-size: 1.6rem
    line-height: 1
    //padding: 8px 0
    @include transition-all(.4s)
    text-shadow: 0 1px 3px rgba($ra-color-base, .3)

    //&--child
    //  background-color: rgba($ra-color-base, .1)

    &--child-label
      display: inline-block
      margin-right: $ra-gutter

    &--child-arrow
      display: inline-block

    &:hover,
    &--hover
      text-decoration: none
      color: $ra-color-text-inverse
      background-color: rgba($ra-color-base, .5)
      backdrop-filter: blur(10px)

  .ra-menu-mobile &__drop
    background-color: rgba(0, 0, 0, .2)
    padding: $ra-gutter-small $ra-gutter
    border-radius: $ra-border-radius * 2
    margin-top: $ra-gutter-small
    margin-left: -$ra-gutter
    margin-right: -$ra-gutter

  &__drop-item
    padding: 5px 0

  &__drop-link
    font-size: 1.2rem
    line-height: 1
    color: rgba($ra-color-text-inverse, .7)
</style>
