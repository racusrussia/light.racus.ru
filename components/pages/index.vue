<template>
  <div>

    <InfoHeader :title="title"
                :sub-title="subTitle"
                :header="header"/>

    <article class="">

      <h1 class="ra-page__title"
          v-if="!header">

      <span class="ra-h ra-h--1 "
            v-if="title"
            v-text="title"></span>

        <span class="ra-h ra-h--1 ra-h--light"
              v-if="subTitle"
              v-text="subTitle"></span>
      </h1>

      <div v-if="dynamic">
        <component v-for="(block, index) in dynamic"
                   :key="`block_${index}`"
                   :data="block.data"
                   :images="block.images"
                   :is="block.component"/>
      </div>
    </article>

    <Galley v-if="showGallery"
            :gallery="gallery"/>
  </div>
</template>

<script>

import ContentRender         from '~/components/content'
import InfoHeader            from '~/components/dynamic/InfoHeader'
import { dynamicComponents } from '~/utils/dynamic'

export default {
  name:       'Info',
  components: {
    ContentRender,
    InfoHeader,
    Galley: () => import(/* webpackChunkName: "Galley" */ '~/components/blocks/Galley')
  },

  props: {
    page: { type: Object, default () {} }
  },

  computed: {

    title () {
      return this.page?.pageTitle
    },

    subTitle () {
      return this.page?.subTitle
    },

    content () {
      if ( !this.page || !this.page.content ) return false
      const content = this.page.content
      return ( content ) ? JSON.parse( content ) : null
    },

    contentNotEmpty () {
      if ( !this.content ) return false
      if ( !this.content.blocks ) return false
      return !!this.content.blocks.length
    },

    gallery () {
      if ( !this.page || !this.page.gallery ) return false
      return this.page.gallery
    },

    showGallery () {
      if ( !this.page || !this.page.gallery ) return false
      return !!this.page.gallery.length
    },

    header () {
      if ( !this.page || !this.page.header || !this.page.header.show ) return false
      return this.page.header || {}
    },

    dynamic () {
      if ( !this.page ) return
      if ( !this.page.dynamic ) return
      return dynamicComponents( this.page.dynamic )
    }
  }
}
</script>
