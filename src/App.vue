<template>
  <div>
    <app-header v-if="isLoggedIn"></app-header>
    <div class="container">
      <nav aria-label="breadcrumb" v-if="!isFront&&isLoggedIn">
        <app-breadcrumbs class="breadcrumb mt-5"></app-breadcrumbs>
      </nav>
      <router-view></router-view>
    </div>
    <app-footer v-if="isLoggedIn"></app-footer>
  </div>
</template>

<script>
  import Header from './components/layout/Header.vue';
  import Footer from './components/layout/Footer.vue';
  import {AuthService} from './services/authService';

  export default {
    components: {
      appHeader: Header,
      appFooter: Footer,
    },
    data() {
      return {
        isLoggedIn: false
      }
    },
    computed: {
      isFront: function () {
        return this.$route.name === 'home' ? true : false;
      },
    },
    mounted() {
      this.isLoggedIn = new AuthService().isLoggedIn();
    },
    watch: {
      '$route'(to, from) {
        this.isLoggedIn = new AuthService().isLoggedIn();
      }
    }
  }
</script>


<style>
  @import 'https://use.fontawesome.com/releases/v5.2.0/css/all.css';
  @import './assets/css/animate.css';
  @import '~jquery-ui/themes/base/all.css';
  @import '~daterangepicker/daterangepicker.css';
  @import './assets/css/custom.css';
</style>
