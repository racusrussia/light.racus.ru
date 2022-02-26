<template>
  <Info :page="page"/>
</template>

<script>

import StrapiData from '~/api/query/strapi'
import Info       from '~/components/pages'
import { Device } from '~/utils/device'
import { PageMeta } from '~/utils/pages'

export default {
  name:        'LandingPage',
  loading:     true,
  scrollToTop: true,
  layout:      'info',
  components:  {
    Info
  },

  watchQuery: true,

  head () {
    return this.meta
  },

  data () {
    return {}
  },

  methods: {},

  async asyncData ( context ) {
    const { code } = context.i18n.localeProperties
    const { slug } = context.route.params
    await context.store.dispatch( 'GET_CONFIG', code )
    const page = await StrapiData.infoPageById( 1)

    const meta         = PageMeta( context, page )
    return {
      deviceType:   Device( context ),
      meta:         meta,
      slug:         slug,
      page:         page
    }
  }
}
</script>
