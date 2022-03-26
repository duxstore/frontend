import ProductService from '@/services/ProductService.js'

const state = () => ({
  products: null,
  product: null,
  error: null,
  // used when editing/creating a product
  variation: {
    variations: null,
    inventory: null,
  },
})

const mutations = {
  setProducts(state, products) {
    state.products = products
  },
  setProduct(state, product) {
    state.product = product
  },
  setError(state, error) {
    state.error = error
  },
  setVariation(state, variation) {
    state.variation.variations = variation
  },
  setVariationInventory(state, inventory) {
    state.variation.inventory = inventory
  },
}

const getters = {
  productError: (state) => {
    return state.error
  },
  product: (state) => {
    return state.product
  },
  variations: (state) => {
    return state.variation
  },
}

const actions = {
  index({ commit }) {
    const products = ProductService.index({})
    products.then((response) => {
      commit('setProducts', response)
    }, console.error)
  },

  get({ commit }, id) {
    const product = ProductService.getById(id)
    product.then((response) => {
      commit('setProduct', response)
    }, console.error)
  },

  save({ commit }, form) {
    return form
      .post('/products', {
        step: 'save',
      })
      .then((res) => {
        const data = res.data
        commit('setProduct', data)
      })
      .catch((err) => {
        commit('setError', err)
      })
  },

  removeVariation({ state }, variationIndex) {
    state.variation.splice(variationIndex, 1)
  },
}

export default {
  namespaced: true,
  actions,
  getters,
  mutations,
  state,
}
