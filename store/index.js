import graphQl                                                   from '~/api/graphQl'
import { PhoneMasks }                                            from '~/api/graphql/main'
import { TopNav, TopNavName }                                    from '~/api/graphql/nav'
import { UniversitiesTypes }                                     from '~/api/graphql/pages'
import StrapiData                                                from '~/api/query/strapi'
import { getToken }                                              from '~/utils/helpers'
import { NavAttached, NavFlatter, NavLocaleNames, NavLocalized } from '~/utils/nav'

export const namespaced = true

export const state = () => ( {
  config:            null,
  contacts:          null,
  pageTitle:         null,
  device:            null,
  ip:                null,
  reload:            null,
  topMenu:           null,
  topMenuAttached:   null,
  topMenuFlat:       null,
  topMenuRender:     null,
  topMenuNames:      null,
  phoneMasks:        null,
  universitiesTypes: null,
  body:              {
    scrollPosition: null,
    styles:         null,
    el:             null
  }
} )

export const mutations = {

  RELOAD ( state ) {state.reload = getToken()},
  CONFIG ( state, payload ) {state.config = payload},
  SET_IP ( state, payload ) {state.ip = payload},
  SET_PHONE_MASKS ( state, payload ) {state.phoneMasks = payload},
  TOP_MENU ( state, payload ) {state.topMenu = payload},
  TOP_MENU_ATTACHED ( state, payload ) {state.topMenuAttached = payload},
  TOP_MENU_FLAT ( state, payload ) {state.topMenuFlat = payload},
  TOP_MENU_RENDER ( state, payload ) {state.topMenuRender = payload},
  TOP_MENU_NAMES ( state, payload ) {state.topMenuNames = payload},
  SET_DEVICE_TYPE ( state, payload ) {state.device = payload},
  UNIVERSITIES_TYPES ( state, payload ) {state.universitiesTypes = payload},
  BLOCK_BODY ( state ) {
    if (process.browser) {
      state.body.el                = document.getElementsByTagName('body')[ 0 ]
      state.body.scrollPosition    = window.pageYOffset
      state.body.el.style.overflow = 'hidden'
      state.body.el.style.position = 'fixed'
      state.body.el.style.right    = 0
      state.body.el.style.left     = 0
      state.body.el.style.top      = -state.body.scrollPosition + 'px'
    }
  },
  UNBLOCK_BODY ( state ) {
    if (process.browser) {
      state.body.el.style = null
      window.scrollTo(0, state.body.scrollPosition)

    }
  }
}

export const actions = {

  async GET_TOP_MENU ( { commit, state }, code ) {
    if (state.topMenu) return state.topMenu
    const { renderNavigation } = await graphQl.data(TopNav)

    //const flatMenu             = await graphQl.data(TopNav, { type: 'FLAT' })
    const { infoPages } = await graphQl.data(TopNavName, { locale: code })
    let nav             = null
    let navLocaleNames  = null
    Promise.all([ renderNavigation, infoPages ])
           .then(() => {
             const flatMenu     = NavFlatter(renderNavigation)
             const attachedMenu = NavAttached(renderNavigation)
             navLocaleNames     = NavLocaleNames(infoPages)
             nav                = NavLocalized(attachedMenu, navLocaleNames)
             commit('TOP_MENU', nav)
             commit('TOP_MENU_FLAT', flatMenu)
             commit('TOP_MENU_ATTACHED', attachedMenu)
             commit('TOP_MENU_NAMES', navLocaleNames)
             commit('TOP_MENU_RENDER', renderNavigation)
           })

    return ( nav ) ? nav : null
  },

  async GET_CONFIG ( { commit, state }, code ) {
    //if (state.config) return state.config
    const data = await StrapiData.page('config', code)
    commit('CONFIG', data)
    return data
  },

  async GET_PHONE_MASKS ( { commit, state }, code ) {
    if (state.phoneMasks) return state.phoneMasks
    const { countries } = await graphQl.data(PhoneMasks)
    commit('SET_PHONE_MASKS', countries)
    return countries
  },

  async GET_UNIVERSITIES_TYPES ( { commit, state }, code ) {
    const { universitiesTypes } = await graphQl.data(UniversitiesTypes, { locale: code = 'en' })
    commit('UNIVERSITIES_TYPES', universitiesTypes)
    return universitiesTypes
  }
}

export const getters = {

  copyRight ( state ) {
    return state.config?.copyRight
  },

  phoneMasks ( state ) {
    return state?.phoneMasks
  },

  siteName ( state ) {
    return state.config?.siteName
  },

  contacts ( state ) {
    return {
      address: state.config?.contact?.address,
      emails:  state.config?.contact?.emails,
      phones:  state.config?.contact?.phones,
      geo:     state.config?.contact?.geo
    }
  },

  logo ( state ) {return state.config?.logo},

  logoContrast ( state ) {return state.config?.logoContrast},

  social ( state ) {
    return {
      facebook:  state.config?.facebook,
      instagram: state.config?.instagram,
      twitter:   state.config?.twitter,
      youtube:   state.config?.youtube
    }
  }

}
