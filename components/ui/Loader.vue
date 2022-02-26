<template>
  <div class="loader"
       :style="{height: `${this.size * 5}rem`}">
    <div class="loader__item"
         :style="loaderStyles"></div>
  </div>

</template>

<script>
export default {
  name: 'Loader',

  props: {
    size: {
      type:    Number,
      default: 3
    }
  },

  computed: {
    loaderStyles () {
      return {
        width:       `${ this.size }rem`,
        height:      `${ this.size }rem`,
        borderWidth: `${ this.size / 8 }rem`
      }

    }
  }
}
</script>

<style lang="sass">
@import "assets/sass/variables"

.loader
  display: flex
  align-items: center
  justify-content: center

  &__item
    border: 5px solid $ra-color-background-muted
    border-bottom-color: $ra-color-danger
    border-radius: 50%
    display: inline-block
    animation: rotation .7s linear infinite

@keyframes rotation
  0%
    transform: rotate(0deg)
  100%
    transform: rotate(360deg)

</style>
