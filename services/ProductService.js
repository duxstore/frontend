import Products from '@/models/Products'

const ProductService = {
  async index(query) {
    return await Products.params(query).get()
  },

  async find(id) {
    // /products?id=id
    return await Products.find(id)
  },

  async getById(id) {
    return await Products.where('id', id).get()
  },
}

export default ProductService
