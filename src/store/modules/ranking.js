import Vue from 'vue-native-core'
import axios from 'axios'

export default ({
    namespaced:true,
    state:{
        items:[]
    },

    actions:{

        async fetchRanking({commit,state}){
            return await axios.get(`${BASE_URL}/rankings`).then(res => {
                let items = res.data
                commit('setItems',items)
            })
        },
    
        async updateRanking({commit,state},data){
            const ranking = data
            return await axios.post(`${BASE_URL}/rankings`,{ranking}).then(res => {
                return "ok"
         })
        },
    },

    mutations:{
        
        setItems(state,items){
            Vue.set(state,'items',items)
        },

    }
})
