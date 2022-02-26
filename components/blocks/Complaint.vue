<template>
  <div v-if="data"
       class="ra-complaint">

    <h4 class="ra-complaint__title" v-if="title"
        v-text="title"></h4>

    <div class="ra-complaint__description">
      <ContentRender v-if="description"
                     :no-padding="true"
                     :content="description"/>
    </div>

  </div>
</template>

<script>
import ContentRender from '~/components/content'

export default {
  name:       'Complaint',
  components: { ContentRender },
  props:      {

    data: {
      type: Object,
      default () {}
    }
  },

  computed: {
    title () {return this.data?.title},
    description () {return ( this.data.description ) ? JSON.parse(this.data.description) : null},
    ads () {return this.data?.ads}
  }
}
</script>

<style lang="sass">
@import "assets/sass/variables"
@import "assets/sass/content/var"

.ra-complaint
  max-width: $device-tablet-landscape
  margin: 0 auto

  &__title
    text-align: center
    font-size: 3rem
    line-height: 1
    font-weight: 100
    font-family: $font-family-heading
    color: $ra-color-base
    margin-top: $ra-gutter-large + 2rem
    margin-bottom: $ra-gutter-large
  //
  //&__items
  //  margin-top: $ra-gutter-large
  //  padding: 0 $ra-gutter-medium
  //  display: flex
  //  flex-wrap: wrap
  //  gap: $ra-gutter-large
  //  justify-content: center
  //  @media (max-width: $device-tablet-portrait)
  //    padding: 0
  //    gap: $ra-gutter-medium
  //
  //&__item
  //  width: calc(33% - $ra-gutter-large)
  //  @media (max-width: $device-tablet-portrait)
  //    width: calc(33% - $ra-gutter-medium)
  //  @media (max-width: $device-tablet-small)
  //    width: calc(50% - $ra-gutter-medium)
  //    text-align: center
  //  @media (max-width: $device-phone)
  //    width: 100%
  //    text-align: center
  //
  //&__item-value,
  //&__item-label
  //  font-weight: 100
  //  font-family: $font-family-heading
  //
  //&__item-value
  //  font-size: 4rem
  //  line-height: 1
  //  color: $ra-color-base
  //  @media (max-width: $device-tablet-landscape)
  //    font-size: 3.2rem
  //
  //&__item-label
  //  margin-top: $ra-gutter
  //  font-size: 1.8rem
  //  line-height: 1.2
  //  @media (max-width: $device-tablet-landscape)
  //    font-size: 1.4rem
</style>
