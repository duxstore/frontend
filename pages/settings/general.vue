<template>
  <div>
    <h2 class="font-heading">Profile</h2>
    <p class="text-muted">Update your public information</p>

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
    name: 'settings-general'
  }
</router>
