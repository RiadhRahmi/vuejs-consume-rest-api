<template>
  <div>
    <div class="row" v-show="showAlert">
      <div class="col-12">
        <b-alert show dismissible :variant="colorAlert">
          {{ messageAlert }}
        </b-alert>
      </div>
    </div>
    <div class="container mt-5 pt-5">
      <div class="row">
        <div class="col-8 mx-auto">
          <div class="card">
            <div class="card-header">
              Please sign in
            </div>
            <div class="card-body col-8 mx-auto">
              <form>
                <div class="form-group">
                  <label for="exampleInputEmail1">Email address</label>
                  <input v-model.lazy="email" type="email" class="form-control" id="exampleInputEmail1"
                         aria-describedby="emailHelp" placeholder="Enter email">
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Password</label>
                  <input v-model.lazy="password" type="password" class="form-control"
                         id="exampleInputPassword1" placeholder="Password">
                </div>
                <button type="submit" class="btn btn-primary" @click.prevent="login">
                  Submit
                </button>
                <router-link tag="button" class="btn btn-success ml-1" to="/register">Register</router-link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {AuthService} from '../../services/authService';

  export default {
    data() {
      return {
        showAlert: false,
        colorAlert: 'success',
        messageAlert: '',
        email: '',
        password: ''
      }
    },
    methods: {
      login() {
        AuthService.login({email: this.email, password: this.password}).then(response => {
          if (response.status == 200) {
            localStorage.setItem('currentUser', JSON.stringify(response.data));
            this.$router.push('/');
          } else {
            this.showAlert = true;
            this.colorAlert = 'danger';
            this.messageAlert = "failed operation";
          }
        }, error => {
          this.showAlert = true;
          this.colorAlert = 'danger';
          this.messageAlert = 'failed operation' + error.toString();
        });
      }
    }
  }
</script>

<style scoped>

</style>
