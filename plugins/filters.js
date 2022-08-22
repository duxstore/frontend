import Vue from 'vue'
import naira from '../config/money'

Vue.filter('money', function (value) {
  return naira.format(value)
})

Vue.filter('number', function (value) {
  const num = Intl.NumberFormat('en-NG')

  return num.format(value)
})

Vue.filter('greet', function(value) {
  const name = value

  const date = new Date();
  const curHr = date.getHours()

  let gesture = null

  if (curHr < 12) {
    gesture = 'Good morning'
  } else if (curHr < 18) {
    gesture = 'Good afternoon'
  } else {
    gesture = 'Good evening'
  }

  return gesture + ' ' + name
})
