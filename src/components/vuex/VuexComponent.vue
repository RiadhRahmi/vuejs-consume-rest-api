<template>
  <div class="editor">
    <input class="form-control" @input="updateMessage()" v-model="mymessage">
    <button class="btn btn-primary" @click="updateMessage()">Update</button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        new_message: ''
      }
    },
    computed: {
      mymessage: {
        get: function () {
          return this.$store.getters.getMessage;
        },
        set: function (val) {
          this.new_message = val
        }
      }
    },
    methods: {
      updateMessage() {
        this.$store.dispatch('updateMessage', {
          message: this.new_message
        })
      }
    }
  }
</script>
</template>


<style scoped>

</style>
