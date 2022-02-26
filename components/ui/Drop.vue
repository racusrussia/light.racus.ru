<template>
  <ul class="ra-drop"
      v-click-outside="close">

    <li class="ra-drop__item"
        v-for="item in data"
        :key="item.id">

      <span class="ra-drop__link"
            role="link"
            v-text="item[keyName]"
            @click="click(item)"></span>

    </li>
  </ul>
</template>

<script>
export default {
  name: 'Drop',

  props: {

    keyName: {
      type:    String,
      default: 'name'
    },

    data: {
      type: Array,
      default () {}
    }
  },

  methods: {

    click ( el ) {
      this.$emit('click', el)
      this.close()
    },

    close ( el ) {
      this.$emit('close')
    }
  }
}
</script>
