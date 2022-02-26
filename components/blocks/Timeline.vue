<template>
  <div class="ra-timeline" v-if="data && data.length">
    <h4 class="ra-h ra-h--4 ra-text-center"
        v-text="$t('university_s_achievements')"></h4>

    <div class="ra-timeline-list"
         v-for="year in data"
         :key="year.id">

      <div class="ra-timeline-list__year"
           v-text="year.year"></div>
      <div class="ra-timeline-list__body">
        <div class="ra-timeline-list__title"
             v-if="year.title"
             v-text="year.title"></div>
        <div class="ra-timeline-list__description"
             v-if="year.description"
             v-text="year.description"></div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'timeline',

  props: {

    data: {
      type: Array,
      default () {}
    }
  }
}
</script>

<style lang="sass">
@import "assets/sass/variables"
@import "assets/sass/content/var"
.ra-timeline
  max-width: $device-tablet-small
  margin: $ra-gutter-large auto
  padding: 0 $ra-gutter

.ra-timeline-list
  margin-top: $ra-gutter-large
  display: flex
  @media (max-width: $device-tablet-small)
    flex-direction: column
    align-items: center
    text-align: center

  &__year
    font-size: 3.2rem
    line-height: 1
    font-weight: 100
    font-family: $font-family-heading
    color: $ra-color-base
    width: 100px
    margin-right: $ra-gutter-medium
    flex: none
    @media (max-width: $device-tablet-small)
      margin-right: 0
      margin-bottom: $ra-gutter

  &__body
    flex: 1

  &__title
    color: $ra-color-base
    font-size: 1.4rem
    font-weight: 900
    line-height: 1.2
    @media (max-width: $device-tablet-small)
      text-align: center

    & + .ra-timeline-list__description
      margin-top: $ra-gutter

  &__description
    font-size: 1.1rem

</style>
