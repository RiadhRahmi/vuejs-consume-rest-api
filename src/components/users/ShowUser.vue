<template>
  <div>
    <slot></slot>
    <div class="card bg-light mb-3">
      <div class="card-body">
        <h5 class="card-title">{{ user.name}}</h5>
        <h6 class="card-subtitle mb-2 text-muted">{{ user.email}}</h6>
        <p class="card-text">{{ roles[user.role].name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['user']
    ,
    data() {
      return {
        roles: [
          {id: 0, name: 'administrator'},
          {id: 1, name: 'editor'}
        ],
      }
    }
  }
</script>

<style scoped>

</style>
