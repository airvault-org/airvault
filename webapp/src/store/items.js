import api from '../services/api'
import httpEncryption from '../services/Aes256GcmEncryption'

export default {
  state: {
    items: null
  },
  getters: {
    items(state) {
      return state.items
    }
  },
  mutations: {
    SET_ITEMS(state, items) {
      state.items = items;
    }
  },
  actions: {
    async fetchItems({ commit }) {
      const apiClient = await api.getInstance()
      const response = await apiClient.get('/v1/items')
      const decrypted = await httpEncryption.decrypt(response.data, api.authenticated.access_token)
      const items = decrypted.data;
      commit('SET_ITEMS', items)
    }
  }
}
