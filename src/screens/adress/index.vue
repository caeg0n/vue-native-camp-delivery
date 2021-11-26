<template>
  <nb-container>
    
    <nb-header :style="{flexDirection:'column-reverse',alignItems:'center',backgroundColor:'white'}">
      <nb-body :style="{flex:1,alignItems:'center'}">
        <nb-text :style="{ marginTop:-15,color:'black', fontWeight:'bold'}">ENDEREÇO</nb-text>
      </nb-body>

      <nb-right :style="{flex:1,alignItems:'center'}">
      </nb-right>
    </nb-header>

    <nb-tabs :tabBarUnderlineStyle="{borderBottomColor:'red',borderBottomWidth:4}" :page="page">
      <nb-tab :heading="getTabAdresses()">
        <tab-adresses :addresses="addresses"
                      :addressesStatus="getAddressesStatus" 
                      :navigation="this.props.navigation"
        />
        <nb-footer>
          <nb-footer-tab>
            <nb-button :onPress="()=>this.props.navigation.goBack()" active full :style="{backgroundColor:'white'}">
              <nb-text :style="{color:'black', fontWeight: 'bold'}">VOLTAR</nb-text>
            </nb-button>
            <nb-button :onPress="()=>choosePayment()" active full :style="{flexDirection:'row',   backgroundColor:'red' }">
              <nb-text :style="{color:'white', fontWeight: 'bold'}">PROXIMO</nb-text>
              <nb-icon :style="{marginLeft:-10,color:'white'}" type="Feather" name="arrow-right-circle" />
            </nb-button>  
          </nb-footer-tab>
        </nb-footer>
      </nb-tab>
      <nb-tab :heading="getTab2()">
        <tab-form :changepage="changepage" />
      </nb-tab>
    </nb-tabs>

    <AwesomeAlert
          :show="alertStatus"
          :closeOnTouchOutside="false"
          title="Endereço Invalido!"
          confirmButtonColor="red"
          showConfirmButton="true"
          confirmText="Fechar"
          :onConfirmPressed="()=>fechaAlert()"
          closeOnHardwareBackPress="true"
    />

    <status-bar background-color="white" bar-style="dark-content"/>  
  </nb-container>
</template>

<script>
import React from "react"
import { TabHeading, Icon, Text } from "native-base"
import AwesomeAlert from 'react-native-awesome-alerts'
import { widthPercentageToDP as wp,heightPercentageToDP as hp} from 'react-native-responsive-screen'
import FooterNavigation from "@/components/FooterNavigation.vue"
import TabAdresses from "./components/tabAdresses"
import TabForm from "./components/tabForm"
import logo from "../../../assets/logo-final.png"

export default {
  components: { FooterNavigation,TabAdresses, TabForm,AwesomeAlert},
  data() {
    return {
      footerState:true,
      alertStatus:false,
      page:0,
      logo,
      wwp:wp,
      hhp:hp,
      stylesObj: {
      },
      logoSize:null
    }
  },

  async created(){
    let eid = this.$store.state.session.device_expo_install_id
    this.setLogoSize()
    await this.$store.dispatch('addresses/fetchAddressesById',eid)
    this.$bus.$emit("stopSpinner")
  },

  
  props: {
    navigation: {
      type: Object
    }
  },
  computed: {

    currentAddress(){
      return this.$store.state.addresses.current_item
    },

    getAddressesStatus(){
      return this.navigation.state.params.addressesStatus
    },

    addresses(){
        return this.$store.state.addresses.items
    },

  },

  methods: {

    fechaAlert(){
      this.alertStatus = false
    },

    choosePayment(){
      if (this.currentAddress.id != undefined){
        this.navigation.navigate('Payment')
      }else{
        this.alertStatus = true
      }
    },

    setLogoSize(){
      this.logoSize = hp('35%')
      if (hp('100%')>1200){
        this.logoSize = hp('25%')
      }
    },

    goBack(){
      this.navigation.goBack()
    },

    changepage(page){
      this.page = page
    },

    getTabAdresses() {
      return (
        <TabHeading style={{backgroundColor: '#fff'}}>
          <Icon name="location" type="Entypo" style={{color:'red'}} />
          <Text style={{color:'black'}}>Endereços</Text>
        </TabHeading>
      )
    },

    getTab2() {
      return (
        <TabHeading style={{backgroundColor: '#ffffff'}}>
          <Icon name="plus" type="Entypo" style={{color:'red'}} />
          <Text style={{color:'black'}}>Adicionar</Text>
        </TabHeading>
      )
    },
    
  }
};
</script>

<style>
</style>