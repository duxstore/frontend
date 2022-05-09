export const state = () => ({
  busy: false,
  title: false
})

export const mutations = {
  setTitle(state, title) {
    state.title = title
  }
}

export const getters = {
  title (state) {
    return state.title
  },
  user(state) {
    return state.user
  },
}
