import CollectionService from '@/services/CollectionService.js'

const state = () => ({
  collections: null,
})

const mutations = {
  setCollections(state, collections) {
    state.collections = collections
  },
}

const getters = {}

const actions = {
  index({ commit }) {
    const categories = CollectionService.index({})
    categories.then((response) => {
      commit('setCollections', response)
    }, console.error)
  },
}

export default {
  namespaced: true,
  actions,
  getters,
  mutations,
  state,
}
