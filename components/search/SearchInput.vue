<template>

  <form class="ra-search-input"
        :class="{'ra-search-input--border': border}">

    <input type="search"
           @change="send"
           @keydown="send"
           :disabled="disabled"
           class="ra-search-input__field"
           :placeholder="$t('search')"
           v-model="request">

    <button type="submit"
            @click="send"
            :disabled="disabled"
            class="ra-search-input__submit">

    </button>
  </form>
</template>

<script>
export default {

  name: 'SearchInput',

  props: {

    disabled: {
      type:    Boolean,
      default: false
    },

    border: {
      type:    Boolean,
      default: false
    }

  },

  data () {
    return {
      request: ''
    }
  },

  methods: {

    send () {
      this.$emit('send', this.request)
    },

    search () {
      this.$emit('search', this.request)
    }
  }
}
</script>
