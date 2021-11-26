//import { platform } from 'react-native'
//import axiosInstance from '@/services/axios'
//import { AsyncStorage } from 'react-native'
import Vue from 'vue-native-core'
import axios from 'axios'

export default ({
    namespaced:true,
    state:{
        device_expo_install_id:"",
        device_expo_notification_token:"",
        device_native_uuid:"",
        addressLoading:false,
        selectedOrganization:117,
    },
    actions:{

        updateOrganizationToken({commit,state},organization_id){
            let organization = organization_id.toString()
            let token = state.device_expo_notification_token
            let notification = {"token":token,"organization":organization}
            axios.post(`${BASE_URL}/notification/update_token`,{notification}).then(
                res => {
                    return "ok"
                }
            )
        },

        saveToken({commit,state}){
            let device = state.device_expo_install_id
            let token = state.device_expo_notification_token
            axios.post(`${BASE_URL}/notification/register`,{device,token}).then(
                res => {
                    return "ok"
                }
            )
        },
        
        addExpoId({commit,state},data){
            commit('setExpoId',data)              
        },

        addExpoNotificationToken({commit,state},data){
            commit('setExpoNotificationToken',data)              
        },

        setAddressLoadingState({commit,state},data){
            commit('setAddressLoading',data)            
        },

        setSelectedOrganization({commit,state},data){
            commit('setSelectedOrganization',data)            
        },
    },
    mutations:{

        setExpoNotificationToken(state,data){
            Vue.set(state,'device_expo_notification_token',data)
        },

        setExpoId(state,data){
            Vue.set(state,'device_expo_install_id',data)
        },
        setAddressLoading(state,data){
            Vue.set(state,'addressLoading',data)  
        },
        setSelectedOrganization(state,data){
            Vue.set(state,'selectedOrganization',data)  
        }
    }
})
