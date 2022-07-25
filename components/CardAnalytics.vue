<template>
  <div class="flex flex-row space-x-2">
    <card v-for="stat in data" :key="stat.title" size="w-4/12" :busy="data.length === 0">
      <span class="text-muted text-gray-500 block mb-5 text-sm">{{ stat.title }}</span>
      <div>
        <span class="flex flex-row justify-between items-center">
          <h5 v-if="stat.filter">{{ stat.value | money }}</h5>
          <h5 v-else>{{ stat.value }}</h5>
          <span class="text-muted text-gray-400 text-sm py-3">
            {{ stat.subtitle }}
          </span
          >
        </span>
        <hr />
        <span class="flex flex-row justify-between items-center py-3">
          <h5 v-if="1 > 0" class="text-gray-400 text-sm">
            {{ stat.message }}
          </h5>
          <small v-else class="text-gray-400 text-sm">
            {{ stat.emptyMessage }}
          </small>
          <nuxt-link class="text-blue-300 text-sm" :to="stat.link">
            {{ stat.link_text }}
          </nuxt-link>
        </span>
      </div>
    </card>
    <card size="w-4/12">
      <span class="text-muted text-gray-500 block mb-5 text-sm">Visits</span>
      <div>
        <span class="flex flex-row justify-between items-center">
          <h5>30,070</h5>
          <span class="text-muted text-gray-400 text-sm py-3"
            >Visits in the past week</span
          >
        </span>
        <hr />
        <span
          class="flex flex-row justify-between items-center text-muted text-gray-400 text-sm py-3"
        >
          Your store URL
          <a href="#" target="_blank" class="text-blue-500">
            {{ 'michtolam.store.com'}}
          </a>
        </span>
      </div>
    </card>
  </div>
</template>

<script>
import Card from '~/components/Card'

export default {
  name: 'CardAnalytics',
  components: {
    Card,
  },
  props: {
    data: {
      type: [Array, Boolean],
      required: false,
      default: () => []
    },
    title: {
      type: String,
      required: false,
      default: ""
    },
    subtitle: {
      type: String,
      required: false,
      default: ""
    },
    value: {
      type: String,
      required: false,
      default: ""
    },
    message: {
      type: String,
      required: false,
      default: ""
    },
    emptyMessage: {
      type: String,
      required: false,
      default: ""
    },
    link: {
      type: String,
      required: false,
      default: ""
    },
    linkText: {
      type: String,
      required: false,
      default: ""
    }
  },
  data() {
    return {
      analytics: {
        labels: ['Jan', 'Feb', 'Mar'],
        datasets: [
          {
            label: '2015',
            data: [12, 34, 2, 4, 45, 34, 2],
          },
        ],
      },
      weeklyStats: null,
      customers: null,
    }
  },
  computed: {},
  mounted() {
    // eslint-disable-next-line no-console
    console.log(this.data)
  },
  methods: {},
}
</script>
