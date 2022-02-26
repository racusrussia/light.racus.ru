<template>
  <section class="ra-section--content"
           :class="{'ra-section--no-top': loading !== 'loading'}"
           v-if="loading !== 'error'">

    <div class="ra-text-center"
         v-if="loading === 'loading'">
      <span v-text="loading"></span>
    </div>

    <div class="ra-programs"
         v-if="programs">

      <!--CONTENT-->
      <ContentRender class="ra-programs__center"
                     :no-padding="true"
                     v-if="contentNotEmpty"
                     :content="content"/>

      <div class="ra-programs__block ra-programs__center">
        <NuxtLink class="ra-button ra-button--danger ra-button--pill"
                  :to="localePath(`/applicant/universities`)"
                  v-text="$t('filter_universities')"/>
      </div>

      <h4 class="ra-h ra-h--4 ra-programs__center ra-programs__large"
          v-text="$t('programs')"></h4>

      <!--TABS desktop-->
      <nav class="ra-tabs"
           v-if="programs && !showDrop">

        <a class="ra-tabs__item"
           @click.prevent="setActiveType(item)"
           v-for="item in programs"
           :key="item.id"
           :class="{'ra-tabs__item--active': selected === item}"
           v-text="item.name"></a>
      </nav>

      <!--TABS mobile-->
      <div class="ra-tabs"
           style="margin-bottom: 2rem"
           v-else-if="programs && showDrop">
        <div class="ra-tabs__drop">

          <button class="ra-button ra-button--danger ra-button--pill ra-button__arrow"
                  :class="{'ra-button__arrow--active':  drop}"
                  @click="drop = !drop">
            <span v-text="selected.name"></span>
          </button>

          <transition name="slide-top"
                      appear
                      mode="in-out">

            <Drop v-if="drop"
                  @close="drop = false"
                  @click="setActiveType($event)"
                  key-name="name"
                  :data="programs"/>

          </transition>
        </div>
      </div>

      <!--specialities-->
      <transition name="slide-right"
                  appear>
        <div v-if="active && loading === 'success'">
          <div class="ra-programs-content">

            <div class="ra-programs__table-header">
              <div class="ra-programs__table-toggle"></div>
              <div class="ra-programs__table-title"
                   v-text="$t('main_specialties')"></div>
              <div class="ra-programs__table-value"
                   v-text="$t('specialist_degree')"></div>
              <div class="ra-programs__table-value"
                   v-text="$t('clinical_residency')"></div>
              <div class="ra-programs__table-value"
                   v-text="$t('postgraduate_studies')"></div>
            </div>

            <div class="ra-programs__table-row"
                 @click="activeRow(row)"
                 v-for="row in active">

              <div class="ra-programs__table-main"
                   :class="{'ra-programs__table-main--active': rowDrop === row}">
                <div class="ra-programs__table-toggle"
                     role="button">
                  <div v-if="showToggle(row)"
                       class="ra-flex middle">
                    <IconClose width="20"
                               height="20"
                               v-if="rowDrop === row"/>
                    <IconOpen width="20"
                              height="20"
                              v-else/>
                  </div>
                </div>

                <div class="ra-programs__table-title"
                     v-text="row.title"></div>
                <div class="ra-programs__table-value">{{ row.specialist_degree }} {{ $t('years') }}</div>
                <div class="ra-programs__table-value">{{ row.clinical_residency }} {{ $t('years') }}</div>
                <div class="ra-programs__table-value">{{ row.postgraduate_studies }} {{ $t('years') }}</div>

              </div>

              <div class="ra-programs__table-description"
                   v-if="rowDrop === row && showToggle(row)">

                <ContentRender :no-padding="true"
                               v-if="row.content"
                               :content="getContent(row)"/>

                <ul v-if="row.specialties && row.specialties.length">
                  <li v-for="item in row.specialties"
                      v-text="specialtyTitle(item)"></li>
                </ul>

              </div>
            </div>

          </div>

          <ContentRender :no-padding="false"
                         v-if="selected && selected.content"
                         :content="getContent(selected)"/>

        </div>

      </transition>
    </div>

  </section>
</template>

<script>
import graphQl                                 from '~/api/graphQl'
import { MainSpecialitiesByType, Specialties } from '~/api/graphql/pages'
import { UniversitiesTypesOnly }               from '~/api/graphql/universities'

export default {
  name: 'InfoPrograms',

  components: {
    Drop:          () => import(/* webpackChunkName: "Drop" */ '~/components/ui/Drop'),
    ContentRender: () => import(/* webpackChunkName: "ContentRender" */ '~/components/content'),
    IconOpen:      () => import(/* webpackChunkName: "IconPrev" */ '~/assets/svg/arrow-down.svg?inline'),
    IconClose:     () => import(/* webpackChunkName: "IconPrev" */ '~/assets/svg/arrow-up.svg?inline')
  },

  props: {

    data: {
      type: Object,
      default () {}
    }
  },

  data () {
    return {
      programs:     null,
      selected:     null,
      active:       null,
      rowDrop:      null,
      drop:         false,
      specialities: null,
      dropDevices:  [ 'phone', 'tablet-small', 'tablet-portrait', 'tablet-landscape' ],
      loading:      'loading'
    }
  },

  watch: {
    async locale () {
      await this.load()
    }
  },

  computed: {

    activeLocalised () {
      const { main_specialities } = this.active
      if (this.locale === 'en') return this.active
      if (main_specialities && main_specialities.length) return this.active
    },

    device () {return this.$store.getters[ 'modules/layout/device' ]},
    showDrop () {return this.dropDevices.includes(this.device)},
    locale () {
      const { code } = this.$i18n.localeProperties
      return code
    },

    content () {
      if (!this.data || !this.data.content) return false
      const content = this.data.content
      return ( content ) ? JSON.parse(content) : null
    },

    contentNotEmpty () {
      if (!this.content) return false
      if (!this.content.blocks) return false
      return !!this.content.blocks.length
    }
  },

  async mounted () {
    if (process.browser) {
      await this.load()
    }
  },

  methods: {

    specialtyTitle ( item ) {
      if (!item) return null
      if (item.locale === this.locale) return item.title
      const { title } = item.localizations.find(i => i.locale === this.locale)
      return title
    },

    async setActiveType ( item ) {
      this.selected = item
      await this.loadSpecialties()
    },

    getContent ( row ) {
      if (!row || !row.content) return false
      const content = row.content
      return ( content ) ? JSON.parse(content) : null
    },

    showToggle ( row ) {return !!( row.specialties && row.specialties.length ) || !!row.content},

    activeRow ( row ) {this.rowDrop = ( this.rowDrop === row ) ? null : row},

    async getSpecialties () {
      if (!this.active) return
      const { universitiesTypes } = await graphQl.data(Specialties, { id: this.active.id })
      if (!universitiesTypes) return
      const { main_specialities } = universitiesTypes
      this.specialities           = main_specialities
    },

    async loadSpecialties () {
      this.loading               = 'loading'
      //if (this.selected) return
      const { mainSpecialities } = await graphQl.data(MainSpecialitiesByType, { locale: this.locale, id: this.selected.id })

      console.log('mainSpecialities', mainSpecialities)
      Promise.all([ mainSpecialities ])
             .then(async () => {
               const specialties = ( mainSpecialities && mainSpecialities.length ) ? mainSpecialities : null
               if (specialties) {
                 this.active  = specialties
                 this.loading = 'success'
               }
               else {
                 const { id } = this.selected.localizations.find(i => i.locale === 'en')
                 if (!id) return
                 const { mainSpecialities } = await graphQl.data(MainSpecialitiesByType, { id })
                 this.active                = mainSpecialities
                 this.loading               = 'success'
               }
             })
    },

    async load () {
      return await this.loadTypes()
                       .then(async () => await this.loadSpecialties())
    },

    async loadTypes () {
      const { universitiesTypes } = await graphQl.data(UniversitiesTypesOnly, { locale: this.locale = 'en' })
      this.programs               = universitiesTypes
      this.selected               = ( universitiesTypes && universitiesTypes.length ) ? universitiesTypes[ 0 ] : null
      return this.selected
    }

  }
}
</script>

<style lang="sass">
@import "assets/sass/variables"

.ra-programs
  padding: $ra-gutter-large $ra-gutter
  border: $ra-border-width solid $ra-border
  border-radius: $ra-border-radius

  &__block
    margin: $ra-gutter 0

  &__large
    margin: $ra-gutter-large 0

  &__center
    text-align: center

  //&__table

  &__table-row
    &:nth-of-type(2n)
      background-color: $ra-color-background-muted

  &__table-header
    //font-family: $font-family-heading
    text-transform: uppercase
    font-size: 0.8rem
    color: $ra-color-text-muted
    line-height: 1.1
    hyphens: auto
    text-align: center

    & > *
      align-self: flex-end

  &__table-header,
  &__table-main
    cursor: pointer
    display: flex
    align-items: center

  &__table-main
    &:hover,
    &--active
      color: $ra-color-danger

  &__table-main,
  &__table-description
    font-size: 1.2rem
    line-height: 1.4

  &__table-description
    border-top: $ra-border-width solid $ra-border
    line-height: 1.6

  &__table-title
    flex: 1
    min-width: 300px
    padding: $ra-gutter $ra-gutter-small

  &__table-toggle
    width: 40px
    color: $ra-color-text-muted
    display: flex
    align-items: center
    justify-content: center

  &__table-value
    overflow: hidden
    padding: $ra-gutter $ra-gutter-small
    width: 120px

  &__table-toggle,
  &__table-value
    text-align: center
    flex: none

  &__table-description
    padding: $ra-gutter

.ra-programs-content
  max-width: $device-tablet-portrait
  overflow: auto hidden
  margin: 0 auto

</style>
