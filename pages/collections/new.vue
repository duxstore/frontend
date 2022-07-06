<template>
  <div class="py-10">
    <div class="flex flex-col space-y-4">
      <form
        class="flex flex-row space-x-4"
        @keyup="form.errors.clear()"
        @submit.prevent="create"
      >
        <div class="w-full">
          <div class="card">
            <div class="form-group flex flex-col p-3">
              <label for="name" class="font-bold cursor-pointer">Collection name</label>
              <input
                id="name"
                v-model="form.name"
                type="text"
                required
                class="md:w-full w-4/12 border card outline-none focus-within:bg-gray-50 bg-black"
              />
            </div>

            <div class="form-group flex flex-col p-3">
              <label for="description" class="font-bold cursor-pointer"
                >Description</label
              >
              <vue-trix
                id="description"
                v-model="form.description"
                placeholder="Enter content"
              ></vue-trix>
            </div>
          </div>

          <!-- Media -->
          <div class="card my-3">
            <div class="form-group-double flex flex-row justify-between">
              <div class="flex flex-col p-3 w-full">
                <label for="media" class="font-bold cursor-pointer"
                  >Media</label
                >
                <file-uploader :multiple="false" :endpoint="uploadEndpoint" @url="handleUrl"></file-uploader>
              </div>
            </div>
          </div>

          <button type="submit" :disabled="form.media_url === null" class="btn-md btn-primary bg-blue-300">
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import FileUploader from '@/components/Product/FileUploader.vue'
import CollectionService from '~/services/CollectionService'
export default {
  auth: true,
  name: 'NewCollection',
  components: {
    FileUploader,
  },
  layout: 'app',
  data() {
    return {
      collection: [],
      form: this.$form({
        id: 0,
        media_url: null,
        description: null,
        hasAutomation: 0,
        name: null,
      })
    }
  },
  computed: {
    uploadEndpoint () {
      return `${this.$storeUrl}/collections/${this.form.id}/media`
    }
  },
  mounted () {
    this.init()

    // Set page title
    this.$store.commit('app/setTitle', 'New Collection')
  },
  methods: {
    handleUrl (url) {
      this.form.media_url = url
    },
    create () {
      this.form.post('/collections')
      .then((result) => {
        this.$notify({
          type: 'success',
          title: 'Collection created successfully',
          text: `Your collection ${this.form.name} has been created successfully`
        })
        this.form.reset()
      }).catch((err) => {
        this.$notify({
          group: 'app',
          title: 'Something went wrong',
          text: err.message
        });
        console.log('Error submitting: ', err)
      });
    },
    async init () {
      // A dummy create, so we can have collection instance (esp. id)
      this.collection = await CollectionService.create({init: true})
      this.form.id = this.collection.id
    }
  },
}
</script>

<router>
{
  name: 'collection-new'
}
</router>
