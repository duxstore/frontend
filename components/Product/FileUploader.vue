<template>
  <div>
    <file-pond
      ref="pond"
      name="files"
      label-idle="Drop files here..."
      :allow-multiple="multiple"
      :server="myCustomServerUpload"
      :accepted-file-types="['image/*']"
      :files="existingFiles"
      @init="handleFilePondInit"
      @addfilestart="updateEndpoint"
      @removefile="removefile"
    />
  </div>
</template>

<script>
import vueFilePond from 'vue-filepond'
import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'

// Create component
const FilePond = vueFilePond(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview
)

export default {
  name: 'App',
  components: {
    FilePond,
  },
  props: {
    endpoint: { // Post endpoint to upload the file to
      type: String,
      required: true
    },
    existingFiles: { // Existing files
      type: Array,
      required: false,
      default: () => []
    },
    multiple: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  data() {
    return {
      myCustomServerUpload: {
        process: (fieldName, file, metadata, load, error, progress) => {
          // files is the name of the input field
          // file is the actual file object to send
          const formData = new FormData()
          formData.append(fieldName, file, file.name)

          // related to aborting the request
          const CancelToken = this.$axios.CancelToken
          const source = CancelToken.source()

          this.$axios
            .post(this.endpoint, formData, {
              cancelToken: source.token,
              onUploadProgress(e) {
                progress(e.lengthComputable, e.loaded, e.total)
              },
            })
            .then((response) => {
              // eslint-disable-next-line no-console
              console.log('From inside file pond ', response.data)
              this.$emit('url', response.data)
              load(response.data.responseText)
            })
            .catch((thrown) => {
              if (this.$axios.isCancel(thrown)) {
                // eslint-disable-next-line no-console
                console.log('Request canceled', thrown.message)
                this.$emit('url', '')
              } else {
                // handle error
              }
            })

          // Should expose an abort method so the request can be cancelled
          return {
            abort: () => {
              source.cancel('Operation cancelled by user')
              this.$emit('url', '')
              // eslint-disable-next-line no-console
              console.log('File aborted canceled')
            },
          }
        },
      },
    }
  },
  computed: {
    files() {
      return this.existingFiles
    },
  },
  mounted() {
  },
  methods: {
    updateEndpoint() {
      return this.endpoint
    },
    removefile (e) {
      this.$emit('url', '')
    },
    handleFilePondInit() {
      // eslint-disable-next-line no-console
      console.log('FilePond has initialized')
      // FilePond instance methods are available on `this.$refs.pond`
    },
  }
}
</script>

<style>
.filepond--item {
  width: calc(50% - 0.5em);
}
</style>
