import Vue from 'vue'
import moment from 'moment'

Vue.filter('dateAgo', function (value) {
  return moment(value).fromNow()
})
