import Vue from 'vue-native-core'
import axios from 'axios'

export default ({
    namespaced:true,
    state:{
        items:[],
        organizations:[]
    },

    getters: {

    },

    actions:{
        
        async fetchCategories({commit,state}){
            return await axios.get(`${BASE_URL}/categories`).then(response => {
                const categories = response.data
                commit('setItems',categories)
            })
        },

        async fetchOrganizationsByCategory({commit,state},organization){
            let name = organization.title
            return await axios.get(`${BASE_URL}/organizations_by_category/`+name).then(response => {
                const organizations = response.data
                commit('setOrganizations',organizations)
            })
        },


    },

    mutations:{
        setItems(state,items){
            Vue.set(state,'items',items)
        },
        setOrganizations(state,organizations){
            Vue.set(state,'organizations',organizations)
        },
    }
})
