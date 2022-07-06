<template>
  <div :class="secret ? 'bg-black card flex focus-within:bg-gray-50 h-12 justify-between md:w-full outline-none w-4/12' : ''">
    <input
      id="name"
      :value="value"
      :type="!secret ? type : reveal_secret"
      :autocomplete="autofill ? 'on' : 'off'"
      :aria-autocomplete="autofill ? 'on' : 'off'"
      :class="!secret ? 'md:w-full w-4/12 border card outline-none focus-within:bg-gray-50 bg-black' : 'bg-transparent outline-none w-full'"
      @input="input"
    />
    <button v-if="secret" class="btn" @click="revealSecret">
      <svg v-if="reveal_secret !== 'password'" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
      <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'text',
      required: true
    },
    autofill: {
      type: Boolean,
      default: true,
      required: false
    },
    secret: {
      type: Boolean,
      default: false,
      required: false,
    },
    value: {
      type: String,
      default: '',
      required: false
    }
  },
  data() {
    return {
      reveal_secret: 'password'
    }
  },
  methods: {
    input (e) {
      this.$emit('input', e.target.value)
    },
    revealSecret () {
      this.reveal_secret = this.reveal_secret === 'password' ? 'text' : 'password'
    }
  }
}
</script>
