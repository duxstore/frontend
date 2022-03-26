import Vue from 'vue'

Vue.filter('draft', function (value) {
  return `<span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                ${value}
            </span>`
})

Vue.filter('published', function (value) {
  return `<span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                ${value}
            </span>`
})
