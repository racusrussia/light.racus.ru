<template>
  <div class="ra-header__social"
       v-if="social">

          <span v-if="social.facebook"
                class="ra-header__social-item ra-header__social-item--facebook"
                role="link"
                @click.prevent="go(social.facebook)"></span>

    <span v-if="social.instagram"
          class="ra-header__social-item ra-header__social-item--instagram"
          role="link"
          @click.prevent="go(social.instagram)"></span>

    <span v-if="social.twitter"
          class="ra-header__social-item ra-header__social-item--youtube"
          role="link"
          @click.prevent="go(social.youtube)"></span>
  </div>
</template>

<script>
import { showOnDevice } from '~/utils/helpers'

export default {
  name: 'HeaderSocial',

  computed: {
    social () {return this.$store.getters.social},
    device () {return this.$store.getters[ 'modules/layout/device' ]}
  },

  methods: {

    go ( url ) {
      window.open(url, '_blank')
    }
  }
}
</script>
