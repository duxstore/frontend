<template>
  <div>
    <file-pond
      ref="pond"
      name="files"
      label-idle="Drop files here..."
      :allow-multiple="true"
      :server="myCustomServerUpload"
      accepted-file-types="image/*"
      :files="myFiles"
      @init="handleFilePondInit"
      @addfilestart="updateEndpoint"
    />
  </div>
</template>

<script>
import vueFilePond from 'vue-filepond'
import 'filepond/dist/filepond.min.css'
import axios from 'axios'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import { mapGetters, mapState } from 'vuex'

// Create component
const FilePond = vueFilePond(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview
)

export default {
  name: 'App',
  data() {
    return {
      endpoint: null,
      myFiles: [],
      myCustomServerUpload: {
        process: (fieldName, file, metadata, load, error, progress) => {
          // files is the name of the input field
          // file is the actual file object to send
          const formData = new FormData()
          formData.append(fieldName, file, file.name)
          formData.append('productId', this.product.id)

          // related to aborting the request
          const CancelToken = axios.CancelToken
          const source = CancelToken.source()

          axios
            .post(this.endpoint, formData, {
              cancelToken: source.token,
              onUploadProgress(e) {
                progress(e.lengthComputable, e.loaded, e.total)
              },
            })
            .then((response) => {
              load(response.data.responseText)
            })
            .catch((thrown) => {
              if (axios.isCancel(thrown)) {
                console.log('Request canceled', thrown.message)
              } else {
                // handle error
              }
            })

          // Should expose an abort method so the request can be cancelled
          return {
            abort: () => {
              source.cancel('Operation cancelled by user')
            },
          }
        },
      },
    }
  },
  computed: {
    ...mapState('product', ['product']),
    ...mapGetters('store', ['getShortname']),
    files() {
      if (this.product != null) {
        return this.product.media_library
      } else {
        return []
      }
    },
  },
  mounted() {
    // console.log(this.product)
  },
  methods: {
    updateEndpoint() {
      this.endpoint = `http://localhost:8000/api/v1/store/${this.getShortname}/products/${this.product.id}/media`
    },
    handleFilePondInit() {
      console.log('FilePond has initialized')
      // FilePond instance methods are available on `this.$refs.pond`
    },
  },
  components: {
    FilePond,
  },
}
</script>

<style>
.filepond--item {
  width: calc(50% - 0.5em);
}
</style>
