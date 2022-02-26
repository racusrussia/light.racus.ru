<template>
  <div class="ra-breadcrumbs">
    <ol itemscope
        class="ra-breadcrumb"
        itemtype="https://schema.org/BreadcrumbList">

      <li itemprop="itemListElement"
          class="ra-breadcrumb__item"
          itemscope
          itemtype="https://schema.org/ListItem"
          v-for="(item, index) in crumbs">

        <nuxt-link v-if="item.isLink"
                   itemprop="item"
                   :title="item.title"
                   :class="{'ra-breadcrumb__link--contrast': contrast}"
                   class="ra-breadcrumb__link"
                   :to="localePath(item.link)">
          <span itemprop="name"
                v-text="item.title"></span>
        </nuxt-link>
        <span v-else
              itemprop="item"
              :title="item.title"
              class="ra-breadcrumb__link ra-breadcrumb__link--not">
          <span itemprop="name"
                v-text="item.title"></span>
        </span>
        <meta itemprop="position"
              :content="index + 1"/>
      </li>

    </ol>
  </div>
</template>

<script>
export default {
  name: 'BreadCrumbInfo',

  data () {
    return {
      locales: [ 'ar', 'ru', 'es', 'pt', 'fr' ]
    }
  },

  props: {
    contrast: {
      type:    Boolean,
      default: false
    },

    url: {
      type:    String,
      default: null
    },

    title: {
      type:    String,
      default: null
    }
  },

  computed: {

    code () {return this.$i18n.localeProperties.code},
    topMenuFlat () {return this.$store.state.topMenuFlat},
    topMenuNames () {return this.$store.state.topMenuNames},

    crumbs () {

      const path  = ( this.url ) ? this.url : this.$route.path
      const route = path.split('/')
      if (!route && !route.length) return
      let links  = ( this.code !== 'en' ) ? route.splice(2) : route.splice(1)
      let crumbs = [ { link: '/', title: this.$t('main_page'), isLink: true } ]
      let url    = [ '' ]
      let count  = 0
      for (let link of links) {
        url = [ ...url, link ]
        count++
        const isLink = count !== links.length
        const item   = {
          link:   url.join('/'),
          title:  ( isLink )
                    ? this.getTitle(link)
                    : ( this.title ) ? this.title : this.getTitle(link),
          isLink: isLink
        }
        crumbs       = [ ...crumbs, item ]
      }

      return crumbs
    }
  },

  methods: {

    getTitle ( link ) {
      if (!this.topMenuFlat || !this.topMenuNames) return
      const item = this.topMenuFlat.find(i => i.path === link)
      if (!item) return
      const related = item.related
      if (this.code === 'en') return related.title
      const name = this.topMenuNames.find(i => +i.id === +related.id)
      let localTitle
      if (name.localizations && name.localizations.length) {
        const locale = name.localizations.find(i => i.locale === this.code)
        localTitle   = ( locale ) ? locale.title : name.title
      }
      return localTitle
    }

    //getTitle ( item ) {
    //  if (this.code === 'en') return item.title
    //  if (item.localizations && item.localizations.length) {
    //    const localTitle = item.localizations.find(i => i.locale === this.code)
    //    return ( localTitle ) ? localTitle.title : item.title
    //  }
    //  else {
    //    return item.title
    //  }
    //},
  }
}
</script>

<style lang="sass">
@import "assets/sass/variables"
@import "assets/sass/mixins"

.ra-breadcrumbs
  margin: $ra-gutter-medium

  .ra-breadcrumb
    list-style: none
    text-align: center
    display: block

    &__item
      line-height: 1.2
      display: inline-block
      margin-right: $ra-gutter-small
      position: relative

      &:after
        display: inline-block
        margin-left: $ra-gutter-small
        content: '›'
        font-size: 1.2rem
        color: $ra-color-text-muted

      &:last-child
        margin-right: 0

        &:after
          display: none

    &__link
      max-width: 300px
      @include text-overflow
      text-decoration: none
      color: $ra-color-text-muted

      &--contrast
        color: $ra-color-text-inverse

      &:hover
        color: $ra-color-danger

      &--not
        &:hover
          color: $ra-color-text-muted

</style>
