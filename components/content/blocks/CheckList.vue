<template>
  <ul class="ra-content__checklist">
    <li class="ra-content__checklist-item" v-for="item in content">
      <span class="ra-checkbox"
            :class="{checked: item.checked}"></span>
      <span v-html="item.text"></span>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'CheckList',

  props: {
    data: {
      type:    Object,
      default() {}
    }
  },

  data () {
    return {}
  },

  computed: {
    content () {
      return (this.data && this.data.data) ? this.data.data.items : null
    }
  }
}
</script>
