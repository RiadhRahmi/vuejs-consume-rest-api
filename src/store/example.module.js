const state = {
  message: 'Hello world'
};

const mutations = {
  UPDATE_MESSAGE: (state, payload) => {
    state.message = payload
  },
};

const getters = {
  getMessage: state => state.message
};

const actions = {
  updateMessage(context, payload) {
    context.commit("UPDATE_MESSAGE", payload.message)
  }
};


export const example = {
  state,
  mutations,
  getters,
  actions,
};
