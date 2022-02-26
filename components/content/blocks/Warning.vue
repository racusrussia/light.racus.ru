<template>
  <aside v-if="content"
         class="ra-content__warning">

    <div class="ra-content__warning-label ra-h"
         v-if="content.title"
         v-text="content.title"></div>

    <div class="ra-content__warning-message"
         v-html="content.message"></div>

  </aside>
</template>

<script>
export default {
  name: 'Warning',

  props: {
    data: {
      type:    Object,
      default: {}
    }
  },

  computed: {
    content () {
      return ( this.data && this.data.data ) ? this.data.data : null
    }
  }
}
</script>
