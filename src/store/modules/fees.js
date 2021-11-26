import Vue from 'vue-native-core'
import axios from 'axios'
import { platform } from 'react-native'
import axiosInstance from '@/services/axios'
import { AsyncStorage } from 'react-native'
import Base64 from 'Base64'

export default ({
    namespaced:true,
    state:{

        //item fetch no db
        dbItems:[],

        //items storage local
        items:[]

    },

    actions:{

        async fetchFeesByReference({commit,state},order_reference) {
            return await axios.get(`${BASE_URL}/get_fees_by_reference`,{params:{order_reference:order_reference}}).then(res=>{
                const fees = res.data
                commit('setItems',fees)
            })
        },

        async newFee({commit,state},data){
            var fees = data.fees
            var reference = data.reference
            let promises = []
            fees.forEach(function (e) {
                let fee = e
                fee.order_reference = reference
                fee.value = e.fee
                delete fee.fee
                promises.push(axios.post(`${BASE_URL}/fees`,{fee}))
            })
            await Promise.all(promises).then(function (results) {
                results.forEach(function (response) {
                    var ok = response.data
                    var status = response.status
                    if ( ok != 'ok' || status != 201 ){
                        gatilho = true
                    }
                })
            }).then(success=>{
                if (gatilho === true){
                }else{
                    //tudo certo aqui
                }
            }).catch(error=>{
            })
        },

        updateFees({commit,state},data){
            let cart = data.cart
            let organizations = data.orgs
            let tempOrgs = []
            var result = []
            cart.forEach(function (product, index) {
                tempOrgs.push(product.product.organization_id)
            })
            let orgsIds = [...new Set(tempOrgs)]
            for (let i=0;i<orgsIds.length;i++){
                let id = orgsIds[i]
                let fee = organizations.find(x => x.id === id).delivery_fee
                const obj = {} 
                obj["organization_id"] = id
                obj["fee"] = fee
                obj["order_reference"] = null
                result.push(obj)
            }
            commit('setItems',result)
        },

    },

    mutations:{

        setItems(state,data){
            Vue.set(state,'items',data)
        },

    }
})
