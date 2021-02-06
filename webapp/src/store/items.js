import api from '../services/api';

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
      const items = response.data.data;
      commit('SET_ITEMS', items)
    }
  }
}
