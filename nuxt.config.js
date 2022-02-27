import redirectSSL                                          from 'redirect-ssl'
import { appMeta, head, nuxtPreCompress, pwaIcons, Robots } from './utils/config/app'
import { ComponentCache }                                   from './utils/config/component-cache'
import { Rules }                                            from './utils/config/redirect-rules'
import { Router }                                           from './utils/config/router'

const HOST = ( process.env.NODE_ENV === 'development' )
  ? 'http://localhost:1337'
  : ( process.env.HOST_HTTP ) ? process.env.HOST_HTTP : 'https://api.edurussia.ru'

console.log( 'HOST', HOST )
export default {

  target:     'static', // static server
  debug:      false,
  cache:      true,
  ssr:        false,
  telemetry:  false,
  components: true, // Auto import components: https://go.nuxtjs.dev/config-components

  generate: { fallback: false },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head:            head,
  router:          Router,
  redirect:        Rules,
  nuxtPrecompress: nuxtPreCompress,

  loading: false,
  //loading: { color: '#f3b224', failedColor: '#bd0033', height: '4px' },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    { src: '~/assets/sass', lang: 'sass' }
  ],

  env: {
    //HOST_HTTP:               HOST,
    HOST_HTTP:               process.env.HOST_HTTP || 'https://api.edurussia.ru',
    NUXT_TELEMETRY_DISABLED: process.env.NUXT_TELEMETRY_DISABLED,
    NODE_ENV:                process.env.NODE_ENV || 'production',
    HOST:                    process.env.HOST || '0.0.0.0',
    NODE_PORT:               process.env.NODE_PORT || 3000,
    SITE_URL:                process.env.SITE_URL || 'https://light.edurussia.ru',
    MAPBOX_APIKEY:           process.env.MAPBOX_APIKEY,
    MAPBOX_URL:              process.env.MAPBOX_URL,
    MEILISEARCH_URL:         process.env.MEILISEARCH_URL
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/utils/plugins/lazy-load', ssr: false },
    { src: '~/utils/plugins/vue-touch', ssr: false },
    { src: '~/utils/plugins/autofocus', ssr: false },
    { src: '~/utils/plugins/click-outside', ssr: false },
    { src: '~/utils/plugins/i18n' },
    { src: '~/utils/plugins/vue-the-mask', ssr: false }
  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/svg',            //https://github.com/nuxt-community/svg-module#file-loader
    '@nuxtjs/device'          // https://github.com/nuxt-community/device-module
  ],

  serverMiddleware: [
    redirectSSL.create( { enabled: process.env.NODE_ENV === 'production' } )
    //{ path: '/api', handler: '~/middleware/index' }
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/pwa',
    'nuxt-user-agent',
    '@nuxtjs/strapi',
    //'@nuxtjs/yandex-metrika',
    '@nuxtjs/i18n',
    'nuxt-precompress',
    [ '@nuxtjs/component-cache', ComponentCache ],
    [ '@nuxtjs/robots', { robots: Robots } ],
    '@nuxtjs/redirect-module' // https://github.com/nuxt-community/redirect-module
  ],

  yandexMetrika: {
    id:    process.env.YANDEX_METRIKA_ID,
    defer: true,
    type:  0, // Tag type. 1 for YAN
    //ut:                  '',
    triggerEvent: false, // Whether to check if the tag is ready
    ecommerce:    false,
    //params:              {},
    //userParams:          {},
    //trustedDomains:      ["example.com"],
    webvisor:            true,
    clickmap:            true,
    useCDN:              true,
    trackLinks:          true,
    trackHash:           false,
    accurateTrackBounce: true
  },

  strapi: {
    // Options
  },

  // i18n
  i18n: {
    strategy:              'prefix_except_default',
    locales:               [
      { code: 'en', name: 'English', iso: 'en-US', file: 'en-US.js', dir: 'ltr' },
      { code: 'ar', name: 'العربية', iso: 'ar-EG', file: 'ar-AR.js', dir: 'rtl' },
      { code: 'fr', name: 'Français', iso: 'fr-FR', file: 'fr-FR.js', dir: 'ltr' },
      { code: 'ru', name: 'Русский', iso: 'ru-Ru', file: 'ru-RU.js', dir: 'ltr' },
      { code: 'pt', name: 'Português', iso: 'pt-PT', file: 'pt-PT.js', dir: 'ltr' },
      { code: 'es', name: 'Spanish', iso: 'es-ES', file: 'es-ES.js', dir: 'ltr' }
    ],
    baseUrl:               process.env.SITE_URL,
    lazy:                  true,
    langDir:               'lang/',
    defaultLocale:         'en',
    vueI18n:               {
      fallbackLocale: 'en',
      messages:       {}
    },
    detectBrowserLanguage: {
      useCookie:      true,
      cookieKey:      'i18n_redirected',
      redirectOn:     'root', // 'root' 'all'  // recommended
      fallbackLocale: 'en',
      alwaysRedirect: true
      //cookieCrossOrigin: true,
    },
    vuex:                  {
      moduleName:      'i18n',
      syncRouteParams: true
    }
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: { ...appMeta, ...pwaIcons },

    meta: {
      mobileApp:           true,
      mobileAppIOS:        true,
      appleStatusBarStyle: 'default',
      favicon:             true,
      author:              appMeta.author,
      theme_color:         appMeta.theme_color,
      lang:                'ru'
    },

    workbox: {
      /* workbox options */
      autoRegister: ( process.env.NODE_ENV === 'production' ),
      enabled:      ( process.env.NODE_ENV === 'production' )
      //offlinePage: '/offline.html'
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    vendor:     [ 'babel-polyfill' ],
    extractCSS: true,
    loaders:    {
      vue: {
        prettify: false
      }
    },
    extend ( config, { isServer } ) {

      // Fixes npm packages that depend on 'fs' module
      if ( !isServer ) {
        config.node = {
          fs:  'empty', // when i put this line i get the 'net' error
          net: 'empty' // then i put the 'net' line
        }
      }
      return config
    }
  }

}
