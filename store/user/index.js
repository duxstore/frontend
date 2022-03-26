export const state = () => ({
  auth: false,
  user: null,
})

export const mutations = {
  setAuthStatus(state, status) {
    state.auth = status
  },
  setAuthenticatedUser(state, user) {
    state.user = user
  },
  setAuthenticationError(state, error) {
    state.error = error
  },
}

export const getters = {
  user: (state) => {
    return state.user
  },
  // email: (state, getters, rootState) => {
  //     return state.email;
  // }
}

export const actions = {
  /**
   *
   * @param {*} user is a custom Form object
   */
  login({ commit, rootState }, user) {
    // inform the global state we are doing some asynchronous action
    // rootState.busy = true

    user
      .login()
      .then((response) => {
        // rootState.busy = false
        // init localstorage
        const localStorage = window.localStorage

        if (Object.prototype.hasOwnProperty.call(response, 'user')) {
          // router.push({name: 'Overview'});

          // store some items in local storage
          localStorage.setItem('auth', true)
          localStorage.setItem('user', JSON.stringify(response.user))
          localStorage.setItem('store', JSON.stringify(response.store))

          // commit changes to the store
          commit('setAuthStatus', true)
          commit('setAuthenticatedUser', response.user)
          commit('store/setStore', response.store, { root: true })
        }
      })
      .catch((error) => {
        rootState.busy = false

        // if the error is not auth error, log it bugsnap or something
        // eslint-disable-next-line no-console
        console.log(error.response)
      })
  },

  register(user) {
    user.submit(`/sign-up?step=${user.step}`).then((res) => {
      // eslint-disable-next-line no-console
      console.log('registered user', res)
    })
  },
}
