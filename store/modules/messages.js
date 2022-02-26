import strapi from '~/api/query/strapi'

export const namespaced = true

export const state = () => ( {
  messages: []
} )

export const mutations = {

  SET_LOCALE ( state, payload ) {
    if (!payload) return
    state.messages.push(payload)
  }

}

export const actions = {

  async GET_LOCALE ( { commit, state }, locale ) {
    if (!locale) return
    const current = state.messages.find(i => i.locale === locale)

    if (!current) {
      const messages = await strapi.messages(locale)
      commit('SET_LOCALE', { locale, messages })
    }
    commit('RELOAD', null, { root: true })
  }
}

export const getters = {

  locales ( state ) {
    return state.messages
  }

}
