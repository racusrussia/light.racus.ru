<template>
  <table class="ra-content__table">
    <tbody>
    <tr v-for="row in body">
      <td class="ra-content__table-body-item" v-for="cell in row"
          v-html="cell"></td>
    </tr>
    </tbody>

    <thead v-if="withHeadings">
    <tr>
      <th class="ra-content__table-head-item" v-for="cell in header"
          v-text="cell"></th>
    </tr>
    </thead>
  </table>
</template>

<script>
export default {
  name: 'Table',

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

    withHeadings () {
      return this.data?.data?.withHeadings
    },

    header () {
      if (!this.withHeadings) return false
      return ( this.content && this.content.length ) ? this.content[ 0 ] : false
    },

    body () {
      if (!this.withHeadings) return this.content
      return ( this.content && this.content.length ) ? this.content.slice(1) : false
    },

    content () {
      return ( this.data && this.data.data )
        ? this.data.data.content
        : null
    }
  }
}
</script>
