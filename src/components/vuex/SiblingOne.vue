<template>
  <div>
    <small class="text-muted mb-0">Message from Sibling 1</small>
    <h2>{{ message }}</h2>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    computed: {
      message() {
        return this.$store.getters.getMessage;
      }
    }
  }
</script>

<style scoped>

</style>
