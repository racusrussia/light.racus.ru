<template>

  <div class="ra-form">

    <div class="ra-form__outer"
         :class="{'ra-form__outer--mounted': mounted}"
         @click="close"></div>

    <transition name="slide-top"
                mode="out-in"
                appear>

      <!--FORM-->
      <form class="ra-form-content"
            key="inProgress"
            autocomplete="on"
            v-if="!complete && start">

        <!--HEADER-->
        <div class="ra-form-content-header">
          <div class="ra-form-content-header__close"
               role="button"
               @click="close">
            <IconClose width="20"
                       height="20"/>
          </div>
        </div>

        <!--BODY-->
        <div class="ra-form-content-body">

          <!--title-->
          <div class="ra-form-content-body__title"
               v-text="$t('submit_application')"></div>

          <div class="ra-form-content-fields">

            <!--countries-->
            <div class="ra-input__row">
              <label class="ra-input__label"
                     :class="{'ra-input__label--fill': focusedField === 'country' || fields.country}"
                     v-text="$t('country')"></label>

              <input :class="{'ra-input--success': fields.country, 'ra-input--danger': !fields.country}"
                     :disabled="disabled"
                     name="country"
                     class="ra-input"
                     @click="focusedField = 'country'"
                     @blur="focusedField = null"
                     @input="getCountry"
                     autocomplete="off"
                     v-model="countrySearch">

              <!--list="country"-->

              <!--<datalist id="country">-->
              <!--  <option v-for="country in countries"-->
              <!--          :value="country.text"></option>-->
              <!--</datalist>-->

              <transition name="slide-top"
                          appear
                          mode="in-out">

                <Drop v-if="drop && countrySearch && countries"
                      @close="drop = false"
                      key-name="text"
                      @click="selectCountry($event)"
                      :data="countries"/>

              </transition>
              <span class="ra-input__warning"
                    v-if="!valid.country"
                    v-text="$t('field_is_required')"></span>
            </div>

            <!--city-->
            <div class="ra-input__row">
              <label class="ra-input__label"
                     :class="{'ra-input__label--fill': focusedField === 'city' || fields.city}"
                     v-text="$t('city_of_residence')"></label>
              <input :class="{'ra-input--success': fields.city, 'ra-input--danger': !fields.city}"
                     :disabled="disabled || !fields.country"
                     name="name"
                     class="ra-input"
                     @input="getCity"
                     @click="focusedField = 'city'"
                     @blur="focusedField = null"
                     autocomplete="off"
                     v-model="citySearch">

              <!--list="city"-->

              <!--<datalist id="city">-->
              <!--  <option v-for="city in cities"-->
              <!--          :value="city.text"></option>-->
              <!--</datalist>-->

              <transition name="slide-top"
                          appear
                          mode="in-out">

                <Drop v-if="dropCity && citySearch && cities"
                      @close="dropCity = false"
                      key-name="text"
                      @click="selectCity($event)"
                      :data="cities"/>

              </transition>
              <span class="ra-input__warning"
                    v-if="!valid.city"
                    v-text="$t('field_is_required')"></span>
            </div>

            <!--surname-->
            <div class="ra-input__row">
              <label class="ra-input__label"
                     :class="{'ra-input__label--fill': focusedField === 'surname' || fields.surname}"
                     v-text="$t('your_surname')"></label>
              <input :class="{'ra-input--success': valid.surname, 'ra-input--danger': !valid.surname}"
                     :disabled="disabled"
                     name="name"
                     class="ra-input"
                     @click="focusedField = 'surname'"
                     @blur="focusedField = null"
                     autocomplete="surname"
                     v-model="fields.surname">
              <span class="ra-input__warning"
                    v-if="!valid.surname"
                    v-text="$t('field_is_required')"></span>
            </div>

            <!--name-->
            <div class="ra-input__row">
              <label class="ra-input__label"
                     :class="{'ra-input__label--fill': focusedField === 'name' || fields.name}"
                     v-text="$t('your_name')"></label>
              <input :class="{'ra-input--success': valid.name, 'ra-input--danger': !valid.name}"
                     :disabled="disabled"
                     name="name"
                     class="ra-input"
                     @click="focusedField = 'name'"
                     @blur="focusedField = null"
                     autocomplete="name"
                     v-model="fields.name">
              <span class="ra-input__warning"
                    v-if="!valid.name"
                    v-text="$t('field_is_required')"></span>
            </div>

            <!--EMAIL-->
            <div class="ra-input__row">
              <label class="ra-input__label"
                     :class="{'ra-input__label--fill': focusedField === 'email' || fields.email}"
                     v-text="$t('your_email')"></label>
              <input :class="{'ra-input--success': valid.email, 'ra-input--danger': !valid.email}"
                     :disabled="disabled"
                     type="email"
                     @click="focusedField = 'email'"
                     @blur="focusedField = null"
                     name="name"
                     class="ra-input"
                     autocomplete="email"
                     v-model="fields.email">
              <span class="ra-input__warning"
                    v-if="!valid.email"
                    v-text="$t('field_is_required')"></span>
            </div>

            <!--Phone-->
            <div class="ra-input__row">
              <label class="ra-input__label"
                     :class="{'ra-input__label--fill': focusedField === 'phone' || fields.phone}"
                     v-text="$t('phone_number')"></label>
              <input :class="{'ra-input--success': valid.phone, 'ra-input--danger': !valid.phone}"
                     :disabled="disabled || !selectedCountryCode"
                     type="tel"
                     inputmode="tel"
                     @click="focusedField = 'phone'"
                     @blur="focusedField = null"
                     name="name"
                     class="ra-input"
                     autocomplete="tel"
                     v-mask="phoneMask"
                     v-model="fields.phone">
              <!--<select class=""></select>-->
              <span class="ra-input__warning"
                    v-if="!valid.phone"
                    v-text="$t('field_is_required')"></span>
            </div>

            <div class="">
              <label class="ra-checkbox-label">
                <input type="checkbox"
                       :disabled="disabled"
                       class="ra-checkbox-switch small"
                       v-model="fields.agreeTerms">
                <span v-text="$t('i_understand_that_no_scholarships_are_available')"></span>
              </label>
            </div>
            <div style="margin-top: .5rem">
              <label class="ra-checkbox-label">
                <input type="checkbox"
                       :disabled="disabled"
                       class="ra-checkbox-switch small"
                       v-model="fields.agreePrivacy">
                <span v-text="$t('i_agree_to_the_privacy_policy')"></span>
              </label>
            </div>

          </div>

        </div>

        <!--FOOTER-->
        <div class="ra-form-content-footer">

          <button type="submit"
                  :disabled="!allValid || disabled"
                  @click.prevent="submit"
                  class="ra-button ra-button--center ra-button--fill ra-button--pill ra-button--uppercase ra-button--danger"
                  v-text="$t('start_the_application')"></button>

        </div>

      </form>

      <!--FORM COMPLETE-->
      <div v-if="complete && start"
           key="complete"
           class="ra-form-complete">

        <IconVerified/>

        <div class="ra-form-complete__title"
             v-text="$t('thanks')"></div>

        <div class="ra-form-complete__description"
             v-text="$t('form_complete_text')"></div>

        <div class="ra-form-complete__step">
          <div class="ra-form-complete__step-number">1</div>
          <div class="ra-form-complete__step-text"
               v-text="$t('form_complete_step1')"></div>
        </div>

        <div class="ra-form-complete__step">
          <div class="ra-form-complete__step-number">2</div>
          <div class="ra-form-complete__step-text"
               v-text="$t('form_complete_step2')"></div>
        </div>

        <div class="ra-form-complete__step">
          <div class="ra-form-complete__step-number">3</div>
          <div class="ra-form-complete__step-text"
               v-text="$t('form_complete_step3')"></div>
        </div>

        <!--HEADER-->
        <div class="ra-form-content-header">
          <div class="ra-form-content-header__close"
               role="button"
               @click="close">
            <IconClose width="20"
                       height="20"/>
          </div>
        </div>
      </div>

    </transition>
  </div>
</template>

<script>

import graphQl                              from '~/api/graphQl'
import Mapbox                               from '~/api/query/mapbox'
import { createForm }                       from '~/api/graphql/forms'
import Drop                                 from '~/components/ui/Drop'
import { validationEmail, validationPhone } from '~/utils/helpers'

export default {
  name:       'Form',
  components: {
    Drop,
    IconVerified: () => import(/* webpackChunkName: "IconClose" */ '~/assets/svg/verified.svg?inline'),
    IconClose:    () => import(/* webpackChunkName: "IconClose" */ '~/assets/svg/close.svg?inline')
  },

  async mounted () {
    if (process.browser) {
      this.$store.commit('BLOCK_BODY')
      this.start   = true
      this.mounted = true
    }

    await this.$store.dispatch('GET_PHONE_MASKS')

  },

  beforeDestroy () {
    this.$store.commit('UNBLOCK_BODY')
  },

  watch: {
    selectedCountryCode () {
      if (!this.selectedCountryCode) {
        this.fields.phone = ''
        this.fields.city  = ''
      }
    }
  },

  computed: {
    style () {return this.$store.state.body.styles},

    locale () {return this.$i18n.locale},

    valid () {
      return {
        surname:      ( this.fields.surname ) ? this.fields.surname.length >= 2 : false,
        name:         ( this.fields.name ) ? this.fields.name.length >= 2 : false,
        email:        validationEmail(this.fields.email),
        phone:        validationPhone(this.fields.phone),
        country:      ( this.fields.country ) ? this.fields.country.length >= 2 : false,
        city:         ( this.fields.city ) ? this.fields.city.length >= 2 : false,
        agreeTerms:   this.fields.agreeTerms,
        agreePrivacy: this.fields.agreePrivacy
      }
    },

    allValid () {
      const val = Object.values(this.valid)
      return val.every(i => i)
    },

    selectedCountryCode () {
      if (!this.selectedCountry) return false
      const shortCode = this.selectedCountry?.properties?.short_code
      return ( shortCode ) ? shortCode.toUpperCase() : false
    },

    phoneMask () {
      if (!this.selectedCountryCode) return '+(###) ###-##-##'
      const mask = this.phoneMasks.find(i => i.countryCodes_iso2 === this.selectedCountryCode)
      return ( mask ) ? mask.mask : '+(###) ###-##-##'
    },

    phoneMasks () {return this.$store.getters.phoneMasks},

    notEmptyFields () {
      let fields = {}
      for (let key in this.fields) {
        if (this.fields[ key ]) {fields = { ...fields, [ key ]: this.fields[ key ] }}
      }
      return { form: { data: fields } }
    }

  },

  data () {
    return {
      drop:           false,
      dropCity:       false,
      delay:          400,
      start:          false,
      disabled:       false,
      complete:       false,
      scrollPosition: 0,
      body:           null,
      mounted:        false,
      focusedField:   null,

      countrySearch: '',
      citySearch:    '',

      fields: {
        page:    this.$route.path,
        ip:      this.$store.state.ip,
        device:  this.$store.state.device,
        surname: '',
        name:    '',
        email:   '',
        phone:   '',
        country: '',
        //country:      ( this.selectedCountry ) ? this.selectedCountry.en : '',
        city:         '',
        agreeTerms:   false,
        agreePrivacy: false
      },

      selectedCountry: null,
      requiredFields:  [ 'surname', 'name', 'email', 'phone', 'country', 'city', 'agreeTerms', 'agreePrivacy' ],

      countries: null,
      cities:    null
    }
  },

  methods: {

    async getCountry () {
      //this.fields.country = ( this.fields.country === this.countrySearch ) ? this.countrySearch : ''
      if (!this.countrySearch) return
      this.countries     = null
      const { features } = await Mapbox.get({
        types:    'country',
        language: this.locale,
        limit:    10
      }, this.countrySearch)

      this.countries = ( features ) ? features : null
      this.drop      = !!( features )
    },

    async getCity () {
      if (!this.citySearch) return
      this.cities        = null
      const { features } = await Mapbox.get({
        types:    'place',
        country:  this.selectedCountryCode,
        language: this.locale,
        limit:    5
      }, this.citySearch)
      this.cities        = ( features && features.length  ) ? features : null
      this.dropCity      = !!( features && features.length )
    },

    selectCountry ( country ) {
      this.selectedCountry = ( country ) ? country : this.countries.find(i => i.text === this.fields.country)

      const text = country?.text
      if (!text) return
      this.fields.country = text
      this.countrySearch  = text
      this.drop           = false
    },

    selectCity ( city ) {
      //this.selectedCit = ( country ) ? country : this.countries.find(i => i.text === this.fields.country)

      if (!city) return
      this.fields.city = city.text
      this.citySearch  = city?.text
      this.dropCity    = false
    },

    //setCountry ( item ) {
    //  this.fields.country = item
    //},

    close () {
      this.start = false
      setTimeout(() => this.$store.commit('modules/layout/MODAL_FORM_CLOSE'), this.delay)
    },

    async submit () {
      this.disabled = true
      try {
        const resp = await graphQl.data(createForm, this.notEmptyFields)
        Promise.all([ resp ])
               .then(( e ) => {
                 this.complete = true
                 //setTimeout(() => {
                 //  this.start = false
                 //  setTimeout(() => this.$store.commit('modules/layout/MODAL_FORM_CLOSE'), this.delay)
                 //}, 4000)
               })
      }
      catch (e) {
        this.disabled = false
      }

    }
  }

}
</script>
<style lang="sass">
@import "sass"
</style>
