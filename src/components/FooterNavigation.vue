<template >
    <nb-footer :style="{backgroundColor: '#fff',
                        width:'100.5%',
                        flexDirection:'row',
                        justifyContent: 'space-around',
                        borderTopColor: '#d7d7d7',
                        borderWidth: 1,
                        paddingTop:8,
                        paddingBotton:32,
                        marginLeft:-1
                      }">
      
      <nb-footer-tab :style="{width:80,
                              height:40,
                              alignItems:'center',
                              backgroundColor:'white'
                            }">
        <nb-button :active="null" :onPress="toggleTab1">
          <nb-icon type="Feather" name="home" :active="tab1" :style="{color:'red',width:24,
                                                        height:24,
                                                        marginBottom:8
                                                        }" 
          />
          <nb-text :style="{color:'black'}">Inicio</nb-text>
        </nb-button>

        <nb-button :active="null" :onPress="toggleTab4">
          <nb-icon type="Entypo" name="shop" :active="tab4" :style="{color:'red',width:24,
                                                        height:24,
                                                        marginBottom:8
                                                        }" 
          />
          <nb-text :style="{fontSize:rfp(1.5),color:'black'}">Comprar</nb-text>
        </nb-button>


        <!-- <nb-button :active="tab2" :onPress="toggleTab2">
          <nb-icon name="search" :active="tab2" :style="{color:'black',width:24,
                                                        height:24,
                                                        marginBottom:8
                                                        }"  />
          <nb-text :style="{color:'black'}">Busca</nb-text>
        </nb-button> -->


        <nb-button :active="tab2" :onPress="toggleTab2">
          <nb-icon type="MaterialCommunityIcons" name="cart-outline" :active="tab2" :style="{color:'red',width:24,height:24,marginBottom:8}"  />
          <nb-text :style="{fontSize:rfp(1.5),color:'black'}">Carrinho</nb-text>
        </nb-button>

        <nb-button :active="tab3" :onPress="toggleTab3">
          <nb-icon type="Entypo" name="list" :active="tab3" :style="{color:'red',width:24,
                                                        height:24,
                                                        marginBottom:8
                                                        }" />
          <nb-text :style="{color:'black'}">Pedidos</nb-text>
        </nb-button>
        
      </nb-footer-tab>
    </nb-footer>
</template>

<script>
//import HomeIcon from '../../assets/home.png';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export default {
  components:{
    RFPercentage, RFValue
  },
  props: {
    navigation: {
      type: Object
    },
    refresh: {
      type: Function
    }
  },
  data() {
    return {
      rfp:RFPercentage,
      tab1: true,
      tab2: false,
      tab3: false,
      tab4: false
    }
  },
  methods: {
    toggleTab1() {
      this.navigation.navigate('Landing')
    },
    toggleTab2() {
      this.navigation.navigate('Cart',{onGoBack: this.refresh})
    },
    toggleTab3() {
      this.navigation.navigate('ClientOrder')
    },
    toggleTab4() {
      this.navigation.navigate('Buy')
    }
  }
};
</script>

<style>
</style>