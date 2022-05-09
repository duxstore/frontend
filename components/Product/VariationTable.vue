<template>
  <div v-if="localInventory && localInventory.length">
    <div
      class="shadow overflow-x-scroll border-b border-gray-200 sm:rounded-lg"
    >
      <table class="min-w-full divide-y divide-gray-200" border="1">
        <thead class="bg-gray-50">
          <tr>
            <th scope="col" colspan="1"></th>
            <th scope="col" colspan="1"></th>
            <th
              v-for="(variation, index) in variations"
              :key="index"
              scope="col"
              colspan="1"
            >
              {{ variation.type }}
            </th>
            <th scope="col" colspan="1">Price</th>
            <th scope="col" colspan="1">Stock</th>
            <th scope="col" colspan="1">
              <button title="Add another variation" @click.prevent="addInventory">+</button>
            </th>
          </tr>
        </thead>
        <tbody
          v-if="localInventory !== null || localInventory.length != 0"
          class="bg-white divide-y divide-gray-200"
        >
          <tr v-for="(item, index) in localInventory" :key="index">
            <td class="px-6 py-4 whitespace-nowrap" colspan="2">
            </td>
            <!-- Local inventory -->
            <td
              v-for="(_variation, vindex) in variations"
              :key="vindex"
              class="px-6 py-4 whitespace-nowrap"
            >
              <select
              v-model="localInventory[index].variant[_variation.type]"
              class="form-control"
              >
                <option
                  v-for="(tag, si) in _variation.values"
                  :key="si"
                  :disabled="paired(tag, _variation.type)"
                  :value="tag"
                >
                  {{ tag }}
                </option>
              </select>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <input
              v-model="localInventory[index].price"
              type="number"
              class="form-control w-20"
              />
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <input
              v-model="localInventory[index].stock"
              type="number"
              class="form-control w-20"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <button class="my-4 btn" @click.prevent="saveVariationInventory">
      Save variations
    </button>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash-es'
/**
 * TODO: Allow variants to have their own images
 * For now we will use the media libray of products
 * to show variations somehow
 */
export default {
  props: ['inventory', 'variations'],
  data() {
    return {
      localInventory: [
        {
          price: 0.0,
          stock: 0,
          variant: {
            material: null,
            size: null,
            color: null,
            type: null,
          }
        }
      ]
    }
  },
  computed: {
    uploadEndpoint () {
      return ''
    },
  },
  mounted () {
    // Once this component is activated, we will add the inventory from the product if it has any
    if (this.inventory.length) {
      // set empty inventory
      this.localInventory = []

      // add our variations data - formatted
      this.inventory.forEach(variation => {
        this.localInventory.push(
          {
            price: variation.price,
            stock: variation.stock,
            variant: {
              material: variation.variant.material,
              size: variation.variant.size,
              color: variation.variant.color,
              type: variation.variant.type,
            }
          }
        )
      })
    }
  },
  methods: {
    handleUrl (url) {
      //
    },
    /**
     * Bug: Doesn't work as expected right now.
     * It disallows a variant from being used twice
     * which is how we will use it for now.
     *
     * Instead of having: Blue SM, Blue MD, Blue LG
     * We can only have: Blue SM, Gold MD, Red LG ...for now
     */
    paired (variant, type) {
      // Check entire inventory array for each variant children
      // and see if the variant has already been paired to the
      // same variant type we are trying to pair it to

      const outcomes = []
      this.inventory.forEach(invent => {
        // Check the value of our type in each object and keep an array of outcomes in boolean
        const value = invent.variant[type]

        if(variant === value)
        {
          outcomes.push(false)
        }
      })

      return outcomes.includes(false)
    },
    saveVariationInventory() {
      const localCopy = cloneDeep(this.localInventory)
      this.$store.commit('product/setVariationInventory', localCopy)
    },
    addInventory() {
      this.localInventory.push({
        price: 0.0,
        stock: 0,
        variant: {
          material: null,
          size: null,
          color: null,
          type: null,
        },
      })
    },
  },
}
</script>

<style scoped>
th {
  @apply px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider;
}
</style>
