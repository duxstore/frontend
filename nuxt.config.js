export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'frontend-nuxt',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {
      src: '~/plugins/vue-tags-input.client.js',
      ssr: false,
    },
    {
      src: '~/plugins/vue-chart.js',
      ssr: false,
    },
    {
      src: '~/plugins/vue-spinner.js',
      ssr: false,
    },
    {
      src: '~/plugins/form.js',
      ssr: true,
    },
    {
      src: '~/plugins/filters.js',
      ssr: true,
    },
    {
      src: '~/plugins/vue-trix.js',
      ssr: false,
    },
    {
      src: '~/plugins/vue-notification.js',
      ssr: false
    },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/router-extras',
    '@nuxtjs/moment'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/auth-next',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: process.env.API_URL,
    credentials: true
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    vendor: ['@johmun/vue-tags-input'],
    transpile: ['lodash-es']
  },

  router: {
    middleware: ['auth', 'store']
  },
  auth: {
    // includeNodeModules: true,
    resetOnError: true,
    cookie: {
      options: {
        expires: 12000
      }
    },
    strategies: {
      local: {
        token: {
          property: 'data.token'
        },
        user: {
          property: ''
        },
        endpoints: {
          login: { url: process.env.API_URL + '/login', method: 'post' },
          logout: { url: process.env.API_URL + '/logout', method: 'post' },
          user: { url: process.env.API_URL + '/user', method: 'get' }
        }
      }
    },
    redirect: {
      login: '/auth/login',
      logout: '/',
      callback: '/auth/login',
      home: '/'
    },
    plugins: [ '~/plugins/vue-api-query.js' ]
  },

  privateRuntimeConfig: {
    axios: {
      baseUrl: process.env.API_URL
    }
  }
}
