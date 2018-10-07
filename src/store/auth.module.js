export const auth = {
  state: {
    currentUser: null
  },
  mutations: {
    SET_USER: (state, payload) => {
      state.currentUser = payload;
    },
    DELETE_USER: (state) => {
      state.currentUser = null;
    },

  },
  getters: {
    getCurrentUser: state => JSON.parse(state.currentUser)
    ,
    isLoggedIn: state => state.currentUser ? true : false
  },
  actions: {
    setCurrentUser: (context, payload) => {
      context.commit("SET_USER", JSON.stringify(payload))
    },
    deleteCurrentUser: (context) => {
      context.commit("DELETE_USER")
    }
  }
}
