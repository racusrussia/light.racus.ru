<template>
  <div class="ra-content"
       :class="{'ra-content--no-padding': noPadding}">
    <component :id="block.id"
               v-for="block in blocks"
               :is="getComponent(block)"
               @modal-image="openModal($event)"
               :data="block"
               :key="block.id"/>

    <div class="ra-text-center"
         v-if="limit">
      <button class="ra-button ra-button--danger-border ra-button--pill"
              v-text="(!show) ? $t('show_more') : $t('hide')"
              @click="show = !show"></button>
    </div>
  </div>
</template>

<script>
import { clone } from '~/utils/helpers'

export default {
  name: 'ContentRender',

  components: {
    Header:     () => import(/* webpackChunkName: "Header" */ '~/components/content/blocks/Header'),
    Paragraph:  () => import(/* webpackChunkName: "Paragraph" */ '~/components/content/blocks/Paragraph'),
    Raw:        () => import(/* webpackChunkName: "Raw" */ '~/components/content/blocks/Raw'),
    Delimiter:  () => import(/* webpackChunkName: "Delimiter" */ '~/components/content/blocks/Delimiter'),
    CheckList:  () => import(/* webpackChunkName: "CheckList" */ '~/components/content/blocks/CheckList'),
    List:       () => import(/* webpackChunkName: "List" */ '~/components/content/blocks/List'),
    Table:      () => import(/* webpackChunkName: "Table" */ '~/components/content/blocks/Table'),
    Quote:      () => import(/* webpackChunkName: "Quote" */ '~/components/content/blocks/Quote'),
    Warning:    () => import(/* webpackChunkName: "Warning" */ '~/components/content/blocks/Warning'),
    ImageBlock: () => import(/* webpackChunkName: "ImageBlock" */ '~/components/content/blocks/Image')
  },
  props:      {

    noPadding: {
      type:    Boolean,
      default: false
    },

    limit: {
      type:    Boolean,
      default: false
    },

    showBlocks: {
      type:    Number,
      default: 3
    },

    content: {
      type: Object,
      default () {}
    }
  },

  data () {
    return {
      show:           false,
      componentsName: {
        header:    'Header',
        paragraph: 'Paragraph',
        raw:       'Raw',
        delimiter: 'Delimiter',
        checklist: 'CheckList',
        list:      'List',
        table:     'Table',
        quote:     'Quote',
        warning:   'Warning',
        image:     'ImageBlock'
      }
    }
  },

  computed: {
    blocks () {
      const blocks         = ( this.content ) ? this.content.blocks : null
      const notEmptyBlocks = ( blocks && blocks.length )
        ? blocks.filter(i => i.id && i.type)
        : null

      if (process.env.NODE_ENV === 'development') console.log('notEmptyBlocks', notEmptyBlocks)
      if (!notEmptyBlocks) return null
      if (!this.limit) return notEmptyBlocks
      if (!notEmptyBlocks || !notEmptyBlocks.length) return

      if (this.show) return notEmptyBlocks
      const blocksNew  = clone(notEmptyBlocks)
      blocksNew.length = this.showBlocks
      return blocksNew

    }
  },

  methods: {

    openModal ( id ) {
      this.selectedImage = id
      this.$store.commit('modules/modal/OPEN', {
        active: id,
        list:   this.images
      })
    },

    getComponent ( block ) {
      if (process.env.NODE_ENV === 'development') console.log('block', block?.type, block)
      if (!this.blocks) return null
      if (!block || !block.type) return null
      const componentName = this.componentsName[ block.type ]
      return ( componentName ) ? componentName : null
    }
  }
}
</script>
