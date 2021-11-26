import Vue from 'vue-native-core'
import axios from 'axios'

export default ({
    namespaced:true,
    state:{
        items:[]
    },

    actions:{
    
        async updateContact({commit,state},data){
            const contact = data
            return await axios.post(`${BASE_URL}/contacts`,{contact}).then(res => {
                return "ok"
         })
        },
    },

    mutations:{


    }
})
