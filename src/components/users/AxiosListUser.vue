<template>
  <div>
    <div class="row" v-if="showAlert">
      <div class="col-12">
        <b-alert show dismissible :variant="colorAlert">
          {{ messageAlert }}
        </b-alert>
      </div>
    </div>

    <button class="pleeease-click-me" @click="emitGlobalClickEvent()">Increment</button>

    <table class="table" v-if="users">
      <thead>
      <tr>
        <th scope="col">ID</th>
        <th scope="col">Name</th>
        <th scope="col">Email</th>
        <th scope="col">Role</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="user in users">
        <th scope="row">{{user.id }}</th>
        <td>{{ user.name }}</td>
        <td>{{ user.email }}</td>
        <td>{{ roles[user.role].name }}</td>
      </tr>

      </tbody>
    </table>
  </div>
</template>

<script>
  import userService from '../../services/axios/userService'
  import  EventBus  from '../../event-bus/event-bus';

  export default {
    data() {
      return {
        roles: [
          {id: 0, name: 'administrator'},
          {id: 1, name: 'editor'}
        ],
        users: [],
        showAlert: false,
        colorAlert: 'success',
        messageAlert: '',
        clickCount: 0
      }
    },
     methods:{
       emitGlobalClickEvent(){
         this.clickCount++;
         EventBus.$emit('i-got-clicked', this.clickCount);
       }
     },
    created() {
      userService.all()
        .then(response => {
          this.users = response.data;
          this.showAlert = true;
          this.colorAlert = 'success';
          this.messageAlert = 'successful operation ';
        }, error => {
          this.showAlert = true;
          this.colorAlert = 'danger';
          this.messageAlert = 'failed operation ' + error;
        });
    }
  }
</script>

<style scoped>

</style>
