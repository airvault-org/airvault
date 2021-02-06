import Vue from 'vue'
import Vuex from 'vuex'
import account from './account'
import items from './items'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    account,
    items,
  }
})
