import { UniversityIdBySlug } from '~/api/graphql/universities'
import { getParams }          from '~/utils/helpers'
import { Base }               from '../http/base'

const StrapiData = class extends Base {

  constructor () {
    super()
  }

  async page ( slug, lang = 'en', route = '/' ) {
    if (process.env.NODE_ENV === 'development') {
      console.log('slug', slug, lang)
    }
    return await this.http('GET', `${ route }${ slug }?_locale=${ lang }`)
  }

  async newsPage ( id, lang = 'en' ) {
    if (process.env.NODE_ENV === 'development') {console.log('slug', id, lang)}
    return await this.http('GET', `/news-lines/${ id }?_locale=${ lang }`)
  }

  async infoPage ( id, lang = 'en' ) { // type [ flat, tree, rfr ]
    if (process.env.NODE_ENV === 'development') {
      console.log('slug', id, lang)
    }
    return await this.http('GET', `/info-pages/${ id }?_locale=${ lang }`)
  }

  async count ( url, lang = 'en' ) {
    if (process.env.NODE_ENV === 'development') {
      console.log('count', url, lang)
    }
    return await this.http('GET', `/${ url }/count?_locale=${ lang }`)
  }

  async api ( method = 'GET', url, params ) { // type [ flat, tree, rfr ]
    if (process.env.NODE_ENV === 'development') {console.log('api', method, url, params)}
    return await this.http(method, `${ url }${ getParams(params) }`)
  }

  async messages ( lang = 'en' ) { // type [ flat, tree, rfr ]
    if (process.env.NODE_ENV === 'development') {console.log('messages', lang)}
    return await this.http('GET', `/messages?_locale=${ lang }`)
  }

  async infoPageById ( id ) {
    if (process.env.NODE_ENV === 'development') {
      console.log('pageById', id)
    }
    return await this.http('GET', `/info-pages/${ id }`)
  }

  async pressAboutUseById ( id ) {
    if (process.env.NODE_ENV === 'development') {
      console.log('pressAboutUseById', id)
    }
    return await this.http('GET', `/press-about-uses/${ id }`)
  }

  async UniversityById ( id ) {
    if (process.env.NODE_ENV === 'development') {
      console.log('UniversityBySlug', id)
    }
    return await this.http('GET', `/universities/${ id }`)
  }

  async loadCountry ( item ) {
    return await this.http('POST', `/countries`, item)
  }

  upload ( data ) {
    if (!data) return
    return this.http('POST', `/upload`, data, process.env.HOST_HTTP, true)
  }

}
export default new StrapiData()
