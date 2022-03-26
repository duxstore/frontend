/* eslint-disable vue/no-useless-template-attributes */
<template>
  <div class="my-10">
    <DataTable
      :headings="headings"
      :options="options"
      :data="data"
      :filters="filters"
    >
      <template #id="{ id }">
        <router-link
          class="hover:underline"
          :to="{ name: 'Order', params: { id: id } }"
        >
          {{ '#' + id }}
        </router-link>
      </template>
      <template #products="{ products }">
        <Menu>
          <template #menu-button>
            {{ products.length + ' items' }}
          </template>
          <template #menu-body>
            <router-link
              v-for="product in products"
              :key="product.id"
              :to="{ name: 'Product', params: { id: product.id } }"
              class="flex flex-row items-center px-2 space-x-4 link"
            >
              <img :src="product.media_library[0]" class="h-10 w-10" />
              <div class="flex flex-col">
                <h4 class="text-bold">{{ product.name }}</h4>
                <span class="text-muted">
                  {{ product.pivot.quantity }} quantity
                </span>
              </div>
            </router-link>
          </template>
        </Menu>
      </template>
      <template #customer="{ customer }" class="text-sm text-gray-900">
        {{ customer.firstname + ' ' + customer.lastname }}
      </template>
    </DataTable>
  </div>
</template>

<script>
import DataTable from '@/components/Table/Table.vue'
import OrderService from '@/services/OrderService'

export default {
  name: 'OrdersPage',
  components: {
    DataTable,
  },
  beforeRouteUpdate(to, from, next) {
    this.getOrders(to.query)
    next()
  },
  layout: 'app',
  data() {
    return {
      data: [],
      headings: [
        {
          key: 'id',
          label: 'OrderID',
        },
        {
          key: 'products',
          label: 'Product',
        },
        {
          key: 'total',
          label: 'Amount',
          type: 'money',
        },
        {
          key: 'payment_status',
          label: 'Payment',
        },
        {
          key: 'created_at',
          label: 'Date',
          type: 'date',
        },
        {
          key: 'customer',
          label: 'Customer',
        },
      ],
      filters: [
        {
          active: true,
          label: 'All',
          query: {},
        },
        {
          active: true,
          label: 'Paid',
          query: { paid: true },
        },
        {
          active: true,
          label: 'Fulfilled',
          query: { fulfilled: true },
        },
      ],
      options: [],
    }
  },
  mounted() {
    this.getOrders(this.$route.query)
  },
  methods: {
    getOrders(query) {
      OrderService.index(query)
        .then((result) => {
          this.data = result
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
}
</script>
