<template>
  <div class="py-10">
    <div class="flex flex-col justify-between space-y-4">
      <form-error
        :has-errors="form.errors.any()"
        :error-object="form.errors"
        :error-message="productError"
      ></form-error>
      <form
        class="flex flex-row space-x-4"
        @keyup="form.errors.clear()"
        @submit.prevent="save"
      >
        <div class="w-8/12">
          <div class="card">
            <div class="form-group flex flex-col p-3">
              <label for="name" class="font-bold cursor-pointer">Name</label>
              <input
                id="name"
                v-model="form.name"
                type="text"
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
                <file-uploader :multiple="true" :endpoint="uploadEndpoint" :existing-files="form.media_library" @url="handleUrl"></file-uploader>
              </div>
            </div>
          </div>
          <!-- Pricing -->
          <div class="card my-3">
            <div class="form-group-double flex flex-row justify-between">
              <div class="flex flex-col p-3 w-6/12">
                <label for="price" class="font-bold cursor-pointer"
                  >Price</label
                >
                <input
                  id="price"
                  v-model="form.price"
                  class="money-input border card outline-none focus-within:bg-gray-50 bg-black"
                />
              </div>
              <div class="flex flex-col p-3 w-6/12">
                <label for="discount" class="font-bold cursor-pointer"
                  >Discount</label
                >
                <input
                  id="discount"
                  v-model="form.discount"
                  type="number"
                  class="money-input border card outline-none focus-within:bg-gray-50 bg-black"
                />
              </div>
            </div>
          </div>
          <!-- Inventory -->
          <div class="card my-3">
            <div class="flex flex-col p-3 w-12">
              <label for="price" class="font-bold cursor-pointer"
                >Inventory</label
              >
            </div>
            <div class="form-group-double flex flex-row justify-between">
              <div class="flex flex-col p-3 w-6/12">
                <label for="sku" class="font-bold cursor-pointer">SKU</label>
                <small class="text-muted">Store Keeping Unit</small>
                <input
                  id="sku"
                  v-model="form.sku"
                  type="text"
                  class="border card outline-none focus-within:bg-gray-50 bg-black"
                />
              </div>
              <div class="flex flex-col p-3 w-6/12">
                <label for="isbn" class="font-bold cursor-pointer">ISBN</label>
                <small class="text-muted"
                  >Useful when selling items stationary items</small
                >
                <input
                  id="isbn"
                  v-model="form.isbn"
                  type="text"
                  class="border card outline-none focus-within:bg-gray-50 bg-black"
                />
              </div>
            </div>
          </div>
          <!-- Shipping -->
          <div class="card my-3">
            <div class="flex flex-col p-3 w-12">
              <label for="price" class="font-bold cursor-pointer"
                >Shipping</label
              >
            </div>
            <div class="form-group-double flex flex-row justify-between">
              <div class="flex flex-col p-3 w-full">
                <label for="weight" class="font-bold cursor-pointer"
                  >Weight (kg)</label
                >
                <small class="text-muted">
                  Used to calculate shipping rates at checkout and label prices
                  during fulfillment.
                </small>
                <input
                  id="weight"
                  v-model="form.weight"
                  type="number"
                  class="border card outline-none focus-within:bg-gray-50 bg-black"
                />
              </div>
            </div>
          </div>
          <!-- Variations -->
          <div class="card my-4">
            <div class="form-group flex flex-col p-3">
              <label for="variation" class="font-bold cursor-pointer"
                >Variations</label
              >
              <label for="variation" class="text-mute my-2">
                <input
                  id="variation"
                  type="checkbox"
                  :checked="showVariation"
                  @change="showVariation = !showVariation"
                />
                This product has variations?
              </label>
              <Variation v-if="showVariation" />
            </div>
          </div>
          <button type="submit" class="btn-md btn-primary bg-blue-300">
            Save
          </button>
        </div>
        <!-- Right hand side -->
        <div class="w-4/12 sticky max-h-72">
          <div class="card">
            <div class="form-group flex flex-col p-3">
              <label for="status" class="font-bold cursor-pointer"
                >Status</label
              >
              <select
                id="status"
                v-model="form.status"
                class="border card outline-none focus-within:bg-gray-50 bg-black"
              >
                <option value="draft" :selected="form.status == 'draft'">
                  DRAFT
                </option>
                <option
                  value="published"
                  :selected="form.status == 'published'"
                >
                  PUBLISHED
                </option>
              </select>
            </div>
            <div class="form-group flex flex-col p-3">
              <label for="collection" class="font-bold cursor-pointer"
                >Collection</label
              >
              <select
                v-if="collections && collections.length"
                id="collection"
                v-model="form.collection_id"
                class="border card outline-none focus-within:bg-gray-50 bg-black"
              >
                <option
                  v-for="(collection, index) in collections"
                  :key="index"
                  :value="collection.id"
                  :selected="collection.id === form.collection_id"
                >
                  {{ collection.name }}
                </option>
              </select>
            </div>
            <div class="form-group flex flex-col p-3">
              <label for="stock" class="font-bold cursor-pointer"
                >Quantity</label
              >
              <input
                id="stock"
                v-model="form.stock"
                type="number"
                class="card"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import ProductService from '@/services/ProductService.js'
import Variation from '@/components/Product/Variation.vue'
import FileUploader from '@/components/Product/FileUploader.vue'
// import Form from '@/helpers/Form'
import FormError from '@/components/Form/Error.vue'
export default {
  name: 'SingleProduct',
  components: {
    Variation,
    FileUploader,
    FormError,
  },
  layout: 'app',
  data() {
    return {
      form: this.$form({
        productId: null,
        description: null,
        status: null,
        price: null,
        discount: null,
        name: null,
        collection_id: null,
        stock: null,
        weight: null,
        sku: null,
        isbn: null,
        variation: null,
        media_library: []
      }),
      showVariation: false,
    }
  },
  async fetch() {
    const { id } = await ProductService.create({step: 'init'})
    this.form.productId = id
  },
  computed: {
    uploadEndpoint () {
      return `${this.$storeUrl}/products/${this.form.productId}/media`
    },
    ...mapState('collection', ['collections']),
    ...mapGetters('product', ['productError', 'product', 'variations'])
  },
  async mounted() {
    // load all categories
    this.$store.dispatch('collection/index')

    if (!this.form.productId) {
      const { id } = await ProductService.create({step: 'init'})
      this.form.productId = id
    }

    // Set page title
    this.$store.commit('app/setTitle', 'Add new product')
  },
  beforeDestroy() {
    // Empty our variation data so it's not carried over to other products
    this.$store.commit('product/setVariationInventory', [])
    this.$store.commit('product/setVariation', [])
  },
  methods: {
    handleUrl (url) {
      this.form.media_library.push(url)
    },
    save () {
      this.form.variation = {}
      this.form.variation.variations = this.variations
      this.form.variation.inventory = this.inventory

      // defer form handling to store and react to the response
      this.$store.dispatch('product/save', this.form).then((result) => {
        this.$notify({
          type: 'success',
          title: 'Your product was updated successfully',
          text: `Your collection ${this.form.name} has been created successfully`
        })

        if(this.product.id) {
          this.$router.push({ name: 'product-single', params: {id: this.form.productId }})
        }
      }).catch((err) => {
        // eslint-disable-next-line no-console
        console.error(err)
      });
    }
  },
}
</script>

<router>
{
  name: 'product-new'
}
</router>
