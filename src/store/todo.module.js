const state = {
  todos: [
    {
      id: 0,
      task: "Buy food at the supermarket.",
      completed: false
    },
    {
      id: 1,
      task: "Organize the living room.",
      completed: true
    },
    {
      id: 2,
      task: "Read every class and tutorial on Sabe.io.",
      completed: false
    }
  ]
};

const mutations = {
  ADD_TODO: (state, payload) => {

    let newTask = {
      id: payload.newId,
      task: payload.task,
      completed: false
    };

    state.todos.push(newTask);
  },
  TOGGLE_TODO: (state, payload) => {
    let item = state.todos.find(todo => todo.id === payload);
    item.completed = !item.completed;
  },
  DELETE_TODO: (state, payload) => {
    let index = state.todos.findIndex(todo => todo.id === payload);
    state.todos.splice(index, 1);
  }
};

const getters = {
  getTodos: state => state.todos
};

const actions = {
  addTodo: (context, payload) => {
    context.commit("ADD_TODO", payload)
  },
  toggleTodo: (context, payload) => {
    context.commit("TOGGLE_TODO", payload)
  },
  deleteTodo: (context, payload) => {
    context.commit("DELETE_TODO", payload)
  }
};


export const todo = {
  state,
  mutations,
  getters,
  actions,
};
