<template>
  <div>
    <h2 class="font-heading">Password</h2>
    <p class="text-muted">Update your password</p>

    <UnderDevelopment />
  </div>
</template>

<script>
export default {
  name: 'SettingsPage',
  layout: 'app',
  data() {
    return {
      page: 'Settings',
    }
  },

  computed: {}
}
</script>

<router>
  {
    name: 'settings-password'
  }
</router>
