<template>
  <div class="my-10">
    <nuxt-link
    :to="{name: 'product-new'}"
    class="-right-4 -top-0 absolute bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100 font-medium hover:bg-gray-50 inline-flex justify-center nuxt-link-active px-4 py-2 rounded-md shadow-sm text-gray-700 text-sm"
    >
      New
    </nuxt-link>
    <DataTable
      :headings="headings"
      :options="options"
      :data="data"
      :filters="filters"
      page="product-single"
    >
      <template #media_library="{ media_library }">
        <div class="flex flex-row items-center justify-between space-x-1">
          <img
            v-for="media in media_library.slice(0, 2)"
            :key="media"
            :src="media"
            class="w-10 h-auto rounded"
            alt=""
          />
        </div>
      </template>
    </DataTable>
  </div>
</template>

<script>
import ProductService from '~/services/ProductService.js'
import DataTable from '@/components/Table/Table'

export default {
  name: 'ProductsPage',
  components: {
    DataTable,
  },
  beforeRouteUpdate(to, from, next) {
    this.getProducts(to.query)
    next()
  },
  layout: 'app',
  data() {
    return {
      headings: [
        {
          key: 'media_library',
          label: '',
        },
        {
          key: 'name',
          label: 'Name',
        },
        {
          key: 'price',
          label: 'Price',
          type: 'money',
        },
        {
          key: 'status',
          label: 'Status',
          type: 'status',
        },
        {
          key: 'created_at',
          label: 'Date',
          type: 'date',
        },
        {
          key: 'stock',
          label: 'Stock',
        },
      ],
      options: [],
      data: [],
      filters: [
        {
          active: true,
          label: 'All',
          query: {},
        },
        {
          active: true,
          label: 'Published',
          query: { status: 'published' },
        },
        {
          active: true,
          label: 'Draft',
          query: { status: 'draft' },
        },
      ],
    }
  },
  async fetch() {
      this.data = await ProductService.index(this.$route.query)
      // eslint-disable-next-line no-console
      console.log('Fetched data for products page', this.data)
  },
  mounted() {
    // Set page title
    this.$store.commit('app/setTitle', 'Products')
  },

  methods: {},
}
</script>
