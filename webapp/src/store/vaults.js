import api from '../services/api'

export default {
  state: {
    vaults: [],
    currentVault: null,
  },
  getters: {
    vaults(state) {
      return state.vaults.sort((a, b) => a.name.localeCompare(b.name))
    },
    currentVault(state) {
      return state.currentVault
    },
  },
  mutations: {
    SET_VAULTS(state, vaults) {
      state.vaults = vaults
    },
    ADD_VAULT(/*state, vault*/) {
      //state.vaults.push(vault)
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

    async createVault({ commit }, transientVault) {
      const apiClient = await api.getInstance()
      const response = await apiClient.post(`/v1/vaults`, transientVault)
      const persistedVault = response.data
      transientVault.id = persistedVault.id
      commit('ADD_VAULT', persistedVault)
    },

    async setCurrentVault({ commit }, vault) {
      commit('SET_CURRENT_VAULT', vault)
    },
  }
}
