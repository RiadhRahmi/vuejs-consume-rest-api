<template>
  <div>
    <div class="row">
      <div class="col-12">
        <div class="pb-2 mt-4 mb-2 border-bottom">
          <h1>
            {{ pagetitle }}
          </h1>
        </div>
      </div>
    </div>

    <div class="row" v-show="showAlert">
      <div class="col-12">
        <b-alert show dismissible :variant="colorAlert">
          {{ messageAlert }}
        </b-alert>
      </div>
    </div>

    <div class="card bg-light mb-3 mt-5 pt-5" v-if="user">
      <div class="card-body">
        <h5 class="card-title">{{ user.name}}</h5>
        <h6 class="card-subtitle mb-2 text-muted">{{ user.email}}</h6>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        pagetitle: 'My Profil',
        showAlert: false,
        colorAlert: 'success',
        messageAlert: '',
        user: {
          name: '',
          email: ''
        },
      }
    },
    mounted() {
      const currentUser =  JSON.parse(localStorage.getItem('currentUser'));
      if (currentUser) {
        this.user = currentUser;
      } else {
        this.showAlert = true;
        this.alert.type = 'danger';
        this.alert.message = 'failed operation';
        this.$router.push('/login');
      }
    }
  }
</script>

<style scoped>

</style>
