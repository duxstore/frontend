import Model from './Model'
import Products from './Products'
import Customers from './Customers'

export default class Orders extends Model {
  // Set the resource route of the model
  resource() {
    return 'orders' // GET /orders
  }

  // Method -> Order.makeBirthday()
  // Apply model instances to eager loaded relationships
  relations() {
    return {
      products: Products,
      customer: Customers,
    }
  }
}
