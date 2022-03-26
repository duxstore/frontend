import { Model } from 'vue-api-query'

/**
 * This plugin handles data fetching
 * and won't work unless we're logged in
 * this is so that all our requests can be
 * scoped to the store that we're logged into
 */
export default function ({ $auth, $axios }) {
  if (!$auth.loggedIn) {
    return
  }


  // eslint-disable-next-line no-console
  // console.log(process.env.API_URL, process.env.apiUrl, $axios.defaults.baseURL, $axios)
  Model.$http = $axios
  Model.$baseURL = $axios.defaults.baseURL + '/store/' +   $auth.$storage.getUniversal('store')
}
