import { parse } from 'tldts'
import Form from '../helpers/Form'
// import Errors from '../helpers/Error'

export default ({ $axios, req }, inject) => {
  let subdomain = null
  let domain = null

  if(req)
  {
    domain = parse(req.headers.host)
    subdomain = domain.subdomain
  }

  if(process.client)
  {
    domain = parse(window.location.href)
    subdomain = domain.subdomain
    inject('storename', subdomain) // used to autofill the login form
    inject('storeUrl', $axios.defaults.baseURL + '/store/' + subdomain)
  }

  inject('form', data => new Form(data, $axios, subdomain));
  // inject('formError', () => new Errors());
}
