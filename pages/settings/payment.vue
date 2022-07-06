<template>
  <div>
    <h2 class="font-heading">Payment Settings</h2>
    <p class="text-muted">Update your payment options</p>

    <span class="block border-b my-5" />
    <!--Available options-->
    <div class="my-10">
      <h2 class="font-heading mb-2">Add new payment methods</h2>
      <div class="flex flex-row space-x-5">
        <button v-for="(option, key) in options" :key="key" class="card w-3/12 hover:border-indigo-600" :class="selected.id === option.id ? 'border-indigo-600' : ''" @click.exact="select(key)">
          <!--Title and radio-->
          <div class="flex justify-between px-4">
            <!-- Title and description-->
            <div class="flex flex-col items-start">
              <h2 class="font-body">{{ option.name }}</h2>
              <p class="text-muted whitespace-nowrap">{{ option.description }}</p>
            </div>
            <input :id="option.id" v-model="form.provider" name="new_provider" :value="option.id" type="radio">
          </div>
          <div class="flex flex-row justify-between px-4 pt-5">
            <div class="flex">
              <span v-for="(method, index) in option.method" :key="index" :title="'Pay with ' + method">
                <img v-if="method === 'card'" src="~assets/icons/card.svg" class="h-4 w-4" :alt="method">
                <img v-if="method === 'qr'" src="~assets/icons/qr.svg" class="h-4 w-4" :alt="method">
                <img v-if="method === 'ussd'" src="~assets/icons/mobile.svg" class="h-4 w-4" :alt="method">
                <img v-if="method === 'bank' || method === 'banktransfer'" src="~assets/icons/institution.svg" class="h-4 w-4" :alt="method">
                <img v-if="method === 'cash'" src="~assets/icons/cash.svg" class="h-4 w-4" :alt="method">
              </span>
            </div>
            <a v-if="option.type !== 'manual'" target="_blank" :href="option.website" class="hover:text-gray-700 flex items-center text-muted">
              website
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            <span v-else title="Pay with cash or transfer">
              <img src="~assets/icons/cash.svg" class="h-4 w-4" alt="Pay with cash or transfer">
            </span>
          </div>
        </button>
      </div>
    </div>

    <span class="block border-b my-5" />
    <!--Configure the method-->
    <div v-if="selectedSettings && selected.type !== 'manual'" class="my-10 w-9/12">
      <h2 class="font-heading mb-3">Configure your settings for {{ selected.name }}</h2>

      <div class="flex flex-col mb-4">
        <label>Public key</label>
        <span class="text-muted">This can be gotten from your paystack settings page</span>
        <text-input v-model="form.public_key" type="password" :secret="true" :autofill="false" />
      </div>

      <div class="flex flex-col mb-4">
        <label for="">Secret key</label>
        <span class="text-muted">This can be gotten from your paystack settings page</span>
        <text-input v-model="form.secret_key" type="password" :secret="true" :autofill="false" />
      </div>

      <div class="flex flex-col mb-4">
        <label for="">Leave a note for users</label>
        <span class="text-muted">A short instruction or disclaimer</span>
        <textarea v-model="form.notes" cols="5" rows="5" class="card outline-none" spellcheck="false"></textarea>
      </div>

      <div class="flex flex-col mb-4">
        <label for="">Select your preferred channels</label>
        <span class="text-muted">This options will be provided to your customers to pay with</span>
        <span v-for="method in selected.method" :key="method">
          <input :id="method" v-model="form.channels" :value="method" type="checkbox">
          <label :for="method">{{ method }}</label>
        </span>
      </div>

      <button class="btn" @click="update">Save</button>

    </div>
    <div v-else-if="selectedSettings && selected.type === 'manual'">
      <h2 class="font-heading mb-3">Configure your settings for {{ selected.name }}</h2>

      <div class="flex flex-col mb-4">
        <label for="">Leave a note for customers at checkout</label>
        <span class="text-muted">A short instruction or disclaimer</span>
        <textarea v-model="form.notes" cols="5" rows="5" class="card outline-none" spellcheck="false"></textarea>
      </div>

      <button class="btn" @click="update">Save</button>

    </div>
    <div v-else>
      <h2 class="font-heading mb-3">Select a payment method above to configure</h2>
      <span class="text-muted">Configuration options will appear here</span>
    </div>

    <span class="block border-b my-5" />
    <!--Active options-->
    <h2 class="font-heading mb-2">Active payment methods</h2>
    <div class="flex flex-row space-x-5">
      <div v-for="(option, key) in existing_options" :key="key" class="card w-3/12 hover:border-indigo-600">
        <!--Title and radio-->
        <div class="flex justify-between px-4">
          <!-- Title and description-->
          <div class="flex flex-col items-start">
            <h2 class="font-body">{{ option.name }}</h2>
            <p class="text-muted whitespace-nowrap">{{ option.description }}</p>
          </div>
          <input :id="option.id" v-model="form.provider" :checked="option.pivot.active === true" name="existing_provider" :value="option.id" type="checkbox">
        </div>
        <div class="flex flex-row justify-between px-4 pt-5">
          <div class="flex">
            <span v-for="(method, index) in option.pivot.channels" :key="index" :title="'Pay with ' + method">
              <img v-if="method === 'card'" src="~assets/icons/card.svg" class="h-4 w-4" :alt="method">
              <img v-if="method === 'qr'" src="~assets/icons/qr.svg" class="h-4 w-4" :alt="method">
              <img v-if="method === 'ussd'" src="~assets/icons/mobile.svg" class="h-4 w-4" :alt="method">
              <img v-if="method === 'bank' || method === 'banktransfer'" src="~assets/icons/institution.svg" class="h-4 w-4" :alt="method">
              <img v-if="method === 'cash'" src="~assets/icons/cash.svg" class="h-4 w-4" :alt="method">
            </span>
          </div>
          <a v-if="option.type !== 'manual'" target="_blank" :href="option.website" class="hover:text-gray-700 flex items-center text-muted">
            website
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
          <span v-else title="Pay with cash or transfer">
            <img src="~assets/icons/cash.svg" class="h-4 w-4" alt="Pay with cash or transfer">
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PaymentSettingsPage',
  layout: 'app',
  data() {
    return {
      page: 'Settings',
      options: [],
      existing_options: [],
      selected: [],
      form: this.$form({
        channels: [],
        notes: '',
        public_key: '',
        secret_key: ''
      }),
    }
  },
  /**
   * We will fetch the existing providers the store has configured
   * as well as the entire porvider options available to configure
   */
  async fetch() {
    const options = await this.$axios.get(`${this.$storeUrl}/payment-options`)
    const existingOptions = await this.$axios.get(`${this.$storeUrl}/providers/payment`)

    this.options = options.data
    this.existing_options = existingOptions.data
  },
  computed: {
    selectedSettings () {
      return Object.keys(this.selected).length !== 0
    }
  },
  methods: {
    update() {
       const data = {}

      Object.assign(data, this.form.data(), {
        type: this.selected.type,
        id: this.selected.id
      })

      const response = this.$axios.post(`${this.$storeUrl}/providers/payment`, data)
      .then((response) => {
        // eslint-disable-next-line no-console
        console.log(response, this.form.data())

        this.$notify({
          type: 'success',
          group: 'app',
          title: 'Payment method added successfully',
          data: response
        })
      })
      .catch((err) => {
        this.$notify({
          type: 'error',
          group: 'app',
          title: 'There was an error with your form',
          data: err,
          text: err.response.data.message,
          duration: 5000
        })
      })

      // eslint-disable-next-line no-console
      console.log(response)
    },
    select(id) {
      this.selected = this.options[id]
    }
  }
}
</script>

<router>
  {
    name: 'settings-payment'
  }
</router>
