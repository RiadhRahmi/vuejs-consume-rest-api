<template>
  <div>

    <h3>
      {{ clickNumber }}
    </h3>

    <form @submit.prevent="addTodo">
      <input class="todo-input" type="text" placeholder="Enter a new Task" v-model="task"/>
    </form>
    <br>
    <ul class="tasks">
      <li v-for="todo in todos"
          :class="{completed: todo.completed}"
          class="task"
          @click="toggleTodo(todo.id)"
          @dblclick="deleteTodo(todo.id)">{{todo.task}}
      </li>
    </ul>


  </div>
</template>

<script>
  // import title from '../../mixins/Title'
  import EventBus from '../../event-bus/event-bus';

  export default {
    // mixins: [title],
    data() {
      return {
        task: "",
        newId: 3,
      }
    },
    methods: {
      addTodo: function () {
        this.$store.dispatch("addTodo", this);
        this.newId++;
        this.task = "";
      },
      toggleTodo: function (id) {
        this.$store.dispatch("toggleTodo", id);
      },
      deleteTodo: function (id) {
        this.$store.dispatch("deleteTodo", id);
      }
    },
    computed: {
      todos() {
        return this.$store.getters.getTodos;
      },
      clickNumber(){
        EventBus.$on('i-got-clicked', clickCount => {
          return `Oh, that's nice. It's gotten ${clickCount} clicks! :)`;
        });
      }
    }
  }
</script>

<style scoped>

  html {
    font-family: sans-serif;
    background: linear-gradient(45deg, #6cfd9f, #6887ff);
    height: 100%;
    color: #333;
  }

  body {
    display: flex;
    height: 100%;
    margin: 0;
  }

  .container {
    width: 24rem;
    margin: auto;
    background-color: white;
    border-radius: 0.5rem;
    padding: 1rem;
    box-shadow: 0 0 2rem rgba(0, 0, 0, 0.25);
  }

  h1 {
    text-align: center;
    margin-top: 0;
  }

  .todo-input {
    width: 100%;
    padding: 0.5rem;
    font-size: 1rem;
    outline: none;
    border-radius: 0.25rem;
    border-style: none;
    border: solid 1px lightgray;
    box-sizing: border-box;
  }

  .tasks {
    padding-left: 1.5rem;
  }

  .task {
    margin-bottom: 0.5rem;
  }

  .task:hover {
    cursor: pointer;
  }

  .completed {
    text-decoration: line-through;
    color: #555;
    background-color: aqua;
  }

</style>
