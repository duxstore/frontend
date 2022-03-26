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
                class="md:w-12 w-4/12 border card outline-none focus-within:bg-gray-50 bg-black"
              />
            </div>
            <div class="form-group flex flex-col p-3">
              <label for="description" class="font-bold cursor-pointer"
                >Description</label
              >
              <VueTrix
                id="description"
                v-model="form.description"
                placeholder="Enter content"
                local-storage
              />
            </div>
          </div>
          <!-- Media -->
          <div class="card my-3">
            <div class="form-group-double flex flex-row justify-between">
              <div class="flex flex-col p-3 w-full">
                <label for="media" class="font-bold cursor-pointer"
                  >Media</label
                >
                <file-uploader></file-uploader>
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
                id="collection"
                v-model="form.collection_id"
                class="border card outline-none focus-within:bg-gray-50 bg-black"
              >
                <option
                  v-for="(collection, index) in collections"
                  :key="index"
                  :value="collection.id"
                  :selected="isSelectedCollection(index, form.collection_id)"
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
import VueTrix from 'vue-trix'
import { mapGetters, mapState } from 'vuex'
import ProductService from '@/services/ProductService.js'
import Variation from '@/components/Product/Variation.vue'
import FileUploader from '@/components/Product/FileUploader.vue'
import Form from '@/helpers/Form'
import FormError from '@/components/Form/Error.vue'
export default {
  name: 'SingleProduct',
  components: {
    VueTrix,
    Variation,
    FileUploader,
    FormError,
  },
  beforeRouteUpdate(to, from, next) {
    this.getProduct(to.params.id)
    next()
  },
  layout: 'app',
  data() {
    return {
      form: new Form({
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
      }),
      showVariation: false,
    }
  },
  computed: {
    ...mapState('collection', ['collections']),
    ...mapGetters('product', ['productError', 'product', 'variations']),
    newQuantity() {
      if (this.product?.stock && this.form.stock > this.product.stock)
        return parseInt(this.form.stock) - parseInt(this.product.stock)
      else return false
    },
    productId() {
      return this.product.id
    },
  },
  mounted() {
    // load all categories
    this.$store.dispatch('collection/index')
    this.getProduct(this.$route.params.id)
  },
  methods: {
    save() {
      this.form.variation = this.variations

      // defer form handling to store and react to the response
      this.$store.dispatch('product/save', this.form)
    },
    getProduct(id) {
      this.busy = true
      ProductService.getById(id).then((result) => {
        this.busy = false

        const product = result.reduce((data) => data)
        // dispatch the product to store
        this.$store.commit('product/setProduct', product)

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
        this.showVariation = this.product.variant.length > 0

        // commit the variations to store
        if (this.product.variant.length > 0) {
          this.$store.commit('product/setVariation', this.product.variant)
          this.$store.commit(
            'product/setVariationInventory',
            this.product.variant_inventory
          )
        }
      }, console.error)
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
