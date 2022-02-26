<template>

  <header class="ra-header-top"
          ref="header"
          :class="{
            'ra-header-top--sticky': sticky,
            'ra-header-top--small': !showDesktop
          }">

    <!--Desktop-->
    <div class="ra-header-top__wrapper"
         v-if="showDesktop && !sticky">

      <!--LEFT-->
      <div class="ra-header-top__left">

        <div class="ra-flex-none">

          <!--social-->
          <HeaderSocial/>
        </div>

        <div class="ra-flex-1 ra-flex center">
          <SearchInput @search="showSearch($event)"
                       @send="setSearch($event)"/>
        </div>

      </div>

      <!--RIGHT-->
      <div class="ra-header-top__right">

        <div class="ra-flex-1 ra-flex center">
          <SwitchLang/>
        </div>

        <div class="ra-flex-none">
          <button class="ra-button ra-button--danger ra-button--pill ra-button__arrow ra-button__arrow--right"
                  @click.prevent="showModalForm"
                  v-text="$t('submit_application')"></button>
        </div>

      </div>

      <!--LOGO-->
      <nuxt-link :to="localeLocation('/')"
                 class="ra-header-top__logo">

        <img :src="logo.url"
             v-if="logo"
             :alt="siteName"
             :height="logo.height"
             :width="logo.width">
      </nuxt-link>

    </div>

    <!--Small-->
    <div class="ra-header-top__wrapper--small"
         v-else>

      <!--LOGO-->
      <nuxt-link :to="localeLocation('/')"
                 class="ra-header-top__logo--small">

        <img :src="logo.url"
             v-if="logo"
             :alt="siteName"
             :height="logo.height"
             :width="logo.width">
      </nuxt-link>

      <div class="ra-flex-1"></div>

      <!--social-->
      <HeaderSocial v-if="showSocial"/>

      <div class="ra-flex-1"></div>

      <SwitchLang v-if="showSwitchLang"/>

      <div class="ra-flex-1"></div>

      <button type="button"
              @click="showSearch('')"
              class="ra-button ra-header-top__item ra-button--border ra-button--pill ra-button__icon--small ra-button__icon">
        <IconSearch width="14"/>
      </button>

      <button class="ra-button ra-header-top__item ra-button--danger ra-button--pill ra-button--small ra-button__arrow ra-button__arrow--right"
              @click.prevent="showModalForm"
              v-text="$t('submit_application')"></button>

      <button type="button"
              @click.prevent="showSideBar"
              class="ra-button ra-button--border ra-button--pill ra-button__icon--small ra-button__icon">
        <IconNav width="14"/>
      </button>
    </div>

  </header>

</template>

<script>
import SwitchLang       from '~/components/items/SwitchLang'
import HeaderSocial     from '~/components/layouts/HeaderSocial'
import SearchInput      from '~/components/search/SearchInput'
import { showOnDevice } from '~/utils/helpers'
import IconSearch       from '~/assets/svg/search.svg?inline'
import IconNav          from '~/assets/svg/nav.svg?inline'

export default {
  name: 'HeaderHomeTop',

  components: {
    HeaderSocial,
    SearchInput,
    SwitchLang,
    IconSearch,
    IconNav
  },

  props: {

    showTopNav: {
      type:    Boolean,
      default: false
    }

  },

  mounted () {
    this.scrollNav()
  },

  data () {
    return {
      desktopVisibleOn:    [ 'desktop', 'desktop-large' ],
      socialVisibleOn:     [ 'tablet-portrait', 'tablet-landscape', 'desktop', 'desktop-large' ],
      switchLangVisibleOn: [ 'desktop', 'desktop-large' ],
      startBarPos:         500,
      sticky:              false
    }
  },

  computed: {
    showSocial () {return ( this.device ) ? showOnDevice(this.socialVisibleOn, this.device) : false},
    showSwitchLang () {return ( this.device ) ? showOnDevice(this.switchLangVisibleOn, this.device) : false},
    showDesktop () {return ( this.device ) ? showOnDevice(this.desktopVisibleOn, this.device) : false},
    social () {return this.$store.getters.social},
    device () {return this.$store.getters[ 'modules/layout/device' ]},
    logo () {return this.$store.getters[ 'logoContrast' ]},
    siteName () {return this.$store.getters[ 'siteName' ]}
  },

  methods: {

    scrollNav () {
      if (process.browser) {
        window.onscroll = () => {
          const header = this.$refs.header
          if (this.startBarPos < 0) this.startBarPos = this.findPosY(header)
          this.sticky = window.scrollY > this.startBarPos
        }
      }
    },

    findPosY ( obj ) {
      let curTop = 0
      if (typeof ( obj.offsetParent ) != 'undefined' && obj.offsetParent) {
        while (obj.offsetParent) {
          curTop += obj.offsetTop
          obj = obj.offsetParent
        }
        curTop += obj.offsetTop
      }
      else if (obj.y)
        curTop += obj.y
      return curTop
    },

    showSideBar () {
      this.$store.commit('modules/layout/SIDEBAR_TOGGLE')
    },

    showModalForm () {
      this.$store.commit('modules/layout/MODAL_FORM', {
        title:  this.$t('submit_application'),
        action: this.$t('start_the_application')
      })
    },

    setSearch ( payload ) {
      this.$store.commit('modules/layout/SEARCH_REQUEST', payload)
    },

    showSearch ( payload ) {
      this.$store.commit('modules/layout/SEARCH_REQUEST', payload)
      this.$store.commit('modules/layout/TOGGLE_SEARCH_RESULT')
    }

  }
}
</script>
