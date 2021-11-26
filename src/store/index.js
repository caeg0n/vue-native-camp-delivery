import Vue from 'vue-native-core'
import Vuex from 'vuex'

Vue.use(Vuex)

import products from './modules/products'
import cart from './modules/cart'
import session from './modules/session'
import addresses from './modules/addresses'
import payment from './modules/payment'
import orders from './modules/orders'
import auth from './modules/auth'
import requests from './modules/requests'
import deliveries from './modules/deliveries'
import organizations from './modules/organizations'
import categories from './modules/categories'
import ranking from './modules/ranking'
import contacts from './modules/contacts'
import fees from './modules/fees'
import geo from './modules/geo'

export default new Vuex.Store({
  
  modules:{
    products,cart,session,
    addresses,payment,orders,
    auth,requests,deliveries,
    organizations,categories,
    ranking,contacts,fees,geo
  },

  state:{
  },
  
  getters:{
  },
  
  actions:{
  },
  
  mutations:{
    setItems (state,{items,resource}){
      Vue.set(state[resource],'items',items)
    }
  }
  
})
