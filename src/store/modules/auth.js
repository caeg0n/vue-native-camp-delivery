import Vue from 'vue-native-core'
import axios from 'axios'
import { platform } from 'react-native'
import { AsyncStorage } from 'react-native'
import md5 from 'js-md5'

const isTokenValid = (token) => {
  // if (token){
  //   const decodeToken = jwtDecode(token)
  //   return decodeToken && (decodeToken.exp * 1000) > new Date().getTime()
  // }
  // return false
}

const convertData = (data) => {
  let username = data["username"]
  let password = data["senha"]
  let result = md5(username.toUpperCase()+md5(password.toUpperCase())) 
  return result
}

const isSalesman = (data) => {
  if (data == 0 || data == 'salesman'){
    return true
  }else{
    return false
  }
}

const isDeliveryman = (data) => {
  if (data == 1 || data == 'deliveryman'){
    return true
  }else{
    return false
  }
}



export default ({
  namespaced:true,
  state:{
    organization:{},
    salesmanList:[],
    isAuth:false,
    isSalesman:false,
    isDeliveryman:false,
    isAdmin:false
  },
  getters:{
  },
  
  actions:{

    login({commit,state},userData){
      let data = convertData(userData)
      return axios.post(`${BASE_URL}/login`,{"login":data}).then(res => {
        const data = res.data
        if (data){
          AsyncStorage.setItem('camp-jwt',data.token)
          commit('setIsAuth',true)
          commit('setAuthOrganization',data.organization)
          commit('setIsSalesman',isSalesman(data["organization"].organization_type))
          commit('setIsDeliveryman',isDeliveryman(data["organization"].organization_type))
          return state.organization
        }
      })
    },

    logout({commit,state}){
      commit('setIsAuth',null)
      commit('setAuthOrganization',null)
      commit('setIsSalesman',null)
      commit('setIsDeliveryman',null)
      commit('setSalesmanList',null)
    },

    async fetchSalesmanList({commit,state}) {
      return axios.get(`${BASE_URL}/organizations`).then(res=>{
        const organizations = res.data
        commit('setSalesmanList',[])
        commit('setSalesmanList',organizations)
        return state.salesmanList
      })
    },

    async verifyUser() {
      // const jwt = await AsyncStorage.getItem('meetuper-jwt')
      // if (jwt && isTokenValid(jwt)){
      //   return Promise.resolve(jwt)
      // } else {
      //   return Promise.reject('token invalid')
      // }
    }
  },
  mutations:{
    setIsAuth(state,data){
      return state.isAuth = data
    },
    setAuthOrganization(state,organization){
      return state.organization = organization
    },
    setIsSalesman(state,data){
      return state.isSalesman = data
    },
    setIsDeliveryman(state,data){
      return state.isDeliveryman = data
    },
    setSalesmanList(state,data){
      return state.salesmanList = data
    }

  }
})
