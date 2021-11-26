<template>
  <nb-container>
    <image-background :source="{uri:organizationCover}">
    <nb-header :style="{height:150,backgroundColor:'transparent'}">
      <nb-button  bordered :onPress="()=>openSheet()" :style="{marginLeft:wwp('-70%'),borderColor: '#B0B0B000' }">
        <nb-thumbnail :style="{borderWidth:5,borderColor:'white'}" large :source="{uri:organizationLogo}"/>
      </nb-button>
      <!-- <nb-text :style="{fontSize:20,marginLeft:10,borderRadius:5,borderWidth:3,fontWeight:'bold',borderColor:'white',marginTop:30,backgroundColor:'#d6d6d6',height:25}">Tabacaria Aguiar</nb-text> -->
    </nb-header>
  </image-background>
    
  <nb-header searchBar :style="{backgroundColor:'white'}">
    <nb-item :onPress="()=>openSheet()" :style="{borderColor:'red',borderRadius:10,backgroundColor:'#d1d1d1'}">
      <nb-icon active name="chevron-with-circle-down" type="Entypo"/>
      <nb-input :style="{marginLeft:-8,marginTop:4,fontSize:organizationFS}" :placeholder="organizationName" :editable="false"/>
    </nb-item>

    <nb-item :style="{borderColor:'black',borderRadius:10,backgroundColor:'#d6d6d6'}">
      <nb-icon active name="search"/>
      <nb-input :style="{fontSize:organizationFS}" v-model="searchText" placeholder="Procurar Produto" :onChangeText="()=>filterProducts()" />
    </nb-item>
  </nb-header>

    <nb-content padder>
      
      <nb-container v-if="spinner" :style="{marginTop:80}" class="spinner-container">
        <nb-spinner color="red" />
      </nb-container>

      <view class="no-product" v-if="showMessage">
        <image class="empty-bag" :source="emptyBag" />
        <text>NENHUM PRODUTO ENCONTRADO</text>
        <nb-button class="button-entregador" rounded block :onPress="()=>ofOpenModal()">
          <nb-text class="button-entregador-text">SOU COMERCIANTE E QUERO VENDER AQUI</nb-text>
        </nb-button>
      </view>

      <view class="no-product" v-if="closedState && !showMessage">
        <image class="empty-bag" :source="emptyBag" />
        <text>OOOPS! O ESTABELECIMENTO ESTÁ FECHADO</text>
        <text>RETORNAMOS EM BREVE</text>
        <!-- <nb-button class="button-entregador" rounded block :onPress="()=>ofOpenModal()"> -->
        <!-- <nb-text class="button-entregador-text">SOU COMERCIANTE E QUERO VENDER AQUI</nb-text> -->
        <!-- </nb-button> -->
      </view>

    
      <nb-content v-if="!spinner">
        <ProductCard v-for="product in products" :product="product" 
                                                 :key="product.id"
                                                 :showModal="showModal"
                                                 :style="{marginTop:-10,marginBottom:-10}"/>
      </nb-content>
    
    </nb-content>

    <sheet  v-if="sheetState"
            :getSheetState="sheetState" 
            :setSheetState="(v)=>setSheetState(v)"
            :comercios="organizations"
            :changeOrganization="(value)=>changeOrganization(value)"
    />  
    
    <footer-navigation :refresh="refresh" :navigation="this.props.navigation"></footer-navigation>

  
    <modal :isVisible="modalVisible" :transparent="true" 
                                     :onBackdropPress="()=>closeModal()"
                                     :animationIn="'slideInLeft'"
                                     :hardwareAccelerated="true"
                                     :backdropOpacity="0.7"
                                     :animationOut="'slideOutRight'"
                                     :animationInTiming="500"
                                     :animationOutTiming="500"
                                     :useNativeDriver="true"
                                     >
      <nb-container :style="{maxHeight:maxHeight(),overflow:'hidden',borderRadius:10,backgroundColor: 'white'}">
        <nb-card transparent>
          <nb-card-item button :onPress="null">
            <nb-left>
              <nb-body>
                <nb-text>{{modalProduct.name}}</nb-text>
                <nb-text note>{{modalProduct.description}}</nb-text>
                <nb-text :style="{color:'green',fontWeight: 'bold'}">R${{parseFloat(modalProduct.price) | dinheiro}}</nb-text>
              </nb-body>
            </nb-left>
            <image :style="{borderRadius:10,width: 90, height: 100}" :source="{uri: sourceImg}"/>
          </nb-card-item>
          <product-detail :product="modalProduct"
                          :closeModal="closeModal"
          />
        </nb-card>
      </nb-container>
    </modal>
    <status-bar background-color="white" bar-style="dark-content"/>
    <organizationForm :modalState="ofModalState" :closeModal="ofCloseModal"/>
    </nb-container>
  </nb-container>
</template>

<script>
//import Vue from "vue-native-core"
//import { Dimensions, Platform,TouchableOpacity } from "react-native"
//import { Picker } from "@react-native-community/datetimepicker"
//import { ActionSheet } from "native-base"
//import { BackHandler } from "react-native"
//import { NavigationEvents } from 'react-navigation'
//import styles from '@/styles'
import { Notifications } from 'expo'
import ProductCard from "@/components/ProductCard.vue"
import FooterNavigation from "@/components/FooterNavigation.vue"
import { widthPercentageToDP as wp, 
         heightPercentageToDP as hp} from 'react-native-responsive-screen'
import logo from "../../../assets/logo-final.png"
import emptyBag from "../../../assets/empty-bag.gif"
import Constants from 'expo-constants'
import Sheet from "@/screens/landing/components/sheet"
import ImageModal from 'react-native-image-modal'
import Modal from 'react-native-modal'
import ProductDetail from '@/components/ProductDetail'
import OrganizationForm from "@/components/OrganizationForm.vue"


export default {
  
  components:{
    ProductCard,FooterNavigation,Sheet,ImageModal,Modal,ProductDetail,OrganizationForm
  },

  props: {
    navigation: {
      type: Object
    }
  },

  data() {

    return {
      emptyBag,
      modalState:false,
      ofModalState:false,
      organizationLogo:"",
      organizationCover:"",
      organizationName:"",
      organizationFS:0,
      products:[],
      modalVisible:false,
      modalProduct:[],
      sourceImg:"",
      searchText:'',
      spinner:true,
      showMessage:false,
      logo,
      goback:false,
      wwp:wp,
      hhp:hp,
      sheetState:false
    }

  },

  async created() {
    let landing_click_id = 0
    let params = this.navigation.state.params 
    if (params != undefined){
      if (params.id > 0 && params.action != "category"){
        landing_click_id = params.id
        //await this.$store.dispatch('organizations/fetchOrganizations')
        this.setInitialOrganization(landing_click_id,false)
      }else{
        if (params.action == "category"){
          await this.$store.dispatch('categories/fetchOrganizationsByCategory',params.item)
          this.setInitialOrganization(null,true)
        }
      }
    }else{
      //await this.$store.dispatch('organizations/fetchOrganizations')
      this.setInitialOrganization(null,false)
    }
    this.searchProducts(false)
    this.setToken()
  },

  computed: {

    closedState(){
      //alert(this.navigation.state.params)
      //let params = this.navigation.state.params
      //if (params != undefined){
        let id = this.$store.state.session.selectedOrganization
        let organization = this.organizations.find(x => x.id === id)
        if (organization){
          return !organization.open
        }
      //}
    },

    selected(){
      return this.$store.state.session.selectedOrganization
    },

    organizations(){
      let organizations = undefined
      let resp = []
      let params = this.navigation.state.params 
      if (params != undefined){
        if (params.id > 0 && params.action != "category"){
          organizations = this.$store.state.organizations.items
        }else{
          if (params.action == "category")
            organizations = this.$store.state.categories.organizations            
        }
      }else{
        organizations = this.$store.state.organizations.items
      }
      for (let i in organizations){
        if (organizations[i].organization_type != 'deliveryman' &&
            organizations[i].organization_type != 'admin' ){
          resp.push(organizations[i])
        }
      }
      return resp
    },
    
  },


  methods:{

    openModal(){
      this.modalState = true
    },

    ofOpenModal(){
      this.ofModalState = true
    },

    closeModal(){
      this.modalState = false
    },

    ofCloseModal(){
      this.ofModalState = false
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

    setInitialOrganization(landing_click_id){
      let organizations = this.organizations
      let result = organizations.map(e=>(e.id))
      const organizationId = result[Math.floor(Math.random() * result.length)]
      if (landing_click_id > 0){
        this.changeOrganization(landing_click_id)  
      }else{
        this.changeOrganization(organizationId)
      }
    },

    calculateFS(s){
      this.organizationFS = this.wwp('3%')
      if (s.length < 18)
        this.organizationFS = this.wwp('4%')
      if (s.length == 20)
        this.organizationFS = this.wwp('3%')
      if (s.length == 23)
        this.organizationFS = this.wwp('4%')
    },

    closeModal(){
      this.modalProduct = []
      this.sourceImg = ""
      this.modalVisible = false
    },

    showModal(product){
      this.modalProduct = product
      this.sourceImg = product.img
      this.modalVisible = true
    },

    openSheet(){
      if (this.sheetState == false)
        this.sheetState = true
    },

    setSheetState(value){
      this.sheetState = value
    },

    async setToken(){
      let token = null
      if (Constants.isDevice){
        token = await Notifications.getExpoPushTokenAsync()
        this.$store.dispatch('session/addExpoNotificationToken',token)
        await this.$store.dispatch('session/saveToken')       
      }
    },

    async noOneProduct(){
      if (Object.keys(this.products).length === 0){
        let res  = null
        let id = this.$store.state.session.selectedOrganization
        res = await this.$store.dispatch('products/fetchProductLength',id)
        this.spinner = false
        if (res > 0){
          this.showMessage = false
        }else{
          this.showMessage = true
        }        
      }else{
        this.showMessage = false
        this.spinner = false
      }
    },

    filterProducts(){
      if (this.searchText.length>0){
        this.searchProducts(true)
      }else{
        this.searchProducts(false)
      }
    },

    async searchProducts(filtered){
      let id = this.$store.state.session.selectedOrganization
      this.spinner = true
      await this.$store.dispatch('organizations/fetchOrganizations')
      await this.$store.dispatch('products/fetchActiveProducts')
      if (filtered == true){
        await this.$store.dispatch('products/getFilteredProducts',this.searchText)
        this.products = this.$store.state.products.filteredProducts
        if (Object.keys(this.products).length>0){
          this.spinner = false
          this.showMessage = false
        }else{
          this.spinner = false
          this.showMessage = true
        }
      }else{
        await this.$store.dispatch('products/getProductsById',id)
        this.products = this.$store.state.products.searchedProducts
        this.noOneProduct()
      }
    },

    refresh(){
      this.goback = !this.goback
    },
      
    async changeOrganization(value) {
      let organization = undefined
      this.$store.dispatch('session/setSelectedOrganization',value)
      organization = this.organizations.find(x => x.id === value)
      this.calculateFS(organization.name)
      this.organizationLogo = organization.logo
      this.organizationCover = organization.cover
      this.organizationName = organization.name
      this.searchProducts(false)
    },
  
  },  

};
</script>

<style>

.empty-bag{
  margin-top:-10%;
  width:70%;
  height:150px;
}

.no-product{
  width:100%;
  height:100%;
  align-items:center;
  font-weight:bold;
  background-color:#fff;
  margin-top:50;
}

.button-entregador{
  margin-top:5%;     
  font-weight:bold;
  width:80%;
  align-self:center;
  background-color:#FD0303;
}
.button-entregador-text{
  font-size:10;
  color:#FFF;
  font-weight:bold;
}

.spinner-container{
  display: flex;
}

</style>