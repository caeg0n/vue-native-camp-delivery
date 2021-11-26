<template>
  <view>
     <nb-card transparent>
        <nb-card-item :style="{marginTop:10}" button :onPress="()=>listClick()">
          <nb-body :style="{flexDirection:'row'}">
            <nb-icon :style="{color:mixinCSIconColor,marginTop:-5}" :name="mixinCSIcon" />
            <nb-text class="pedido-text" :style="{fontSize:rfp(3)}">PEDIDO #{{order_id}} - {{setDate(listOrders[0].created_at)}}</nb-text>
          </nb-body>
        </nb-card-item>
        <view :style="{flexDirection:'row'}">
        <nb-body :style="{flex:2,flexDirection:'column',alignItems:'baseline'}">
        <nb-list-item :style="{marginTop:-25}" :onPress="()=>listClick()" itemHeader first>
          <nb-text>{{getSalesNames() | nome_dos_vendedores}}</nb-text>
        </nb-list-item>
        <nb-list-item :style="{marginTop:-50}" itemHeader>
          <nb-text>{{mixinCSText}}</nb-text>
        </nb-list-item>
        <nb-list-item :style="{marginTop:-50}" itemHeader>
          <nb-text>{{orderAdress}}</nb-text>
        </nb-list-item>
        <nb-list-item :style="{marginTop:-50}" itemHeader>
          <nb-text note :style="{color:'green'}" >R${{orderTotal | dinheiro}}</nb-text> 
        </nb-list-item>
        </nb-body>

         <nb-body :style="{flex:1,flexDirection:'column',alignItems:'flex-start'}" >
          <nb-text :style="{borderBottomColor: 'black',borderBottomWidth: 1}" v-for="(order,index) in listOrders" :key="index" note>{{getProductName(listOrders[index].product_id)}}</nb-text>
        </nb-body>
        </view>
      
    </nb-card>
  </view>

  
</template>

<script>
//import { widthPercentageToDP as wp, 
//         heightPercentageToDP as hp} from 'react-native-responsive-screen'
import moment from 'moment'
import ControlStateMixins from "@/mixins/controlStateMixins"
import { RFPercentage, RFValue } from "react-native-responsive-fontsize"

export default {
  components:{RFPercentage, RFValue},
  mixins: [ControlStateMixins],  
  data() {
   return {
      rfp:RFPercentage,
      authInfo:'',
    }
  },

  props: {

    updateFromChild:{
      type:Function
    },

    products:{
      type:Array
    },

    navigation: {
      type: Object
    },

    listOrders:{
      type: Array,
      required: false
    },

    salesStates:{
      type: Object,
    },

    deliveryStates:{
      type: Object
    },

    organizations:{
      type:Array
    },

    auth:{
      type: Object,
      required: false 
    },

  },

  mounted(){
    let sS = this.listOrders[0].salesman_state
    let dS = this.listOrders[0].delivery_state
    this.setMixin(sS,dS)
  },

  computed:{

    orderTotal(){
      let total = 0
      let orders = this.listOrders
      for (let i=0;i<orders.length;i++){
        let order = orders[i]
        total += parseFloat(order.total)
      }
      return total
    },

    orderAdress(){
      return this.listOrders[0].address
    },

    order_id(){
      return this.listOrders[0].id
    },

  },

  methods: {

    getProductName(id){
      try {
        return this.products.find(x => x.id === id).name
      }catch (e) {
        return ''  
      }
    },

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

    setDate(created_at){
        let data = moment(created_at).format('DD/MM/YYYY')
        let hora = moment(created_at).format('HH:mm')
        return data+" - "+ hora
    },

    listClick(){
      this.navigation.navigate('Order',{listOrders:this.listOrders,pedido_id:this.order_id})
    },

    getSalerName(id){
      try {
        let a = this.products.find(x => x.id === id).organization_id 
        let b = this.organizations.find(x => x.id === a).name
        return b
      }catch (e) {
        return ''  
      }
    },

    getSalesNames(){
      let names = []
      for (let i=0;i<this.listOrders.length;i++){
        let name = this.getSalerName(this.listOrders[i].product_id)
        names.push(name)
      }
      let unique = [...new Set(names)]   
      return unique
    },

  },

  
};
</script>

<style>
.pedido-text{
  font-weight:bold;
  color:#000;
  margin-left:1.5%;
}
</style>

