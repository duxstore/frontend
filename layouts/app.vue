<template>
  <div v-if="!userIsLoggedIn">
    <h2 v-if="$route.name !== 'Login' || $route.name !== 'Register'">
      User logged out, <nuxt-link :to="{ name: 'login' }">login</nuxt-link> to
      continue
    </h2>
  </div>
  <div v-else class="flex flex-row 2xl:mx-56">
    <!-- LEFT SIDEBAR -->
    <div
      id="nav"
      class="border-l-1 flex flex-col h-screen px-5 sticky top-0"
    >
      <nuxt-link to="/" class="block mb-10">Logo</nuxt-link>

      <div class="nav-menu flex flex-col justify-evenly">
        <nav-items></nav-items>
      </div>

      <nuxt-link class="absolute bottom-5" to="/about">Your store</nuxt-link>
    </div>
    <!-- MAIN CONTENT -->
    <div
      id="main"
      class="bg-gray-100 border-gray-300 border-l-1 border-r-1 flex flex-row justify-between pl-10 py-10 w-full"
    >
      <div class="flex flex-col justify-between w-10/12">
        <h2 class="font-bold text-3xl font-heading">
          {{ $route.name }}
        </h2>

        <Nuxt />
      </div>
      <!-- RIGHT SIDEBAR -->
      <div class="flex flex-col h-screen items-center sticky top-10 px-1">
        <Search />
        <div id="sidebar" class="my-10 p-5 w-full flex flex-col">
          <p class="font-heading text-center text-sm mb-5">
            Good morning Samuel
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
  </div>
</template>

<script>
import NavItems from '@/components/Nav/Items.vue'
import Search from '@/components/Search.vue'

export default {
  components: {
    NavItems,
    Search,
  },
  data() {
    return {
      // storage: window ? window.localStorage : null,
    }
  },

  computed: {
    userIsLoggedIn() {
      // return this.$store.getters.user.auth;
      return true
    },
  },
  mounted() {
    // this.$store.commit('user/setAuthStatus', this.storage.getItem('auth'));
    // this.$store.commit('store/setStore', JSON.parse(this.storage.getItem('store')), {root: true});
  },
}
</script>
