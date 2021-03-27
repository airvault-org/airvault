import api from '../services/api'

export default {
  state: {
    items: null,
    currentItem: null,
  },
  getters: {
    items(state) {
      return state.items ? state.items.sort((a, b) => a.title.localeCompare(b.title)) : null;
    },
    currentItem(state) {
      return state.currentItem
    },
  },
  mutations: {
    SET_ITEMS(state, items) {
      state.items = items

    },
    ADD_ITEM(state, item) {
      state.items.push(item)
    },
    SET_CURRENT_ITEM(state, item) {
      state.currentItem = item
    },
  },
  actions: {
    async fetchItems({ commit }) {
      const apiClient = await api.getInstance()
      const response = await apiClient.get('/v1/items')
      const items = response.data.data
      commit('SET_ITEMS', items)
    },

    async createItem({ commit }, transientItem) {
      const apiClient = await api.getInstance()
      const response = await apiClient.post('/v1/vaults/5e8c9850-6498-45dd-ab75-5e85976789b7/items', transientItem)
      const persistedItem = response.data
      commit('ADD_ITEM', persistedItem)
    },

    async setCurrentItem({ commit }, item) {
      commit('SET_CURRENT_ITEM', item)
    }
  }
}
