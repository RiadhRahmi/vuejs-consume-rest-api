<template>
  <div>
    <div class="row">
      <div class="col-12">
        <div class="pb-2 mt-4 mb-2 border-bottom">
          <h1>
            {{ pagetitle }}
            <router-link to="/users/add" class="btn btn-primary float-right">
              <i class="fas fa-plus"></i> Add User
            </router-link>

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

    <div class="row" v-if="users">
      <div class="col-12 mt-3 mb-3">
        <b>Total : {{users.length}} users </b>
      </div>
    </div>

    <div class="row" v-if="users">
      <div :class="selectedUser? 'col-7 animated fadeIndown delay-3s' : 'col-12 animated fadeIndown delay-3s'">
        <form>
          <button type="button" class="btn btn-link" @click.prevent="selectAll">Select All</button>
          /
          <button type="button" class="btn btn-link" @click.prevent="unSelectAll">Unselect ALL</button>
          <div class="d-inline-block">
            <b-dropdown text="Actions">
              <b-dropdown-item @click.prevent="deleteAll">Delete</b-dropdown-item>
              <b-dropdown-item>Export</b-dropdown-item>
            </b-dropdown>
          </div>
          <br><br>
          <table class="table">
            <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
              <th>actions</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="user in users" :class="user === selectedUser ? 'active' : '' ">
              <th>
                <input type="checkbox" :value="user.id" v-model="userIds">
              </th>
              <th scope="row">{{user.id }}</th>
              <td>{{ user.name }}</td>
              <td>{{ user.email }}</td>
              <td>{{ roles[user.role].name }}</td>
              <td>
                <div class="d-inline-block">
                  <b-dropdown variant="outline-primary" text="Actions">
                    <b-dropdown-item @click="deleteUser(user.id)">Delete</b-dropdown-item>
                    <b-dropdown-item @click.prevent="showUser(user)">Edit</b-dropdown-item>
                  </b-dropdown>
                </div>
              </td>
            </tr>
            </tbody>
          </table>
        </form>
      </div>
      <div class="col-4 offset-1 mt-5 animated fadeInRight" v-if="selectedUser">
        <app-edit-user :user="selectedUser"></app-edit-user>
      </div>
    </div>
  </div>
</template>

<script>
  import EditUser from '../users/EditUser.vue'
  import UserService from '../../services/userService'


  export default {
    components: {
      appEditUser: EditUser
    },
    data() {
      return {
        pagetitle: 'List Users',
        showAlert: false,
        colorAlert: 'success',
        messageAlert: '',
        users: [],
        selectedUser: null,
        allSelected: false,
        userIds: [],
        roles: [
          {id: 0, name: 'administrator'},
          {id: 1, name: 'editor'}
        ],
      }
    },
    methods: {
      getUsers() {
        UserService.get().then(response => {
            this.users = response.data;
          }, error => {
            this.showAlert = true;
            this.colorAlert = 'danger';
            this.messageAlert = 'failed operation';
          });
      },
      deleteUser(id) {
        if (confirm('are you sure you want to delete this user?')) {
          const users_id = {users_id: [id]};
          UserService.deleteUsers(users_id).then(response => {
              this.getUsers();
              this.showAlert = true;
              this.colorAlert = 'success';
              this.messageAlert = 'successful operation';
            }, error => {
              this.showAlert = true;
              this.colorAlert = 'danger';
              this.messageAlert = 'failed operation';
            });
        }

      },
      selectAll() {
        this.allSelected = true;
        this.userIds = [];
        for (let u in this.users) {
          this.userIds.push(this.users[u].id);
        }
      },
      unSelectAll() {
        this.allSelected = false;
        this.userIds = [];
      },
      deleteAll() {
        if (confirm('are you sure you want to delete these users?')) {
          const users_id = {users_id: this.userIds};
          UserService.deleteUsers(users_id).then(response => {
              this.getUsers();
              this.showAlert = true;
              this.colorAlert = 'success';
              this.messageAlert = 'successful operation';
            }, error => {
              this.showAlert = true;
              this.colorAlert = 'danger';
              this.messageAlert = 'failed operation';
            });
        }
      },
      showUser(user) {
        this.selectedUser = user;
      }
    },
    created() {
      this.getUsers();
    },
  }
</script>


<style scoped>
  tr.active {
    background-color: #d6d8db;
  }
</style>
