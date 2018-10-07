<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">

    <button type="button" class="btn btn-dark btn-sm" @click.prevent="goBack">
      <i class="fas fa-arrow-left"></i>
    </button>

    <div class="container">

      <router-link to="/" class="navbar-brand" active-class="active" exact>Home</router-link>

      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse">
        <ul class="navbar-nav mr-auto">

          <b-nav-item-dropdown v-if="isRole('admin')">
            <template slot="button-content" active-class="active" exact>
              Users
            </template>
            <b-dropdown-item to="/users" active-class="active" exact>
              List Users
            </b-dropdown-item>
            <b-dropdown-item to="/users/add" active-class="active">Add User</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown>
            <template slot="button-content" active-class="active" exact>
              Articles
            </template>
            <b-dropdown-item to="/articles" active-class="active" exact>
              List Articles
            </b-dropdown-item>
            <b-dropdown-item to="/articles/add" active-class="active">
              Add Articles
            </b-dropdown-item>
          </b-nav-item-dropdown>

          <li class="nav-item">
            <router-link to="/axios" class="nav-link" active-class="active">Axios</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/datatable" class="nav-link" active-class="active">DataTable</router-link>
          </li>

          <li class="nav-item">
            <router-link to="/vue-datatable" class="nav-link" active-class="active">Vue DataTable</router-link>
          </li>

          <li class="nav-item">
            <router-link to="/vuex" class="nav-link" active-class="active">Vuex</router-link>
          </li>
        </ul>

        <ul class="navbar-nav ml-auto">
          <button @click.prevent="changeTitle">EventBus</button>
          <b-nav-item-dropdown>
            <template slot="button-content" active-class="active" exact>
              Language
            </template>
            <b-dropdown-item @click.prevent="switchLanguage('ar')"
                             active-class="active" exact>Arabic
            </b-dropdown-item>
            <b-dropdown-item @click.prevent="switchLanguage('fr')"
                             active-class="active">French
            </b-dropdown-item>
            <b-dropdown-item @click.prevent="switchLanguage('en')"
                             active-class="active">English
            </b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown>
            <template slot="button-content" active-class="active" exact>
              <i class="fas fa-user"></i>
              User Name
            </template>
            <b-dropdown-item to="/profil" active-class="active" exact>My Account</b-dropdown-item>
            <b-dropdown-item @click.prevent="logout" active-class="active">Logout</b-dropdown-item>
          </b-nav-item-dropdown>

        </ul>
      </div>
    </div>
  </nav>

</template>

<script>
  import {AuthService} from '../../services/authService';
  import EventBus from '../../event-bus/event-bus';

  export default {
    data() {
      return {
        showAlert: false,
        colorAlert: 'success',
        messageAlert: '',
      }
    },
    methods: {
      switchLanguage(localeId) {
        localStorage.setItem('localeId', localeId);
        location.reload(true);
      },
      changeTitle() {
        EventBus.$emit('i-got-clicked', 'Teste APP');
      },
      logout() {
        localStorage.removeItem('currentUser');
        this.$router.push('/login');
        AuthService.logout().then(response => {
          if (response.status === 200) {
            localStorage.removeItem('currentUser');
            this.$router.push('/login');
          }
        }, error => {
          this.showAlert = true;
          this.colorAlert = 'danger';
          this.messageAlert = 'failed operation' + error.toString();
        });
      },
      goBack() {
        this.$router.go(-1);
      },
      isRole: function (val) {
        return new AuthService().isRole(val);
      }
    }
  }

</script>
