<template>
  <div>
    <h2 class="font-heading">Notifications Settings</h2>
    <p class="text-muted">Update your notification options</p>

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
    name: 'settings-notifications'
  }
</router>
