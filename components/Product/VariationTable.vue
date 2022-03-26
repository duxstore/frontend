<template>
  <div
    v-if="variations.length > 0 && variations[0].tags.length > 0"
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
            {{ variation.type | upperfirst }}
          </th>
          <th scope="col" colspan="1">Price</th>
          <th scope="col" colspan="1">Stock</th>
          <th scope="col" colspan="1">
            <button @click.prevent="addInventory">+</button>
          </th>
        </tr>
      </thead>
      <tbody
        v-if="variations !== null || variations.length != 0"
        class="bg-white divide-y divide-gray-200"
      >
        <tr v-for="(item, index) in inventory" :key="index">
          <td class="px-6 py-4 whitespace-nowrap"></td>
          <td class="px-6 py-4 whitespace-nowrap"></td>
          <td
            v-for="(variation, vindex) in variations"
            :key="vindex"
            class="px-6 py-4 whitespace-nowrap"
          >
            <select
              v-model="inventory[index].variant[variation.type]"
              class="form-control"
              @blur="saveVariationInventory"
            >
              <option
                v-for="(tag, index) in variation.tags"
                :key="index"
                :value="tag.text"
              >
                {{ tag.text }}
              </option>
            </select>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <input
              v-model="inventory[index].price"
              type="number"
              class="form-control w-32"
              @blur="saveVariationInventory"
            />
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <input
              v-model="inventory[index].stock"
              type="number"
              class="form-control w-32"
              @blur="saveVariationInventory"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: ['variations'],
  data() {
    return {
      inventory: [
        {
          price: 0.0,
          stock: 0,
          variant: {
            material: null,
            size: null,
            color: null,
            type: null,
          },
        },
      ],
    }
  },
  methods: {
    saveVariationInventory() {
      this.$store.commit('product/setVariationInventory', this.inventory)
    },
    addInventory() {
      this.inventory.push({
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
