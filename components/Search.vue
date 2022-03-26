<template>
  <input
    type="text"
    placeholder="Search..."
    class="border-b-1 border-gray-300 h-9 outline-none px-2 rounded-sm w-10/12"
    @focus="expandSearch"
  />
</template>

<script>
/**
 * Needs to scroll to top before expanding and always expand before scrolling down
 */
export default {
  name: 'Search',
  methods: {
    expandSearch() {
      return 'absolute border-b-1 border-gray-300 h-9 outline-none px-2 right-0 rounded-sm w-96'
    },
  },
}
</script>
