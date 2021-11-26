<template>
  <modal  :isVisible="this.props.modalState" 
          :transparent="true"
          :onBackdropPress="()=>this.props.closeModal()"
          :onBackButtonPress="()=>this.props.closeModal()"
          :animationIn="'slideInLeft'"
          :hardwareAccelerated="true"
          :backdropOpacity="0.8"
          :animationOut="'slideOutRight'"
          :animationInTiming="300"
          :animationOutTiming="300"
          :useNativeDriver="true">
    <nb-container :style="{overflow:'hidden',borderRadius:10,backgroundColor: '#FFF'}">
      <image v-if="keyboardStatus" :style="{width: '100%', height: hhp('40%')}" :source="organizationImg"/> 
      <image v-if="contactStatus" :style="{width: '100%', height: hhp('40%')}" :source="{uri:'https://res.cloudinary.com/campinapolis-com/image/upload/v1618113487/camp-delivery/assets/animation_500_kncmytag.gif'}"/>

       <nb-list-item icon>
        <nb-left>
          <nb-button :style="{ backgroundColor: 'red' }">
            <nb-icon active type="Entypo" name="check" />
          </nb-button>
        </nb-left>
        <nb-body>
          <nb-text :style="{fontSize:rfp(2.5)}" class="deliveryman-text">Taxas adaptadas ao tamanho do seu negocio</nb-text>
        </nb-body>
      
    </nb-list-item>

    <nb-list-item icon>
        <nb-left>
          <nb-button :style="{ backgroundColor: 'red' }">
            <nb-icon active type="Entypo" name="check" />
          </nb-button>
        </nb-left>
        <nb-body>
          <nb-text :style="{fontSize:rfp(2.5)}" class="deliveryman-text">Tenha um relatorio completo de suas entregas</nb-text>
        </nb-body>
    </nb-list-item>

    <nb-list-item icon>
      <nb-left>
        <nb-button :style="{ backgroundColor: 'red' }">
          <nb-icon active type="Entypo" name="check" />
        </nb-button>
      </nb-left>
      <nb-body>
        <nb-text :style="{fontSize:rfp(2.5)}" class="deliveryman-text">Varios entregadores a sua disposição</nb-text>
      </nb-body>
    </nb-list-item>

    <nb-list-item icon>
      <nb-left>
        <nb-button :style="{ backgroundColor: 'red' }">
          <nb-icon active type="Entypo" name="check" />
        </nb-button>
      </nb-left>
      <nb-body>
        <nb-text :style="{fontSize:rfp(2.5)}" class="deliveryman-text">Anúncios grátis dentro do aplicativo</nb-text>
      </nb-body>
    </nb-list-item>

    <nb-list-item icon>
      <nb-left>
        <nb-icon :style="{marginTop:-10,alignSelf:'center',color:'green'}" type="Ionicons" name="logo-whatsapp" />
      </nb-left>
      <nb-text class="whatsapp-text">DEIXE SEU CONTATO</nb-text>
    </nb-list-item>
  
    <view class="phone-input">
      <intl-phone-input :phoneInputStyle="{color:'white',fontSize:rfp(3)}"
                        :disableCountryChange="true"
                        :containerStyle="{height:45,backgroundColor:'red'}"
                        :defaultCountry="'BR'"
                        :onChangeText="(value)=>checkPhoneNumber(value)"
      />
    </view>
    
    
        <AwesomeAlert
          :show="alertStatus"
          :closeOnTouchOutside="false"
          :title="alertText"
          :confirmButtonColor="'red'"
          :cancelButtonColor="'grey'"
          :showConfirmButton="true"
          :showCancelButton="true"
          :confirmText="'Enviar'"
          :cancelText="'Cancelar'"
          :onConfirmPressed="()=>sendPhoneNumber()"
          :onCancelPressed="()=>fechaAlert()"
          :closeOnHardwareBackPress="true"

    />   

    </nb-container>
  </modal>
</template>

<script>
import Vue from "vue-native-core"
import { widthPercentageToDP as wp, 
         heightPercentageToDP as hp} from 'react-native-responsive-screen'
import Modal from 'react-native-modal'
import IntlPhoneInput from 'react-native-intl-phone-input'
import { Keyboard } from 'react-native'
import AwesomeAlert from 'react-native-awesome-alerts' 
import organizationImg from "../../assets/organization-img.gif"  
import { RFPercentage, RFValue } from "react-native-responsive-fontsize"                       

export default {
  
  components:{ Modal,IntlPhoneInput,AwesomeAlert },

  props:{
    closeModal:{
      type: Function
    },
    ofModalState:{
      type: Boolean
    }
  },

  data() {

    return {
      rfp:RFPercentage,
      organizationImg,
      intervalID:null,
      contactStatus:false,
      inputValue:null,
      alertText:"",
      alertStatus:false,
      keyboardStatus:true,
      wwp:wp,
      hhp:hp
    }

  },

  async created() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow)
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide)
  },

  computed: {
  },

  methods:{

    async sendPhoneNumber(){
      let contact = {"phone_number":this.inputValue.phoneNumber,"contact_type":2}
      this.alertStatus = false
      await this.$store.dispatch('contacts/updateContact',contact)
      this.keyboardStatus = false
      this.contactStatus = true
      setTimeout(()=>{this.closeModal()}, 1500)
      setTimeout(()=>{this.contactStatus = false}, 1600)
      setTimeout(()=>{this.keyboardStatus = true}, 1600)
    },

    fechaAlert(){
      this.alertStatus = false
    },

    checkPhoneNumber(value){
      this.inputValue = value
      this.alertText = "Enviar "+value.phoneNumber+ "?"
      if (value.unmaskedPhoneNumber.length == 11){
        this.alertStatus = true
      }
    },
    
    _keyboardDidShow () {
      this.keyboardStatus = false
    },

    _keyboardDidHide () {
      this.keyboardStatus = true
      if (this.inputValue != null){
        if (this.inputValue.unmaskedPhoneNumber.length == 11){
          this.alertStatus = true
        }
      }
    },

    maxHeight(){
      let result = 0
      if (wp('100%') < 601){
        result = hp('30%')
      }
      if (wp('100%') < 412){
        result = hp('33%')
      }
      if (wp('100%') < 393){
        result = hp('27%')
      }
      if (wp('100%') < 385){
        result = hp('35%')
      }
      if (wp('100%') < 361){
        result = hp('33%')
      }
      if (wp('100%') < 321){
        result = hp('45%')
      }
      return result
    }, 
          
  },  

};
</script>

<style>

.phone-input{
  margin-left:12%;
  width:80%;
  margin-top:-3%;
}

.button-entregador{
  margin-top:1%;     
  font-weight:bold;
  height:6%;
  width:10%;
  align-self:center;
  border-color:#fff;
}
.button-entregador-text{
  font-size:10;
  color:#fff;
  margin-left:1%;
  font-weight:bold;
}

.whatsapp-text{
  color:#000;
  margin-top:-10px;
}

.deliveryman-text{
  color:#000;
}

.spinner-container{
  display: flex;
}

</style>


