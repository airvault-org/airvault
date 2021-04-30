import api from '../services/api'

export default {
  state: {
    vaults: null,
    currentVault: null,
  },
  getters: {
    vaults(state) {
      return state.vaults
    },
    currentVault(state) {
      return state.currentVault
    },
  },
  mutations: {
    SET_VAULTS(state, vaults) {
      state.vaults = vaults
    },
    SET_CURRENT_VAULT(state, vault) {
      state.currentVault = vault
    },
  },
  actions: {
    async fetchVaults({ commit }) {
      const apiClient = await api.getInstance()
      const response = await apiClient.get('/v1/vaults')
      const vaults = response.data.data
      commit('SET_VAULTS', vaults)
    },

    async setCurrentVault({ commit }, vault) {
      commit('SET_CURRENT_VAULT', vault)
    },
  }
}
