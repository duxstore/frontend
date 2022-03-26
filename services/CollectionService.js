import Collections from '@/models/Collections'

const CollectionService = {
  async index(query) {
    return await Collections.params(query).get()
  },
}

export default CollectionService
