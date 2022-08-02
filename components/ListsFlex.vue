<template>
  <ul class="py-5 space-y-1">
    <span v-if="busy">
      <li
        v-for="item in 6"
        :key="item"
        class="h-10 w-full bg-gray-200 animate-pulse my-2"
      ></li>
    </span>
    <li
      v-for="item in items"
      v-else
      :key="item.name || item[0]"
      class="card flex flex-row justify-between items-center"
    >
      <slot :item="item"></slot>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: false,
      default: () => {},
    },
    busy: {
      type: Boolean,
      required: false,
    },
  },
  data() {
    return {}
  },
}
</script>
