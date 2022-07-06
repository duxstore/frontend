<template>
  <div class="card relative" :class="size">
    <div
      v-if="busy"
      class="-left-0 -top-0 absolute bg-white flex flex-row h-full items-center justify-center opacity-90 w-full z-50"
    >
      <clip-loader :loading="busy" size="50px" color="blue"></clip-loader>
    </div>
    <slot></slot>
  </div>
</template>

<script>
import ClipLoader from 'vue-spinner/src/ClipLoader.vue'
export default {
  name: 'CardBox',
  components: {
    ClipLoader
  },
  props: {
    size: {
      type: String,
      default: '',
    },
    busy: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      default: '',
    },
  },
  data() {
    return {}
  },
}
</script>
