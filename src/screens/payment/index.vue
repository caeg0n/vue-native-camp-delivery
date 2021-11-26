<template>
  <nb-container>

    <nb-header :style="{flexDirection:'column-reverse',alignItems:'center',backgroundColor:'white'}">
      <!-- <nb-left :style="{flex:1,alignItems:'center'}">
         <nb-thumbnail :style="{width:logoSize}" :source="logo"/>
      </nb-left> -->
      
      <nb-body :style="{alignItems:'center'}">
        <nb-text :style="{marginTop:-15,color:'black', fontWeight:'bold'}">PAGAMENTO</nb-text>
      </nb-body>

       <nb-right :style="{flex:1,alignItems:'center'}">
        <!-- <nb-button transparent :onPress="() => goBack()">
          <nb-icon name="arrow-back" />
        </nb-button> -->
      </nb-right>
    </nb-header>
    
    <nb-content padder>
      <!-- <nb-separator :style="{backgroundColor:'#3F51B5'}" bordered noTopBorder><text :style="{textAlign:'center',color:'white',fontWeight:'bold'}">ESCOLHA A FORMA DE PAGAMENTO</text></nb-separator>
       -->
      <nb-list-item icon>
        <nb-left>
          <!-- <nb-button> -->
            <nb-icon active name="card" />
          <!-- </nb-button> -->
        </nb-left>
        <nb-body>
          <nb-text :onPress="()=>{clickCC()}">Cartão de crédito</nb-text>
        </nb-body>
        <nb-right>
          <!-- <nb-badge :style="{ backgroundColor: '#FD3C2D' }"> -->
            <!-- <nb-text>2</nb-text> -->
          </nb-badge>
        </nb-right>
        <nb-right>
          <nb-radio color='red' selectedColor='red' :selected="selectedCC" :onPress="clickCC" />
        </nb-right>
      </nb-list-item>

      <nb-list-item icon>
        <nb-left>
          <!-- <nb-button :style="{ backgroundColor: '#4CDA64' }"> -->
            <nb-icon active name="card" />
          <!-- </nb-button> -->
        </nb-left>
        <nb-body>
          <nb-text :onPress="()=>{clickCD()}">Cartão de débito</nb-text>
        </nb-body>
        <nb-right>
          <!-- <nb-badge :style="{ backgroundColor: '#FD3C2D' }"> -->
            <!-- <nb-text>2</nb-text> -->
          </nb-badge>
        </nb-right>
        <nb-right>
          <nb-radio color='red' selectedColor='red' :selected="selectedCD" :onPress="clickCD" />
        </nb-right>
      </nb-list-item>
      
      <nb-list-item icon>
        <nb-left>
          <!-- <nb-button :style="{ backgroundColor: '#3BAA32' }"> -->
            <nb-icon active name="cash" />
          <!-- </nb-button> -->
        </nb-left>
        <nb-body>
          <nb-text :onPress="()=>{clickD()}">Dinheiro</nb-text>
        </nb-body>
        <nb-right>
          <!-- <nb-badge :style="{ backgroundColor: '#FD3C2D' }"> -->
            <!-- <nb-text>2</nb-text> -->
          </nb-badge>
        </nb-right>
        <nb-right>
          <nb-radio color='red' selectedColor='red' :selected="selectedD" :onPress="clickD" />
        </nb-right>
      </nb-list-item>
      
      <nb-list-item icon>
        <nb-left>
         <!--  <nb-button :style="{ backgroundColor: 'orange' }"> -->
            <nb-icon active name="paper" />
          <!-- </nb-button>  -->
        </nb-left>
        <nb-body>
          <nb-text :onPress="()=>{clickAC()}">Anotar na minha conta</nb-text>
        </nb-body>
        <nb-right>
          <!-- <nb-badge :style="{ backgroundColor: '#FD3C2D' }"> -->
            <!-- <nb-text>2</nb-text> -->
          </nb-badge>
        </nb-right>
        <nb-right>
          <nb-radio color='red' selectedColor='red' :selected="selectedAC" :onPress="clickAC"/>
        </nb-right>
      </nb-list-item>


      <nb-card>
    <nb-card-item button>
      <nb-left>
        <nb-text class="y"></nb-text>
        <nb-text note class="x">Atenção: Todos os pagamentos serão efetuados no ato da entrega. O pagamento desejado será recolhido pelo entregador.</nb-text>
      </nb-left>
    </nb-card-item> 
  </nb-card>

    </nb-content>
    <!-- <nb-footer>
      <nb-footer-tab>
        <nb-body>
          <nb-button :onPress="finalizeOrder" active full>
            <nb-text :style="{fontWeight: 'bold'}">CONFIRMAR</nb-text>
            <nb-icon :style="{marginLeft:-10}" name="arrow-forward" />
          </nb-button>
        </nb-body>
      </nb-footer-tab>
    </nb-footer> -->

    <nb-footer>
       <nb-footer-tab>
          <nb-button :onPress="()=>this.props.navigation.goBack()" active full :style="{backgroundColor:'white'}">
            <nb-text :style="{color:'black', fontWeight: 'bold'}">VOLTAR </nb-text>
          </nb-button>
            <nb-button :onPress="()=>finalizeOrder()" active full :style="{backgroundColor:'red',flexDirection:'row'}">
            <nb-text :style="{color:'white', fontWeight: 'bold'}">PROXIMO </nb-text>
            <nb-icon :style="{marginLeft:-10,color:'white'}" type="Feather"name="arrow-right-circle" />
          </nb-button>  
          <!-- <nb-button v-if="getStatus()" disabled :onPress="showFinalizeOrder" active full>
            <nb-text :style="{color:'grey',fontWeight: 'bold'}">FINALIZAR </nb-text>
          </nb-button> -->
        </nb-footer-tab>
      </nb-footer>

     <!-- <footer-navigation :navigation="this.props.navigation">
    </footer-navigation>  -->
    <AwesomeAlert
          :show="alertStatus"
          :closeOnTouchOutside="false"
          title="ATENÇÃO: Escolha uma das formas de pagamento disponiveis"
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
import React from "react";
import { Platform } from "react-native"
import { Icon } from "native-base"
import AwesomeAlert from 'react-native-awesome-alerts'
import logo from "../../../assets/logo-final.png"
import { widthPercentageToDP as wp, 
         heightPercentageToDP as hp} from 'react-native-responsive-screen'
import FooterNavigation from "@/components/FooterNavigation.vue"

//import { BackHandler } from 'react-native'

export default {
  components: { FooterNavigation,AwesomeAlert },
  data() {
    return {
      alertStatus:false,
      logo,
      selectedCC:false,
      selectedCD:false,
      selectedD:false,
      selectedAC:false,
      wwp:wp,
      hhp:hp,
      logoSize:null
    }
  },

  created(){
    this.setLogoSize()
  },

  props:{
    navigation: {
      type: Object
    }
  },

  computed:{
  },

  methods: {

    fechaAlert(){
      this.alertStatus = false
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

    clickCC(){
      this.$store.dispatch('payment/setPayment',"CC")
      this.selectedCC = true
      this.selectedCD = false
      this.selectedD = false
      this.selectedAC = false
    },
    clickCD(){
      this.$store.dispatch('payment/setPayment',"CD")
      this.selectedCC = false
      this.selectedCD = true
      this.selectedD = false
      this.selectedAC = false
    },
    clickD(){
      this.$store.dispatch('payment/setPayment',"D")
      this.selectedCC = false
      this.selectedCD = false
      this.selectedD = true
      this.selectedAC = false
    },
    clickAC(){
      this.$store.dispatch('payment/setPayment',"AC")
      this.selectedCC = false
      this.selectedCD = false
      this.selectedD = false
      this.selectedAC = true
    },
    finalizeOrder(){
      if (this.selectedCC == false && this.selectedCD == false &&
          this.selectedD == false && this.selectedAC == false){
        this.alertStatus = true
      }else{
        this.navigation.navigate('Resume')
      } 
        
    },
  }
};

</script>