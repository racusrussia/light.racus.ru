<template>
  <div>
    <nav class="ra-tabs"
         v-if="data && !showDrop">
      <a class="ra-tabs__item"
         v-if="all"
         @click.prevent="click(null)"
         :class="{'ra-tabs__item--active': !active}"
         v-text="all"></a>

      <a class="ra-tabs__item"
         @click.prevent="click(item)"
         v-for="item in data"
         :key="item.id"
         :class="{'ra-tabs__item--active': active === item}"
         v-text="item[nameKay]"></a>
    </nav>

    <div class="ra-tabs"
         v-else-if="data && showDrop">
      <div class="ra-tabs__drop">

        <button class="ra-button ra-button--danger ra-button--pill ra-button__arrow"
                :class="{'ra-button__arrow--active':  drop}"
                @click="drop = !drop">
          <span v-text="(active) ? active[nameKay] : all"></span>
        </button>

        <transition name="slide-top"
                    appear
                    mode="in-out">

          <Drop v-if="drop"
                @close="drop = false"
                @click="click($event)"
                :key-name="nameKay"
                :data="data"/>

        </transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:       'Tabs',
  components: {
    Drop: () => import(/* webpackChunkName: "Drop" */ '~/components/ui/Drop')
  },

  props: {

    nameKay: {
      type:    String,
      default: 'name'
    },

    all: {
      type:    String,
      default: null
    },

    data: {
      type: Array,
      default () {}
    }
  },

  mounted () {
    if (!this.all) {
      this.active = this.data[ 0 ]
      this.$emit('click', this.active)
    }
  },

  data () {
    return {
      active:      null,
      drop:        false,
      dropDevices: [ 'phone', 'tablet-small', 'tablet-portrait', 'tablet-landscape' ]
    }
  },

  computed: {

    device () {return this.$store.getters[ 'modules/layout/device' ]},
    showDrop () {return this.dropDevices.includes(this.device)}
  },

  methods: {

    click ( el ) {
      this.active = el
      this.$emit('click', el)
    }
  }
}
</script>
