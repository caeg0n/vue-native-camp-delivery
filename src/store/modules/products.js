import Vue from 'vue-native-core'
import axios from 'axios'
import { platform } from 'react-native'
import axiosInstance from '@/services/axios'


function filterByValue(array, value) {
  return array.filter((data) =>  JSON.stringify(data).toLowerCase().indexOf(value.toLowerCase()) !== -1)
}


export default ({
  namespaced:true,
  state:{
    items:[],
    searchedProducts:[],
    filteredProducts:[]
  },
  actions:{

    fetchProductLength({commit,state},organization_id){
      return axios.get(`${BASE_URL}/get_products_length/`+organization_id).then(res => {
        return res.data
      })
    },

    getProductsById({commit,state},organization_id){
      if (organization_id > 0){
        let r = state.items.filter(x => x.organization_id == organization_id)
        commit('setSearchedProducts',r)
      }     
    },

    async fetchProducts({commit,state}){
      await axios.get(`${BASE_URL}/products`)
      .then(res => {
        const products = res.data
        commit('setItems',{items:products,resource:'products'},{root:true})
      })
    },

    async fetchActiveProducts({commit,state}){
      await axios.get(`${BASE_URL}/all_not_excluded_and_paused`)
      .then(res => {
        const products = res.data
        commit('setItems',{items:products,resource:'products'},{root:true})
      })
    },

    getFilteredProducts({commit,state},text){
      const res = filterByValue(state.searchedProducts, text)
      commit('setFilteredProducts',res)
    },

    newProduct({commit,state},data){
      let product = data
      return axios.post(`${BASE_URL}/products`,{product}).then(
        res => {
          return "ok"
        }
      )
    },

    resetThis({commit,state}){
      commit('reset')
    },


    async updateProduct({commit,state},data){
      let product = data
      return await axios.put(`${BASE_URL}/products/`+data["id"],{product}).then(response => {
      }).catch(error => {
        return null
      })
    },

    async pauseProduct({commit,state},product_id){
      let product = {id:product_id,status:1}
      return await axios.put(`${BASE_URL}/pause_product`,{product}).then(response => {
        return response.data
      }).catch(error => {
        return error
      })
    },

    async destroyProduct({commit,state},product_id){
      let product = {id:product_id,status:0}
      return await axios.put(`${BASE_URL}/destroy_product`,{product}).then(response => {
        return response.data
      }).catch(error => {
        return error
      })
    },


  },
  mutations:{
    setSearchedProducts(state,data){
      Vue.set(state,'searchedProducts',data)
    },

    setFilteredProducts(state,data){
      Vue.set(state,'filteredProducts',data)
    },

    reset(state){
      Vue.set(state,'items',[])
      Vue.set(state,'searchedProducts',[])
      Vue.set(state,'filteredProducts',[])
    }
    
  }
})
