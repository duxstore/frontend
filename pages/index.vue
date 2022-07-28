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
          <recent-orders></recent-orders>
        </card>
        <!-- Most viewed products -->
        <card name="notification.productViews" class="w-6/12 p-4">
          <div class="header mb-4">
            <span class="text-muted">This week stats</span>
            <h2 class="font-heading">These products were viewed the most</h2>
            <p></p>
          </div>
          <MostViewedProducts />
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
      <Search />
      <div id="sidebar" class="my-10 p-5 w-full flex flex-col">
        <p class="font-heading text-center text-sm mb-5">
          {{ $auth.user.firstname | greet }}
        </p>
        <span class="block text-center text-gray-300"
          >Your store activity</span
        >
        <h2 class="text-center text-3xl mb-5 font-heading font-extrabold">
          ₦125,002.10
        </h2>
        <div class="card"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Card from '@/components/Card.vue'
import MostViewedProducts from '@/components/Home/MostViewedProducts.vue'
import RecentOrders from '@/components/Home/RecentOrders.vue'
import Search from '@/components/Search.vue'
import Dashboard from '~/services/Dashboard'

export default {
  name: 'HomePage',
  components: {
    Card,
    MostViewedProducts,
    RecentOrders,
    Search
  },
  layout: 'app',
  data() {
    return {
      page: 'Home',
      stats: []
    }
  },
  computed: {},
  mounted() {
    // Set page title
    this.$store.commit('app/setTitle', 'Dashboard')
    this.statWidgets()
  },
  methods: {
    async statWidgets() {
      const statsUrl = `${this.$storeUrl}/dashboard/weekly-stats`
      const { data } = await this.$axios.get(statsUrl)

      this.stats = Dashboard.getWeeklyStats(data)

      // eslint-disable-next-line no-console
      console.log(data, this.stats)
    }
  },
}
</script>

<style lang="css">
section {
  @apply py-5;
}
</style>
