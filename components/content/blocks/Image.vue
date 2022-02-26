<template>

  <figure class="ra-content__media"
          v-lazyLoad
          :class="{
            'ra-content__media--stretch': content.stretched,
            'ra-content__media--bgr': content.withBackground,
            'ra-content__media--border': content.withBorder,
          }">

    <!--<a @click.prevent="showModalImage(data.id)"-->
    <!--   class="ra-docs-content__image-outer">  </a>-->
    <img class="ra-content__media-image"
         :src="imageUrl"
         :data-src="imageUrl"
         :alt="content.caption">

    <!--<video controls-->
    <!--       muted-->
    <!--       preload="metadata"-->
    <!--       v-else-if="fileType === 'video'"-->
    <!--       :src="imageUrl"/>-->

    <!--<div v-else-->
    <!--     class="ra-docs-content__download">-->
    <!--  <a :href="downloadUrl"-->
    <!--     v-text="downloadUrl"></a>-->
    <!--  <div></div>-->
    <!--</div>-->

    <figcaption class="ra-content__media-caption"
                v-if="content.caption"
                v-text="content.caption"></figcaption>
  </figure>

</template>

<script>
import { fileType } from '~/utils/enum'

export default {
  name: 'ImageBlock',

  props: {
    data: {
      type:    Object,
      default: {}
    }
  },

  data () {
    return {}
  },

  computed: {

    fileType () {return fileType[ this.content.mime ]},
    downloadUrl () {return this.content.url},

    imageUrl () {
      if (this.content) {
        return this.content.url
      }
      else {
        return null
      }
    },

    content () {
      if (!this.data || !this.data.data) return
      return {
        caption:        this.data.data.caption,
        stretched:      this.data.data.stretched,
        withBackground: this.data.data.withBackground,
        withBorder:     this.data.data.withBorder,
        url:            this.data.data.file.url,
        //mime:           this.data.data.file.mime,
        size: this.data.data.file.size
        //formats:        this.data.data.file.formats,
        //large:          ( this.data.data.file.formats ) ? this.data.data.file.formats.large : null
      }

    }
  },

  methods: {

    showModalImage ( id ) {
      this.$emit('modal-image', id)
    }
  }
}
</script>
