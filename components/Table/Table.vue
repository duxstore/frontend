<template>
  <div class="flex flex-col">
    <div class="-my-2 sm:-mx-6 lg:-mx-8">
      <div
        class="py-2 h-screen align-middle inline-block min-w-full sm:px-6 lg:px-4"
      >
        <div
          class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"
        >
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  colspan="1"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  <Menu>
                    <template #menu-button>{{ activeFilter }}</template>
                    <template #menu-body>
                      <div class="flex flex-col w-full">
                        <button
                          v-for="(item, index) in filters"
                          :key="index"
                          class="link border-none text-sm"
                          @click="filterMenu(item)"
                        >
                          {{ item.label }}
                        </button>
                      </div>
                    </template>
                  </Menu>
                </th>
                <template v-if="headings.length > 4">
                  <th v-for="col in remainingCols" :key="'col-' + col"></th>
                </template>
                <th
                  v-if="!options.find((op) => op.content == 'Filter')"
                  colspan="3"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  <KeywordFilter :data="data" @filtered="onFiltered" />
                </th>
              </tr>
            </thead>
            <thead class="bg-gray-50">
              <tr>
                <th
                  v-for="(heading, index) in headings"
                  :key="index"
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {{ heading.label }}
                </th>
              </tr>
            </thead>
            <tbody
              v-if="data !== null || data.length != 0"
              class="bg-white divide-y divide-gray-200"
            >
              <tr v-for="(item, index) in data" :key="index" class="hover:bg-gray-100">
                <td
                  v-for="(heading, indices) in headings"
                  :key="indices"
                  class="px-6 py-4 whitespace-nowrap"
                >
                  <slot :name="heading.key" :[heading.key]="item[heading.key]">
                    <!-- Hacky way to get the singular path name. e.g: Orders -> Order -->
                    <nuxt-link
                      :to="{ name: page, params: { id: item['id'] } }"
                    >
                      <div
                        v-if="heading.type && heading.type == 'money'"
                        class="text-sm text-gray-900"
                      >
                        {{ item[heading.key] | money }}
                      </div>
                      <div
                        v-else-if="heading.type && heading.type == 'date'"
                        class="text-sm text-gray-900"
                      >
                        {{ item[heading.key] | dateAgo }}
                      </div>
                      <div
                        v-else-if="heading.type && heading.type == 'status'"
                        class="text-sm text-gray-900"
                      >
                        <span>{{ item[heading.key].toUpperCase() }}</span>
                      </div>
                      <div
                        v-else-if="item[heading.key] != null"
                        class="text-sm text-gray-900"
                      >
                        {{ item[heading.key] }}
                      </div>
                      <div v-else class="text-sm text-gray-900 italic">
                        {{ 'No ' + heading.key }}
                      </div>
                    </nuxt-link>
                  </slot>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import KeywordFilter from '@/components/Table/Filter.vue'
import Menu from '@/components/Html/Menu/Menu.vue'
export default {
  name: 'DataTable',
  components: {
    KeywordFilter,
    Menu
  },
  props: {
    // lenght must match the length of headings.
    // e.g :headings="[{colspan:1, content:'Type'},
    // {colspan: 1}, {colspan: 1, content: '<search/>'}]"
    options: {
      // unsupported for now
      type: Array,
      required: false,
      default: () => []
    },
    headings: {
      type: Array,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
    filters: {
      type: Array,
      default: () => []
    },
    page: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      activeFilter: 'All',
      currentPath: this.$route.path,
      routeName: this.$route.name,
    }
  },
  computed: {
    remainingCols() {
      return this.headings.length - 4
    },
    nextrouteName() {
      return this.$route.name.substr(0, this.$route.name.length - 1)
    },
  },
  methods: {
    onFiltered(value) {
      // eslint-disable-next-line vue/no-mutating-props
      this.data = value
    },

    filterMenu(filter) {
      if (Object.keys(filter.query).length > 1) {
        throw new Error('Only query per filter is allowed')
      }

      // if no query is supplied, show all
      if (Object.keys(filter.query).length < 1) {
        // set the button text to the selected menu
        this.activeFilter = filter.label
        this.$router.push(this.currentPath)
        return
      }

      // set the button text to the selected menu
      this.activeFilter = filter.label

      const filterOption = Object.keys(filter.query).toString()
      const filterValue = Object.values(filter.query).toString()

      const filterQuery = `filter[${filterOption}]`

      const currentPath = this.currentPath

      this.$router.push({
        path: currentPath,
        query: { [filterQuery]: filterValue },
      })
    },
  },
}
</script>
