<template>
    <view class="container">
        <app-loading v-if="!isAppReady"> </app-loading>
        <app v-if="isAppReady"></app>
    </view>
</template>

<script>
//import { Notifications } from 'expo'
//import GPay, { GooglePayImage } from 'react-native-gpay'

import Vue from "vue-native-core"
import Vuelidate from 'vuelidate'
import { VueNativeBase } from "native-base"
import { AppLoading } from "expo"
import { YellowBox } from 'react-native'
import { BackHandler } from 'react-native'
import VueLodash from 'vue-lodash'
import lodash from 'lodash'
import moment from 'moment'
import Constants from 'expo-constants'
import InputWithError from '@/components/InputWithError'
import * as Permissions from 'expo-permissions'
import * as Font from "expo-font"

import store from '../store'
import App from "../"

Vue.use(VueNativeBase)
Vue.use(Vuelidate)
Vue.use(VueLodash, { name: 'custom' , lodash: lodash })
Vue.component('InputWithError',InputWithError)

Vue.use({
    install: function(Vue, options){
        Vue.prototype.$jQuery = require('jquery')
    }
})

Vue.prototype.$bus = new Vue({
    data: function () {
      return {
      }
    },
})

Vue.filter('uppercase',function(value){
    if (!value) return ''
    return value.toUpperCase()
})
Vue.filter('formatDate',function(value,formatType='LT'){
    if (!value) return ''
    return moment(value).format(formatType)
})
Vue.filter('fromNow',function(value){
    if (!value) return ''
    return moment(value).fromNow()
})
Vue.filter('dinheiro',function(value){
    if (!value) return ''
    return (value).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
})
Vue.filter('unidades',function(value){
    if (!value) return ''
        if (value < 10){
            return "0"+value        
        }
    return value
})
Vue.filter('pagamento',function(value){
    if (!value) return ''
        if (value == 'CC'){
            return 'Cartão de Crédito'        
        }
        if (value == 'CD'){
            return 'Cartão de Débito'
        }
        if (value == 'D'){
            return 'Dinheiro'
        }
        if (value == 'AC'){
            return 'Anatar na Conta'
        }
    return null
})
Vue.filter('nome_e_sobrenome',function(value){
    if (!value) return ''
    return (value).split(' ').slice(0, -1).join(' ')
})

Vue.filter('primeiro_nome',function(value){
    if (!value) return ''
    return value.split(' ').slice(0,1).join(' ')
})

Vue.filter('nome_dos_vendedores',function(value){
    let val = JSON.stringify(value)
    let resp = ''
    if (!value){
        return ''
    }else{
        resp = val.replace('[','').replace(']','')
        for (var j=0;j<100;j++){
            resp = Vue._.replace(resp, '"', '')
        }
    }
    return resp
})

Vue.filter('gps_address',function(value){
    let resp = lodash.split(value, ',', 6 )
    if (resp[1] == undefined || resp[2] == undefined){
        return "aguardando..."
    }else{
        return resp[0]+','+resp[1]+','+resp[2]
    }
})


//EVIROMENT SETUP
if (__DEV__) {
    //alert('Development')
    YellowBox.ignoreWarnings(['Remote debugger'])
    console.disableYellowBox = true
    console.clear()
    if (Platform.OS === 'android') {
        BASE_URL = 'http://192.168.4.103:3000/'
        WS_URL = 'ws://192.168.4.103:3000/cable'
    }else{
        BASE_URL = 'http://192.168.4.103:3000/'
        WS_URL = 'ws://192.168.4.103:3000/cable'
    }
} else {
    //alert('Production')
    if (Platform.OS === 'android') {
        BASE_URL = 'https://camp-entregas.herokuapp.com/'
        WS_URL = 'wss://camp-entregas.herokuapp.com/cable'
    }else{
        BASE_URL = 'https://camp-entregas.herokuapp.com/'
        WS_URL = 'wss://camp-entregas.herokuapp.com/cable'
    }
}

//BASE_URL = 'https://camp-entregas.herokuapp.com/'
//WS_URL = 'wss://camp-entregas.herokuapp.com/cable'

//CONFIGURA AMBIENTE
//if (__DEV__) {
//    YellowBox.ignoreWarnings(['Remote debugger'])
//    console.disableYellowBox = true
//    console.clear()
//}
//BASE_URL = 'https://camp-entregas.herokuapp.com/'
//WS_URL = 'wss://camp-entregas.herokuapp.com/cable'
//BASE_URL = 'http://192.168.4.103:3000/'
//WS_URL = 'ws://192.168.4.103:3000/cable'

Vue.prototype.$store = store
Vue.prototype.$goBack = function(func){
    BackHandler.addEventListener('hardwareBackPress',func)
}

export default {
    components: { App, AppLoading },
    data() {
        return {
            isAppReady: false
        }
    },

    async created() {
        const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS)
        let finalStatus = existingStatus
        if (existingStatus !== 'granted') {
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
            finalStatus = status
        }
        if (finalStatus !== 'granted') {
            //alert("ERRO NO SETUP")
            return
        }
        let uuid = Constants.installationId
        this.$store.dispatch('session/addExpoId',uuid)
        await this.loadFonts()
    },

    methods: {
       
        async loadFonts() {
            try {
                this.isAppReady = false
                await Font.loadAsync({
                    Roboto: require("../../node_modules/native-base/Fonts/Roboto.ttf"),
                    Roboto_medium: require("../../node_modules/native-base/Fonts/Roboto_medium.ttf"),
                    Ionicons: require("../../node_modules/@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Ionicons.ttf")
                })
                await this.$store.dispatch('organizations/fetchOrganizations')
                await this.$store.dispatch('categories/fetchCategories')
                await this.$store.dispatch('ranking/fetchRanking')
                await this.$store.dispatch('products/fetchProducts')
                await this.$store.dispatch('requests/fetchDeliveryStates')
                await this.$store.dispatch('requests/fetchSalesStates')
                await this.$store.dispatch('auth/fetchSalesmanList')
                this.isAppReady = true
            }catch (error) {
                //console.log("some error occured", error)
                this.isAppReady = true
            }
        },
    }
};
</script>

<style>
.container {
    flex: 1;
}
</style>
