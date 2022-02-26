<template>
  <div class="ra-section ra-section--medium">
    <nav class="ra-sitemap">

      <ul class="ra-sitemap__items"
          v-if="nav">

        <li class="ra-sitemap__item"
            v-for="item in nav"
            :key="`root_${item.path}`">

        <span class="ra-sitemap__link ra-sitemap__link--child"
              v-if="hasChildren(item)"
              role="button">

          <span class="ra-sitemap__link--child-label"
                v-text="getTitle(item)"></span>
          <!--<IconArrowBottom class="ra-menu-mobile__link&#45;&#45;child-arrow"-->
          <!--                 :class="{'ra-menu-mobile__link-arrow&#45;&#45;active' : active = item.path}"-->
          <!--                 width="14"-->
          <!--                 height="14"/>-->
        </span>

          <a v-if="!hasChildren(item)"
             @click="go(item.path)"
             class="ra-sitemap__link link"
             v-text="getTitle(item)"></a>

          <ul class="ra-sitemap__child"
              v-if="hasChildren(item)">

            <li class="ra-sitemap__child-item">
              <a class="ra-sitemap__child-link"
                 @click="go(item.path)"
                 v-text="getTitle(item)"></a>
            </li>
            <li class="ra-sitemap__child-item"
                v-for="child in item.items"
                :key="child.path">

              <a class="ra-sitemap__child-link"
                 @click="go(child.path)"
                 v-text="getTitle(child)"></a>

            </li>
          </ul>

        </li>
      </ul>
    </nav>
  </div>
</template>

<script>

export default {
  name: 'InfoSitemap',

  computed: {
    code () {return this.$i18n.localeProperties.code},
    nav () {return this.$store.state.topMenu}
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

    hasChildren ( item ) {return !!( item.items && item.items.length )},

    go ( path ) {
      this.$router.push(this.localeLocation(path))
    }
  }

}
</script>

<style lang="sass">
@import "assets/sass/mixins"
@import "assets/sass/variables"
.ra-sitemap
  max-width: 400px
  margin: 0 auto

  &__items
    position: relative

    &:before
      content: ""
      position: absolute
      width: 2px
      display: block
      background-color: $ra-color-info
      left: 0
      top: calc(1.1rem + $ra-gutter-small - ($ra-border-width * 4))
      bottom: calc(1.1rem + $ra-gutter-small - ($ra-border-width * 3))

  &__item
    margin-left: $ra-gutter-medium

    & + .ra-sitemap__item
      margin-top: $ra-gutter

  &__link
    position: relative
    display: block
    color: $ra-color-info
    font-size: 1.1rem
    font-weight: bold
    border: 2px solid $ra-color-info
    padding: $ra-gutter-small $ra-gutter
    border-radius: $ra-border-radius

    &:hover
      background-color: $ra-color-info
      color: $ra-color-text-inverse

    &--child
      &:hover
        background-color: transparent
        color: $ra-color-info

    &:before
      content: ""
      position: absolute
      height: 2px
      width: $ra-gutter-medium
      display: block
      background-color: $ra-color-info
      left: -$ra-gutter-medium
      transform: translateY(-50%)
      top: 50%

  &__child
    margin: $ra-gutter 0 $ra-gutter $ra-gutter-medium !important
    display: flex
    flex-direction: column
    align-items: flex-start
    justify-content: flex-start
    font-size: 1.1rem
    position: relative

    &:before
      content: ""
      position: absolute
      width: 2px
      display: block
      background-color: $ra-border
      left: -$ra-gutter
      top: -$ra-gutter
      bottom: calc($ra-gutter-small + ($ra-border-width * 4))

  &__child-item
    position: relative
    margin-bottom: $ra-gutter-small

    &:before
      content: ""
      position: absolute
      height: 2px
      width: $ra-gutter
      display: block
      background-color: $ra-border
      left: -$ra-gutter
      transform: translateY(-50%)
      top: 50%

    &:last-child
      margin-bottom: 0

  &__child-link
    text-transform: uppercase
    padding: $ra-gutter-small * 0.5 $ra-gutter-small
    font-size: .9rem
    font-weight: bold
    line-height: 1
    border: 1px solid $ra-border
    border-radius: 500px
    color: $ra-color-text

    &:hover
      background-color: $ra-color-info
      color: $ra-color-text-inverse

</style>
