export const namespaced = true

export const state = () => ({
  show:      false,
  title:     null,
  position:  null,
  component: null,
  data:      null
})

export const mutations = {

  CLOSE(state) {
    state.show = false
    state.title = null
    state.position = null
    state.component = null
    state.data = null
  },

  OPEN(state, payload) {
    if (!payload) return
    this.commit('CLOSE_PANEL')

    state.show = true
    state.title = payload.title || null
    state.position = payload.position || 'right'
    state.component = payload.component || null
    state.data = payload.data || null
  }
}

export const actions = {}

export const getters = {}


