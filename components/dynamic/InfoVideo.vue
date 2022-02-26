<template>
  <!--Youtube-->
  <aside class="ra-section ra-section--medium"
         v-if="url">
    <div class="cx-iframe-wrapper__outer">
      <div class="cx-iframe-wrapper">
        <iframe class="cx-iframe-wrapper__iframe"
                width="1920"
                height="1080"
                :src="url"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
      </div>
    </div>
  </aside>
</template>

<script>
import { getParams } from '~/utils/helpers'

export default {
  name:  'InfoVideo',
  props: {

    data: { type: Object, default () {} }

  },

  data () {
    return {
      youtubeParams: {
        controls:       0,
        autoplay:       1,
        enablejsapi:    0,
        hl:             'en',
        iv_load_policy: 3,
        modestbranding: 1,
        rel:            0,
        showinfo:       0
      }
    }
  },

  mounted () {
    this.selIndex = 0

    const { code }        = this.$i18n.localeProperties
    this.youtubeParams.hl = ( code ) ? code : 'en'

  },

  computed: {
    url () {
      const url = this.data?.url

      if (!url) return null
      if (url && typeof url === 'string') {
        const id = url.replace('https://youtu.be/', '')
        return `https://www.youtube.com/embed/${ id }${ getParams(this.youtubeParams) }`
      }

    }
  }

}
</script>

<style lang="sass">
@import "assets/sass/mixins"
@import "assets/sass/variables"

.cx-iframe-wrapper
  position: relative
  overflow: hidden
  width: 100%
  padding-top: 56.25%
  height: 100%

  &__outer
    max-width: $device-tablet-landscape
    margin: 0 auto

  &__iframe
    @include cover
    width: 100%
    height: 100%
    border-radius: $ra-border-radius * 5
    overflow: hidden
</style>
