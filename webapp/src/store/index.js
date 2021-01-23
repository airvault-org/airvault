import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    authenticatedUser: null
  },
  mutations: {
    setUser(state, user) {
      state.authenticatedUser = user
    },
    clearUser(state) {
      state.authenticatedUser = null
    }
  },
  actions: {
    authenticateUser({ commit }, user) {
      commit('setUser', user)
      console.log('user authenticated')
    },
    invalidateAuthenticatedUser({ commit }) {
      commit('clearUser')
    }
  },
  getters: {
    isUserAuthenticated(state) {
      return !!state.authenticatedUser
    }
  }
})
