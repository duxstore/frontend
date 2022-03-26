<template>
  <div>
    <div v-if="Array.isArray(errors)">
      <div
        v-for="(error, index) in errors"
        :key="index"
        class="bg-white border-gray-200 border-1 p-3"
      >
        <p class="text-lg text-red-500">
          {{ error }}
        </p>
      </div>
    </div>
    <div v-else-if="hasErrors" class="bg-white border-gray-200 border-1 p-3">
      <p class="text-lg text-red-500">
        {{ errors }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FormError',
  props: {
    hasErrors: {
      type: Boolean,
      required: true,
      default: false,
    },
    errorObject: {
      type: Object,
      required: true,
      default: () => {},
    },
    errorMessage: {
      required: true,
    },
  },
  computed: {
    errors() {
      if (this.errorMessage) {
        return this.errorMessage
      } else if (this.errorObject.all()) {
        return this.errorObject.all()
      } else if (this.errorObject.message()) {
        return this.errorObject.message()
      } else {
        return null
      }
    },
  },
}
</script>
