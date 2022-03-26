import Form from '../helpers/Form'
import Errors from '../helpers/Error'

export default ({ $axios, $recaptcha, context }, inject) => {

  inject('form', data => new Form(data, $axios));
  inject('formError', () => new Errors());

}
