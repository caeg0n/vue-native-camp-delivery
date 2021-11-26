<template>
  <nb-container>

    <nb-header :style="{flexDirection:'column-reverse',alignItems:'center',backgroundColor:'white'}">
      <!-- <nb-left :style="{flex:1,alignItems:'center'}">
         <nb-thumbnail :style="{width:logoSize}" :source="logo"/>
      </nb-left> -->
      
      <nb-body :style="{flex:1}">
        <nb-text :style="{marginTop:-15,color:'black', fontWeight:'bold'}">CARRINHO</nb-text>
      </nb-body>

      <nb-right :style="{flex:1,alignItems:'center'}">
       <!-- <nb-button transparent :onPress="() => goBack()">
          <nb-icon name="arrow-back" />
        </nb-button>  -->
      </nb-right>
    </nb-header>

    <nb-content>
      <nb-list>
        <CartDetail v-for="item in cart" 
                    :item="item" 
                    :productImg="productImg"
                    :updateFees="updateFees"
                    :key="item.id"
        />
      </nb-list>

      <fee-display :fees="fees"></fee-display>

      <view v-if="cart.length > 0" :style="{flexDirection:'row'}">
        <nb-text :style="{paddingLeft:30,flex:1,fontWeight: 'bold',fontSize:20,color:'green'}">TOTAL R${{totalPricePlusFees() | dinheiro}}</nb-text>
        <nb-button :style="{flex:2,borderColor:'red',backgroundColor:'red'}" :onPress="goToAdress" bordered>
          <nb-text :style="{fontWeight: 'bold',color:'white'}">CONTINUAR</nb-text>
          <nb-icon :style="{color:'white',marginLeft:-10}" type="Feather" name="arrow-right-circle" />
        </nb-button>
      </view>
  
    </nb-content>

    <footer-navigation :navigation="this.props.navigation">
    </footer-navigation> 

    
   <!--  <nb-footer v-if="cartStatus">
      <nb-footer-tab>
        <nb-body>
        <nb-button :onPress="goToAdress" active full>
          <nb-text :style="{fontWeight: 'bold'}">CONTINUAR</nb-text>
          <nb-icon :style="{marginLeft:-10}" name="arrow-forward" />
        </nb-button>
        </nb-body>

      </nb-footer-tab>
    </nb-footer> -->

    <modal :isVisible="cart.length < 1"
           :animationIn="'slideInUp'"
           :animationInTiming="500"
           :coverScreen="false"
           :hardwareAccelerated="true"
           :hasBackdrop="false">
      <view :style="{ alignItems: 'center',fontWight:'bold',backgroundColor:'white'}">
        <nb-thumbnail large :source="ec" />
        <text :style="{fontSize: 18}">O CARRINHO ESTÁ VAZIO</text>
      </view>
    </modal>

    <status-bar background-color="white" bar-style="dark-content"/>    
  </nb-container>

</template>

<script>
//import Vue from "vue-native-core"
//import { Dimensions } from 'react-native'
//import { BackHandler } from 'react-native'

import CartDetail from '@/components/CartDetail'
import Modal from 'react-native-modal'
import { widthPercentageToDP as wp, 
         heightPercentageToDP as hp} from 'react-native-responsive-screen'
import ec from "../../../assets/empty-cart.gif"
import logo from "../../../assets/logo-final.png"
import FooterNavigation from "@/components/FooterNavigation.vue"
import FeeDisplay from "./components/feeDisplay.vue"
import ControlComputedMixins from "@/mixins/controlComputedMixins"

export default {
  components:{ FooterNavigation,CartDetail,Modal,FeeDisplay },
  mixins: [ ControlComputedMixins ],

  data() {
  
    return {
      ec,logo,
      stylesObj: {
        btnContainer: {
          backgroundColor: "#6faf98",
          alignSelf: "center"
        }
      },
      total:this.getTotal,
      x:wp('50%'),
      wwp:wp,
      hhp:hp,
      logoSize:null,
    }
    
  },

  mounted(){
    this.updateFees()
  },

  props: {
    navigation: {
      type: Object
    },
  },

  
  computed: {
    
    fees(){
      return this.$store.state.fees.items
    },

    addresses(){
      return this.$store.state.addresses.items
    },

    cart(){
      return this.$store.state.cart.items
    },

    products(){
      return this.$store.state.products.items
    },

    getTotal(){
      return this.$store.state.cart.total
    },

    getTotalPlusFee(){
      let fees = 0.0
      let total = this.$store.state.cart.total
      this.fees.forEach(function(fee){
        fees = fees + parseFloat(fee.fee)
      })
      return total + fees
    },

    cartStatus(){
      if (this.getTotal == 0){
        return false
      }else{
        return true
      }
    }

  },

  methods: {

    goBack() {
      this.navigation.state.params.onGoBack()
      this.navigation.goBack()
    },

    addressesStatus(){
      return Object.keys(this.addresses).length > 0
    },

    totalPrice(){
      return this.getTotal
    },

    totalPricePlusFees(){
      return this.getTotalPlusFee
    },
    
    productImg(id){
      let products = this.products
      let product = products.find(product => product.id === id)
      if (product){
        return product["img"]
      }else{
        return "https://res.cloudinary.com/campinapolis-com/image/upload/v1598377107/camp-delivery/no-image.png"
      }
    },

    goToAdress() {
      this.navigation.navigate('Adress',{ addressesStatus:this.addressesStatus() })
    },

    updateFees(){
      let cart = this.cart
      let orgs = this.organizations
      this.$store.dispatch('cart/calculaTotal')
      this.$store.dispatch('fees/updateFees',{cart,orgs})
    }

  }
};
</script>

<style>
.x{
  color: black;
  margin-left:4%;
}
.body-icon-color {
  color: #999;
}
</style>