<template>
    <root>
        <app-navigation></app-navigation>
        <status-bar background-color="#580C1A" bar-style="dark-content"/>
    </root>
</template>

<script>
import {
  createAppContainer,
  createStackNavigator,
  //createDrawerNavigator,
} from "vue-native-router"
import { Root } from "native-base"
import HomeScreen from "@/screens/home/index.vue"
import BuyScreen from "@/screens/buy/index.vue"
import CartScreen from "@/screens/cart/index.vue"
import OrderScreen from "@/screens/order/index.vue"
import AdressScreen from "@/screens/adress/index.vue"
import PaymentScreen from "@/screens/payment/index.vue"
import ResumeScreen from "@/screens/resume/index.vue"
import ClientOrderScreen from "@/screens/clientOrder/index.vue"
import LandingScreen from "@/screens/landing/index.vue"
import SearchScreen from "@/screens/search/index.js"


const AppNavigation = createAppContainer(
    createStackNavigator(
    {
        Home: {screen: HomeScreen},
        Buy:  {screen: BuyScreen},
        Cart: {screen: CartScreen},
        Order: {screen: OrderScreen},
        Adress: {screen:AdressScreen},
        Payment: {screen:PaymentScreen},
        Resume: {screen:ResumeScreen},
        ClientOrder:{screen:ClientOrderScreen},
        Landing:{screen:LandingScreen},
        Search:{screen:SearchScreen},
    },
    {
        initialRouteName: "Home",
        headerMode: "none"
    })
)
export default{
    components:{
        AppNavigation, Root
    },
};
</script>

