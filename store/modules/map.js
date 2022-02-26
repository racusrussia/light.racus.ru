import graphQl      from '~/api/graphQl'
import { Polygons } from '~/api/graphql/pages'

export const namespaced = true

export const state = () => ( {
  polygons: []
} )

export const mutations = {

  SET_POLYGON ( state, payload ) {
    state.polygons.push(payload)
  }

}

export const actions = {
  async GET_POLYGON ( { commit, state }, id ) {
    const loaded = state.polygons.find(i => i.id === id)
    if (loaded) return loaded.polygon
    else {
      const { polygon } = await graphQl.data(Polygons, { id })
      commit('SET_POLYGON', { id: id, polygon: polygon })
      return polygon
    }
  }
}
