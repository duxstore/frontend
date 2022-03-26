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
        <h2 class="font-heading text-3xl font-bold">Welcome!</h2>
        <h2 class="font-heading text-3xl font-bold">Create your new store.</h2>
        <form
          class="flex flex-col space-y-4 my-4"
          @keyup="user.errors.clear()"
          @submit.prevent="register"
        >
          <p v-if="user.errors.any()" class="text-lg text-red-500">
            {{ user.errors.message() }}
          </p>
          <!-- Store name -->
          <div class="flex flex-col">
            <label for="store_name" class="font-bold cursor-pointer"
              >Store name</label
            >
            <span class="text-muted"
              >Enter the business name for your store</span
            >
            <input
              id="store_name"
              v-model="user.name"
              type="text"
              class="px-2 outline-none border h-10 rounded-sm"
              placeholder="Sample Store"
              :class="user.errors.has('name') ? 'border-red-500' : ''"
            />
            <span v-if="user.errors.has('name')" class="text-sm text-red-500">
              {{ user.errors.get('name') }}
            </span>
          </div>
          <!-- Store unique name -->
          <div class="flex flex-col">
            <label for="store_shortname" class="font-bold cursor-pointer">
              Store shortname
            </label>
            <span class="text-muted">Choose your store unique shortname</span>
            <div
              class="border flex h-10 items-center justify-between outline-none px-2 rounded-sm"
              :class="user.errors.has('store') ? 'border-red-500' : ''"
            >
              <input
                id="store_shortname"
                v-model="user.store"
                type="store"
                class="outline-none w-full"
                placeholder="Your store shortname"
              />
              <span>.shopbot.com</span>
            </div>
            <span v-if="user.errors.has('store')" class="text-sm text-red-500">
              {{ user.errors.get('store') }}
            </span>
          </div>
          <!-- Email -->
          <div class="flex flex-col">
            <label for="email" class="font-bold cursor-pointer">Email</label>
            <span class="text-muted">Enter your email address</span>
            <input
              id="email"
              v-model="user.email"
              type="email"
              class="px-2 outline-none border h-10 rounded-sm"
              placeholder="someone@email.com"
              :class="user.errors.has('email') ? 'border-red-500' : ''"
            />
            <span v-if="user.errors.has('email')" class="text-sm text-red-500">
              {{ user.errors.get('email') }}
            </span>
          </div>
          <!-- Password -->
          <div class="flex flex-col">
            <label for="password" class="font-bold cursor-pointer"
              >Password</label
            >
            <span class="text-muted">Enter your password</span>
            <input
              id="password"
              v-model="user.password"
              type="password"
              class="px-2 outline-none border h-10 rounded-sm"
              name="password"
            />
            <span
              v-if="user.errors.has('password')"
              class="text-sm text-red-500"
            >
              {{ user.errors.get('password') }}
            </span>
          </div>

          <!-- Confirm password -->
          <div class="flex flex-col">
            <label for="password_confirmation" class="font-bold cursor-pointer"
              >Confirm Password</label
            >
            <span class="text-muted">Enter your password, again</span>
            <input
              id="password_confirmation"
              v-model="user.password_confirmation"
              type="password"
              class="px-2 outline-none border h-10 rounded-sm"
            />
            <span
              v-if="user.errors.has('password_confirmation')"
              class="text-sm text-red-500"
            >
              {{ user.errors.get('password_confirmation') }}
            </span>
          </div>

          <button
            type="submit"
            :disabled="user.errors.any() || user.data() == null"
            class="bg-green-300 shadow font-bold h-10 rounded"
          >
            Sign up
          </button>

          <div>
            <p class="text-center font-light">
              Already have an account?
              <nuxt-link :to="{name: 'login'}" class="font-bold"
                >Login here.</nuxt-link
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
  name: 'RegisterPage',
  auth: 'guest',
  layout: 'auth',
  data() {
    return {
      bg: 'https://images.unsplash.com/photo-1559087316-47ce212113b7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1973&q=80',
      step: 1,
      user: this.$form({
        name: null,
        email: null,
        password: null,
        password_confirmation: null,
        store: null,
      }),
      store: this.$form({
        storeId: null,
        industry: null,
        size: null,
        category: null,
      }),
    }
  },

  computed: mapState({
    authenticatedUser: (state) => state.user,
  }),

  methods: {
    register() {
      this.user
        .post('/sign-up', {
          step: 1,
        })
        .then((res) => {
          console.log(res.data)
        })
        .catch((err) => console.log(err))
    },
  },
}
</script>

<router>
{
  name: 'register',
  path: '/auth/register'
}
</router>
