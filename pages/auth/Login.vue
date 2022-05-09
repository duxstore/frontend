<template>
  <div
    class="bg-gray-200 flex items-center w-full flex-col justify-center h-screen"
  >
    <div
      class="rounded-sm h-full my-20 shadow-lg w-10/12 flex flex-row justify-evenly"
    >
      <div
        class="bg-white border-gray-200 border-r-1 w-6/12 py-10 px-10 flex flex-col justify-center h-full"
      >
        <h2 class="font-heading text-3xl font-bold">Welcome back!</h2>
        <h2 class="font-heading text-3xl font-bold">Login to your shop.</h2>
        <form
          class="flex flex-col space-y-4 my-4"
          method="get"
          @keyup="form.errors.clear()"
          @submit.prevent="login"
        >
          <p v-if="form.errors.any()" class="text-lg text-red-500">
            {{ form.errors.message() }}
          </p>
          <div class="flex flex-col">
            <label for="store" class="font-bold cursor-pointer"> Store </label>
            <span class="text-muted">Enter your store unique name</span>
            <div
              class="border flex h-10 items-center justify-between outline-none px-2 rounded-sm"
              :class="form.errors.has('store') ? 'border-red-500' : ''"
            >
              <input
                id="store"
                v-model="form.store"
                type="store"
                class="outline-none w-full"
                placeholder="Your store shortname"
                disabled
              />
              <span>.shopbot.com</span>
            </div>
            <span v-if="form.errors.has('store')" class="text-sm text-red-500">
              {{ form.errors.get('store') }}
            </span>
          </div>
          <div class="flex flex-col">
            <label for="email" class="font-bold cursor-pointer">Email</label>
            <span class="text-muted">Enter your email address</span>
            <input
              id="email"
              v-model="form.email"
              type="email"
              class="px-2 outline-none border h-10 rounded-sm"
              placeholder="someone@email.com"
              :class="form.errors.has('email') ? 'border-red-500' : ''"
            />
            <span v-if="form.errors.has('email')" class="text-sm text-red-500">
              {{ form.errors.get('email') }}
            </span>
          </div>
          <div class="flex flex-col">
            <label for="password" class="font-bold cursor-pointer"
              >Password</label
            >
            <span class="text-muted">Enter your password</span>
            <input
              id="password"
              v-model="form.password"
              type="password"
              class="px-2 outline-none border h-10 rounded-sm"
              name="password"
            />
            <span
              v-if="form.errors.has('password')"
              class="text-sm text-red-500"
            >
              {{ form.errors.get('password') }}
            </span>
          </div>
          <button
            type="submit"
            :disabled="form.errors.any() || form.data() == null"
            class="bg-green-300 shadow font-bold h-10 rounded"
          >
            Login
          </button>

          <div>
            <p class="text-center font-light">
              Don't have an account yet?
              <nuxt-link :to="{ name: 'register'}" class="font-bold"
                >Register here.</nuxt-link
              >
            </p>
          </div>
        </form>
      </div>
      <div
        class="border-gray-200 border-r-1 w-6/12"
        :style="{
          backgroundImage: `url(${bg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }"
      ></div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'LoginPage',
  auth: 'guest',
  layout: 'auth',
  data() {
    return {
      bg: 'https://images.unsplash.com/photo-1559087316-47ce212113b7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1973&q=80',
      form: this.$form({
        email: null,
        password: null,
        store: this.$storename,
        remember_me: null
      }),
      store: this.$authStore
    }
  },
  computed: mapState({
    authenticatedUser: (state) => state.user,
  }),
  methods: {
    login() {
      this.$auth.loginWith('local', {
        data: {
          email: this.form.email,
          password: this.form.password,
          remember_me: this.form.remember_me,
          store: this.form.store
        }
      }).then((result) => {
        // Store the name of the store that was logged in to
        this.$auth.$storage.setUniversal('store', result.data.store)
      })
      .catch((err) => {
        this.form.errors.record(err.response.data)
      })
    },
  },
}
</script>

<router>
{
  name: 'login',
  path: '/auth/login'
}
</router>
