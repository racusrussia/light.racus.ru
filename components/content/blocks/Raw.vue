<template>
  <div class="ra-docs-content__raw"
       v-html="content"></div>
</template>

<script>
export default {
  name: 'Raw',

  props: {
    data: {
      type:    Object,
      default() {}
    }
  },

  computed: {
    content () {
      return ( this.data && this.data.data )
        ? this.data.data.html
        : null
    }
  }
}
</script>
