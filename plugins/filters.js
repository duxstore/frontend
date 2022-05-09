import Vue from 'vue'
import naira from '../config/money'

Vue.filter('money', function (value) {
  return naira.format(value)
})
