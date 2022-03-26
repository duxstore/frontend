import Vue from 'vue'

Vue.directive('draft', {
  update(el, binding) {
    if (!binding.value) return
    el.innerText = `<span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                            ${binding.value}
                        </span>`
  },
})

const statuses = {
  published: 'bg-green-100 text-green-800',
  draft: 'bg-red-100 text-red-800',
  failed: 'bg-red-100 text-red-800',
  error: 'bg-red-100 text-red-800',
}

Vue.directive('status', {
  update(el, binding) {
    if (!binding.value) return
    el.innerHTML = `<span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
      statuses[binding.args]
    }">
                            ${binding.value}
                        </span>`
  },
})
