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

  create(data) {
    const product = new Products(data)
    return product.save()
  }
}

export default ProductService
