import { Model } from 'vue-api-query'

/**
 * This plugin handles data fetching
 * and won't work unless we're logged in
 * this is so that all our requests can be
 * scoped to the store that we're logged into
 */
export default function ({ $auth, $axios}, inject) {
  if ($auth.loggedIn) {
    Model.$http = $axios
    Model.$baseURL = $axios.defaults.baseURL + '/store/' +   $auth.$storage.getUniversal('store')
  } else {
    $auth.logout() // ensure user is logged out
    // redirect to login page
  }

  $axios.onResponse(response => {
    // eslint-disable-next-line no-console
    console.log('request status code is ', response.status, '\n', 'status text is ', response.statusText)
  })
}
