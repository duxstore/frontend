import Collections from '@/models/Collections'

const CollectionService = {
  async index(query) {
    return await Collections.params(query).get()
  },

  create (data) {
    const collection = new Collections(data)
    return collection.save()
  },

  async get (id) {
    return await Collections.find(id)
  }
}

export default CollectionService
