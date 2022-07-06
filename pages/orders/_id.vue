<template>
  <div v-if="!$fetchState.pending" class="my-10">
    <div class="w-full">
      <div class="card flex flex-row">
        <div class="w-full sm:w-4/12">
          <div class="my-1">
            <span class="text-muted">Order ID</span>
            <h2>#{{ order.id }}</h2>
          </div>
          <div class="my-1">
            <span class="text-muted">Order Date</span>
            <h2>{{ $moment(order.created_at).format('MMMM Do YYYY, h:mm:ss a') }}</h2>
          </div>
          <div class="my-1">
            <span class="text-muted">Delivery Method</span>
            <h2>{{ order.delivery.name }}</h2>
          </div>
          <div class="my-1">
            <span class="text-muted">Order Total</span>
            <h2>{{ order.total | money }}</h2>
          </div>
        </div>
        <div class="w-full sm:w-8/12 flex flex-col">
          <div class="w-full flex flex-row">
            <div class="w-full sm:w-6/12">
              <span class="text-muted">Customer</span>
              <h2>{{ order.customer.firstname + ' ' + order.customer.lastname }}</h2>
              <h2>{{ order.customer.phone }}</h2>
              <h2><a :href="'mailto:' + order.customer.email" class="underline">{{ order.customer.email }}</a></h2>
            </div>
            <div class="w-full sm:w-6/12">
              <span class="text-muted">Shipping</span>
              <h2>{{ order.customer.address }}</h2>
              <h2>{{ order.customer.city }}</h2>
              <h2>{{ order.customer.state }}</h2>
              <h2>{{ order.customer.country }}</h2>
            </div>
          </div>
          <div class="w-full">
            <span class="text-muted mb-2 block">Payment</span>
            <div class="flex flex-row space-x-5">
              <div class="flex flex-col">
                <div v-if="order.payment.type !== 'manual'" class="flex flex-row">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  <h2 v-if="order.payment_data">{{ order.payment_data.last_four }}</h2>
                </div>
              </div>
              <div class="flex flex-col">
                <div class="flex flex-row">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                  </svg>
                  <h2>{{ order.payment.name }}</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Order products -->
    <div class="flex flex-col my-5 p-4">
      <Table :headings="headings" :options="[]" :data="order.products" page="" :filters="[]" :footer="true">
        <template #product="{ product }">
          <div class="flex flex-row space-x-5">
            <nuxt-link :to="{ name: 'product-single', params: {id: product.id}}" class="flex h-full">
              <img :src="product.media_library[0]" alt="" class="w-16 h-full border border-black">
            </nuxt-link>

            <div>
              <nuxt-link :to="{ name: 'product-single', params: {id: product.id}}" class="underline">
                {{ product.name }}
              </nuxt-link>
              <p v-for="variant in Object.keys(JSON.parse(product.pivot.variant))" :key="variant" class="capitalize">
                <span class="text-muted">{{ variant }}:</span> {{ JSON.parse(product.pivot.variant)[variant] }}
              </p>
            </div>
          </div>
        </template>
        <template #cost="{ cost }">
          <span class="flex flex-col gap-1">
            <span :class="`${cost.discount && cost.discount > 0 ? 'line-through' : ''} text-primary-color text-base`">{{ cost.price | money }}</span>
            <span v-if="cost.discount && cost.discount > 0" class="text-red-900 font-semibold text-base">{{ cost.discount | money }}</span>
          </span>
        </template>
        <template #pivot="{ pivot }">
          {{ pivot.quantity }}
        </template>
        <template #cal_total="{ cal_total }">
          <span v-if="!cal_total.discount || cal_total.discount === 0">
            {{ cal_total.pivot.quantity * cal_total.price | money }}
          </span>
          <span v-else>
            {{ cal_total.pivot.quantity * cal_total.discount | money }}
          </span>
        </template>
        <template #footer="{ data }">
          <div>
            <p class="capitalize">
              <span class="text-muted">Subtotal:</span> {{ subtotal(data) | money }}
            </p>
            <p class="capitalize">
              <span class="text-muted">Discount:</span> {{ subtotal(data) - total(data) | money }}
            </p>
            <p class="capitalize">
              <span class="text-muted">Total:</span> {{ total(data) | money }}
            </p>
          </div>
        </template>
      </Table>
    </div>
  </div>
</template>

<script>
import OrderService from '@/services/OrderService'

export default {
  name: 'OrdersPage',
  components: {
  },
  layout: 'app',
  data() {
    return {
      order: [],
      headings: [
        {
          key: 'product',
          label: 'Product',
        },
        {
          key: 'cost',
          label: 'Cost',
          type: 'money',
        },
        {
          key: 'pivot',
          label: 'Qty',
        },
        {
          key: 'cal_total',
          label: 'Total',
        },
        {
          key: 'vat',
          label: 'Vat',
        },
      ],
    }
  },
  async fetch () {
    const order = await OrderService.find(this.orderId)
    this.order = order

    // Set page title
    this.$store.commit('app/setTitle', 'Order #' + this.order.id)
  },
  computed: {
    orderId() {
      return this.$nuxt.context.route.params.id
    }
  },
  mounted() {},
  methods: {
    sum (data) {
      return data.reduce((a, b) => this.isNum(a) + this.isNum(b), 0)
    },
    subtotal (data) {
      data = this.extractPrices(data)
      return this.sum(data)
    },
    total (data) {
      data = this.extractDiscounts(data)
      // maybe calculate tax??
      return this.sum(data)
    },
    vat (data) {
      return 0
    },
    extractDiscounts (data) {
      if (!data || data.length === 0) return 0
      return data.map(product => product.discount * product.pivot.quantity)
    },
    extractPrices (data) {
      if (!data || data.length === 0) return 0
      return data.map(product => product.price * product.pivot.quantity)
    },
    isNum (number) {
      return isNaN(number) ? 0 : number
    },
  },
}
</script>

<router>
{
  name: 'order-single'
}
</router>
