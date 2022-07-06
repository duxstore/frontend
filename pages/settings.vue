<template>
  <div class="card my-5 w-11/12">
    <ul class="bg-white border-b flex space-x-5">
      <li v-for="(tab, index) in tabs" :key="index" class="p-4">
        <nuxt-link class="p-4" :to="{ name: 'settings-'+tab.toLowerCase()}">{{ tab }}</nuxt-link>
      </li>
    </ul>
    <NuxtChild :foobar="123" class="mx-3 my-10" />
  </div>
</template>

<script>
export default {
  name: 'SettingsPage',
  layout: 'app',
  data() {
    return {
      tabs: ['General', 'Password', 'Notifications', 'Delivery', 'Payment', 'Store'],
    }
  },

  computed: {},
  mounted() {
    // Set page title
    this.$store.commit('app/setTitle', 'Settings')
  },
}
</script>

<style scoped>
a.nuxt-link-exact-active.nuxt-link-active, a:hover {
  @apply border-b-2 border-b-indigo-500 text-indigo-500 transition-colors
}
</style>
