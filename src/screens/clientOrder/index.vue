<template>
  <nb-container>
    <nb-header :style="{backgroundColor:'white',flexDirection:'column-reverse',alignItems:'center'}">
      <nb-body>
        <nb-text :style="{marginTop:-15,color:'black', fontWeight:'bold'}">MEUS PEDIDOS</nb-text>
      </nb-body>
       <nb-right>
      </nb-right>
    </nb-header>
    
    <nb-content padder>
      <view :key="key" v-if="Object.keys(orders).length > 0">
      <client-order
                    v-for="listOrders,index in orders"
                    :listOrders="listOrders" 
                    :navigation="navigation"
                    :style="{marginTop:-18,paddingBottom:15}"
                    :salesStates="salesStates"
                    :deliveryStates="deliveryStates"
                    :auth="auth"
                    :organizations="organizations"
                    :products="products"
                    :updateFromChild="updateFromChild"
                    :key="index"
      />
      </view>
    </nb-content>

    <modal v-if="spinner" :isVisible="!pedidoStatus"
           :animationIn="'slideInUp'"
           :animationInTiming="1"
           :coverScreen="false"
           :hardwareAccelerated="true"
           :hasBackdrop="false">
           <nb-spinner color="red"/>
    </modal>
    
    <modal v-if="noOneOrder() && !spinner" :isVisible="true"
           :animationIn="'slideInUp'"
           :animationInTiming="500"
           :coverScreen="false"
           :hardwareAccelerated="true"
           :hasBackdrop="false">

           <view  :style="{ alignItems: 'center',fontWight:'bold',backgroundColor:'white'}">
        <!-- <nb-thumbnail large :source="ec" /> -->
        <text :style="{fontSize: 18}">NENHUM PEDIDO FOI FEITO</text>
      </view>
    </modal>

    <footer-navigation :navigation="this.props.navigation">
    </footer-navigation> 
    <status-bar background-color="white" bar-style="dark-content"/>
  </nb-container>


</template>

<script>
import Vue from "vue-native-core"
import Modal from 'react-native-modal'
import { widthPercentageToDP as wp, 
         heightPercentageToDP as hp} from 'react-native-responsive-screen'
import { BackHandler } from 'react-native' 
import FooterNavigation from "@/components/FooterNavigation.vue"
import ControlComputedMixins from "@/mixins/controlComputedMixins"
import ClientOrder from './components/clientOrder'
import logo from "../../../assets/logo-final.png"

export default {
  components:{ ClientOrder, Modal,FooterNavigation },
  mixins: [ControlComputedMixins],
  data() {
    return {
      timer:null,
      updateControl:false,
      key:0,
      spinner:true,
      logo,
      wwp:wp,
      hhp:hp,
      x:wp('50%'),
      stylesObj: {
        top:hp('20%')
      },
      logoSize:null      
    }
  },

  props: {

    navigation: {
      type: Object
    },

  },

  beforeDestroy(){
    this.$nextTick(clearInterval(this.timer))
    BackHandler.removeEventListener('hardwareBackPress',this.handleBackButtonClick)
  },

  async created(){
    Vue.prototype.$goBack(this.handleBackButtonClick)
    let eid = this.$store.state.session.device_expo_install_id
    await this.$store.dispatch('orders/fetchOrders',eid)
    this.ws()

    //atualiza a tela mediande a mudanças remotas 
    // this.$nextTick(function () {
    //   this.timer = window.setInterval(() => {
    //     let eid = this.$store.state.session.device_expo_install_id
    //     this.$store.dispatch('orders/fetchOrders',eid)    
    //     if (this.updateControl == false){
    //       this.key = Math.random()
    //     }
    //   },5000)
    // })
  },

  computed:{

    pedidoStatus(){
      return Object.keys(this.orders).length > 0
    },

    orders(){
      return this.$store.state.orders.orders
    },

  },

  methods: {

    ws(){
      var t = this
      this.connection = new WebSocket(WS_URL)
        var conn = this.connection
        this.connection.onmessage = async function(event) {
          var data = JSON.parse(event.data)
          let identifier = data.identifier
          if (identifier){
            let channel = JSON.parse(identifier).channel
            if (channel == 'ClientChannel'){
              let message = data.message 
              if (message){
                let resp = message.data
                if(resp == 'update'){
                  let eid = t.$store.state.session.device_expo_install_id
                  await t.$store.dispatch('orders/fetchOrders',eid)
                  t.key = Math.random()
                }
              }
            }
          }
        }
        this.connection.onopen = function(event) {
          console.log("conectado ao rails websocket from clientOrder/index")
          let message = {"command": "subscribe","identifier": "{\"channel\":\"ClientChannel\"}"}
          conn.send(JSON.stringify(message))
        }
    },

    updateFromChild(state){
      this.updateControl = state
    },

    handleBackButtonClick(){
      this.navigation.navigate('Buy')
      return true
    },

    async noOneOrder(){
      let eid =  this.$store.state.session.device_expo_install_id
      let res = await this.$store.dispatch('orders/fetchNumberOfOrders',eid)
      if (res == 0){
        this.spinner = false
      }
      return  res == 0
    },
    
    goBack(){
      if (this.navigation.state.routeName == 'ClientOrder'){
        this.navigation.navigate('Buy')
      }else{
        this.navigation.goBack()
      }
    },
  }

};
</script>

<style>
</style>