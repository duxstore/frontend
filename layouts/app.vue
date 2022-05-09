<template>
  <div class="flex flex-row 2xl:mx-56">
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
      <div class="flex flex-col relative w-10/12">
        <h2 class="font-bold text-3xl font-heading">
          {{ pageTitle }}
        </h2>

        <Nuxt />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import NavItems from '@/components/Nav/Items.vue'
export default {
  components: {
    NavItems,
  },
  data() {
    return {}
  },

  computed: {
    ...mapGetters('app', [
      'title'
    ]),
    pageTitle () {
      return this.title
    }
  },
  mounted() {},
}
</script>
