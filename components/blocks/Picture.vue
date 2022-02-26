<template>
  <picture v-lazyLoad>

    <source type="image/avif"
            media="(min-width: 1441px)"
            v-if="getFormat(formatLarge, 'av')"
            :data-srcset="getFormat(formatLarge, 'av')">
    <source type="image/webp"
            media="(min-width: 1441px)"
            v-if="getFormat(formatLarge, 'wp')"
            :data-srcset="getFormat(formatLarge, 'wp')">
    <source type="image/jpeg"
            media="(min-width: 1441px)"
            v-if="getFormat(formatLarge)"
            :data-srcset="getFormat(formatLarge)">

    <source type="image/avif"
            media="(max-width: 1440px)"
            v-if="getFormat(formatMedium, 'av')"
            :data-srcset="getFormat(formatMedium, 'av')">
    <source type="image/webp"
            media=" (max-width: 1440px)"
            v-if="getFormat(formatMedium, 'wp')"
            :data-srcset="getFormat(formatMedium, 'wp')">
    <source type="image/jpeg"
            media="(max-width: 1440px)"
            v-if="getFormat(formatMedium)"
            :data-srcset="getFormat(formatMedium)">

    <img :class="className"
         :data-src="getFormat(formatDefault)"
         :src="placeholder"
         :alt="alternativeText">
         <!--style="width: 100%;">-->
  </picture>
</template>

<script>
export default {
  name: 'Picture',

  props: {

    className: {
      type:    String,
      default: ''
    },

    placeholder: {
      type:    String,
      default: ''
    },

    formatLarge: {
      type:    String,
      default: 'large'
    },

    formatMedium: {
      type:    String,
      default: 'medium'
    },

    formatDefault: {
      type:    String,
      default: 'small'
    },

    alt: {
      type:    String,
      default: 'small'
    },

    image: {
      type: Object,
      default () {}
    }
  },

  computed: {
    alternativeText () {
      return ( this.alt )
        ? this.alt
        : ( this.image.alternativeText )
          ? this.image.alternativeText
          : this.image.name
    }
  },
  methods:  {

    getFormat ( format, postfix ) {
      if (!this.image) return null
      const fName = ( postfix ) ? format + '_' + postfix : format
      const image = this.image.formats[ fName ]?.url
      return ( image ) ? image : this.image?.url
    }
  }
}
</script>
