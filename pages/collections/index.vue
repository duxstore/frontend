<template>
  <div class="my-10">
    <nuxt-link
      :to="{name: 'collection-new'}"
      class="-right-4 -top-0 absolute bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100 font-medium hover:bg-gray-50 inline-flex justify-center nuxt-link-active px-4 py-2 rounded-md shadow-sm text-gray-700 text-sm"
    >
      New
    </nuxt-link>
    <DataTable
      :headings="headings"
      :options="options"
      :data="data.data"
      :filters="filters"
      route-key-name="shortname"
      page="collection-single"
      :pagination="data"
    >
      <template #media="{ media }">
        <div class="flex flex-row items-center justify-between space-x-1">
          <img
            :src="media"
            class="w-10 h-auto rounded"
            alt=""
          />
        </div>
      </template>
      <template #description="{ description }">
        <p>
          {{ stripTags(description) }}
        </p>
      </template>
    </DataTable>
  </div>
</template>

<script>
import CollectionService from '@/services/CollectionService'
import DataTable from '@/components/Table/Table'

export default {
  name: 'CollectionsPage',
  components: {
    DataTable,
  },
  async beforeRouteUpdate(to, from, next) {
    await this.$fetch()
    next()
  },
  layout: 'app',
  data() {
    return {
      headings: [
        {
          key: 'media',
        },
        {
          key: 'name',
          label: 'Name',
        },
        {
          key: 'description',
          label: 'Description',
        },
        {
          key: 'products_count',
          label: 'Products',
        },
        {
          key: 'created_at',
          label: 'Date',
          type: 'date',
        },
      ],
      options: [],
      data: { data: [] },
      filters: [
        {
          active: true,
          label: 'All',
          query: {},
        },
      ],
    }
  },
  async fetch () {
    const query = Object.assign({}, this.$nuxt.context.query, { paginate: true })
    await CollectionService.index(query).then((result) => {
      this.data = result
    })
  },
  mounted () {},

  methods: {
    stripTags (html) {
      if (process.client) {
        const tmp = new DOMParser().parseFromString(html, 'text/html');
        return tmp.textContent || ""
      }
    }
  },
}
</script>

<router>
{
  name: 'collections'
}
</router>
