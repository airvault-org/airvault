import api from '../services/api'
import find from 'lodash/find'
import findIndex from 'lodash/findIndex'

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
    UPDATE_ITEM(state, item) {
      const editedItem = find(state.items, { id: item.id })
      editedItem.title = item.title
      editedItem.username = item.username
      editedItem.password = item.password
      editedItem.website = item.website
      editedItem.vault_id = item.vault_id
    },
    DELETE_ITEM(state, itemId) {
      const itemIndex = findIndex(state.items, { id: itemId })
      state.items.splice(itemIndex, 1)
      state.currentItem = state.items[0]
    },
    SET_CURRENT_ITEM(state, item) {
      state.currentItem = item
    },
  },
  actions: {
    async fetchItems({ commit }, vault) {
      const apiClient = await api.getInstance()
      const resourceUrl = vault ? `/v1/vaults/${vault.id}/items` : '/v1/items'
      const response = await apiClient.get(resourceUrl)
      const items = response.data.data
      commit('SET_ITEMS', items)
    },

    async createItem({ commit }, transientItem) {
      const apiClient = await api.getInstance()
      const response = await apiClient.post(`/v1/vaults/${transientItem.vault_id}/items`, transientItem)
      const persistedItem = response.data
      transientItem.id = persistedItem.id
      commit('ADD_ITEM', persistedItem)
    },

    async updateItem({ commit }, transientItem) {
      const apiClient = await api.getInstance()
      const response = await apiClient.patch(`/v1/items/${transientItem.id}`, transientItem)
      const persistedItem = response.data
      commit('UPDATE_ITEM', persistedItem)
    },

    async deleteItem({ commit }, itemId) {
      const apiClient = await api.getInstance()
      await apiClient.delete(`/v1/items/${itemId}`)
      commit('DELETE_ITEM', itemId)
    },

    async setCurrentItem({ commit }, item) {
      commit('SET_CURRENT_ITEM', item)
    },
  }
}
