<template>
  <ul class="space-y-2">
    <li v-for="item in items" :key="item.name">
      <nuxt-link :to="item.url" class="nav-items text-sm">
        <span v-html="item.icon"></span>
        {{ item.name }}
      </nuxt-link>
      <child v-if="item.children" :children="item.children"></child>
    </li>
  </ul>
</template>

<script>
/* eslint-disable vue/no-v-html */
import Child from '@/components/Nav/Child.vue'
export default {
  name: 'NavItems',
  components: {
    Child,
  },
  props: {
    items: {
      required: true,
      type: Array,
    },
  },
}
</script>
