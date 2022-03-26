import Vue from 'vue'
import naira from '../config/money'

/**
 * Problem causing NAN is that the money config is returning the Naira sign.
 * We want to modify our set up to be able to return just the figures in the formatted manner
 */
Vue.directive('money', {
  inserted(el, binding) {
    el.innerText = naira.format(binding.value)
  },
  // using update for cases where the value is from db
  update(el, binding) {
    el.innerText = naira.format(binding.value)
  },
})
