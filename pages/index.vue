<template>
  <div class="flex flex-row w-full">
    <div class="pt-10 w-full">
      <section id="intro">
        <CardAnalytics :data="stats"/>
        <!--<analytics-cards></analytics-cards>-->
      </section>
      <!-- To do section -->
      <section id="todo" class="flex flex-row justify-evenly space-x-2">
        <card name="notification.orders" class="w-6/12">
          <RecentOrders :data="orders" />
        </card>
        <!-- Most viewed products -->
        <card name="notification.productViews" class="w-6/12 p-4">
          <div class="header mb-4">
            <span class="text-muted">This week stats</span>
            <h2 class="font-heading">These products were viewed the most</h2>
            <p></p>
          </div>
          <MostViewedProducts :data="products" />
        </card>
      </section>
      <section class="flex flex-row justify-between space-x-2">
        <card name="notification.completeSetup" class="w-6/12 py-5">
          <span class="text-muted"
            >Improve your store's visibility by completing this checklist</span
          >
          <h2 class="font-heading">Finish setting up your store</h2>
          <span class="text-sm">Start making sales with your new store 🥂</span>
          <ul class="py-5 space-y-1">
            <li class="card flex flex-row justify-between items-center">
              Add up to 5 products
              <router-link class="btn btn-primary" to="products"
                >Add</router-link
              >
            </li>
            <li class="card flex flex-row justify-between items-center">
              Connect a delivery provider
              <router-link class="btn btn-primary" to="products"
                >Add</router-link
              >
            </li>
            <li class="card flex flex-row justify-between items-center">
              Tell your customers about your new store
              <router-link class="btn btn-primary" to="products"
                >Share</router-link
              >
            </li>
          </ul>
        </card>
        <card name="notification.customizeTheme" class="w-6/12 py-5">
          <span class="text-muted"
            >Improve your store's visibility by completing this checklist</span
          >
          <h2 class="font-heading">Customize your store theme</h2>
          <span class="text-sm">Start making sales with your new store 🥂</span>
          <ul class="py-5 space-y-1">
            <li class="card flex flex-row justify-between items-center">
              Add up to 5 products
              <router-link class="btn btn-primary" to="products"
                >Add</router-link
              >
            </li>
            <li class="card flex flex-row justify-between items-center">
              Connect a delivery provider
              <router-link class="btn btn-primary" to="products"
                >Add</router-link
              >
            </li>
            <li class="card flex flex-row justify-between items-center">
              Tell your customers about your new store
              <router-link class="btn btn-primary" to="products"
                >Share</router-link
              >
            </li>
          </ul>
        </card>
      </section>
    </div>
    <!-- RIGHT SIDEBAR -->
    <div class="flex flex-col h-screen items-center sticky top-10 px-1">
      <SearchBar />
      <div id="sidebar" class="my-10 p-5 w-full flex flex-col">
        <p class="font-heading text-center text-sm mb-5">
          {{ $auth.user.firstname | greet }}
        </p>
        <span class="block text-center text-gray-300"
          >Earnings this month</span
        >
        <h2 class="text-center text-3xl mb-5 font-heading font-extrabold">
          {{ 79801 | money }}
        </h2>
        <div class="card">
          <p v-for="i in 4" :key="i" class="text-muted py-1">
            New order for Ring light (#4390{{ i }}) - <span class="text-xs">2h 14m ago</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Card from '@/components/Card.vue'
import Dashboard from '~/services/Dashboard'

export default {
  name: 'HomePage',
  components: {
    Card
  },
  layout: 'app',
  data() {
    return {
      page: 'Home',
      stats: [],
      orders: [],
      products: []
    }
  },
  computed: {},
  mounted() {
    // Set page title
    this.$store.commit('app/setTitle', 'Dashboard')
    this.statWidgets()
    this.pendingOrders()
    this.popularProducts()
  },
  methods: {
    async statWidgets() {
      const statsUrl = `${this.$storeUrl}/dashboard/weekly-stats`
      const { data } = await this.$axios.get(statsUrl)

      this.stats = Dashboard.getWeeklyStats(data)
    },
    async pendingOrders() {
      const ordersUrl = `${this.$storeUrl}/dashboard/recent-orders`
      const { data } = await this.$axios.get(ordersUrl)

      this.orders = data
    },
    async popularProducts() {
      const productsUrl = `${this.$storeUrl}/dashboard/most-viewed`
      const { data } = await this.$axios.get(productsUrl)

      this.products = data
    }
  },
}
</script>

<style lang="css">
section {
  @apply py-5;
}
</style>
