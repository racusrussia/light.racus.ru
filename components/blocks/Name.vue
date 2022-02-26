<template>
  <div v-if="data"
       class="ra-university-name">

    <div class="ra-university-name__image">
      <Picture format-large="tablet-small"
               format-medium="tablet-small"
               format-default="tablet-small"
               :image="data.image"/>
    </div>

    <div class="ra-university-name__body">
      <div class="ra-university-name__title"
           v-text="data.title"></div>
      <div class="ra-university-name__description"
           v-text="data.description"></div>
    </div>

  </div>
</template>

<script>
import Picture from '~/components/blocks/Picture'

export default {
  name:       'Name',
  components: { Picture },
  props:      {

    data: {
      type: Object,
      default () {}
    }
  }
}
</script>

<style lang="sass">
@import "assets/sass/variables"
@import "assets/sass/content/var"
.ra-university-name
  display: flex
  align-items: center
  @media (max-width: $device-desktop)
    flex-direction: column

  &__image
    width: 50%

    img
      margin: 0 auto

    @media (max-width: $device-desktop)
      width: 100%
      max-width: $device-tablet-portrait

  &__body
    width: 50%
    padding: 0 $ra-gutter-medium
    text-align: center

    &:after
      border-bottom: $ra-border-width solid $ra-color-danger

    @media (max-width: $device-desktop)
      width: 100%
      margin-top: $ra-gutter-medium

  &__title
    font-weight: 100
    font-family: $font-family-heading
    font-size: 2.6rem
    line-height: 1.2
    color: $ra-color-base
    @media (max-width: $device-desktop-large)
      font-size: 2.3rem
    @media (max-width: $device-tablet-small)
      font-size: 2rem
    @media (max-width: $device-phone)
      font-size: 1.4rem

  &__description
    font-weight: 100
    font-family: $font-family-heading
    font-size: 1.2rem
    line-height: 1.2
    margin-top: $ra-gutter
</style>
