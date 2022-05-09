import { parse } from 'tldts'
import { Model } from 'vue-api-query'

/**
 * Just make sure we always have a store as part of our API url
 * Get it from the domain name
 */
export default function (context) {
  let subdomain = null

  if(context.req)
  {
    const domain = parse(context.req.headers.host)
    subdomain = domain.subdomain
  }

  if(process.client)
  {
    // The store name set at the point of login
    const storeAuthed = context.$auth.$storage.getUniversal('store')
    if(storeAuthed !== null)
    {
      Model.$http = context.$axios
      Model.$baseURL = context.$axios.defaults.baseURL + '/store/' + storeAuthed
    }
    else if(subdomain !== null)
    {
      Model.$http = context.$axios
      Model.$baseURL = context.$axios.defaults.baseURL + '/store/' + subdomain
    }
  }
}
