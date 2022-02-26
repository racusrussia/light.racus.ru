<template>
  <div class="ra-contacts-outer">

    <div class="ra-contacts">

      <ContactsMap class="ra-contacts__map"/>

      <div class="ra-contacts__contacts">
        <div v-if="contact">

          <!--address-->
          <div class="ra-contacts__row"
               v-if="contact.address">
            <h6 class="ra-contacts__row-label"
                v-text="$t('contacts_address')"></h6>
            <div class="ra-contacts__row-value"
                 v-text="contact.address"></div>
            <div class="ra-contacts__row-action">
              <button type="button"
                      @click="showModalForm"
                      class="ra-button ra-button--danger ra-button--pill"
                      v-text="$t('contacts_how_to_get_there')"></button>
            </div>
          </div>

          <!--phones-->
          <div class="ra-contacts__contact-item"
               v-if="contact.phones && contact.phones.length">
            <h6 class="ra-contacts__row-label"
                v-text="$t('contacts_telephones')"></h6>
            <div class="ra-contacts__row-grid">
              <div class="ra-contacts__row-grid-item"
                   v-for="item in contact.phones">
                <a :href="`tel:${item.number}`"
                   class="ra-contacts__row-grid-value"
                   v-text="item.number"></a>
                <div class="ra-contacts__row-grid-label"
                     v-text="item.label"></div>
              </div>
            </div>
          </div>

          <!--emails-->
          <div class="ra-contacts__contact-item"
               v-if="contact.emails && contact.emails.length">
            <h6 class="ra-contacts__row-label"
                v-text="$t('contacts_email_addresses')"></h6>
            <div class="ra-contacts__row-grid">
              <div class="ra-contacts__row-grid-item"
                   v-for="item in contact.emails">
                <a :href="`mailto:${item.email}`"
                   class="ra-contacts__row-grid-value"
                   v-text="item.email"></a>
                <div class="ra-contacts__row-grid-label"
                     v-text="item.label"></div>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>

  </div>
</template>

<script>
import ContactsMap from '~/components/blocks/ContactsMap'

export default {
  name:       'InfoContacts',
  components: { ContactsMap },
  props:      {

    data: {
      type: Object,
      default () {}
    }
  },

  computed: {

    contact () {
      return this.$store.getters[ 'contacts' ]
    }
  },

  methods: {
    showModalForm () {
      this.$store.commit('modules/layout/MODAL_FORM', {
        title:  this.$t('submit_application'),
        action: this.$t('start_the_application')
      })
    }
  }
}
</script>

<style lang="sass">
@import "assets/sass/variables"
@import "assets/sass/mixins"

.ra-contacts-outer
  padding: $ra-gutter-medium

.ra-contacts
  display: flex
  box-shadow: $shadow-xlarge
  overflow: hidden
  border-radius: $ra-border-radius * 3
  @media (max-width: $device-tablet-landscape)
    flex-direction: column

  &__map
    flex: 1
    min-width: 300px
    min-height: 600px
    @media (max-width: $device-tablet-landscape)
      min-height: 500px
    @media (max-width: $device-tablet-small)
      min-height: 400px
    @media (max-width: $device-phone)
      min-height: 300px

  &__contacts
    width: 460px
    min-height: 600px
    padding: $ra-gutter-medium
    @media (max-width: $device-tablet-landscape)
      width: 100%
      min-height: 0

  &__row,
  &__contact-item
    margin-bottom: $ra-gutter-medium
    @media (max-width: $device-tablet-small)
      margin-bottom: $ra-gutter

    &:last-child
      margin-bottom: 0

  &__row-label
    font-size: 1.6rem
    line-height: 1
    margin: 0 0 $ra-gutter 0

  &__row-value,
  &__row-grid
    font-size: 1.2rem

  &__row-grid
    display: flex
    flex-wrap: wrap
    //gap: $ra-gutter
    width: 100%

  &__row-grid-value
    color: $ra-color-text
    text-decoration: none

    &:hover
      color: $ra-color-danger

  &__row-grid-label
    color: $ra-color-text-muted
    font-size: .9rem

  &__row-grid-item
    width: 50%

  &__row-action
    margin-top: $ra-gutter-medium
    @media (max-width: $device-tablet-small)
      margin-top: $ra-gutter

.ra-map-tooltip
  //background-color: $ra-color-danger
  color: $ra-color-danger
  font-weight: bold
  display: flex
  align-items: center
  gap: $ra-gutter-small

  &__name
    @include text-overflow
    max-width: 70px
    @media (max-width: $device-tablet-landscape)
      display: none

  &__flag
    font-size: 1.2rem
    line-height: 1
</style>
