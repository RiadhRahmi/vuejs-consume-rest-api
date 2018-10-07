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

    <div class="row" v-if="showAlert">
      <div class="col-12">
        <b-alert show dismissible :variant="colorAlert">
          {{ messageAlert }}
        </b-alert>
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <form @submit.prevent="createUser">
          <div class="form-group">
            <label for="name">Name</label>
            <input v-model="user.name" type="text"
                   :class="[$v.user.name.$dirty ? ($v.user.name.$invalid ?
                   ' is-invalid ' :  ' is-valid ') : ' ' , 'form-control' ]"
                   @blur="$v.user.name.$touch()"
                   id="name" placeholder="Enter name">
            <div v-if="$v.user.name.$invalid" :class="$v.user.name.$invalid ? 'invalid-feedback' : ''">
              <span v-if="!$v.user.name.required"> title is required </span>
              <span v-if="!$v.user.name.minLength">
                min Length of name is {{ $v.user.name.$params.minLength.min }} letters
              </span>
            </div>
          </div>

          <div class="form-group">
            <label for="email">email</label>
            <input v-model="user.email" type="email" class="form-control" id="email" autocomplete="off"
                   :class="[$v.user.email.$dirty ? ($v.user.email.$invalid ?
                   ' is-invalid ' :  ' is-valid ') : ' ' , 'form-control' ]"
                   @blur="$v.user.email.$touch()"
                   placeholder="Enter email" name="email">
            <div v-if="$v.user.email.$invalid" :class="$v.user.email.$invalid ?
             'invalid-feedback' : ''">
              <span v-if="!$v.user.email.required"> email is required </span>
              <span v-if="!$v.user.email.email"> invalid Adress email </span>
              <span v-if="!$v.user.email.unique"> email not unique </span>
            </div>
          </div>

          <div class="form-group">
            <label for="password">Password </label>
            <input v-model="user.password" type="password" class="form-control" autocomplete="off"
                   id="password" placeholder="password"
                   :class="[$v.user.password.$dirty ? ($v.user.password.$invalid ?
                    ' is-invalid ' :  ' is-valid ') : ' ' , 'form-control' ]"
                   @blur="$v.user.password.$touch()"
            >
            <div v-if="$v.user.password.$invalid" :class="$v.user.password.$invalid ? 'invalid-feedback' : ''">
              <span v-if="!$v.user.password.required"> password is required </span>
              <span v-if="!$v.user.password.minLength">
                min Length of password is {{ $v.user.password.$params.minLength.min }} letters
              </span>
            </div>
          </div>

          <div class="form-group">
            <label class="pr-3"> Role </label>
            <div class="custom-control custom-radio custom-control-inline" v-for="role in roles">
              <input class="custom-control-input" :id="'role'+role.id" v-model.lazy="user.role" type="radio"
                     :value="role.id" :checked="role.id== user.role"
              >
              <label class="custom-control-label" :for="'role'+role.id">
                {{ role.name | capitalize }}
              </label>
            </div>
          </div>
          <button type="submit" class="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import Vuelidate from 'vuelidate'
  import Vue from 'vue'

  Vue.use(Vuelidate);
  import {required, minLength, email} from 'vuelidate/lib/validators'
  import UserService from '../../services/userService';

  export default {
    data() {
      return {
        pagetitle: 'Add User',
        showAlert: false,
        colorAlert: 'success',
        messageAlert: '',
        roles: [
          {id: 0, name: 'administrator'},
          {id: 1, name: 'editor'}
        ],
        user: {
          name: '',
          email: '',
          password: '',
          role: 1,
        },
        vm: this
      }
    },
    validations: {
      user: {
        name: {
          required,
          minLength: minLength(3)
        },
        email: {
          required,
          email,
          unique: (val) => {
            if (val === '') return true;
            return UserService.uniqueEmail({email: val}).then(res => {
              return res.data.length === 0
            });
          }
        },
        password: {
          required,
          minLength: minLength(10)
        },

      }
    },
    methods: {
      createUser() {
        UserService.post(this.user).then(response => {
          if (response.status == 201) {
            this.$router.push('/users');
            this.showAlert = true;
            this.colorAlert = 'success';
            this.messageAlert = "operation with success";
          } else {
            this.showAlert = true;
            this.colorAlert = 'danger';
            this.messageAlert = "failed operation";
          }
        }, error => {
          this.showAlert = true;
          this.colorAlert = 'danger';
          this.messageAlert = 'failed operation';
        });
      },

    },
    filters: {
      capitalize: function (value) {
        if (!value) return ''
        value = value.toString()
        return value.charAt(0).toUpperCase() + value.slice(1)
      }
    }
  }
</script>

<style scoped>

</style>
