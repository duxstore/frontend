<template>
  <div class="py-5">
    <!-- Product status, actions -->
    <div class="flex flex-row items-center justify-between">
      <span class="bg-green-300 px-3 py-1 rounded text-sm">Visible</span>
      <button
      class="bg-red-700 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 font-medium inline-flex items-center justify-center px-4 py-2 rounded-md shadow-sm text-sm text-white"
      @click="doDelete"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
        Delete
      </button>
    </div>
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
              <div class="bg-blue-100 flex flex-row h-10 items-center justify-between px-4 py-3 rounded">
                <div class="flex flex-row items-center space-x-1">
                  <span class="bg-blue-600 flex items-center p-1 rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </span>
                  <label>{{ form.status ? 'Published' : 'Draft' }}</label>
                </div>
                <span id="status" class="flex relative cursor-pointer">
                  <span :class="`block absolute h-5 w-5 bg-white rounded-full transition-all`" :style="{ transform: `translateX(${transition === 'full' ? '100%' : '0%'})` }" aria-hidden="true"></span>
                  <input v-model="form.status" class="z-10 appearance-none cursor-pointer focus:outline-none h-5 rounded-full w-9" :class="transition === '0' ? 'bg-gray-400' : 'bg-blue-600'" type="checkbox" role="switch" @click.exact="translate">
                </span>
              </div>
            </div>
            <div class="form-group flex flex-col p-3">
              <label for="stastus" class="font-bold cursor-pointer"
                >Status</label
              >
              <select
                id="stastus"
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
              <small v-if="newQuantity" class="text-muted"
                >Adding {{ newQuantity }} items to stock</small
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
// import ProductService from '@/services/ProductService.js'
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
      transition: 'full'
    }
  },
  computed: {
    uploadEndpoint () {
      return `${this.$storeUrl}/products/${this.form.productId}/media`
    },
    ...mapState('collection', ['collections']),
    ...mapGetters('product', ['productError', 'product', 'variations', 'inventory']),
    newQuantity() {
      if (this.product?.stock && this.form.stock > this.product.stock)
        return parseInt(this.form.stock) - parseInt(this.product.stock)
      else return false
    },
    productId() {
      return this.product.id
    }
  },
  mounted() {
    // load all categories
    this.$store.dispatch('collection/index')
    // get product using params.id
    this.getProduct()
  },
  beforeDestroy() {
    // Empty our variation data so it's not carried over to other products
    this.$store.commit('product/setVariationInventory', [])
    this.$store.commit('product/setVariation', [])
  },
  methods: {
    translate () {
      this.transition = this.transition === '0' ? 'full' : '0'
    },
    doDelete () {
      // delete product
    },
    handleUrl (url) {
      this.$store.commit('product/setProductMedia', url)
    },
    save () {
      this.form.variation = {}
      this.form.variation.variations = this.variations
      this.form.variation.inventory = this.inventory

      // defer form handling to store and react to the response
      this.$store.dispatch('product/save', this.form).then((result) => {
        this.$notify({
          type: 'success',
          group: 'app',
          title: 'Your product was updated successfully',
          text: `Your product ${this.form.name} has been created successfully`
        })
        // eslint-disable-next-line no-console
        console.log('results from saving ', result)
      }).catch((err) => {
        // eslint-disable-next-line no-console
        console.error(err)
      });
    },
    /**
     * Not using fetch() because we can't access
     * the global variables we've set inside fetch
     */
    async getProduct() {
      const { data } = await this.$axios.get(`${this.$storeUrl}/products/id/${this.$route.params.id}`)
      this.$store.commit('product/setProduct', data)
      this.form.productId = this.product.id
      this.form.status = this.product.status
      this.form.name = this.product.name
      this.form.description = this.product.description
      this.form.stock = this.product.stock
      this.form.weight = this.product.weight
      this.form.stock = this.product.stock
      this.form.sku = this.product.sku
      this.form.isbn = this.product.isbn
      this.form.price = this.product.price
      this.form.discount = this.product.discount
      this.form.collection_id = this.product.collection_id
      this.form.media_library = this.product.media_library
      this.showVariation = this.product.variant && this.product.variant.length > 0

      // commit the variations to store
      if (this.showVariation) {
        this.$store.commit('product/setVariation', this.product.variant)
        this.$store.commit(
          'product/setVariationInventory',
          this.product.variant_inventory
        )
      }

      // Set page title
      this.$store.commit('app/setTitle', this.form.name)
    },
    isSelectedCollection(index, collectionId) {
      if (this.collections && this.collections[index].id === collectionId) {
        return true
      } else {
        return false
      }
    },
  },
}
</script>

<router>
{
  name: 'product-single'
}
</router>
