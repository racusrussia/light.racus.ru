<template>
  <div>

    <Loader v-if="loader"/>
    <!--<div class="ra-specialties__item"-->
    <!--     v-for="letter in specialties">-->

    <!--  <div class="ra-specialties__latter"-->
    <!--       v-text="letter.letter"></div>-->

    <!--  <div v-for="name in letter.names"-->
    <!--       v-text="name"></div>-->
    <!--</div>-->

    <div v-if="specialties && !loader"
         class="ra-specialties-outer">

      <h4 class="ra-page__title">
        <span class="ra-h ra-h--1 ra-h--light"
              v-text="title"></span>
      </h4>

      <transition name="slide-bottom"
                  appear>

        <div class="ra-specialties"
             v-if="show">
          <div class="ra-specialties__item"
               v-for="name in localeSp"
               v-text="name"></div>

        </div>
      </transition>

      <div class="ra-text-center">
        <button class="ra-button ra-button--danger-border ra-button--pill"
                v-text="(!show) ? $t('show') : $t('hide')"
                @click="show = !show"></button>
      </div>

    </div>

  </div>
</template>

<script>
import graphQl                   from '~/api/graphQl'
import { UniversitySpecialties } from '~/api/graphql/pages'
import Loader                    from '~/components/ui/Loader'

export default {
  name:       'Specialties',
  components: { Loader },
  props:      {

    page: {
      type: Object,
      default () {}
    },

    group: {
      type:    Boolean,
      default: false
    },

    id: {
      type:    [ Number, String ],
      default: null
    }

    //specialties: {
    //  type: Array,
    //  default () {}
    //}
  },

  data () {
    return {
      loader:      true,
      show:        false,
      specialties: null
    }
  },

  computed: {

    code () {return this.$i18n.localeProperties.code},
    title () {return ( this.page && this.page.specialtiesTitle ) ? this.page.specialtiesTitle : this.$t('university_specialties')},
    localeSp () {
      if (!this.specialties) return
      return this.specialties.map(i => this.getLocalizedItem(i))
    }
  },

  watch: {
    async id () { await this.load()}
  },

  async mounted () {
    await this.load()
  },

  methods: {

    getLocalizedItem ( item ) {
      if (!item) return
      if (this.code === 'en') return item.title
      const localizations = item.localizations
      if (!localizations && !localizations.length) return
      const locale = localizations.find(i => i.locale === this.code)
      return ( locale ) ? locale.title : null
    },

    async load () {
      this.specialties = null
      if (!this.id) return
      const data        = await graphQl.data(UniversitySpecialties, { id: this.id })
      const specialties = data?.university?.specialties
      if (specialties) {
        this.specialties = specialties
      }
      this.loader = false
    }
  }
}
</script>

<style lang="sass">
@import "assets/sass/variables"
@import "assets/sass/content/var"

.ra-specialties-outer
  padding-bottom: $ra-gutter-large

.ra-specialties
  max-width: $device-desktop
  margin: 0 auto
  padding: $ra-gutter-medium
  columns: 3
  column-gap: $ra-gutter-large
  column-fill: auto
  @media (max-width: $device-tablet-landscape)
    column-gap: $ra-gutter-medium
  @media (max-width: $device-tablet-portrait)
    column-gap: $ra-gutter
    columns: 2
  @media (max-width: $device-phone)
    column-gap: $ra-gutter-small

  &__item
    font-size: 1.1rem
    line-height: 1.3
    margin-bottom: $ra-gutter

</style>
