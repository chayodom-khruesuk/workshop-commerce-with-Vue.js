import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    username: null,
    cart: JSON.parse(localStorage.getItem('cart')) || []
  },
  getters: {
    getUsername: state => state.username,
    isAuthenticated: state => !!state.username
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      localStorage.setItem('token', token)
    },
    setUsername(state, username) {
      state.username = username;
      state.isLoggedIn = !!username;
    },
    addToCart(state, item) {
      const existingItem = state.cart.find(i => i._id === item._id)
      if (existingItem) {
        existingItem.quantity += item.quantity
      } else {
        state.cart.push(item)
      }
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    clearCart(state) {
        state.cart = [];
        localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    removeFromCart(state, item) {
      state.cart = state.cart.filter(i => i._id !== item._id)
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    updateCartItemQuantity(state, item) {
      const cartItem = state.cart.find(i => i._id === item._id)
      if (cartItem) {
        cartItem.quantity = parseInt(item.quantity)
        localStorage.setItem('cart', JSON.stringify(state.cart))
      }
    }
  },
  actions: {
    initializeAuth({ commit }) {
      const username = localStorage.getItem('username');
      if (username) {
        commit('setUsername', username);
      }
    },
    login({ commit }, username) {
      commit('setUsername', username);
      localStorage.setItem('username', username);
    },
    logout({ commit }) {
      commit('setUsername', null);
      localStorage.removeItem('username');
    }
  },
  plugins: [
    createPersistedState({
      storage: {
        getItem: (key) => localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : null,
        setItem: (key, value) => localStorage.setItem(key, JSON.stringify(value)),
        removeItem: (key) => localStorage.removeItem(key),
      },
      paths: ['isLoggedIn', 'username'],
    }),
  ],
})
