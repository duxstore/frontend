import ProductService from '@/services/ProductService.js'

const state = () => ({
  products: null,
  product: null,
  error: null,
  // used when editing/creating a product
  variation: {
    variations: [],
    inventory: [],
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
  addTmpVariantFields(state) {
    state.variation.variations.map(v => {
      v.variant = ''
      return true
    })
  },
  addFirstVariation(state, productId) {
    state.variation.variations.push({
      type: 'size',
      values: [],
      variant: '',
      product_id: productId,
    })
  },
  setVariation(state, variation) {
    state.variation.variations = variation
  },
  setVariationInventory(state, inventory) {
    state.variation.inventory = inventory
  },
  addVariation(state, variation) {
    state.variation.variations.push(variation)
  },
  addInventoryToVariation(state, inventory) {
    // eslint-disable-next-line no-console
    console.log(state, state.variation, inventory)
    state.variation.inventory.push(inventory)
  },
  updateInventory(state, item) {
    // eslint-disable-next-line no-console
    console.log(state, item)
  },
  setProductMedia (state, url) {
    state.product.media_library.push(url)
  },
  removeVariation(state, variationIndex) {
    state.variation.variations.splice(variationIndex, 1)
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
    return state.variation.variations
  },
  inventory: (state) => {
    return state.variation.inventory
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
  }
}

export default {
  namespaced: true,
  actions,
  getters,
  mutations,
  state,
}
