<template>
  <nb-card-item>
    <nb-button :onPress="() => updateQuantidade('-')" iconLeft :style="{backgroundColor:'red',borderRadius:100,width: 50,height:50, marginLeft: 5, }" small>
      <nb-text :style="{color:'white',fontSize:30,fontWeight:'bold',marginLeft:3}">-</nb-text>
    </nb-button>
    
    <nb-text :style="{color:'black',marginLeft:10,fontWeight:'bold',fontSize:18}">{{quantidade}}</nb-text>
    
    <nb-button :onPress="() => updateQuantidade('+')" iconLeft :style="{borderRadius:100,width: 50,height:50, marginLeft: 10,backgroundColor:'red' }" small>
      <nb-text :style="{color:'white',fontSize:25,fontWeight:'bold',marginTop:-2,marginLeft:2}">+</nb-text>
    </nb-button>

    <nb-button :style="{width:btnContinuarWidth(),backgroundColor:'red',marginLeft:wp('3%')}" :onPress="addToCart">
      <nb-text>Continuar</nb-text>
      <nb-icon :style="{marginLeft:-10}" type="Feather" name="arrow-right-circle" />
    </nb-button>
  </nb-card-item>
</template>

<script>
import { Text, Alert, TouchableOpacity } from 'react-native'
import Toast from 'react-native-root-toast'
import ControlComputedMixins from "@/mixins/controlComputedMixins"
import { widthPercentageToDP as wp, 
         heightPercentageToDP as hp} from 'react-native-responsive-screen'


export default {

  mixins: [ ControlComputedMixins ],

  data() {

    return {
      quantidade : 0,
      itemMT:hp('-4%'),
      wp,
      hp
    }

  },

  props:{
  
    product:{
      type: Object,
      required: true
    },

    closeModal:{
      type:Function
    }

  },
  
  computed: {
  
    // cart(){
    //   return this.$store.state.cart.items
    // },
  
    // products(){
    //   return this.$store.state.products.items
    // },
  
    productQuantidade(){
      return this.$store.getters['cart/getQuantidadeById'](this.product.id)            
    }
  
  },
  
  watch:{

    productQuantidade() {
      this.quantidade = this.productQuantidade
    },

  },
  
  mounted(){
    if (this.productQuantidade > 0){
      this.quantidade = this.productQuantidade
    }
  },

  methods:{

    btnContinuarWidth(){
      let result = 0
      let x = wp('100%') / 8.05
      result = wp(x+'%')
      // if (wp('100%') < 601){
      //   result = wp('62%')
      // }
      // if (wp('100%') < 412){
      //   result = wp('50%')
      // }
      // if (wp('100%') < 393){
      //   result = wp('48%')
      // }
      // if (wp('100%') < 385){
      //   result = wp('47%')
      // }
      // if (wp('100%') < 361){
      //   result = wp('45%')
      // }
      // if (wp('100%') < 321){
      //   result = wp('42%')
      // }
      return result
    },

    updateQuantidade(p){
      if (p=='+')
        this.quantidade++
      if (p=='-' && this.quantidade>0)
        this.quantidade--
    },
    
    addToCart(){
        this.updateCart()
        this.closeModal()
    },
    
    updateCart(func){
      let id = this.product.id
      let product = this.product
      let quantidade = this.quantidade
      if (quantidade == 0 )
        func = 'del'
      if (func != 'del'){
        this.$store.dispatch('cart/updateCart',{id,quantidade,product})
      }else{
        this.deleteFromCart(this.product)
      }      
    },
    
    deleteFromCart(item){
      let id = item.id
      let productsList = this.products
      let product = productsList.find(product => product.id === id) 
      this.$store.dispatch('cart/deleteFromCart',{item})
      this.quantidade = 0
    }

  }
};
</script>