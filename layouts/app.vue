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
      :class="page !== 'index' ? 'pr-10' : ''"
    >
      <div class="flex flex-col relative w-full">
        <div class="flex flex-col items-start space-y-3">
          <button v-if="hasPreviousRoute" class="capitalize text-muted" @click="back">
            &lt; Go back
          </button>
          <h2 class="font-bold text-3xl font-heading">
            {{ pageTitle }}
          </h2>
        </div>

        <notifications group="app">
          <template slot="body" slot-scope="props">
            <div :class="props.item.type === 'success' ? 'bg-green-900' : 'bg-red-900'" class="pl-4">
              <div :class="props.item.type === 'success' ? 'text-black bg-green-500' : 'bg-red-500 text-white'" class="flex flex-row items-start space-x-4 p-3">
                  <button :class="props.item.type === 'success' ? 'text-green-900 hover:text-green-600' : 'text-red-900 hover:text-red-600'" class="close border-none bg-transparent" @click="props.close">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  <div class="flex flex-col justify-between">
                    <a class="title text-sm font-bold font-heading text-white">
                      {{props.item.title}}
                    </a>
                    <div v-text="props.item.text.toString()">
                    </div>
                    <div v-if="props.item.data && props.item.data.hasOwnProperty('errors')">
                        <ul>
                          <li v-for="(error, key) in props.item.data.errors" :key="key">
                            {{ error.toString() }}
                          </li>
                        </ul>
                    </div>
                  </div>
              </div>
            </div>
          </template>
        </notifications>
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
    },
    page () {
      return this.$route.name
    },
    hasPreviousRoute () {
      return Object.values(this.$router.history.current.query).length !== 0 || Object.values(this.$router.history.current.params).length !== 0
    },
    previousPage () {
      if (this.hasPreviousRoute) {
        return this.$router.matcher.match(this.page)
      }

      return false
    }
  },
  mounted() {},
  methods: {
    back () {
      return this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
  .vue-notification-group
  {
    width: 396px !important;
    top: 0px;
    top: 20px;
    right: 0px;
  }
</style>
