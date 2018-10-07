<template>
  <div>
    <app-show-user :user="user">
      <h6> Edit User : {{ user.name }}</h6>
    </app-show-user>

    <form @submit.prevent="updateUser">
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" class="form-control"
               id="name" placeholder="Enter name"
               v-model.lazy="user.name" name="name">
      </div>

      <div class="form-group">
        <label for="email">email</label>
        <input ype="email" class="form-control"
               id="email" placeholder="Enter email"
               v-model.lazy="user.email" name="email">
      </div>

      <div class="form-group">
        <label for="password">Password </label>
        <div class="input-group">
          <input :type="isPassword?'password':'text'" class="form-control"
                 placeholder="password" aria-label="Input group example"
                 aria-describedby="btnGroupAddon" name="password" id="password"
                 v-model.lazy="user.password">

          <button class="input-group-text" @click.prevent="togglePassword">
            <i class="fas fa-eye"></i>
          </button>
        </div>
      </div>

      <div class="form-group">
        <label class="pr-3"> Role </label>
        <div class="form-check form-check-inline" v-for="role in roles">
          <input class="form-check-input" :id="'role'+role.id" type="radio"
                 :checked="role.id===user.role" :value="role.id"
                 name="role" v-model.lazy="user.role">
          <label class="form-check-label" :for="'role'+role.id">
            {{ role.name }}
          </label>
        </div>
      </div>
      <button class="btn btn-primary">
        Submit
      </button>
    </form>

  </div>
</template>

<script>
  import ShowUser from '../users/ShowUser.vue'
  import UserService from '../../services/userService';

  export default {
    components: {
      appShowUser: ShowUser
    },
    props: ['user']
    ,
    data() {
      return {
        isPassword: true,
        roles: [
          {id: 0, name: 'administrator'},
          {id: 1, name: 'editor'}
        ],

      }
    },
    methods: {
      updateUser() {
        UserService.post(this.user.id, this.user).then(response => {
          // this.$router.push('/users');
          location.reload(true);
        }, error => {
          this.showAlert = true;
          this.colorAlert = 'danger';
          this.messageAlert = 'failed operation';
        });
      },
      togglePassword() {
        this.isPassword = !this.isPassword;
      }
    }
  }
</script>

<style scoped>

</style>
