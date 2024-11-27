import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    username: null
  },
  getters: {
  },
  mutations: {
    setUsername(state, username) {
      state.username = username;
    }
  },
  actions: {
    login({ commit }, username) {
      commit('setUsername', username);
    }
  },
  modules: {
  }
})
