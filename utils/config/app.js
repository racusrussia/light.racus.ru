export const pwaIcons = {
  icons: [
    {
      src:   '/icons/70x70.png',
      sizes: '70x70',
      type:  'image/png'
    },
    {
      src:   '/icons/150x150.png',
      sizes: '150x150',
      type:  'image/png'
    },
    {
      src:   '/icons/310x150.png',
      sizes: '310x150',
      type:  'image/png'
    },
    {
      src:   '/icons/310x310.png',
      sizes: '310x310',
      type:  'image/png'
    },
    {
      src:     '/icons/72x72.png',
      sizes:   '72x72',
      type:    'image/png',
      density: 1.5
    },
    {
      src:     '/icons/57x57.png',
      sizes:   '57x57',
      type:    'image/png',
      density: 2
    },
    {
      src:     '/icons/76x76.png',
      sizes:   '76x76',
      type:    'image/png',
      density: 1.5
    },
    {
      src:     '/icons/60x60.png',
      sizes:   '60x60',
      type:    'image/png',
      density: 2
    },
    {
      src:     '/icons/120x120.png',
      sizes:   '120x120',
      type:    'image/png',
      density: 1.5
    },
    {
      src:     '/icons/152x152.png',
      sizes:   '152x152',
      type:    'image/png',
      density: 2
    },
    {
      src:     '/icons/114x114.png',
      sizes:   '114x114',
      type:    'image/png',
      density: 3
    },
    {
      src:     '/icons/128x128.png',
      sizes:   '128x128',
      type:    'image/png',
      density: 4
    },
    {
      src:     '/icons/192x192.png',
      sizes:   '192x192',
      type:    'image/png',
      density: 4
    },
    {
      src:   '/icons/512x512.png',
      sizes: '512x512',
      type:  'image/png'
    }
  ]
}

export const appMeta = {
  name:                    'Racus',
  description:             'Обучение в России',
  short_name:              'Racus',
  ogSiteName:              'Racus - Обучение в России',
  ogType:                  'website',
  display:                 'standalone', // standalone , fullscreen
  orientation:             'portrait',
  background_color:        '#ffffff',
  theme_color:             '#002a52',
  lang:                    'en',
  author:                  'GSP',
  nativeUI:                true,
  useWebmanifestExtension: true
}

export const head = {
  meta:   [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no' },
    { name: 'format-detection', content: 'telephone=no' },
    { name: 'fragment', content: '!' },
    { name: 'HandheldFriendly', content: 'true' },
    { name: 'apple-touch-fullscreen', content: 'true' },
    { name: 'apple-mobile-web-app-capable', content: 'true' },
    { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },

    { name: 'application-name', content: appMeta.name },
    { name: 'msapplication-TileImage', content: '/icons/144x144.png' },
    { name: 'msapplication-square70x70logo', content: '/icons/70x70.png' },
    { name: 'msapplication-square150x150logo', content: '/icons/150x150.png' },
    { name: 'msapplication-square310x310logo', content: '/icons/310x310.png' },
    { name: 'msapplication-wide310x150logo', content: '/icons/310x150.png' }
  ],
  link:   [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },

    { rel: 'icon', type: 'image/png', href: '/icons/196x196.png', sizes: '196x196' },
    { rel: 'icon', type: 'image/png', href: '/icons/96x96.png', sizes: '96x96' },
    { rel: 'icon', type: 'image/png', href: '/icons/32x32.png', sizes: '32x32' },
    { rel: 'icon', type: 'image/png', href: '/icons/16x16.png', sizes: '16x16' },
    { rel: 'icon', type: 'image/png', href: '/icons/128x128.png', sizes: '128x128' },

    { rel: 'precomposed', sizes: '57x57', href: '/icons/-57x57.png' },
    { rel: 'precomposed', sizes: '114x114', href: '/icons/114x114.png' },
    { rel: 'precomposed', sizes: '72x72', href: '/icons/72x72.png' },
    { rel: 'precomposed', sizes: '144x144', href: '/icons/144x144.png' },
    { rel: 'precomposed', sizes: '60x60', href: '/icons/60x60.png' },
    { rel: 'precomposed', sizes: '120x120', href: '/icons/120x120.png' },
    { rel: 'precomposed', sizes: '76x76', href: '/icons/76x76.png' },
    { rel: 'precomposed', sizes: '152x152', href: '/icons/152x152.png' }

  ],
  script: []
}

export const nuxtPreCompress = {

  enabled:    true, // Enable in production
  report:     false, // set true to turn one console messages during module init
  test:       /\.(js|css|html|txt|xml|svg)$/, // files to compress on build
  middleware: {
    // You can disable middleware if you serve static files using nginx...
    enabled: true,
    // Enable if you have .gz or .br files in /static/ folder
    enabledStatic: true,
    // Priority of content-encodings, first matched with request Accept-Encoding will me served
    encodingsPriority: [ 'br', 'gzip' ]
  },

  // build time compression settings
  gzip: {
    // should compress to gzip?
    enabled: true,
    // compression config
    // https://www.npmjs.com/package/compression-webpack-plugin
    filename:           '[path].gz[query]', // middleware will look for this filename
    threshold:          10240,
    minRatio:           0.8,
    compressionOptions: { level: 9 }
  },

  brotli: {
    // should compress to brotli?
    enabled: true,
    // compression config
    // https://www.npmjs.com/package/compression-webpack-plugin
    filename:           '[path].br[query]', // middleware will look for this filename
    compressionOptions: { level: 11 },
    threshold:          10240,
    minRatio:           0.8
  }
}

export const Robots = {
  UserAgent: '*',
  Disallow:  '/',
  Sitemap:   '/sitemap.xml'
}
