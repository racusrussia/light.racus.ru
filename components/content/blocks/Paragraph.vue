<template>
  <p v-html="content"
     class="ra-content__paragraph"
     :class="tunes"></p>
</template>

<script>
export default {
  name: 'Paragraph',

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
    tunes () {
      return ( this.data && this.data.tunes )
        ? this.data.tunes.textVariant
        : null
    },

    content () {
      return ( this.data && this.data.data )
        ? this.data.data.text
        : null
    }
  }
}
</script>
