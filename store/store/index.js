const state = () => ({
  store: null,
})

const mutations = {
  setStore(state, store) {
    state.store = store
  },
}

const getters = {
  getShortname(state) {
    return state.store.shortname
  },
}

const actions = {}

export default {
  namespaced: true,
  actions,
  getters,
  mutations,
  state,
}
