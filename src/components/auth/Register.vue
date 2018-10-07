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
              {{ pagetitle }}
            </div>
            <div class="card-body col-10 mx-auto">
              <form>
                <div class="form-group">
                  <label for="name">Name</label>
                  <input v-model.lazy="user.name" type="text" class="form-control"
                         id="name" placeholder="Enter name">
                </div>

                <div class="form-group">
                  <label for="email">email</label>
                  <input v-model.lazy="user.email" type="email" class="form-control"
                         id="email" placeholder="Enter email" name="email">
                </div>

                <div class="form-group">
                  <label for="password">Password </label>
                  <input v-model.lazy="user.password" type="password" class="form-control"
                         id="password" placeholder="password"
                  >
                </div>

                <div class="form-group">
                  <label for="c_password">Confirm Password </label>
                  <input v-model.lazy="user.c_password" type="password" class="form-control"
                         id="c_password" placeholder="Confirm Password">
                </div>

                <button type="submit" class="btn btn-primary" @click.prevent="register">
                  Submit
                </button>
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
        pagetitle: 'Register',
        showAlert: false,
        colorAlert: 'success',
        messageAlert: '',
        user: {
          name: '',
          email: '',
          password: '',
          c_password: '',
        }

      }
    },
    methods: {
      register() {
        AuthService.register(this.user).then(response => {
          if (response.status == 201) {
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
