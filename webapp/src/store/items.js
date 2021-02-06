import axios from 'axios';

const apiHost = process.env.VUE_APP_API_HOST || 'localhost:3000'

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
    async fetchItems({ commit, rootGetters }) {
      const url = `${apiHost}/v1/items`

      const config = {
        headers: {
          'Authorization': `${rootGetters.authenticated.token_type} ${rootGetters.authenticated.access_token}`
        }
      }

      const response = await axios.get(url, config)
      const items = response.data.data;
      commit('SET_ITEMS', items)
    }
  }
}
