<template>
  <div v-if="content">
    <ContentRender
      :no-padding="noPadding"
      :content="content"/>
  </div>
</template>

<script>
import ContentRender from '~/components/content'

export default {
  name: 'InfoContent',

  components: { ContentRender },
  props:      {

    data: {
      type: Object,
      default () {}
    }
  },

  computed: {
    noPadding () {return !!this.data.noPadding },
    content () {return ( this.data.content ) ? JSON.parse(this.data.content) : null}
  }

}
</script>

<style lang="sass">
@import "assets/sass/variables"

</style>
