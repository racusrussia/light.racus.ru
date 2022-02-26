<template>
  <section class="ra-section"
           :class="small">

    <div class="ra-target">
      <h3 class="ra-target__title ra-h--light ra-text-center ra-h--1"
          v-text="title"></h3>

      <RouterLink v-if="link"
                  class="ra-button ra-button--danger ra-button--pill ra-button__arrow ra-button__arrow--right"
                  :to="localePath(link.link)"
                  v-text="link.linkLabel"/>

      <button v-if="action"
              @click="showModalForm"
              class="ra-button ra-button--danger ra-button--pill ra-button__arrow ra-button__arrow--right"
              v-text="action.linkLabel"></button>
    </div>
  </section>
</template>

<script>
export default {
  name: 'InfoTarget',

  props: {

    data: {
      type: Object,
      default () {}
    }
  },

  computed: {

    small () {
      const { small } = this.data
      return ( small ) ? 'ra-section--medium' : null
    },

    action () {
      const { showForm, linkLabel } = this.data
      return ( linkLabel && showForm ) ? { linkLabel } : false
    },

    link () {
      if (this.button) return false
      const { linkLabel, link } = this.data
      return ( linkLabel && link ) ? { linkLabel, link } : false
    },

    title () {
      return this.data?.title
    }
  },

  methods: {
    showModalForm () {
      this.$store.commit('modules/layout/MODAL_FORM', {
        title:  this.$t('submit_application'),
        action: this.$t('start_the_application')
      })
    }
  }
}
</script>

<style lang="sass">
@import "assets/sass/variables"
.ra-target
  max-width: $device-tablet-landscape
  margin: 0 auto
  display: flex
  align-items: center
  flex-direction: column

  &__title
    font-size: 3.5rem
    margin-bottom: $ra-gutter-medium
    @media (max-width: $device-tablet-portrait)
      font-size: 3.2rem
    @media (max-width: $device-tablet-small)
      font-size: 2.8rem
    @media (max-width: $device-phone)
      font-size: 2.4rem
</style>
