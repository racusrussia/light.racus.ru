<template>
  <div class="ra-choose-program">
    <button class="ra-button ra-button--danger ra-button--pill ra-button__arrow"
            :class="{'ra-button__arrow--active':  chooseProgram}"
            @click="chooseProgram = !chooseProgram">
      <span v-text="$t('choose_program')"></span>
    </button>

    <transition name="slide-top"
                appear
                mode="in-out">

      <Drop v-if="chooseProgram"
            @close="chooseProgram = false"
            @click="selectProgram($event)"
            :data="types"/>

    </transition>
  </div>
</template>

<script>
export default {
  name: 'ChooseProgram',

  components: {
    Drop: () => import(/* webpackChunkName: "Drop" */ '~/components/ui/Drop')
  },

  props: {
    universitiesTypes: {
      type: Array,
      default () {}
    }
  },

  data () {
    return {
      chooseProgram: false
    }
  },

  computed: {
    types () {
      if (!this.universitiesTypes && !!this.universitiesTypes.length) return
      return this.universitiesTypes.filter(i => +i.id !== 25)
    }
  },

  methods: {

    selectProgram ( el ) {
      this.chooseProgram = false
      const { name }     = el
      if (!name) return
      this.$router.push(this.localePath({ path: `/applicant/universities`, query: { type: name } }))
    }
  }
}
</script>

<style lang="sass">
.ra-choose-program
  display: inline-block
  position: relative
</style>
