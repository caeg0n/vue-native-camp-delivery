<template>
  <nb-container>

   <nb-header :style="{paddingTop:20,backgroundColor:'white',alignItems:'center',flexDirection:'column-reverse'}">
      <!-- <nb-left :style="{alignItems:'center',flexDirection:'column-reverse'}">
         <nb-thumbnail :style="{width:logoSize}" :source="logo2"/>
      </nb-left> -->
      
      <nb-body>
        <nb-text :style="{color:'black', fontWeight:'bold'}">RESUMO</nb-text>
      </nb-body>

       <!-- <nb-right :style="{flex:1,alignItems:'center'}">
        <nb-button transparent :onPress="() => goBack()">
          <nb-icon name="arrow-back" />
        </nb-button>
      </nb-right> -->
    </nb-header>

    <nb-content padder >
      <nb-card transparent>
          <nb-card-item :style="{marginTop:-15}">
          <nb-left>
            <!-- <nb-button transparent :style="{ marginBottom: -20,marginTop: 0 }"> -->
              <nb-icon name="person"></nb-icon>
              <nb-text :style="{color:'black',fontSize:12}">Entregar para: </nb-text>
              <nb-text :style="{color:'green',fontSize:12}">{{getName()}}</nb-text>
            <!-- </nb-button> -->
          </nb-left>
        </nb-card-item>

        <nb-card-item :style="{marginTop:-18}">
          <nb-left>
            <!-- <nb-button transparent :style="{ marginBottom: -20,marginTop: -10 }"> -->
              <nb-icon name="card"></nb-icon>
              <nb-text :style="{color:'black',fontSize:12}">Pagar com: </nb-text>
              <nb-text :style="{color:'green',fontSize:12}">{{getPayment() | pagamento}}</nb-text>
            <!-- </nb-button> -->
          </nb-left>
        </nb-card-item>
        <nb-card-item :style="{marginTop:-18}">
          <nb-left>
            <!-- <nb-button transparent :style="{ marginBottom: -20,marginTop: -10 }"> -->
              <nb-icon name="car"></nb-icon>
              <nb-text :style="{color:'black',fontSize:12}">Entregar em: </nb-text>
              <nb-text :style="{color:'green',fontSize:12}">{{getAddress().address}}</nb-text>
            <!-- </nb-button> -->
          </nb-left>
        </nb-card-item>

        <nb-card-item :style="{marginTop:-18}">
          <nb-left>
            <!-- <nb-button transparent :style="{ marginBottom: -20,marginTop: -10 }"> -->
              <nb-icon name="bicycle" type="Ionicons"></nb-icon>
              <nb-text :style="{color:'black',fontSize:12}">Taxa de entrega: </nb-text>
              <nb-text :style="{color:'green',fontSize:12}">R${{getTotalFees() | dinheiro}}</nb-text>
            <!-- </nb-button> -->
          </nb-left>
        </nb-card-item>

        <nb-card-item>
          <nb-left :style="{marginTop:-20}">
            <!-- <nb-button transparent> -->
              <nb-icon name="cash"></nb-icon>
              <nb-text :style="{color:'black',fontSize:12}">TOTAL: </nb-text>
              <nb-text :style="{color:'green',fontSize:12}">R${{getTotal() | dinheiro}}</nb-text>
            <!-- </nb-button> -->
          </nb-left>
        </nb-card-item>

        <view v-if="!loading">
        <nb-card-item v-for="product in getCart()" :key="product.id" footer>
          <nb-left>
            <nb-thumbnail :source="{uri: product.product.img}"></nb-thumbnail>
            <nb-body>
              <nb-text>{{product.product.name}}</nb-text>
              <nb-text note>{{product.product.description}}</nb-text>
              <nb-text note>unidades: {{product.quantidade | unidades}}</nb-text>
              <nb-text note>valor: R${{getValorTotalById(product.id) | dinheiro}}</nb-text>
            </nb-body>
          </nb-left>
        </nb-card-item>
        </view>
      </nb-card>

      <view :style="{ alignItems: 'center' }" v-if="loading">
        <image :style="{width: 150, height:150}" :source="resume_loading" />
        <!-- <image :style="{marginTop:50,width:200,height:50}" :source="null" /> -->
      </view>

    </nb-content>

    <!-- <nb-content padder v-else>
      <view v-if="!getErro()">
        <image :style="{height:500,marginTop:-80,alignSelf: 'center'}" :source="sourceSuccess" />
      </view>
      <view v-if="getErro()" :style="{backgroundColor:'red'}">
        <image :style="{marginTop:-50,height:400,width:'150%',alignSelf: 'center'}" :source="sourceError" />
      </view>
    </nb-content> -->
    
    <nb-footer v-if="!getStatus()">
        <nb-footer-tab>
          <nb-button :onPress="()=>this.props.navigation.navigate('Buy')" active full :style="{backgroundColor:'white'}">
            <nb-text :style="{color:'black', fontWeight: 'bold'}">CANCELAR </nb-text>
          </nb-button>
          <nb-button :onPress="()=>finalizeOrder()" active :style="{backgroundColor:'red'}">
            <nb-text :style="{color:'white', fontWeight: 'bold'}">FINALIZAR </nb-text>
          </nb-button>
          <!-- <nb-button v-if="getStatus()" disabled :onPress="showFinalizeOrder" active full>
            <nb-text :style="{color:'grey',fontWeight: 'bold'}">FINALIZAR </nb-text>
          </nb-button> -->
        </nb-footer-tab>
    </nb-footer>

    <!-- <awesome-alert v-if="!getStatus()"
        :show="show"
        :title="title"
        :message="message"
        :showConfirmButton="true"
        :cancelText="cancelText"
        :confirmText="confirmText"
        :confirmButtonColor="confirmButtonColor"
        :closeOnTouchOutside="true"
        :closeOnHardwareBackPress="true"
        :showCancelButton="true"
        :onCancelPressed="() => hideFinalizeOrder()"
        :onConfirmPressed="async () => {await finalizeOrder(),hideFinalizeOrder}"
        :contentContainerStyle="{justifyContent: 'center',width:'100%'}"
        :contentStyle="{width:'100%',height:'30%'}"
        :titleStyle="{fontSize:aa_1,fontWeight:'bold'}"
        :messageStyle="{fontSize:aa_1,fontWeight:'bold'}"
        :confirmButtonStyle="{marginTop:30,borderRadius: 25}"
        :cancelButtonStyle="{marginTop:30,borderRadius: 25}"
        :confirmButtonTextStyle="{fontSize:aa_1}"
        :cancelButtonTextStyle="{fontSize:aa_1}"   
    /> -->

    <status-bar background-color="white" bar-style="dark-content"/>
  </nb-container>

</template>

<script>
//import AwesomeAlert from 'react-native-awesome-alerts'
//import Modal from 'react-native-modal'
//import { BackHandler } from 'react-native' 
//import logo2 from "../../../assets/logo-final.png"
import resume_loading from "../../../assets/reddotloading.gif"
import moment from 'moment'
import { widthPercentageToDP as wp, 
         heightPercentageToDP as hp} from 'react-native-responsive-screen'

export default {
  components:{},
  data() {
    return {
      resume_loading,
      loading:false,
      stylesObj: {
        cardItemImage: {
          resizeMode: "cover",
        }
      },
      show:false,
      title:"FINALIZAR PEDIDO",
      message:"Deseja enviar seu pedido para o vendedor?",
      cancelText:"CANCELAR",
      confirmText:"CONFIRMAR",
      confirmButtonColor:"blue",
      cancelButtonColor:"red",
      aa_1:wp('5%'),
      wwp:wp,
      hhp:hp,
      logoSize:null
    }
  },
  
  props: {

    navigation: {
      type: Object
    }

  },

  created(){
    //this.setLogoSize()
  },
  
  computed: {

    fees(){
      return this.$store.state.fees.items 
    },

    totalFees(){
      let total = 0.0
      this.fees.forEach(function(fee){
        total = total + parseFloat(fee.fee)
      })
      return total
    },

    getTotalPlusFee(){
      let fees = 0.0
      let total = this.$store.state.cart.total
      this.fees.forEach(function(fee){
        fees = fees + parseFloat(fee.fee)
      })
      return total + fees
    },

    status(){
      return this.$store.state.orders.status
    },

    erro(){
      return this.$store.state.orders.erro
    },

    cart(){
      return this.$store.state.cart.items
    },

    address(){
      return this.$store.state.addresses.current_item
    },

    payment(){
      return this.$store.state.payment.item
    },

    session(){
      return this.$store.state.session.device_expo_install_id
    },

    finalizedOrders(){
      return this.$store.state.orders.finalized_orders
    },

    resume(){
      let data = moment().unix()
      let total = this.getTotal()
      let cart = this.getCart()
      let address = this.getAddress()
      let payment = this.getPayment()
      let session = this.getSession()
      return {cart,address,payment,total,session,data}
    },

  },

  methods:{

    goBack(){
      this.navigation.goBack()
    },

    getTotalFees(){
      return this.totalFees
    },

    getValorTotalById(id){
      return this.$store.getters['cart/getValorTotalById'](id) 
    },

    getCart(){
      return this.cart
    },

    getPayment(){
      return this.payment
    },

    getTotal(){
      return this.getTotalPlusFee
    },

    getAddress(){
      return this.address
    },

    getName(){
      return this.address.name 
    },

    getResume(){
      return this.resume
    },

    getSession(){
      return this.session
    },

    getStatus(){
      return this.status
    },

    getErro(){
      return this.erro
    },

    refresh(){
      this.navigation.navigate('Buy')
    },

    async finalizeOrder(){
      this.loading = true
      
      //processa orders
      await this.$store.dispatch('orders/setOrder',this.getResume())
      await this.$store.dispatch('orders/newOrder')
      
      //processa fees
      await this.$store.dispatch('fees/newFee',{"reference":this.finalizedOrders[0].reference,"fees":this.fees})
      
      if (this.status && !this.erro){
        this.navigation.navigate('ClientOrder')
        await this.$store.dispatch('orders/resetOrder')
        await this.$store.dispatch('cart/resetCart')
        await this.$store.dispatch('addresses/resetCurrentAddress')
        await this.$store.dispatch('payment/resetPayment')
      }else{
        this.navigation.navigate('Resume')
        await this.$store.dispatch('orders/resetStatus',false)
      }
    }

  }
};
</script>

<style>
.mb-15 {
  margin-bottom: 15;
}
.card-item-image {
  align-self: center;
  height: 150;
  margin-vertical: 5;
}
</style>
