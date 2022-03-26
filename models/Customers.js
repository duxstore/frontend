import Model from './Model'

export default class Customers extends Model {
  // Set the resource route of the model
  resource() {
    return 'customers' // GET /customers
  }

  primaryKey() {
    return 'id'
  }
}
