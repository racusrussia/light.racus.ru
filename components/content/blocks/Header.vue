<template v-if="data.data.text">

  <h2 v-if="this.data.data.level === 2"
      class="ra-content__heading"
      v-text="data.data.text"></h2>

  <h3 v-else-if="this.data.data.level === 3"
      class="ra-content__heading"
      v-text="data.data.text"></h3>

  <h4 v-else-if="this.data.data.level === 4"
      class="ra-content__heading"
      v-text="data.data.text"></h4>

  <h5 v-else-if="this.data.data.level === 5"
      class="ra-content__heading"
      v-text="data.data.text"></h5>

  <h6 v-else
      class="ra-content__heading"
      v-text="data.data.text"></h6>

</template>

<script>
export default {
  name: 'Header',

  props: {
    data: {
      type:    Object,
      default: {}
    }
  }

}
</script>
