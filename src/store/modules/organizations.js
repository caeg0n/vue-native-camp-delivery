import Vue from 'vue-native-core'
import axios from 'axios'
import { platform } from 'react-native'
import axiosInstance from '@/services/axios'

export default ({
  namespaced:true,
  state:{
    items:[],
  },
  actions:{
   
    async fetchOrganizations({commit,state}){
      return await axios.get(`${BASE_URL}/organizations`).then(res => {
        const organizations = res.data
        commit('setItems',{items:organizations,resource:'organizations'},{root:true})
        return state.items
      })
    },

    async fetchOrganizationsCategory({commit,state}){
      return await axios.get(`${BASE_URL}/organization_category_tags`)
      .then(res => {
        const organizationsCategory = res.data
        return organizationsCategory
      })
    },

  },

  mutations:{
  }

})