<template>
  <ol class="ra-content-list"
      v-if="content">

    <li class="ra-content-list__item"
        v-for="item  in content"
        :key="item"
        v-html="item"></li>
  </ol>
</template>

<script>

export default {
  name: 'List',

  props: {
    data: {
      type: Object,
      default () {}
    }
  },

  computed: {

    content () {
      return ( this.data && this.data.data )
        ? this.data.data.items
        : null
    }
  }
}
</script>
