<template>

  <div class="ra-testimonials-outer">

    <h4 class="ra-h ra-h--1 ra-h--light ra-text-center"
        style="margin: 0"
        v-if="title"
        v-text="$t('student_feedback')"></h4>

    <div class="ra-flex"
         v-if="more"
         style="margin: 2rem 0; justify-content: center">
      <NuxtLink :to="localePath('/about-us/students-about-us')"
                class="ra-button ra-button--danger ra-button--pill"
                v-text="$t('all_feedback')"></NuxtLink>
    </div>

    <Loader v-if="loading"/>

    <div v-else
         class="ra-testimonials">

      <div v-for="row in rows"
           class="ra-testimonials-row">

        <div class="ra-testimonials-item"
             v-for="item in row">

          <div class="ra-testimonials-item__avatar"
               :style="{backgroundImage: `url(${getAva(item)})`}"></div>

          <div class="ra-testimonials-item__body"
               v-if="item">
            <ContentRender class="ra-testimonials-item__content"
                           :no-padding="true"
                           :content="content(item.content)"/>

            <div class="ra-testimonials-item__name"
                 v-if="item.name">-- {{ item.name }}
            </div>

            <NuxtLink :to="localePath(`/university/${item.university.slug}`)"
                      class="ra-testimonials-item__university"
                      v-if="item.university">
              <div class="ra-testimonials-item__university-logo"
                   :style="{backgroundImage: `url(${getLogo(item)})`}"></div>
              <div class="ra-testimonials-item__university-title"
                   v-text="getUniversityName(item)"></div>
            </NuxtLink>

          </div>
        </div>
      </div>

    </div>

  </div>

</template>

<script>
import graphQl          from '~/api/graphQl'
import { Testimonials } from '~/api/graphql/pages'
import ContentRender    from '~/components/content'
import Loader           from '~/components/ui/Loader'

export default {
  name: 'InfoTestimonials',

  props: {
    limit: {
      type:    Number,
      default: -1
    },

    title: {
      type:    Boolean,
      default: false
    },

    more: {
      type:    Boolean,
      default: false
    }
  },

  components: { Loader, ContentRender },

  data () {
    return {
      loading:      true,
      testimonials: null
    }
  },

  async mounted () {
    await this.load()
  },

  computed: {

    code () {return this.$i18n.localeProperties.code},
    device () {return this.$store.getters[ 'modules/layout/device' ]},

    rows () {
      if (!this.testimonials) return null
      const oneRow = this.device === 'tablet-small' || this.device === 'tablet-portrait' || this.device === 'phone'
      if (oneRow) return [ this.testimonials ]
      let rows1 = []
      let rows2 = []

      for (let i = 0; i < this.testimonials.length; i++) {
        if (i % 2) {
          rows2 = [ ...rows2, this.testimonials[ i ] ]
        }
        else {
          rows1 = [ ...rows1, this.testimonials[ i ] ]
        }
      }
      return [ rows1, rows2 ]
    }
  },

  methods: {

    async load () {
      const { testimonials } = await graphQl.data(Testimonials, { limit: this.limit })
      this.testimonials      = testimonials

      Promise.all([ testimonials ])
             .then(() => this.loading = false)
    },

    getLogo ( item ) {return item?.university?.logo?.url},
    getUniversityName ( item ) {return item?.university?.title},

    getAva ( item ) {return item?.avatar?.url},

    content ( content ) {
      if (!content) return false
      return ( content ) ? JSON.parse(content) : null
    }
  }
}
</script>

<style lang="sass">
@import "assets/sass/variables"
.ra-testimonials-outer
  padding: $ra-gutter-medium $ra-gutter

.ra-testimonials
  max-width: $device-desktop-large
  border-radius: $ra-border-radius * 4
  margin: 0 auto
  padding: $ra-gutter-medium
  background-color: $ra-color-background-muted
  display: flex
  flex-wrap: wrap
  justify-content: space-between

  @media (max-width: $device-tablet-portrait)
    padding: $ra-gutter

.ra-testimonials-row
  width: calc(50% - $ra-gutter-small)
  @media (max-width: $device-tablet-portrait)
    width: 100%

.ra-testimonials-item
  margin-bottom: $ra-gutter
  background-color: $ra-color-background
  border-radius: $ra-border-radius * 2
  box-shadow: $shadow
  padding: $ra-gutter-medium
  display: flex
  @media (max-width: $device-desktop)
    flex-direction: column

  &__avatar
    flex: none
    width: 90px
    height: 90px
    border-radius: 500px
    background-repeat: no-repeat
    background-size: cover
    margin-right: $ra-gutter
    @media (max-width: $device-desktop)
      margin: 0 auto $ra-gutter auto

  &__body
    @media (max-width: $device-desktop)
      font-size: .9rem

  &__content
    @media (min-width: $device-desktop)
      margin-top: 45px

    & > *
      hyphens: auto
      font-size: 1.2rem
      padding: 0
      @media (max-width: $device-desktop)
        margin-bottom: $ra-gutter
        font-size: 1rem
        line-height: 1.4

  &__name
    color: $ra-color-text-muted
    margin-top: $ra-gutter

  &__university
    display: flex
    margin-top: $ra-gutter
    align-items: center

  &__university-logo
    flex: none
    width: 30px
    height: 30px
    background-repeat: no-repeat
    background-size: cover
    margin-right: $ra-gutter

  &__university-title
    line-height: 1.2

</style>
