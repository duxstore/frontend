<template>
  <div class="flex flex-row space-x-2">
    <card size="w-4/12" :busy="weeklyStats === null">
      <span class="text-muted text-gray-500 block mb-5 text-sm">Sales</span>
      <div>
        <span class="flex flex-row justify-between items-center">
          <h5>{{sales_total | money}}</h5>
          <span class="text-muted text-gray-400 text-sm py-3"
            >Sales this week</span
          >
        </span>
        <hr />
        <span class="flex flex-row justify-between items-center py-3">
          <h5 v-if="totalOrders > 0" class="text-gray-400 text-sm">
            {{ totalOrders }} new orders
          </h5>
          <small v-else class="text-gray-400 text-sm">No orders yet</small>
          <router-link class="text-blue-300 text-sm" :to="weeklySalesURL">
            View orders >
          </router-link>
        </span>
      </div>
    </card>
    <card size="w-4/12" :busy="customers === null">
      <span class="text-muted text-gray-500 block mb-5 text-sm">Customers</span>
      <div>
        <span class="flex flex-row justify-between items-center">
          <h5>+{{ totalCustomers }}</h5>
          <span class="text-muted text-gray-400 text-sm py-3">
            30% increase this week
          </span>
        </span>
        <hr />
        <span
          class="flex flex-row justify-between items-center text-muted text-gray-400 text-sm py-3"
        >
          See all customers
          <router-link class="text-blue-300" to="/customers?sort=-created_at"
            >View customers ></router-link
          >
        </span>
      </div>
    </card>
    <card size="w-4/12" :busy="weeklyStats === null">
      <span class="text-muted text-gray-500 block mb-5 text-sm">Visits</span>
      <div>
        <span class="flex flex-row justify-between items-center">
          <h5>30.000</h5>
          <span class="text-muted text-gray-400 text-sm py-3"
            >Visits in the past week</span
          >
        </span>
        <hr />
        <span
          class="flex flex-row justify-between items-center text-muted text-gray-400 text-sm py-3"
        >
          Your store URL
          <a href="#" target="_blank" class="text-blue-500">{{
            'michtolam.store.com'
          }}</a>
        </span>
      </div>
    </card>
  </div>
</template>

<script>
import Dashboard from '../../services/Dashboard'
import Card from '../../components/Card'

export default {
  name: 'AnalyticsCards',
  components: {
    Card,
  },
  data() {
    return {
      analytics: {
        labels: ['Jan', 'Feb', 'Mar'],
        datasets: [
          {
            label: '2015',
            data: [12, 34, 2, 4, 45, 34, 2],
          },
        ],
      },
      weeklyStats: null,
      customers: null,
    }
  },
  computed: {
    sales_total() {
      if (this.weeklyStats) {
        if (this.weeklyStats.length < 1) return '0.00'
        const total = this.weeklyStats.map((order) => order.total)
        return total.reduce((a, b) => a + b)
      } else {
        return '0.00'
      }
    },
    totalOrders() {
      return this.weeklyStats ? this.weeklyStats.length : 0
    },
    weeklySalesURL() {
      return '/orders?filter[fulfilled]=1&filter[paid]=1&date_between=this week,today'
    },
    totalCustomers() {
      if (this.customers) {
        return this.customers.length
      } else {
        return 0
      }
    },
  },
  mounted() {
    this.loadWeeklyStats()
    this.loadWeeklyCustomers()
  },
  methods: {
    loadWeeklyStats() {
      Dashboard.getWeeklyStats()
        .then((response) => {
          this.weeklyStats = response
        })
        .catch((err) => {
          console.log(err)
        })
    },

    loadWeeklyCustomers() {
      const currentWeek = Dashboard.getWeeklyCustomers()

      currentWeek
        .then((response) => {
          this.customers = response
          console.log(response)
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
}
</script>
