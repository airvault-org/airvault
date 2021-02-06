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
    authenticateUser({ commit }, authenticated) {
      commit('SET_AUTHENTICATED', authenticated)
    },
    invalidateAuthenticatedUser({ commit }) {
      commit('CLEAR_AUTHENTICATED')
    },
  }
}
