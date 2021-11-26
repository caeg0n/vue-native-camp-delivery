<template>
    
    <!--
      <SafeAreaView :style="{ flex: 1}">
        <Container
          stickyHeaderIndices="[0]" 
          :showsVerticalScrollIndicator="false"
          bounces="false"
          refreshing="false">
    -->    

    <SafeAreaView :style="{ flex: 1 }">

      <SafeAreaView :style="{ flex: 1, alignItems:'center' }">
      <image :style="{width: 150, height:150,marginTop:250}" 
             :source="resumeLoading" 
             v-if="!loadingState" 
      />
      </SafeAreaView>
  
      <Container :style="stylesObj.containerPrincipal" :showsVerticalScrollIndicator="false" bounces="false" refreshing="false">

        <ShippingAddress>
          <View>
            <Typography :color="'red'" uppercase>Minha Localização</Typography>
            <Typography :display="'inline-block'" :size="'13'" :color="'#111'">{{location | gps_address}} </Typography>
          </View>
          <TouchableOpacity :onPress="()=>this.timerLock = false">
            <QRCodeIcon :source="location_ico" />
          </TouchableOpacity>
        </ShippingAddress>
       
        <!-- <StickyHeader>
          <FakeSearchField :onPress="()=>x()">
            <Icon name="search" :size="32" :color="'#e81010'" />
            <FakePlaceholder :size="18" :color="'#999'">Comércio e produtos</FakePlaceholder>
          </FakeSearchField> -->
          <!-- <Button :text="'Filtros'" :textColor="'#e81010'" /> -->
        <!-- </StickyHeader> -->

        <Section noMargin>
          <!-- <TouchableOpacity :onPress="()=>x()">
            <Discount title="Cupom de R$10" desc="Válido até 26/08"  />
          </TouchableOpacity> -->
          <BannerSlider horizontal :data="lst" />
        </Section>

        <Section noMargin>
          <SingleBanner bannerUrl="https://res.cloudinary.com/campinapolis-com/image/upload/v1616268792/camp-delivery/promos/promo_acai_d0_ninho.png" :nav="this.props.navigation" />
        </Section>

        <!-- 
        <Section
          title="70% off + taxa na faixa"
          subTitle="Pratos com frete grátis"
          \iconUrl="https://cdn3.iconfinder.com/data/icons/valentine-2065/1024/gift-512.png"
          buttonAction="null"
        >
        <PromoSlider :data="promos" />
        </Section> 
        -->
        
        <Section title="Categorias" noMargin>
          <CategorySlider :data="categories" :nav="this.props.navigation" />
        </Section>

        <Section title="Vote nos Favoritos" >
          <RecentRestaurantSlider :data="topRestaurants" 
                                  :nav="this.props.navigation" 
                                  :ranking="(data,item)=>ranking(data,item)"
                                                        
          />
        </Section>

        <!-- 
        <Section> 
          <SingleBanner bannerUrl="https://dicasdalarica.files.wordpress.com/2016/03/00-banner-club-house-mc-donalds.jpg"/>
          <SingleBanner bannerUrl="https://res.cloudinary.com/campinapolis-com/image/upload/v1616268792/camp-delivery/promos/promo_acai_d0_ninho.png"/>
        </Section> 
        -->

        <Section title="Melhores da Cidade">
          <TopRestaurantSlider :data="topRestaurants" 
                               :nav="this.props.navigation"
                                                      
          />
        </Section>

        <Section title="Todos">
          <RestaurantList :data="restaurantList" 
                          :nav="this.props.navigation"  
                                               
          />
        </Section>

      </Container>
     
      <footer-navigation  v-if="loadingState"  :navigation="this.props.navigation"></footer-navigation>

      <dialog :dialogStyle="{marginLeft:-25,width:'115%'}" :visible="locationDialogState" :animationType="'fade'">
        <view>
          <address v-for="address in addresses" :address="address" :key="address.id"  :style="{marginBottom:15}" />
          <view :style="{marginTop:20,flexDirection:'row'}">
            <nb-button iconLeft rounded bordered :style="{borderColor:'red',marginLeft:15}">        
              <nb-text :style="{color:'black'}">Selecionar</nb-text>
            </nb-button>
        
            <nb-button iconLeft bordered rounded danger :style="{borderColor:'red',marginLeft:20}">        
              <nb-icon active type="Entypo" name="circle-with-plus" />
              <nb-text :style="{color:'black'}">Adicionar</nb-text>
            </nb-button>
          </view>
        </view>
      </dialog>

      <status-bar background-color="white" bar-style="dark-content"/>

    </SafeAreaView>
    
    
    
</template>


<script>
//import { View, SafeAreaView, TouchableOpacity } from 'react-native'
//import PropTypes from 'prop-types'
//import Location from '../../../assets/location.png'
//import data from '../../../data.json'
import React from "react"
import Vue from "vue-native-core"
import { SafeAreaView, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import FooterNavigation from "@/components/FooterNavigation.vue"
import { Dialog } from 'react-native-simple-dialogs'
import * as Geolocation from "expo-location"
import * as Permissions from "expo-permissions"
import {
  Container, StickyHeader, ShippingAddress, QRCodeIcon, FakeSearchField,
  FakePlaceholder
} from './styles'
import Typography from '@/components/Common/Typography'
import Section from '@/components/Common/Section'
import Button from '@/components/Common/Button'
import BannerSlider from '@/components/BannerSlider'
import PromoSlider from '@/components/PromoSlider'
import CategorySlider from '@/components/CategorySlider'
import RecentRestaurantSlider from '@/components/RecentRestaurantSlider'
import TopRestaurantSlider from '@/components/TopRestaurantSlider'
import RestaurantList from '@/components/RestaurantList'
import SingleBanner from '@/components/SingleBanner'
import Discount from '@/components/Discount'
import Address from "@/screens/adress/components/address"
import location_ico from "../../../assets/location.png"
import resumeLoading from "../../../assets/reddotloading.gif"

export default {
  components:{
    BannerSlider,Section,SafeAreaView,Container,Dialog,Address,
    ShippingAddress,TouchableOpacity,Typography,QRCodeIcon,FooterNavigation,
    StickyHeader,FakeSearchField,Icon,FakePlaceholder,Button,Discount,RestaurantList,
    PromoSlider,CategorySlider,RecentRestaurantSlider,SingleBanner,TopRestaurantSlider
  },
  data() {
    return {
      stylesObj:{
        containerPrincipal:{
          display:'none'
        }
      },
      resumeLoading,
      loadingState:false,
      timerLock:false,
      permissionStatus:false,
      
      //loadingCategories:false,
      //loadingFavoritos:false,
      //loadingMelhores:false,
      //loadingTodos:false,
      
      promos:[],
      topRestaurants:[],
      restaurantList:[],
      locationDialogState:false,
      
      location_ico,
      lst:[{
      "id": 4,
      "title": "Taxa na faixa pra você",
      "image": "https://images.rappi.com.br/mobile_promotions/store_5478.png?d=400x400"
    },
    {
      "id": 2,
      "title": "Lorem ipsum dolor sit amet",
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_1L6Ge464KfSWTMi88SI6aKU4KUEFoSWlreeR7S7k09Te-y-_7A"
    },
    {
      "id": 3,
      "title": "Taxa na faixa pra você",
      "image": "http://dongiuseppepizzabar.com.br/wp-content/uploads/2019/02/Banner-Pizza-banner-site.jpg"
    }],
    }
  },

  async created(){
    this.executeTime()
    this.processRestaurantListData(await this.$store.dispatch('organizations/fetchOrganizationsCategory'))
    this.stylesObj.containerPrincipal = null
    this.loadingState = true 
  },

  props:{
    navigation: {
      type: Object
    }
  },

  computed:{

    location(){
      let result = "Aguardando..."
      let geo = this.$store.state.geo.item[0]
      if (geo != null){
        if (Object.keys(geo.formatted_address[0]).length == 7){
          return geo.formatted_address[0].street
        }
        if (Object.keys(geo.formatted_address[0]).length == 1){
          this.timerLock = true
          return geo.formatted_address
        } 
      }else{
        return result
      }  
    },

    rankingItems(){
    if (this.$store.state.ranking.items.length > 0)
      return this.$store.state.ranking.items
    else
      return []
    },

    categories(){
      var result = []
      let categories = this.$store.state.categories.items
      categories.forEach(el =>{
        if (el["image_url"]){
          let temp = {"id": el["id"],"organization_id":el["organization_id"],"title": el["name"],"imageUrl": el["image_url"]}
          result.push(temp)
        }
      })
      return result
    },

    organizations(){
      let resp = []
      let organizations = this.$store.state.organizations.items
      for (let i in organizations){
        if (organizations[i].organization_type != 'deliveryman' &&
          organizations[i].organization_type != 'admin' ){
          resp.push(organizations[i])
        }
      }
      return resp
    },

    addresses(){
      return this.$store.state.addresses.items
    },
    
  },

  methods: {

    executeTime() {
      setInterval(() => this.getLocation(),5000)
    },

    //changeLoading(section){
      //if(section == 'categorias'){
      //  this.loadingCategorias = true
      //}
      //if (section == 'favoritos'){
      //  this.loadingFavoritos = true
      //}
      //if (section == 'melhores'){
      //  this.loadingMelhores = true
      //}
      //if (section == 'todos'){
      //  this.loadingTodos = true
      //}
      //if (this.loadingCategorias){
      //  this.loadingState = false
      //}
    //},

    getReverseGeo(location){
      this.$store.dispatch('geo/fetchLocationByCoordinates',location)
    },

    roundUp(number,precision){
      var factor = Math.pow(10, precision)
      var tempNumber = number * factor
      var roundedTempNumber = Math.round(tempNumber)
      return roundedTempNumber / factor
    },

    async ranking(value,item){
      let organization_id = item["id"]
      let stars = value
      let hearts = 0
      data = {organization_id,stars,hearts}
      await this.$store.dispatch('ranking/updateRanking',data)      
    },

    async getLocation() {
      if (this.timerLock == false){
        if (this.permissionStatus == false){
          Permissions.askAsync(Permissions.LOCATION).then(status => {  
            if (status.granted) {
              this.permissionStatus = true
            }
          }).catch(err => {})
       }else{
          Geolocation.getCurrentPositionAsync({}).then(location => {
            let latitude = ""
            let longitude = ""
            latitude = location.coords.latitude
            longitude = location.coords.longitude
            Geolocation.reverseGeocodeAsync({latitude,longitude}).then(response => {
              this.$store.dispatch('geo/setTempLocation',response)
              this.getReverseGeo({longitude,latitude})
            })
          }).catch(err =>{})
        }
      }
    },
  
    getHeadingCompForTab1: function() {
      return (
        <TabHeading>
          {/* <Icon2 name="camera" /> */}
          <Text>Camera</Text>
        </TabHeading>
      );
    },
    
    getHeadingCompForTab2: function() {
      return (
        <TabHeading>
          <Text>No Icon</Text>
        </TabHeading>
      );
    },

    async processRestaurantListData(organizationsCategory){
      var arr = []
      var rankingItems = this.rankingItems
      var organizations = this.organizations
      var t = this
      let comercios = Vue.lodash.groupBy(organizationsCategory, 'tag')
      Vue.lodash.forEach(Object.keys(comercios), function(categoria) {
        let resp = comercios[categoria]
        let stars = 0.0
        let star_votes = 1
        let star_indice = "10"
        Vue.lodash.forEach(resp, function(organization) {
          let obj = organizations.find(obj => obj.id == organization.organization_id)
          let id = obj.id
          let ranking = rankingItems.find(item => item.organization_id == id)
          if (ranking){
            stars = ranking.stars
            star_votes = ranking.star_votes
            star_indice = t.roundUp(stars/star_votes,1)*2
            if (Number.isInteger(star_indice)) {
              star_indice = star_indice + ".0"
              if (star_indice == 10.0)
                star_indice = 10
            }
          }
          const result = {
            "id": obj.id,
            "title": obj.name,
            "logo": obj.logo,
            "type": obj.category_base,
            "delivery_fee": obj.delivery_fee,
            "minimal_buy_price": obj.minimal_buy_price,
            "stars": star_indice
          }
          arr.push(result)
        })
      })
      arr = Vue.lodash.uniqBy(arr, 'id')
      this.restaurantList = arr
      this.topRestaurants = arr
    }

  }
};

</script>