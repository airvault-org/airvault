import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    authenticated: JSON.parse(localStorage.getItem('authenticated')) || null
  },
  getters: {
    isUserAuthenticated(state) {
      return !!state.authenticated
    },
    authenticatedAccessToken(state) {
      return state.authenticated.access_token
    }
  },
  mutations: {
    SET_AUTHENTICATED(state, data) {
      state.authenticated = data
    },
    CLEAR_AUTHENTICATED(state) {
      state.authenticated = null
    }
  },
  actions: {
    async authenticateUser({ commit }, credentials) {
      try {
        const url = 'http://kubernetes.docker.internal:3000/token'

        const params = new URLSearchParams()
        params.append('username', credentials.username)
        params.append('password', credentials.password)
        params.append('grant_type', 'password')
        params.append('client_id', 'airvault')

        const config = {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }

        const response = await axios.post(url, params, config)

        if (response.data.access_token) {
          localStorage.setItem('authenticated', JSON.stringify(response.data))
          commit('SET_AUTHENTICATED', response.data)
        }
      } catch(e) {
        console.error(e)
      }
    },
    invalidateAuthenticatedUser({ commit }) {
      localStorage.removeItem('authenticated');
      commit('CLEAR_AUTHENTICATED')
    }
  }
})
