<template>
  <input
    type="text"
    placeholder="Search..."
    :class="[
      'absolute -top-8 border-b-1 border-gray-300 h-9 outline-none px-2 rounded-sm w-10/12',
      {
        'transform transition-all -left-10 w-40': expandSearch
      }
    ]"
    @focus="expandSearch = true"
    @blur="expandSearch = false"
  />
</template>

<script>
/**
 * Needs to scroll to top before expanding and always expand before scrolling down
 */
export default {
  name: 'SearchBar',
  data() {
    return {
      expandSearch: false
    }
  },
}
</script>
