<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'TabsContent',
  props: {
    title: {
      type: String,
      default: '',
      required: true
    }
  },
  data() {
    return {
      isActive: false
    }
  }
}
</script>
