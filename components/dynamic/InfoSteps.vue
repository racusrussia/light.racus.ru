<template>
  <div>

    <StepsSmall v-if="steps"
                :padding="false"
                :show-title="false"
                :content="true"
                :data="steps"/>

  </div>
</template>

<script>
import graphQl    from '~/api/graphQl'
import { Steps }  from '~/api/graphql/pages'
import StepsSmall from '~/components/blocks/StepsSmall'

export default {
  name:       'InfoSteps',
  components: { StepsSmall },

  data () {
    return {
      steps: null
    }
  },

  computed: {
    code () {
      return this.$i18n.localeProperties.code
    }
  },

  async mounted () {
    await this.load()
  },

  methods: {

    async load () {

      const { howItWork } = await graphQl.data(Steps, { locale: this.code })
      if (!howItWork) return
      this.title    = howItWork.title
      this.subTitle = howItWork.subTitle
      this.steps    = howItWork
    }
  }
}
</script>

<style lang="sass">
@import "components/blocks/sass/steps"
</style>
