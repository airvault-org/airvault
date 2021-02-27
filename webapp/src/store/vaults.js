import api from '../services/api'

export default {
  state: {
    vaults: null
  },
  getters: {
    vaults(state) {
      return state.vaults
    }
  },
  mutations: {
    SET_VAULTS(state, vaults) {
      state.vaults = vaults
    }
  },
  actions: {
    async fetchVaults({ commit }) {
      const apiClient = await api.getInstance()
      const response = await apiClient.get('/v1/vaults')
      const vaults = response.data.data
      commit('SET_VAULTS', vaults)
    }
  }
}
