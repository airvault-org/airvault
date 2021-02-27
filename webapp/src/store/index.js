import Vue from 'vue'
import Vuex from 'vuex'
import account from './account'
import items from './items'
import vaults from './vaults'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    account,
    items,
    vaults,
  }
})
