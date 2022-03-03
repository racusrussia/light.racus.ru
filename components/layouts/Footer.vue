<template>
  <footer class="ra-footer">

    <!--<div class="ra-footer__map"-->
    <!--     v-if="showMap">-->

    <!--  <ContactsMap v-if="showFooterMap && footerImage"/>-->

    <!--  <div class="ra-footer__bgr"-->
    <!--       v-else>-->

    <!--    <Picture class-name="ra-footer__image"-->
    <!--             format-large="tablet-portrait"-->
    <!--             format-medium="tablet-portrait"-->
    <!--             format-default="tablet-portrait"-->
    <!--             :image="footerImage"/>-->
    <!--  </div>-->
    <!--</div>-->

    <div class="ra-footer__body">

      <div class="ra-footer__contacts">

        <!--social-->
        <div class="ra-footer__social"
             v-if="social">

          <span v-if="social.facebook"
                class="ra-footer__social-item ra-footer__social-item--facebook"
                role="link"
                @click.prevent="go(social.facebook)"></span>

          <span v-if="social.instagram"
                class="ra-footer__social-item ra-footer__social-item--instagram"
                role="link"
                @click.prevent="go(social.instagram)"></span>

          <span v-if="social.twitter"
                class="ra-footer__social-item ra-footer__social-item--twitter"
                role="link"
                @click.prevent="go(social.twitter)"></span>
        </div>

        <!--emails-->
        <a class="ra-footer__email ra-footer__link"
           v-if="email"
           :href="`mailto:${email}`"
           v-text="email"></a>

        <!--phones-->
        <div class="ra-footer__phone"
             :class="`ra-footer__phone--${index}`"
             v-for="(phone, index) in phones">
          <a class="ra-footer__phone-number ra-footer__link"
             v-if="phones"
             :href="`tel:${clearPhone(phone.number)}`"
             v-text="phone.number"></a>
          <span class="ra-footer__phone-description"
                v-text="phone.label"></span>
        </div>

        <div class="ra-footer__address"
             v-text="address"></div>

        <!--<div class="ra-footer__all-offices">-->
        <!--  <nuxt-link :to="localePath('/about-us/representatives')"-->
        <!--             class="ra-button&#45;&#45;border ra-button ra-button&#45;&#45;pill"-->
        <!--             v-text="$t('our_offices_in_other_countries')"></nuxt-link>-->
        <!--</div>-->

      </div>

      <!--follow_our_news_and_events-->
      <div class="ra-footer__sub">

        <div class="ra-footer__sub-header"
             v-text="$t('follow_our_news_and_events')"></div>

        <div class="ra-footer__sub-form">

          <div class="ra-footer__sub-field">
            <input type="email"
                   v-model="subscription.email"
                   class="ra-footer__sub-input"
                   :placeholder="$t('your_email')">
            <button type="button"
                    :disabled="!formValid"
                    class="ra-button ra-button--danger ra-button--pill"
                    v-text="$t('subscribe')"></button>
          </div>

          <label class="ra-footer__sub-terms">
            <input type="checkbox"
                   class="ra-checkbox"
                   v-model="subscription.terms">
            <span v-text="$t('personal_data_processing_consent')"></span>
          </label>

        </div>

        <hr class="ra-footer__divider"/>

        <div class="ra-footer__other">

          <!--<div class="ra-footer__links">-->

          <!--<nuxt-link :to="localePath('/privacy-policy')"-->
          <!--           class="ra-footer__link"-->
          <!--           v-text="$t('privacy_policy')"></nuxt-link>-->
          <!--<nuxt-link :to="localePath('/sitemap')"-->
          <!--           class="ra-footer__link"-->
          <!--           v-text="$t('sitemap')"></nuxt-link>-->

          <!--</div>-->

          <div class="ra-footer__copyright">© {{ copyright }}</div>
        </div>

      </div>

    </div>
  </footer>
</template>

<script>
import ContactsMap         from '~/components/blocks/ContactsMap'
import Picture             from '~/components/blocks/Picture'
import { validationEmail } from '~/utils/helpers'

export default {
  name:       'Footer',
  components: { Picture, ContactsMap },

  data () {
    return {
      subscription: {
        email: '',
        lang:  '',
        terms: false
      }
    }
  },

  computed: {

    showMap () {
      const { infos } = this.$route.params
      return ( infos !== 'contacts' )
    },

    emailValid () {
      return validationEmail( this.subscription.email )
    },

    formValid () {
      return this.subscription.terms && this.emailValid
    },

    copyright () {
      return this.$store.getters.copyRight
    },

    contacts () {
      return this.$store.getters.contacts
    },

    phones () {
      return this.contacts?.phones
    },

    email () {
      return ( this.contacts && this.contacts.emails ) ? this.contacts?.emails[ 0 ].email : null
    },

    address () {
      return this.contacts?.address
    },

    social () {
      return this.$store.getters.social
    },

    showFooterMap () {
      return this.$store.state.config?.showFooterMap
    },

    footerImage () {
      return this.$store.state.config?.footerImage
    }
  },

  methods: {

    clearPhone ( phone ) {
      return phone.replace( /[^0-9\\+]/g, '' )
    },

    go ( url ) {
      window.open( url, '_blank' )
    }
  }
}
</script>
