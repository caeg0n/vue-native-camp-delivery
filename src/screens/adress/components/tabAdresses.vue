<template>

  <nb-container>
    
    <nb-content v-if="!noAddress" padder>
      <nb-separator bordered noTopBorder :style="{marginTop:-10,
                                                  marginLeft:-10,
                                                  width:'120%',
                                                  backgroundColor:'white'}">
        <text :style="{marginLeft:-70,
                       textAlign:'center',
                       fontWeight:'bold',
                       color:'black'}">ENDEREÇOS CADASTRADOS
        </text>
      </nb-separator>
      <address v-for="address in addresses" :key="address.id" :address="address" :style="{marginBottom:15}" />
    </nb-content>


    <nb-container v-if="spinner" :style="{flex: 1,marginTop:stylesObj.top}">
        <nb-spinner color="red"/>
    </nb-container>

  
    <!-- <nb-footer v-if="isAnyAddressRegistered">
      <nb-footer-tab>
        <nb-body>
          <nb-button :onPress="choosePayment" active full>
            <nb-text :style="{fontWeight: 'bold'}">CONFIRMAR</nb-text>
            <nb-icon :style="{marginLeft:-10}" name="arrow-forward" />
          </nb-button>
        </nb-body>
      </nb-footer-tab>
    </nb-footer> -->
  
    <modal :isVisible="noAddress"
           :animationIn="'slideInUp'"
           :animationInTiming="500"
           :coverScreen="false"
           :hardwareAccelerated="true"
           :hasBackdrop="false">
        <view :style="{ alignItems: 'center',fontWight:'bold',backgroundColor:'white'}">
          <nb-thumbnail large :source="ec" />
          <text :style="{fontWight:'bold',fontSize: 18}" >NENHUM ENDEREÇO CADASTRADO</text>
        </view>
    </modal>
  
    <!--  
    <modal :isVisible="spinner"
           :animationIn="'slideInUp'"
           :animationInTiming="1000"
           :coverScreen="false"
           :hardwareAccelerated="true"
           :hasBackdrop="false">
      <nb-container :style="{marginTop:stylesObj.top}" 
                    class="spinner-container">
        <nb-spinner color="red"/>
      </nb-container>
    </modal>
    -->

  </nb-container>


</template>

<script>
//import React from "react"
//import { Platform } from "react-native"
//import { Icon } from "native-base"
import Modal from 'react-native-modal'
import { widthPercentageToDP as wp, 
         heightPercentageToDP as hp} from 'react-native-responsive-screen'
import Address from "./address"
import ec from "../../../../assets/no_address.gif"

export default {
  components:{ Address,Modal },
  data() {
    return {
      spinner:true,
      noAddress:false,
      clock:'',      
      ec,
      stylesObj: {
        top:hp('-5%')
      },
    };
  },

  props:{
    
    addresses:{
      type: Array,
      required: true
    },
    
    navigation: {
      type: Object
    },
    
    addressesStatus:{
      type: Boolean
    }

  },

  created(){
    this.isNoOneAdress()
  },

  mounted(){
    
    this.$bus.$on("stopSpinner", () => {
      this.spinner = false
    })

    this.$bus.$on("changeNoAddress", (state) => {
      this.noAddress = state
    })

  },


  computed:{

  },

  methods: {

    async isNoOneAdress(){
      let eid = this.$store.state.session.device_expo_install_id
      let l = await this.$store.dispatch('addresses/getAddressesLength',eid)
      if (l == 0){
        this.noAddress = true
        this.spinner = false
      }
    },
  
  }
};

</script>
<style>
</style>
