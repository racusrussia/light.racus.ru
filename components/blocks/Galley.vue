<template>
  <div class="ra-gallery"
       v-if="gallery">
    <hr/>

    <div class="ra-gallery-list">

      <Picture class="ra-gallery-list__item"
               v-for="image in images"
               :key="image.id"
               :class-name="'ra-gallery-list__item'"
               :image="image"/>

    </div>
  </div>
</template>

<script>
import Picture from '~/components/blocks/Picture'

export default {
  name:       'Galley',
  components: { Picture },
  props:      {
    gallery: {
      type: Array,
      default () {}
    }
  },

  data () {
    return {
      mime: [ 'image/jpeg', 'image/png', 'image/webp', 'image/svg+xml', 'image/gif' ]
    }
  },

  computed: {
    images () {
      if (!this.gallery || !this.gallery.length) return
      return this.gallery.filter(i => this.mime.includes(i.mime))
    }
  },

  methods: {
    getUrl ( image ) {

    }
  }
}
</script>

<style lang="sass">
@import "assets/sass/variables"
@import "assets/sass/content/var"

.ra-gallery
  padding: $ra-gutter-large
  @media (max-width: $ra-content-large-max-width)
    padding: 0 $ra-gutter $ra-gutter-large $ra-gutter

.ra-gallery-list
  max-width: $ra-content-large-max-width
  margin: 0 auto
  display: flex
  flex-wrap: wrap
  gap: $ra-gutter
  @media (max-width: $device-tablet-small)
    gap: $ra-gutter-small

  &__item
    flex: 1 1 calc(50% - 1rem)
    @media (max-width: $device-tablet-small)
      flex: 1 1 calc(50% - 1rem)
    @media (max-width: $device-phone)
      flex: none
      width: 100%

    & > *
      border-radius: $ra-border-radius
//overflow: hidden

</style>
