<template>
  <div class="products-views">
    <h2 class="flex flex-row justify-between">
      Product
      <span>{{ data.date }}</span>
    </h2>
    <hr class="-left-0 -right-0 absolute" />
    <span v-if="!busy && data.length"
      >Products with more views will appear here</span
    >
    <lists-flex :items="data.products" :busy="busy">
      <template slot-scope="{ item }">
        <div class="flex flex-row space-x-2">
          <img class="block h-5 w-5" :src="item.media[0]" alt="" />
          <strong class="text-sm">
            <nuxt-link :to="{ name: 'products', params: { id: item.id } }">{{ item.name }}</nuxt-link>
          </strong>
        </div>
        <span>{{ item.views }} views</span>
      </template>
    </lists-flex>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  data() {
    return {
      busy: false,
      dateTime: null,
    }
  },
  mounted() {
    // this.getMostViewedProducts();
  },
  methods: {},
}
</script>
