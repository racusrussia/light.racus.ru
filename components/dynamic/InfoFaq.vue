<template>
  <section class="ra-faq-categories">

    <nav class="ra-faq-category"
         v-if="faqs && !showDrop">

      <a class="ra-faq-category__item ra-h ra-h--6"
         v-for="item in faqs"
         :key="item.id"
         :class="{'ra-faq-category__item--active': active === item}"
         @click.prevent="setCategory(item)"
         v-text="item.title"></a>

    </nav>

    <div class="ra-faq-category"
         v-if="faqs && showDrop">
      <div class="ra-faq-category__drop">
        <button class="ra-button ra-button--danger ra-button--pill ra-button__arrow"
                :class="{'ra-button__arrow--active':  drop}"
                @click="drop = !drop">
          <span v-text="active.title"></span>
        </button>

        <transition name="slide-top"
                    appear
                    mode="in-out">

          <Drop v-if="drop"
                @close="drop = false"
                @click="setCategory($event)"
                key-name="title"
                :data="faqs"/>

        </transition>
      </div>
    </div>

    <transition name="slide-left"
                appear
                mode="out-in">

      <div class="ra-faq-question"
           v-if="active">

        <div class="ra-faq-question__column"
             v-for="column in rows">

          <div class="ra-faq-question-item"
               v-for="item in column">

            <div class="ra-faq-question-item__header"
                 role="button"
                 @click="setAnswer(item)">

              <IconClose class="ra-faq-question-item__icon"
                         width="20"
                         v-if="activeAnswer === item"/>
              <IconOpen class="ra-faq-question-item__icon"
                        width="20"
                        v-else/>

              <div class="ra-faq-question-item__title ra-h ra-h--6"
                   v-text="item.question"></div>
            </div>

            <transition name="slide-top"
                        appear>
              <div class="ra-faq-question-item__body"
                   v-if="answerContent && activeAnswer === item">
                <ContentRender :content="answerContent"/>
              </div>
            </transition>

          </div>

        </div>

      </div>

    </transition>
  </section>
</template>

<script>
import graphQl from '~/api/graphQl'
import { Faq } from '~/api/graphql/pages'

export default {
  name: 'InfoFaq',

  components: {
    Drop:          () => import(/* webpackChunkName: "Drop" */ '~/components/ui/Drop'),
    ContentRender: () => import(/* webpackChunkName: "ContentRender" */ '~/components/content'),
    IconOpen:      () => import(/* webpackChunkName: "IconPrev" */ '~/assets/svg/arrow-down.svg?inline'),
    IconClose:     () => import(/* webpackChunkName: "IconPrev" */ '~/assets/svg/arrow-up.svg?inline')
  },

  data () {
    return {
      faqs:         null,
      active:       null,
      activeAnswer: null,
      drop:         false,
      dropDevices:  [ 'phone', 'tablet-small', 'tablet-portrait' ]
    }
  },

  watch: {
    async locale () {
      await this.load()
    }
  },

  computed: {

    device () {return this.$store.getters[ 'modules/layout/device' ]},

    showDrop () {return this.dropDevices.includes(this.device)},

    answerContent () {
      if (!this.activeAnswer) return false
      const answer = this.activeAnswer?.answer
      return ( answer ) ? JSON.parse(answer) : null
    },

    locale () {
      const { code } = this.$i18n.localeProperties
      return code
    },

    rows () {
      if (!this.active) return null
      if (!this.active.faqs) return null
      const oneRow = this.device === 'tablet-small' || this.device === 'tablet-portrait' || this.device === 'phone'
      if (oneRow) return [ this.active.faqs ]
      let rows1 = []
      let rows2 = []

      for (let i = 0; i < this.active.faqs.length; i++) {
        if (i % 2) {
          rows2 = [ ...rows2, this.active.faqs[ i ] ]
        }
        else {
          rows1 = [ ...rows1, this.active.faqs[ i ] ]
        }
      }
      return [ rows1, rows2 ]
    }
  },

  async mounted () {
    if (process.browser) {
      await this.load()
    }
  },

  methods: {
    async load () {
      const { faqCategories } = await graphQl.data(Faq, { locale: this.locale })

      this.activeAnswer = null

      if (faqCategories && faqCategories.length) {
        this.faqs   = faqCategories.filter(i => i.faqs.length)
        this.active = this.faqs[ 0 ]
      }
    },

    setAnswer ( answer ) {
      this.activeAnswer = ( this.activeAnswer === answer ) ? null : answer
    },

    setCategory ( item ) {
      this.active       = item
      this.activeAnswer = null
    }
  }
}
</script>

<style lang="sass">
@import "assets/sass/variables"

.ra-faq-categories
  padding: $ra-gutter-medium $ra-gutter-medium $ra-gutter-xlarge $ra-gutter-medium
  max-width: $device-desktop-large
  margin: 0 auto
  @media (max-width: $device-tablet-small)
    padding: $ra-gutter

.ra-faq-category
  display: flex
  justify-content: center
  gap: $ra-gutter-medium

  &__drop
    position: relative

  &__item
    margin: 0
    line-height: 1.2
    text-align: center
    font-weight: 700
    text-decoration: underline
    color: $ra-color-info
    font-size: 1.2rem

    &--active
      text-decoration: none
      color: $ra-color-danger

.ra-faq-question
  max-width: $device-desktop
  margin: $ra-gutter-large auto 0 auto
  display: flex
  gap: $ra-gutter
  @media (max-width: $device-tablet-landscape)
    flex-direction: column

  &__column
    width: calc(50% - $ra-gutter)
    display: flex
    flex-direction: column
    gap: $ra-gutter
    @media (max-width: $device-tablet-landscape)
      width: 100%

.ra-faq-question-item
  border: $ra-border-width solid $ra-border
  border-radius: $ra-border-radius * 3
  box-shadow: $shadow-large
  @media (max-width: $device-tablet-small)
    box-shadow: $shadow
    border-radius: $ra-border-radius * 2

  &__header,
  &__body
    padding: $ra-gutter

  &__header
    cursor: pointer
    display: flex

  &:hover &__icon,
  &:hover &__title
    color: $ra-color-danger

  &__icon
    flex: none
    margin-right: $ra-gutter
    color: $ra-color-text-muted

  &__title
    flex: 1
    min-width: 100px
    font-size: 1.2rem
    line-height: 1.3
    font-weight: 700

  &__body
    border-top: $ra-border-width solid $ra-border
    //background-color: $ra-color-background-muted

    .ra-content
      padding: 0
</style>
