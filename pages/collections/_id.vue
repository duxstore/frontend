<template>
  <div v-if="!$fetchState.pending" class="py-10">
    <div class="flex flex-col space-y-4">
      <form
        class="flex flex-row space-x-4"
        @submit.prevent="save"
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
                <file-uploader :multiple="false" :existing-files="[{source: form.media_url }]" :endpoint="uploadEndpoint" @url="handleUrl"></file-uploader>
              </div>
            </div>
          </div>

          <button type="submit" :disabled="$fetchState.pending || (form.media_url && form.media_url.length === 0)" class="btn-md btn-primary bg-blue-300">
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
  name: 'SingleCollection',
  components: {
    FileUploader,
  },
  layout: 'app',
  data() {
    return {
      collection: [],
      form: this.$form({
        id: 0,
        media_url: [],
        description: null,
        hasAutomation: 0,
        name: null,
      })
    }
  },
  async fetch () {
    const result = await CollectionService.get(this.$nuxt.context.route.params.id)
    this.form.id = result.id
    this.form.media_url = result.media
    this.form.description = result.description
    this.form.hasAutomation = result.hasAutomation
    this.form.name = result.name

    // Set page title
    this.$store.commit('app/setTitle', this.form.name)
  },
  computed: {
    uploadEndpoint () {
      return `${this.$storeUrl}/collections/${this.form.id}/media`
    }
  },
  mounted () {},
  methods: {
    handleUrl (url) {
      this.form.media_url = url
    },
    save () {
      this.form.post('/collections')
      .then((result) => {
        this.$notify({
          type: 'success',
          title: 'Collection updated successfully',
          text: `Your collection ${this.form.name} has been created successfully`
        })
        console.log('Create submit: ', result)
      }).catch((err) => {
        this.$notify({
          type: 'error',
          title: 'An error has occurred',
          text: err.message
        })
        console.log('Create submit: ', err)
      });
    }
  },
}
</script>

<router>
{
  name: 'collection-single'
}
</router>
