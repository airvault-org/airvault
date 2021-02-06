import axios from 'axios';

const apiHost = process.env.VUE_APP_API_HOST || 'localhost:3000'

export default {
  state: {
    authenticated: JSON.parse(localStorage.getItem('authenticated')) || null,
  },
  getters: {
    authenticated(state) {
      return state.authenticated
    },
    isUserAuthenticated(state) {
      return !!state.authenticated
    },
  },
  mutations: {
    SET_AUTHENTICATED(state, data) {
      state.authenticated = data
    },
    CLEAR_AUTHENTICATED(state) {
      state.authenticated = null
    },
  },
  actions: {
    async authenticateUser({ commit }, credentials) {
      try {
        const url = `${apiHost}/token`

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
      } catch (e) {
        console.error(e)
      }
    },
    invalidateAuthenticatedUser({ commit }) {
      localStorage.removeItem('authenticated');
      commit('CLEAR_AUTHENTICATED')
    },
  }
}
