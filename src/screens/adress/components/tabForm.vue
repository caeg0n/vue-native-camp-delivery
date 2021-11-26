<template>
  <nb-container :style="{ backgroundColor: '#fff' }">
    <nb-container :style="{marginTop:stylesObj.top}"
                  class="spinner-container" 
                  v-if="isLoading()">
      <nb-spinner color="red" />
    </nb-container>

    <nb-content padder v-if="!isLoading()">
      <nb-form>
        
        <nb-item stackedLabel>
          <nb-label :style="{fontWeight: 'bold'}">Identificação do Aparelho</nb-label>
          <nb-input v-model="form.device_id" class="x" disabled/>
        </nb-item>
        
        <!-- NOME -->
        <InputWithError :error="($v.form.name.$dirty) && (!$v.form.name.minLength || !$v.form.name.required)"
                        msg="minimo de 3 letras">
          <nb-item stackedLabel>
            <nb-label :style="{fontWeight: 'bold'}">Seu Nome</nb-label>
            <nb-input v-model="form.name"
                      placeholder="ex: José Carlos"
                      auto-capitalize="none"
                      :on-input="() => $v.form.name.$touch()"/>
          </nb-item>
        </InputWithError>

        <!-- TELEFONE -->
        <nb-item stackedLabel>
          <nb-label :style="{marginBottom:5,fontWeight: 'bold'}">Seu Telefone</nb-label>
          <InputWithError :error="($v.form.cel.$dirty) && (!$v.form.cel.minLength || !$v.form.cel.required)"
                          msg="telefone inválido">
            <intl-phone-input :disableCountryChange="disableCountryChange"
                              :onChangeText="onChangeText" 
                              :phoneInputStyle="{fontSize:25}" 
                              :defaultCountry="defaultCountry"
                              :placeholder="placeholder"
                              v-model="form.cel" 
                              :on-blur="() => $v.form.cel.$touch()" />
          </InputWithError>
        </nb-item>

          
        <!-- ENDEREÇO -->
        <nb-item stackedLabel>
        <nb-label :style="{fontWeight: 'bold'}">Endereço</nb-label>
        <InputWithError :error="($v.form.address.$dirty) && (!$v.form.address.minLength || !$v.form.address.required)"
                        msg="endereço inválido">
          <nb-textarea :style="{marginTop:15,marginLeft:-6,width:280}" 
                        v-model="form.address"
                        :rowSpan="2"
                        :on-blur="() => $v.form.address.$touch()">
          </nb-textarea>
        </InputWithError>
        </nb-item>
      </nb-form>
    </nb-content>

    <nb-footer>
      <nb-footer-tab>
        <nb-button :onPress="registerAddress" active full :style="{flexDirection:'row',   backgroundColor:'red' }">
          <nb-text :style="{color:'white', fontWeight: 'bold'}">Cadastrar</nb-text>
        </nb-button>  
      </nb-footer-tab>
    </nb-footer>

  </nb-container>
</template>

<script>
//import React from "react";
//import { Platform } from "react-native"
//import { Icon } from "native-base"
//import { Text, Alert, TouchableOpacity } from 'react-native'
//import { required,email,minLength,sameAs } from 'vuelidate/lib/validators'

import IntlPhoneInput from 'react-native-intl-phone-input'
import { required,minLength } from 'vuelidate/lib/validators'
import { widthPercentageToDP as wp, 
         heightPercentageToDP as hp} from 'react-native-responsive-screen'


export default {
  components:{IntlPhoneInput},
  data() {
    return {
      stylesObj: {
        top:hp('20%')
      },
      defaultCountry:"BR",
      closeText:"FECHAR",
      disableCountryChange:true,
      placeholder:null,
      
      form:{
        device_id:'',
        name:'',
        cel:'',
        address:''
      },      
    }
  },
  created(){
    this.form.device_id = this.getExpoId()
  },

  props: {
  
    changepage: {
      type: Function
    },
  
  },

  validations:{
    form:{
      device_id:{ required },
      name:{ required,minLength: minLength(3) },
      cel: { required,minLength: minLength(15) },
      address:{ required,minLength: minLength(5) }
    }
  },
  computed:{
    addresses(){
        return this.$store.state.addresses.items
    },
    addExpoId(){
      return this.$store.state.session.device_expo_install_id
    },
    loading(){
      return this.$store.state.session.addressLoading
    }
  },
  methods: {

    showAlert(s){
      if (s==1){
        //mansagem de sucesso no cadastro do endereco
      }
      if (s==0){
        //mensage de erro
      }
    },

    isLoading(){
      return this.loading
    },

    onChangeText(cel){
      this.form.cel = cel["phoneNumber"]
    },
    
    getExpoId(){
      return this.addExpoId
    },
    
    async registerAddress(){
      this.$v.form.$touch()
      if (!this.$v.form.$invalid){
        let eid = this.$store.state.session.device_expo_install_id
        this.$bus.$emit("changeNoAddress",false)
        this.$store.dispatch('session/setAddressLoadingState',true)
        this.$store.dispatch('addresses/newAddress',{"address":this.form}).then(async (res) => {
          await this.$store.dispatch('addresses/fetchAddressesById',eid)
          this.$store.dispatch('session/setAddressLoadingState',false)
          this.$v.$reset()
          this.form.$reset
          this.form.name = ''
          this.form.cel = ''
          this.form.address = ''
          this.changepage(1)
          this.changepage(0)
          this.showAlert(1)
        }).catch(err => {
          this.placeholder = this.form.cel 
          this.$store.dispatch('session/setAddressLoadingState',false)
          this.showAlert(0)
        })
      }
    }

  }
};
</script>


<style>
.x{
  font-size:14px;
   color: grey;
}
.y{
  font-size:54px;
}
.view-wrapper-2{
  padding-top:10px;
}
.telefone{
margin-top: 10px;
}
.spinner-container{
  display: flex;
}
</style>