<template v-slot:menu-button>
  <div>
    <slot> Button from childss </slot>
  </div>
</template>

<script>
export default {
  name: 'MenuButton',
}
</script>
