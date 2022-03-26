<template>
  <ul class="flex flex-col space-y-1">
    <li v-for="child in children" :key="child.name" class="w-full">
      <router-link class="nav-child ml-6" :to="child.url">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
        {{ child.name }}
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'NavChild',
  props: {
    children: {
      required: false,
      default: () => [],
      type: Array,
    },
  },
}
</script>
