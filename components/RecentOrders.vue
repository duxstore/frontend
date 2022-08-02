<template>
  <div>
    <span v-if="deliveringSoon.length > 0" class="text-muted">
      {{ deliveringSoon.length }} order(s) are expected to deliver over the next
      3 days
    </span>
    <span v-else class="text-muted">
      {{
        data.orders_count > 0
          ? 'You have some new orders'
          : 'You do not have new orders at the moment'
      }}
    </span>
    <h2 class="font-heading flex flex-row items-center">
      {{ data.orders_count }} new pending orders
    </h2>
    <span v-if="data.length !== 0 && data.orders && data.orders_count === 0"
      >Recent orders will appear here</span
    >
    <lists-flex v-else :items="firstThreeorders" :busy="data.length === 0">
      <template slot-scope="{ item }">
        <span class="w-10/12 items-center flex flex-row justify-between">
          <span class="w-10/12 flex flex-col">
            <span class="font-bold">{{ item.total | money }}</span>
            <p class="text-sm">
              {{ item.products[0].name }}

              <!-- if order has more than 1 product -->
              <span v-if="item.products.length > 1">
                {{ ' and ' + (item.products.length - 1) + ' other(s)' }}
              </span>
            </p>
          </span>
          <span class="text-xs text-muted">{{ item.created_at | dateAgo }}</span>
        </span>
        <nuxt-link class="btn btn-primary" :to="{ name: 'orders', params: { id: item.id } }">View</nuxt-link>
      </template>
    </lists-flex>
    <nuxt-link
      v-if="orders.length > 5"
      :to="details_link"
      class="btn -mt-2 w-full block text-center"
    >
      View all
    </nuxt-link>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  filters: {
    dateAgo(value) {
      return moment(value).fromNow()
    },
  },
  props: {
    data: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  data() {
    return {
      count: 0,
    }
  },
  computed: {
    firstThreeorders() {
      if (this.data.length && this.data.orders.length > 5) {
        return this.data.orders.slice(0, 5)
      } else {
        return this.data.orders
      }
    },

    deliveringSoon() {
      const hasDeliveryDate = []

      this.orders.map((order) => {
        if (order.delivery_date) {
          const deliveryDate = new Date(order.delivery_date).getTime()
          const daysRemaining = deliveryDate - new Date().getTime()
          const daysRemainingToDay = Math.floor(daysRemaining / 86400000) // 86400000 = miliseconds in a day

          // only notify about deliveries due in 3 or less days
          if (daysRemainingToDay <= 3) {
            // 1 day or 2 days. English bro
            return hasDeliveryDate.push(daysRemainingToDay)
          }
        }

        return true
      })

      return hasDeliveryDate
    },

    orders () {
      return this.data.length > 0 ? this.data.orders : []
    },

    details_link () {
      return this.data.length > 0 && this.data.orders ? this.data.full_orders_link : null
    }
  }
}
</script>
