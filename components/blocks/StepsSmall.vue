<template>
  <div>

    <div class="ra-section steps"
         :class="{ 'steps--no-padding': !padding}">

      <div class="steps__header"
           v-if="data">

        <div class="ra-h ra-h--1"
             v-if="showTitle"
             v-text="data.title"></div>

        <div class="ra-h ra-h--1 ra-h--light"
             v-if="showTitle"
             v-text="data.subTitle"></div>

        <nuxt-link class="steps__more ra-button ra-button--danger"
                   v-if="data.slug"
                   :to="localePath(`/applicant/how-it-works`)"
                   v-text="$t('learn_more')"></nuxt-link>
      </div>

      <div class="steps__steps"
           v-if="data">

        <div class="steps__step"
             v-for="step in steps"
             :key="step.id">

          <div class="steps__step-image"
               :style="{backgroundImage: `url(${step.image.url})`}"
               :class="`steps__step-image--${step.order}`">
          </div>

          <div class="steps__step-button">
            <nuxt-link class="ra-button ra-button--danger-border ra-button--pill"
                       :to="localePath(`/applicant/how-it-works/#step-${step.order}`)"
                       v-text="step.actionLabel">Choose program
            </nuxt-link>
          </div>

        </div>

      </div>

    </div>

    <div class="steps-content"
         v-if="data && content">

      <div class="steps-content-step"
           :id="`step-${step.order}`"
           v-for="step in steps"
           :key="step.id">

        <div class="steps-content-step__idx">
          <span v-text="step.order"></span>
          <img :alt="step.title"
               :src="step.image.url"
               class="steps-content-step__image">
        </div>

        <div class="steps-content-step__content">
          <h4 class="ra-h ra-h--4 steps-content-step__title"
              v-text="step.title"></h4>
          <ContentRender :no-padding="true"
                         :content="getContent(step.content)"/>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { sortByField } from '~/utils/helpers'

export default {
  name: 'StepsSmall',

  components: {
    ContentRender: () => import(/* webpackChunkName: "ContentRender" */ '~/components/content')
  },

  props: {

    padding: {
      type:    Boolean,
      default: true
    },

    content: {
      type:    Boolean,
      default: false
    },

    showTitle: {
      type:    Boolean,
      default: true
    },

    data: {
      type: Object,
      default () {}
    }
  },

  computed: {
    steps () {
      if (!this.data || !this.data.steps) return
      return sortByField(this.data.steps, 'order')
    }
  },

  methods: {
    getContent ( content ) {
      if (!content) return
      return JSON.parse(content)
    }
  }
}
</script>

<style lang="sass">
@import "sass/steps"
</style>
