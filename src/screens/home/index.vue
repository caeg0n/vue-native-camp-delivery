<template>
  <nb-container>
    <image-background class="imageContainer" :source="launchScreenBg">
      <view class="logoContainerStyle">
        <image class="logo" :source="launchscreenLogo" />
      </view>
      <view class="text-container">
        <nb-h3 class="slogan">AGILIDADE E COMODIDADE NAS SUAS COMPRAS</nb-h3>
      </view>
      <view>
        <nb-button class="button-container" rounded block :onPress="goToBuy">
          <nb-text>COMPRAR</nb-text>
        </nb-button>
        <nb-button class="button-entregador" rounded large bordered :onPress="()=>openModal()">
          <nb-text class="button-entregador-text">QUERO ME TORNAR UM ENTREGADOR</nb-text>
        </nb-button>
      </view>
    </image-background>
    <status-bar background-color="white" bar-style="dark-content"/>
    <deliverymanForm :modalState="modalState" :openModal="openModal" :closeModal="closeModal"/>
  </nb-container>
</template>

<script>
//import { Dimensions, Platform } from "react-native"
//import { BackHandler } from "react-native"
//import { widthPercentageToDP as wp, 
//         heightPercentageToDP as hp} from 'react-native-responsive-screen'
import launchScreenBg from "../../../assets/ls-bg-1.png"
import launchscreenLogo from "../../../assets/logo-1-1.png"
import ControlComputedMixins from "@/mixins/controlComputedMixins"
import DeliverymanForm from "@/components/DeliverymanForm.vue"

export default {
  components:{ DeliverymanForm },
  mixins: [ControlComputedMixins],
  props: {
    navigation: {
      type: Object
    }
  },
    
  data() {
    return {
      modalState:false,
      launchScreenBg,
      launchscreenLogo,
    }
  },

    methods: {

        openModal(){
          this.modalState = true
        },

        closeModal(){
          this.modalState = false
        },

        goToBuy() {
            this.navigation.navigate('Landing')
        },
        goToLanding() {
            this.navigation.navigate('Landing')
        },
        goToAdmin() {
            this.navigation.navigate('Login')
        },        

    }
};
</script>

<style>
.button-entregador{
  margin-top:5%;     
  font-weight:bold;
  height:21%;
  width:80%;
  align-self:center;
  border-color:#fff;
}
.button-entregador-text{
  font-size:10;
  color:#fff;
  margin-left:18%;
  font-weight:bold;
}
.imageContainer {
  flex: 1;
}
.text-color-primary {
  color: blue;
  font-family: Roboto;
}
.logo {
  width: 100%;
  height: 70%;
}
.logoContainerStyle {
  padding-top:10%;
  flex:1;
}
.text-container {
  align-items: center;
}
.slogan {
  text-align:center;
  margin-top:-25%;
  color: white;
  font-size:20;
}
.button-container {
  font-weight:bold;
  background-color:#DC143C;
  margin-left:30;
  margin-right:30;
}
</style>