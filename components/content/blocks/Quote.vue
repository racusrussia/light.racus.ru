<template>
  <figure v-if="content"
          class="ra-content__blockquote"
          :class="{'ra-content__blockquote--center': content.alignment === 'center'}">
    <blockquote v-html="content.text">
    </blockquote>
    <figcaption v-if="content.caption"
                v-text="content.caption"></figcaption>
  </figure>
</template>

<script>
export default {
  name: 'Quote',

  props: {
    data: {
      type:    Object,
      default: {}
    }
  },

  data () {
    return {}
  },

  computed: {
    content () {
      return ( this.data && this.data.data ) ? this.data.data : null
    }
  }
}
</script>
