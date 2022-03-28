import { createStore } from 'vuex'

const Store = createStore({
  state: {
    username  : null,
    auth      : false,
    api_token : null,
  },
  getters: {
    user: (state) => {
      return state.user
    } 
  },
  mutations: {
    login(state, username) {
        state.auth = true;
        state.username = username;
    },

    logout(state) {
        state.auth = false;
        state.username = null;
    }
  },
  actions: {

    login({ commit }, username) {
      commit("login", username);
    },
    
    logout({ commit }) {
      commit("logout");
    }
  },
  modules: {
  }
})

export default Store
