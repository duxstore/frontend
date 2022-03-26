module.exports = {
  purge: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  darkMode: false, // or 'media' or 'class'
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
