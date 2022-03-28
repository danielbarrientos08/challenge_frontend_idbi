import { createStore } from 'vuex'

const Store = createStore({
  state: {
    username  : null,
    user : null,
    auth      : false,
    api_token : null,
    token_type : null,
  },
  getters: {
    user: (state) => {
      return state.user
    } 
  },
  mutations: {
    login(state, payload) {
        state.auth = true;
        state.username = payload.user.name;
        state.api_token = payload.api_token;
        state.user = payload.user;
        state.token_type = payload.token_type;
    },

    logout(state) {
        state.auth = false;
        state.username = null;
        state.api_token = null;
        state.token_type = null;
    }
  },
  actions: {

    login({ commit }, payload) {
      commit("login", payload);
    },
    
    logout({ commit }) {
      commit("logout");
    }
  },
  modules: {
  }
})

export default Store
