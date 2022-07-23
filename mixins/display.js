import Vue from "vue"
import index from '~/filters/index'

const DisplayMixing = {
  created () {
    this.hello()
  },
  filters: {
    ...index
  },
  methods: {
    hello () {
      console.log('hello from mixin!')
    }
  }
}

// Make sure to pick a unique name for the flag
// so it won't conflict with any other mixin.
if (!Vue.DisplayMixing) {
  Vue.DisplayMixing = true
  Vue.mixin(DisplayMixing)
}
