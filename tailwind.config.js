module.exports = {
  mode: 'jit',
  content: [
    'components/**/*.vue',
    'layouts/**/*.vue',
    'pages/**/*.vue',
    'templates/**/*.vue',
    'plugins/**/*.js',
    'nuxt.config.js'
  ],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      borderColor: {
        primary: '#333',
      },
      borderWidth: {
        1: '1px',
      },
      fontFamily: {
        body: ['Montserrat', 'sans-serif'],
        heading: ['Libre Baskerville', 'serif'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
