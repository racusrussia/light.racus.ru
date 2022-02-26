<template>

  <div class="nx-form">

    <div class="nx-form__outer"
         @click="close"></div>

    <transition name="panel"
                mode="out-in"
                appear>

      <!--FORM COMPLETE-->
      <div key="complete"
           class="nx-form-complete">
        <IconVerified/>
        <div class="nx-form-complete__title"
             v-text="completeTitle"></div>
        <div class="nx-form-complete__description"
             v-text="completeText"></div>
      </div>

    </transition>
  </div>
</template>

<script>

export default {
  name:       'FormComplete',
  components: {
    IconVerified: () => import(/* webpackChunkName: "IconClose" */ '~/assets/svg/verified.svg?inline')
  },

  mounted () {
    if (process.client) {
      this.$store.commit('BLOCK_BODY')
      this.start = true
      this.close()
    }
  },

  beforeDestroy () {
    this.$store.commit('UNBLOCK_BODY')
  },

  computed: {

    form () {
      return this.$store.state.modules.layout.modalForm
    }
  },

  data () {
    return {
      delay:          400,
      closeDelay:     3500,
      start:          false,
      complete:       false,
      scrollPosition: 0,
      body:           null,
      completeTitle:  'Заявка принята',
      completeText:   'Спасибо! Ваша заявка отправлена и в ближайшее время наши специалисты свяжуться с вами для уточнения условий.'
    }
  },

  methods: {

    close () {
      setTimeout(() => {
        this.start = false
        setTimeout(() => {
          this.$store.commit('modules/layout/MODAL_COMPLETE_CLOSE')
        }, this.delay)
      }, this.closeDelay)
    }
  }
}
</script>
