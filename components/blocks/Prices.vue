<template>
  <section class="ra-prices"
           v-if="types && types.length">

    <h5 class="ra-page__title">
      <span class="ra-h ra-h--1 ra-h--light"
            v-if="title"
            v-text="title"></span>
    </h5>

    <!--<Tabs v-if="!all"-->
    <!--      :data="types"-->
    <!--      class="ra-prices__tabs"-->
    <!--      name-kay="name"-->
    <!--      @click="price = $event"/>-->

    <div v-for="(price, index) in types">

      <p class="ra-h ra-h--3 ra-prices__section-title"
         v-if="price.name"
         v-text="price.name"></p>

      <!--Mobile-->
      <div class="ra-prices__table"
           v-if="mobile">

        <div class="ra-prices__mob"
             v-for="row in price.data">

          <div class="ra-prices__mob-header">

            <div class="ra-prices__mob-title"
                 v-text="row.title"></div>

            <div class="ra-prices__mob-lang">
              <img class="ra-prices__lang-item"
                   v-for="lang in row.languages"
                   :src="`/lang/${lang.iso}.svg`"/>
            </div>

            <div class="ra-prices__mob-lang-desc"
                 v-text="$t('language_of_instruction')"></div>
          </div>

          <div class="ra-prices__mob-row">
            <div class="ra-prices__mob-label"
                 v-text="$t('course_duration')"></div>
            <div class="ra-prices__mob-value">{{ row.duration }} {{ $t('years') }}</div>
          </div>

          <div class="ra-prices__mob-row">
            <div class="ra-prices__mob-label"
                 v-text="$t('tuition_fees_for_one_academic_year')"></div>
            <div class="ra-prices__mob-value"
                 v-text="getPrice(row)"></div>
          </div>

          <div class="ra-prices__mob-row">
            <div class="ra-prices__mob-label"
                 v-text="$t('hostel_accommodation_fees_for_one_academic_year')"></div>
            <div class="ra-prices__mob-value"
                 v-text="getPriceKey(row, 'price_residence')"></div>
          </div>

          <div class="ra-prices__mob-row">
            <div class="ra-prices__mob-label"
                 v-text="$t('life_and_health_insurance_fees_for_one_year')"></div>
            <div class="ra-prices__mob-value"
                 v-text="getPriceKey(row, 'price_insurance')"></div>
          </div>

          <div class="ra-prices__mob-row">
            <div class="ra-prices__mob-label"
                 v-text="$t('total_for_one_academic_year')"></div>
            <div class="ra-prices__mob-value"
                 v-text="getTotalPrice(row)"></div>
          </div>

        </div>
      </div>

      <!--Desktop-->
      <div class="ra-prices__table"
           v-else>
        <table class="ra-prices__table ra-content__table ra-content__table--large">

          <tbody v-if="price && price.data">
          <tr class="ra-content__table-body-item"
              v-for="row in price.data">
            <td v-text="row.title"></td>
            <td class="ra-text-center ra-prices__table-cell">
              <div class="ra-prices__lang">
                <img class="ra-prices__lang-item"
                     v-for="lang in row.languages"
                     :src="`/lang/${lang.iso}.svg`"/>
              </div>
            </td>
            <td class="ra-text-center ra-prices__table-cell">{{ row.duration }} {{ $t('years') }}</td>
            <td class="ra-text-center ra-prices__table-cell"
                v-text="getPrice(row)"></td>
            <td class="ra-text-center ra-prices__table-cell"
                v-text="getPriceKey(row, 'price_residence')"></td>
            <td class="ra-text-center ra-prices__table-cell"
                v-text="getPriceKey(row, 'price_insurance')"></td>
            <td class="ra-text-center ra-prices__table-cell"
                v-text="getTotalPrice(row)"></td>
          </tr>
          </tbody>

          <thead>
          <tr class="ra-content__table-head-item ">
            <th ></th>
            <th v-text="$t('language_of_instruction')"></th>
            <th v-text="$t('course_duration')"></th>
            <th v-text="$t('tuition_fees_for_one_academic_year')"></th>
            <th v-text="$t('hostel_accommodation_fees_for_one_academic_year')"></th>
            <th v-text="$t('life_and_health_insurance_fees_for_one_year')"></th>
            <th v-text="$t('total_for_one_academic_year')"></th>
          </tr>
          </thead>

        </table>
      </div>

    </div>

    <p class="ra-text-center ra-prices__description"
       v-if="usefulInfo"> ***
      <NuxtLink :to="localePath('/useful-info')"
                v-text="usefulInfo"/>
    </p>

  </section>
</template>

<script>
import Tabs from '~/components/blocks/Tabs'

export default {
  name:       'Prices',
  components: { Tabs },
  props:      {

    prices: {
      type: Array,
      default () {}
    },

    title: {
      type: String,
      default () {}
    }
  },

  data () {
    return {
      price: null
    }
  },

  computed: {

    usefulInfo () {
      const page          = ( this.$store.state.topMenuNames ) ? this.$store.state.topMenuNames.find(i => +i.id === 63) : null
      const localizations = ( page ) ? page.localizations.find(i => i.locale === this.code) : null
      return ( localizations ) ? localizations.title : page.title
    },

    code () {return this.$i18n.localeProperties?.code},
    device () {return this.$store.getters[ 'modules/layout/device' ]},
    mobile () {return this.device === 'phone' || this.device === 'tablet-small'},

    all () {
      if (!this.prices && !this.prices.length) return
      const ids = [ 25, 26, 27, 28, 29, 30 ]
      const all = this.prices.filter(i => ( i.universities_type ) ? ids.includes(+i.universities_type.id) : true)
      return ( all && all.length ) ? all : null
    },

    types () {
      if (!this.prices && !this.prices.length) return
      let result = []

      if (this.all) {
        result = [ { name: null, data: [] } ]
        this.all.forEach(i => result[ 0 ].data = [ ...result[ 0 ].data, i ])
      }
      else {
        const group = this.prices.reduce(( r, a ) => {
          if (a.universities_type) {
            r[ a.universities_type.description ] = r[ a.universities_type.description ] || []
            r[ a.universities_type.description ].push(a)
            return r
          }
        }, Object.create(null))

        for (const i in group) {
          result = [ ...result, { name: i, data: group[ i ] } ]
        }
      }

      return result
    }
  },

  methods: {

    getPriceKey ( row, key ) {
      if (!+row[ key ]) return this.$t('free')
      else return `$ ${ row[ key ] }`
    },

    getPrice ( row ) {
      const { price_learn_from, price_learn_to } = row
      if (!+price_learn_from) return '***'
      if (+price_learn_to) return `$ ${ price_learn_from } - ${ price_learn_to }`
      else return `$ ${ price_learn_from }`
    },

    getTotalPrice ( row ) {
      const { price_learn_from, price_learn_to, price_residence, price_insurance } = row
      if (!+price_learn_from) return '***'
      if (+price_learn_to)
        return `$ ${ +price_learn_from + +price_residence + +price_insurance } - ${ +price_learn_to + +price_residence +
        +price_insurance }`
      else return `$ ${ +price_learn_from + +price_residence + +price_insurance } `
    }
  }
}
</script>

<style lang="sass">
@import "assets/sass/variables"
@import "assets/sass/content/var"
.ra-prices
  padding-bottom: $ra-gutter-large

  &__section-title
    color: $ra-color-danger
    font-family: $font-family-heading
    font-weight: 900
    font-size: 1.6rem
    text-align: center
    margin-top: $ra-gutter-medium

  &__tabs
    padding: 0 $ra-gutter-large
    margin: 0 auto $ra-gutter-large auto
    max-width: $device-desktop

  &__lang
    text-align: center
  //display: inline-block

  &__lang-item
    display: inline-block
    width: 24px
    margin-right: 4px
    border: $ra-border-width solid $ra-border
    border-radius: 3px

    &:last-child
      margin-right: 0

  &__table
    max-width: $device-desktop
    margin: 0 auto
    overflow-x: auto

  &__table-cell
    width: 12%

  &__description
    margin-top: $ra-gutter-large

  &__mob
    border: $ra-border-width solid $ra-border
    margin: 0 $ra-gutter $ra-gutter $ra-gutter
    border-radius: $ra-border-radius

    &:hover
      box-shadow: $shadow-xlarge

  &__mob-header
    padding: $ra-gutter $ra-gutter-medium
    display: flex
    align-items: center
    border-bottom: $ra-border-width solid $ra-border
    flex-wrap: wrap

  &__mob-lang-desc
    width: 100%
    text-align: right
    color: $ra-color-text-muted
    text-transform: lowercase

  [dir=rtl] &__mob-lang-desc
    text-align: left

  &__mob-title
    flex: 1
    min-width: 100px
    margin-right: $ra-gutter
    font-size: 1.2rem
    font-weight: bold
    text-transform: uppercase

  &__mob-row
    padding: $ra-gutter-small $ra-gutter-medium
    display: flex
    align-items: center
    font-size: 1.1rem

  &__mob-label
    flex: 1
    flex-wrap: wrap
    margin-right: $ra-gutter

  &__mob-value
    flex: none
    font-weight: bold
    text-transform: uppercase
</style>
