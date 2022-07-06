import Orders from '@/models/Orders'

const OrderService = {
  async index(query) {
    return await Orders.params(query).get()
  },

  async find(id) {
    return await Orders.find(id)
  }
}

export default OrderService
