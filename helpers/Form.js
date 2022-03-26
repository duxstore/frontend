import axios from 'axios'
import Errors from './Error'

class Form {
  /**
   * Create a new Form instance.
   *
   * @param {object} data
   */
  constructor(data) {
    // set axios defaults
    axios.defaults.headers.common.Accept = 'application/json'
    axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
    axios.defaults.withCredentials = true

    this.baseURL = process.env.VUE_APP_API_BASE_URL

    // console.log(this.baseURL)
    // set app base URL
    // const storeUrl = JSON.parse(window.localStorage.getItem('store'))

    this.appBaseURL = this.baseURL

    // if (!storeUrl) {
    //   this.appBaseURL = this.baseURL
    // } else {
    //   const fullUrl = this.baseURL + '/store/' + storeUrl.shortname
    //   this.appBaseURL = fullUrl
    // }

    this.originalData = data

    for (const field in data) {
      this[field] = data[field]
    }

    this.errors = new Errors()
  }

  /**
   * Fetch all relevant data for the form.
   */
  data() {
    const data = {}

    for (const property in this.originalData) {
      data[property] = this[property]
    }

    return data
  }

  /**
   * Reset the form fields.
   */
  reset() {
    for (const field in this.originalData) {
      this[field] = ''
    }

    this.errors.clear()
  }

  /**
   * Send a POST request to the given URL.
   * .
   * @param {string} url
   */
  post(url, params = null) {
    return this.submit('post', url, params)
  }

  /**
   * Send a PUT request to the given URL.
   * .
   * @param {string} url
   */
  put(url) {
    return this.submit('put', url)
  }

  /**
   * Send a PATCH request to the given URL.
   * .
   * @param {string} url
   */
  patch(url) {
    return this.submit('patch', url)
  }

  /**
   * Send a DELETE request to the given URL.
   * .
   * @param {string} url
   */
  delete(url) {
    return this.submit('delete', url)
  }

  /**
   * A special method to login
   * with this form
   */
  login() {
    return new Promise((resolve, reject) => {
      axios
        .post(this.baseURL + '/login', this.data())
        .then((response) => {
          this.onSuccess(response.data)
          resolve(response.data)
        })
        .catch((error) => {
          this.onFail(error.response.data)
          reject(error.response.data)
        })
    })
  }

  /**
   * Submit the form.
   *
   * @param {string} requestType
   * @param {string} url
   */
  submit(requestType, url, params = null) {
    return new Promise((resolve, reject) => {
      axios[requestType](this.appBaseURL + url, this.data(), {
        params,
      })
        .then((response) => {
          this.onSuccess(response.data)
          if (requestType === 'delete') {
            this.reset()
          }
          resolve(response.data)
        })
        .catch((error) => {
          this.onFail(error.response.data)

          reject(error.response.data)
        })
    })
  }

  /**
   * Handle a successful form submission.
   *
   * @param {object} data
   */
  onSuccess() {
    // this.reset();
  }

  /**
   * Handle a failed form submission.
   *
   * @param {object} errors
   */
  onFail(errors) {
    this.errors.record(errors)
  }
}

export default Form
