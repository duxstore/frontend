import Orders from '@/models/Orders'

const OrderService = {
  async index(query) {
    return await Orders.params(query).get()
  },
}

export default OrderService
