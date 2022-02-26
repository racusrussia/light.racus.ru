<template>
  <div class="ra-section"
       v-if="benefits">

    <div class="ra-benefit-list">

      <div class="ra-benefit-list__item"
           v-for="item in benefits"
           :key="item.id">

        <img class="ra-benefit-list__image"
             v-if="item.image"
             :src="item.image.url">

        <div class="ra-benefit-list__title"
             v-if="item.title"
             v-text="item.title"></div>

        <div class="ra-benefit-list__description"
             v-if="item.description"
             v-text="item.description"></div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InfoBenefitList',

  props: {
    data: {
      type: Object,
      default () {}
    }
  },

  computed: {

    benefits () {
      return this.data?.benefit
    }
  }
}
</script>

<style lang="sass">
@import "assets/sass/variables"

.ra-benefit-list
  display: flex
  flex-wrap: wrap

  &__item
    width: 33%
    padding: 0 $ra-gutter $ra-gutter-medium $ra-gutter
    text-align: center
    @media (max-width: $device-tablet-portrait)
      width: 50%
    @media (max-width: $device-phone)
      width: 100%
      padding: 0 0 $ra-gutter-medium 0

  &__image
    width: 75px
    margin: 0 auto
    @media (max-width: $device-tablet-small)
      width: 60px

  &__title
    margin: $ra-gutter-medium 0 $ra-gutter 0
    font-family: $font-family-heading
    font-weight: 700
    @media (max-width: $device-phone)
      margin: $ra-gutter 0

  &__description
    line-height: 1.6
    @media (max-width: $device-tablet-portrait)
      line-height: 1.4
</style>
