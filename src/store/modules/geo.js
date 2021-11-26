//import Vue from 'vue-native-core'
//import { platform } from 'react-native'
//import { AsyncStorage } from 'react-native'
//import md5 from 'js-md5'
import axios from 'axios'
import { lowerFirst } from 'lodash'

const isDeliveryman = (data) => {
  
}

export default ({
    namespaced:true,
    state:{
        item:[]
    },
  
    getters:{
    },
  
    actions:{
      
      setTempLocation({commit,state},data){
        let formatted_address = data
        commit('setItem',[{formatted_address}])
      },
      
      async fetchLocationByCoordinates({commit,state},data) {
        let googleKey = 'AIzaSyC2rNXgJE6KSLyCuZN3oxBUSSIs6bzCVUg'
        let url_base = 'https://maps.googleapis.com/maps/api/geocode/json?address='
        let lat = data.latitude
        let log = data.longitude
        let url = url_base+lat+','+log+'&key='+googleKey
        return axios.get(url).then(res=>{
          let data = res.data.results
            commit('setItem',data)
          })
        },
      },

  mutations:{
    
    setItem(state,data){
      return state.item = data
    },

  }

})
