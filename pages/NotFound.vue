<template>
  <div class="ra-not-found">
    <div class="ra-not-found__text"
         v-text="$t('page_not_found')"></div>
    <nuxt-link class="ra-button ra-button--danger-border ra-button--pill"
               :to="localePath('/')"
               v-text="$t('go_home')"/>

  </div>
</template>

<script>
import { Device } from '~/utils/device'

export default {
  name:        'NotFound',
  loading:     true,
  scrollToTop: true,
  layout:      'info',
  components:  {
    //Home: () => import(/* webpackChunkName: "Header" */ '~/components/pages/Home')
  },

  data () {
    return {
      topNav: null,
      config: null
    }
  },

  methods: {},

  async mounted () {
    const { code } = this.$i18n.localeProperties
    this.config    = await this.$store.dispatch('GET_CONFIG', code)
  },

  async asyncData ( context ) {

    const { code } = context.i18n.localeProperties

    //const topMenu = await context.store.dispatch('GET_TOP_MENU')
    //await context.store.dispatch('GET_CONFIG', code)
    return {
      deviceType: Device(context)
      //topNav:     topMenu
    }
  }
}
</script>
<style lang="sass">
@import "assets/sass/variables"
.ra-not-found
  padding: $ra-gutter-xlarge
  display: flex
  align-items: center
  justify-content: center
  flex-direction: column

  &__text
    text-align: center
    font-weight: 700
    font-size: 2.4rem
    color: $ra-color-danger
    margin-bottom: $ra-gutter-medium
</style>
