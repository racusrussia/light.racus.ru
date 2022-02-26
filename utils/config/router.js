export const Router = {

  prefetchLinks:        false,
  base:                 '/',
  linkActiveClass:      'ra-link--active',
  linkExactActiveClass: 'ra-link--exact-active',
  linkPrefetchedClass:  'ra-link--prefetched',

  extendRoutes ( routes, resolve ) {
    routes.push({
      name:      'custom',
      path:      '/:lang/*',
      component: resolve(__dirname, '../../pages/NotFound.vue')
    })
  },

  scrollBehavior ( to, from, savedPosition ) {
    return  { x: 0, y: 0 }
  }
}
