import Model from './Model'

export default class Collections extends Model {
  // Set the resource route of the model
  resource() {
    return 'collections'
  }

  primaryKey() {
    return 'id'
  }
}
