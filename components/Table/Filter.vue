<template>
  <input
    v-model="text"
    type="text"
    placeholder="Search..."
    class="card w-full px-2 text-sm rounded-sm outline-none border-b-1 border-gray-300"
    @keyup="filter"
  />
</template>

<script>
export default {
  name: 'KeywordFilter',
  props: ['data'],
  data() {
    return {
      text: '',
    }
  },
  methods: {
    filter() {
      // do some filtering with `text`
      const filtered = this.data.splice(0, 1)
      this.$emit('filtered', filtered)
    },
  },
}
</script>
