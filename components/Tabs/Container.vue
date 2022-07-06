<template>
  <div>
    <li v-for="(tab, index) in tabs" :key="index" :class='{"tabs__selected": (index == selectedIndex)}' @click="selectTab(index)">
      {{ tab.title }}
    </li>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'TabsContainer',
    data () {
      return {
        selectedIndex: 0, // the index of the selected tab,
        tabs: [],        // all of the tabs
      }
    },
    mounted () {
      // eslint-disable-next-line no-console
      console.log(this, this.$children)

      this.selectTab(0)
    },
  	created () {
      this.tabs = this.$children
  	},
    methods: {
      selectTab (i) {
        this.selectedIndex = i

        // loop over all the tabs
        this.tabs.forEach((tab, index) => {
          tab.isActive = (index === i)
        })
      }
    }
  }
</script>
