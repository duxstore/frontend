import Vue from 'vue'
import money from '../config/money'

Vue.filter('money', function (value) {
  return money.format(value)
})
