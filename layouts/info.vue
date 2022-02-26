<template>
  <div class="ra-page-outer"
       ref="base">

    <div class="ra-page"
         ref="main"
         :class="{open: showSideBar}">

      <HeaderInfoTop @sticky="stickyToggle($event)"/>

      <div :style="{height: `${size}px`}"
           v-if="sticky"></div>

      <transition name="slide-top">
        <nuxt class="ra-flex-1"
              keep-alive
              :keep-alive-props="{ max: 15 }"/>
      </transition>

      <Footer/>

    </div>

    <!--Form Modal-->
    <transition name="fade"
                appear>
      <Form v-if="showForm"/>
    </transition>

    <!--Modal Media-->
    <transition name="fade"
                appear>
      <ModalMedia v-if="showModal"/>
    </transition>


    <!--scrollTop-->
    <transition name="fade"
                appear>
      <button v-if="sticky"
              @click="scrollTop"
              class="ra-to-top ra-button__arrow ra-button__arrow--right ra-button--danger ra-button__icon ra-button--pill"></button>
    </transition>

  </div>
</template>
<script>

import ResizeObserver from 'resize-observer-polyfill'
import HeaderInfoTop  from '~/components/layouts/HeaderInfoTop'

if (process.browser) {
  const workbox = window.$workbox
  if (workbox) {
    workbox.addEventListener('installed', ( event ) => {
      // If we don't do this we'll be displaying the notification after the initial installation, which isn't perferred.
      if (event.isUpdate) {
        console.log(event.isUpdate)
        caches.keys()
              .then(cacheNames => Promise.all(cacheNames.filter(cacheName => {}).map(cacheName => caches.delete(cacheName))))
        navigator.serviceWorker.getRegistrations()
                 .then(registrations => registrations.forEach(registration => registration.unregister()))

        setTimeout(() => location.reload(!0), 300)
        // whatever logic you want to use to notify the user that they need to refresh the page.
      }
    })
  }
}

export default {
  name:       'Info',
  props:      [ 'error' ],
  watchQuery: [ 'page' ],

  head () {
    const i18nHead = this.$nuxtI18nHead({ addSeoAttributes: true })
    return {
      htmlAttrs: { dir: this.dir, ...i18nHead.htmlAttrs },
      meta:      [ ...i18nHead.meta ],
      link:      [ ...i18nHead.link ]
    }
  },

  key: to => to.name,


  scrollToTop: true,


  components: {
    HeaderInfoTop,
    MobileMenu:  () => import(/* webpackChunkName: "MobileMenu" */ '~/components/ui/mobile-menu'),
    ModalMedia:  () => import(/* webpackChunkName: "ModalMedia" */ '~/components/ui/modal'),
    Footer: () => import(/* webpackChunkName: "Footer" */ '~/components/layouts/Footer'),
    Form:   () => import(/* webpackChunkName: "Form" */ '~/components/forms')
  },

  data () {
    return {
      sidebarHideOn: [ 'desktop', 'desktop-large' ],
      sticky:        false,
      size:          0
    }
  },

  async mounted () {

    console.log('ENV', process.env.NODE_ENV)

    if (!process.browser) return

    // Window size observer
    const observer = new ResizeObserver(entries => {

      window.requestAnimationFrame(() => {
        if (!Array.isArray(entries) || !entries.length) {
          return
        }
        entries.forEach(entry => {
          const cr = entry.contentRect
          this.$store.commit('modules/layout/WIDTH', {
            w: Number(cr.width.toFixed(0)),
            h: Number(cr.height.toFixed(0))
          })

        })
      })
    })

    if (this.$refs.main) {
      const main = this.$refs.main
      observer.observe(main)
    }

    if (process.env.NODE_ENV === 'production') {
      const workbox = await window.$workbox
      console.log('workbox', !!workbox)
      if (workbox) {
        workbox.addEventListener('installed', ( event ) => {
          console.log('app is installed')
          // If we don't do this we'll be displaying the notification after the initial installation, which isn't perferred.
          if (event.isUpdate) {
            console.debug('There is an update for the PWA app, reloading...')
            const confirmReload = confirm('Доступно обновление. Перезагрузить страницу для установки?')
            if (!confirmReload) return
            window.location.reload()
          }
        })
      }
    }

  },

  beforeDestroy () {
    removeEventListener('change', e => this.changeDarkMode(e.matches))
  },

  computed: {

    locale () {return this.$i18n.localeProperties},
    code () {return this.$i18n.localeProperties.code},
    dir () {return this.$i18n.localeProperties.dir},
    device () {return this.$store.getters[ 'modules/layout/device' ]},
    showModal () { return this.$store.state.modules.layout.modal.show},
    showForm () { return this.$store.state.modules.layout.applicationsForm.show},
    showSideBar () { return this.$store.state.modules.layout.showSideBar }
  },

  methods: {

    scrollTop () {
      if (!process.browser) return
      const scrollToEl = this.$refs.base
      if (!scrollToEl) return
      scrollToEl.scrollIntoView({ behavior: 'smooth' })
    },

    stickyToggle ( data ) {
      this.sticky = data?.sticky
      this.size   = data?.size
    },

    changeDarkMode ( state ) {
      this.$store.commit( 'modules/layout/DARK_MODE', state )
    }
  }

}
</script>
