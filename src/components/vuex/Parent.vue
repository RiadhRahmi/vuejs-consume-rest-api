<template>
  <div>
    <div class="parent">
      <h1 class="display-4">Adjust message</h1>
      <small>Uses Vuex to reactively sync data across sibling components</small>
      <app-vuex-component></app-vuex-component>
    </div>
    <div class="split">
      <app-sibling-one class="child"></app-sibling-one>
      <app-sibling-two class="child"></app-sibling-two>
    </div>
  </div>
</template>

<script>
  import VuexComponent from './VuexComponent.vue'
  import SiblingOne from './SiblingOne.vue'
  import SiblingTwo from './SiblingTwo.vue'

  export default {
    components: {
      appVuexComponent: VuexComponent,
      appSiblingOne: SiblingOne,
      appSiblingTwo: SiblingTwo
    },
    data() {
      return {}
    }
  }
</script>

<style scoped>

</style>
