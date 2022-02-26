<template>

  <header class="ra-header-top-info"
          ref="header"
          :class="{'ra-header-top-info--sticky': sticky }">

    <!--Small-->
    <div class="ra-header-top__wrapper--small">

      <!--LOGO-->
      <nuxt-link :to="localeLocation('/')"
                 class="ra-header-top-info__logo">

        <img :src="logo.url"
             v-if="logo"
             :alt="siteName"
             :height="logo.height"
             :width="logo.width">
      </nuxt-link>

      <!--social-->
      <HeaderSocial class="ra-header-top-info__item"
                    v-if="showSocial"/>

      <SwitchLangSmall class="ra-header-top-info__item"
                       v-if="showSwitchLang"/>

      <div class="ra-flex-1 ra-header-top-info__item">

      </div>

      <button class="ra-button ra-header-top-info__item ra-button--danger ra-button--pill ra-button--small ra-button__arrow ra-button__arrow--right"
              @click.prevent="showModalForm"
              v-text="$t('submit_application')"></button>

    </div>

  </header>

</template>

<script>
import SwitchLangSmall  from '~/components/items/SwitchLangSmall'
import HeaderSocial     from '~/components/layouts/HeaderSocial'
import SearchInput      from '~/components/search/SearchInput'
import TopMenu          from '~/components/ui/TopMenu'
import { showOnDevice } from '~/utils/helpers'
import IconSearch       from '~/assets/svg/search.svg?inline'
import IconNav          from '~/assets/svg/nav.svg?inline'

export default {
  name: 'HeaderInfoTop',

  components: {
    TopMenu,
    HeaderSocial,
    SearchInput,
    SwitchLangSmall,
    IconSearch,
    IconNav
  },

  props: {},

  mounted () {
    this.scrollNav()
  },

  data () {
    return {
      size:                0,
      desktopVisibleOn:    [ 'desktop', 'desktop-large' ],
      socialVisibleOn:     [ 'tablet-portrait', 'tablet-landscape', 'desktop', 'desktop-large' ],
      switchLangVisibleOn: [ 'tablet-portrait', 'tablet-landscape', 'desktop', 'desktop-large' ],
      startBarPos:         500,
      sticky:              false,
      topNavVisibleOn:     [ 'desktop-large' ]
    }
  },

  computed: {
    showSocial () {return ( this.device ) ? showOnDevice( this.socialVisibleOn, this.device ) : false},
    showSwitchLang () {return ( this.device ) ? showOnDevice( this.switchLangVisibleOn, this.device ) : false},
    showDesktop () {return ( this.device ) ? showOnDevice( this.desktopVisibleOn, this.device ) : false},
    social () {return this.$store.getters.social},
    device () {return this.$store.getters[ 'modules/layout/device' ]},
    width () {return this.$store.getters[ 'modules/layout/width' ]},
    hideMenuBreakpoint () {return this.$store.state.modules.layout.hideMenuBreakpoint },
    logo () {return this.$store.getters[ 'logoContrast' ]},
    siteName () {return this.$store.getters[ 'siteName' ]},
    topNav () {return this.$store.state.topMenuAttached},
    showTopNav () {return this.width >= this.hideMenuBreakpoint }
  },

  methods: {

    stickyToggle () {
      if ( process.browser ) {
        const header = this.$refs.header
        this.$emit( 'sticky', {
          sticky: this.sticky,
          size:   this.size
        } )
      }
    },

    scrollNav () {
      if ( process.browser ) {
        window.onscroll = () => {
          const header = this.$refs.header
          this.size    = header.offsetHeight
          if ( this.startBarPos < 0 ) this.startBarPos = this.findPosY( header )
          this.sticky = window.scrollY > this.startBarPos
          this.stickyToggle()
        }
      }
    },

    findPosY ( obj ) {
      let curTop = 0
      if ( typeof ( obj.offsetParent ) != 'undefined' && obj.offsetParent ) {
        while ( obj.offsetParent ) {
          curTop += obj.offsetTop
          obj = obj.offsetParent
        }
        curTop += obj.offsetTop
      }
      else if ( obj.y )
        curTop += obj.y
      return curTop
    },

    showSideBar () {
      this.$store.commit( 'modules/layout/SIDEBAR_TOGGLE' )
    },

    showModalForm () {
      this.$store.commit( 'modules/layout/MODAL_FORM', {
        title:  this.$t( 'submit_application' ),
        action: this.$t( 'start_the_application' )
      } )
    },

    showSearch ( payload ) {
      this.$store.commit( 'modules/layout/SEARCH_REQUEST', payload )
      this.$store.commit( 'modules/layout/TOGGLE_SEARCH_RESULT' )
    }
  }
}
</script>
