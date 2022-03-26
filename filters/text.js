import Vue from 'vue'
import upperFirst from 'lodash/upperFirst'

Vue.filter('upperfirst', function (value) {
  return upperFirst(value)
})
