<template>
  <div>
    <!-- TODO: When a product that is loaded already has variations, use the data to populate this area -->
    <span class="text-muted">Separate items with a comma (,)</span>
    <div
      v-for="(item, index) in variants"
      :key="'variation-' + index"
      class="flex flex-row w-full items-center justify-between my-4"
    >
      <select v-model="item.type" class="max-h-10 card w-2/12">
        <option
          v-for="(type, i) in types"
          :key="i"
          :disabled="!type.status"
          :value="type.name"
        >
          {{ type.name.toUpperCase() }}
        </option>
      </select>
      <vue-tags-input
        v-model="item.variant"
        class="card w-full"
        :separators="[';', ',']"
        :save-on-key="[13, 188, ';', ' ']"
        :add-on-key="[13, 188]"
        :tags="item.values"
        @blur="saveToStore"
        @tags-changed="(newTags) => setTags(newTags, item)"
      />
      <button
        class="bg-gray-100 font-body h-6 hover:bg-red-400 hover:text-white rounded-full text-center w-6"
        title="Remove variant"
        @click.prevent="remove(index)"
      >
        -
      </button>
    </div>
    <button v-if="variations.length < 4" @click.prevent="addVariation">
      Add more
    </button>
    <variation-table class="my-10" :variations="variations" :inventory="inventory"></variation-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { cloneDeep } from 'lodash-es'
import VariationTable from '@/components/Product/VariationTable.vue'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Variation',
  components: {
    VariationTable,
  },
  data() {
    return {
      variants: [],
      types: [
        { name: 'size', status: true },
        { name: 'color', status: true },
        { name: 'material', status: true },
        { name: 'type', status: true },
      ]
    }
  },
  computed: {
    ...mapGetters('product', ['variations', 'inventory']),
    productId () {
      return this.$route.params.id
    }
  },
  mounted() {
    // Copy the contents of variations this way
    // to avoid copying vuex properties along
    // so we can use it for v-model without vuex nagging
    if(this.variations.length > 0) {
      this.$store.commit('product/addTmpVariantFields')
      this.variants = cloneDeep(this.variations)
    } else {
      this.$store.commit('product/addFirstVariation', this.productId)
      this.variants = cloneDeep(this.variations)
    }

    // eslint-disable-next-line no-console
    console.log(this.variations, this.variants)
  },
  methods: {
    setTags(tags, item) {
      item.values = []
      // eslint-disable-next-line no-console
      console.log('TAGS: ', tags, 'ITEM: ', item)

      tags.map(tag => {
        item.values.push(tag.text)
        return true
      })
    },
    saveToStore() {
      // this method helps us to clean the variations of
      // any extra meta data which will not be useful for
      // the backend
      const localVariations = []

      this.variants.map((variation) => {
        const type = variation.type
        const values = variation.values
        const variant = ''
        // eslint-disable-next-line camelcase
        const product_id = this.$route.params.id
        // eslint-disable-next-line camelcase
        return localVariations.push({ type, values, variant, product_id })
      })

      this.$store.commit('product/setVariation', localVariations)
    },
    addVariation(e) {
      // Disable the already selection variant type
      this.variants.map((variation, index) => {
        if (this.types[index].name === variation.type) {
          this.types[index].status = false
          return false
        }
        return false
      })

      this.variants.push({
        variant: '',
        values: [],
        type: '',
        product_id: this.$route.params.id
      })
    },
    remove(index) {
      // Remove item from store
      this.$store.commit('product/removeVariation', index)
      // Remove item from the local copy
      this.variants.splice(index, 1)
    },
  },
}
</script>

<style>
.ti-input {
  border: none !important;
}
</style>
