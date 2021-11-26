<template>
  <nb-container>

    <nb-header :style="{backgroundColor:'white',flexDirection:'column-reverse',alignItems:'center'}">
      <nb-body>
        <nb-text :style="{marginTop:-15,color:'black', fontWeight:'bold'}">PEDIDO #{{pedido_id}}</nb-text>
      </nb-body>
       <nb-right></nb-right>
    </nb-header>

    <nb-content padder>
      <nb-card>

        <nb-card-item :style="{flexDirection:'column-reverse',alignItems:'center'}">
        <nb-icon :style="{color:mixinCSIconColor,marginTop:-5}" :name="mixinCSIcon" />  
          <nb-card-item>
            <nb-text>{{mixinCSText}}</nb-text>
        </nb-card-item>
        </nb-card-item>

        <nb-card-item v-for="(order,index) in listOrders" :key="index" >
          <nb-left>
            <nb-thumbnail :source="{uri: getProduct(order.product_id).img}"></nb-thumbnail>
          </nb-left>
          <nb-body :style="{marginLeft:-40}">
              <nb-text>{{getProduct(order.product_id).name}}</nb-text>
              <nb-text note>{{order.amount | unidades}}</nb-text>
            </nb-body>
          <nb-right>
            <nb-text>R${{parseFloat(order.total) | dinheiro}}</nb-text>
          </nb-right>
        </nb-card-item>
        
        <nb-card-item>
          <nb-left>
            <nb-text :style="{fontWeight: 'bold'}">DATA</nb-text>
          </nb-left>
          <nb-text :style="{fontWeight: 'bold'}">{{setDate(listOrders[0].created_at)}}</nb-text>
         </nb-card-item>
         <fee-display :fees="fees" :nav="navigation" :key="Math.random()"></fee-display>
        <nb-card-item>
          <nb-left>
            <nb-text :style="{fontWeight: 'bold'}">TOTAL</nb-text>
          </nb-left>
          <nb-right>
            <nb-text :style="{fontWeight: 'bold'}">R${{orderTotal | dinheiro}}</nb-text>
            <!-- <nb-text :style="{fontWeight: 'bold'}">TOTAL R${{totalPricePlusFees() | dinheiro}}</nb-text> -->
          </nb-right>
        </nb-card-item>
      </nb-card>
    </nb-content>

    <nb-footer>
      <nb-footer-tab>
        <nb-button :onPress="() => goBack()" active :style="{backgroundColor:'red'}">
          <nb-text>SAIR</nb-text>
        </nb-button>
      </nb-footer-tab>
    </nb-footer>
    <status-bar background-color="white" bar-style="dark-content"/>
  </nb-container>
</template>

<script>
import moment from 'moment'
import logo2 from "../../../assets/logo-final.png"
import { widthPercentageToDP as wp, 
         heightPercentageToDP as hp} from 'react-native-responsive-screen'
import ControlStateMixins from "@/mixins/controlStateMixins"
import FeeDisplay from "./components/feeDisplay.vue"

export default {
  components:{ FeeDisplay },
  mixins: [ControlStateMixins], 

  data() {

    return {
      key:0,
      logo2,wwp:wp,hhp:hp,
      stylesObj: {
        btnContainer: {
          backgroundColor: "#6faf98",
          alignSelf: "center"
        }
      },
      iconStatus:'alarm',
      iconStatusColor:'grey',
      statusText:'Aguardando Atendimento',
      logoSize:null
    }

  },

  props: {

    navigation: {
      type: Object
    },

  },

  mounted(){

    let sS = this.listOrders[0].salesman_state
    let dS = this.listOrders[0].delivery_state
    this.setMixin(sS,dS)

  },

  async created(){
    let order_reference = this.listOrders[0].reference
    await this.$store.dispatch('fees/fetchFeesByReference',order_reference)
  },

  computed:{

    fees(){
      return this.$store.state.fees.items
    },

    pedido_id(){
      return this.navigation.state.params.pedido_id
    },

    orderTotal(){
      let fees = 0.0
      let total = 0
      let orders = this.listOrders
      for (let i=0;i<orders.length;i++){
        let order = orders[i]
        total += parseFloat(order.total)
      }
      this.fees.forEach(function(fee){
        fees += parseFloat(fee.value)
      })
      return total + fees
    },

    products(){
        return this.$store.state.products.items
    },

    listOrders(){
      return this.navigation.state.params.listOrders
    }

  },

  methods: {

    setMixin(saleState,deliveryState){
      let arr1 = ['processing','inprogress','delivering']
      this.setMixinState(saleState,'waiting','alarm','grey',"aguardando atendimento",this.WhiteLoader)
      this.setMixinState(saleState,'processing','alarm','#FF9501',"Em Andamento",this.OrangeLoader)
      this.setMixinState(saleState,'inprogress','alarm','blue',"Aguardando Entregador",this.BlueLoader)
      this.setMixinState(saleState,'delivering','bicycle','green',"Saiu Para Entrega",this.GreenLoader2)
      this.setMixinState(saleState,'fail','bicycle','red',"A entrega falhou!",this.RedLoader)
      this.setMixinState(saleState,'canceled','close','red',"Entrega Cancelada",this.RedLoader2)
      this.setMixinState(saleState,'finished','star','green',"Entregue",this.GreenLoader)
      this.setMixinState(deliveryState,'camp_in_route','bicycle','green',"Entrega a Caminho",this.GreenLoader2)
      this.setMixinState3(saleState,arr1,deliveryState,'camp_fail',
                          'bicycle','red',"A entrega falhou!",this.RedLoader)
      this.setMixinState3(saleState,arr1,deliveryState,'camp_canceled',
                          'close','red',"Entrega cancelada!",this.RedLoader2)
      this.setMixinState3(saleState,arr1,deliveryState,'camp_finished',
                          'star','green',"Entregue",this.GreenLoader)
    },

    goBack(){
      this.navigation.goBack()
    },

    setDate(created_at){
        let data = moment(created_at).format('DD/MM/YYYY')
        let hora = moment(created_at).format('hh:mm')
        return data+"-"+hora
    },

    getProduct(id){
      return this.products.find(x => x.id === id)
    },

    goToHome() {
      this.navigation.navigate('Home')
    },
    
  }
};
</script>

<style>
</style>
