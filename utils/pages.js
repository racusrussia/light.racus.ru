export const LocalePageId = ( context, code, page ) => {

  if (!page) {
    return context.error({ statusCode: 404, message: context.app.i18n.t('page_not_found') })
  }

  let locale = ( page.locale === code )
    ? page
    : page.localizations.find(i => i.locale === code)

  return ( locale ) ? locale.id : page.id
}

export const PageMeta = ( context, page, image = null ) => {

  const pageUrl   = process.env.HOST_HTTP + context.route.path
  const pageImage = ( image ) ? image : context.store.state.config?.logo?.url

  return {
    title:    page?.meta?.seoTitle,
    meta:     [
      { hid: 'description', name: 'description', content: page?.meta?.seoDescription },
      { hid: 'og:title', name: 'og:title', property: 'og:title', content: page?.meta?.seoTitle },
      { hid: 'og:description', name: 'og:description', property: 'og:description', content: page?.meta?.seoDescription },
      { hid: 'og:url', name: 'og:url', property: 'og:url', content: pageUrl },
      { hid: 'og:image', name: 'og:image', property: 'og:image', content: pageImage }
    ],
    noscript: [ { innerHTML: 'Body No Scripts', body: true } ]
  }
}

export const NewsMeta = ( context, page ) => {

  const pageUrl   = process.env.HOST_HTTP + context.route.path
  const { image } = page
  const seoImage  = image?.formats?.medium?.url
  const pageImage = ( seoImage ) ? seoImage : context.store.state.config?.logo?.url

  return {
    title:    page?.title,
    meta:     [
      { hid: 'description', name: 'description', content: page?.title },
      { hid: 'og:title', name: 'og:title', property: 'og:title', content: page?.title },
      { hid: 'og:description', name: 'og:description', property: 'og:description', content: page?.title },
      { hid: 'og:url', name: 'og:url', property: 'og:url', content: pageUrl },
      { hid: 'og:image', name: 'og:image', property: 'og:image', content: pageImage }
    ],
    noscript: [ { innerHTML: 'Body No Scripts', body: true } ]
  }
}
