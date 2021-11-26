<template>
  <nb-card transparent>
    <nb-card-item button :onPress="()=>this.props.showModal(product)">
      <nb-left>
        <nb-body>
          <nb-text class="y">{{product.name}}</nb-text>
          <nb-text note class="x">{{product.description}}</nb-text>
          <nb-text :style="{color:'green',fontWeight: 'bold'}">R${{parseFloat(product.price) | dinheiro}}</nb-text>
        </nb-body>
      </nb-left>
      <image :style="{marginTop:10,borderRadius:10,width: 90, height: 90}" :source="{uri: sourceImg}"/>
    </nb-card-item> 
    <!-- <product-detail :product="product"/> -->
    <nb-card-item>
    </nb-card-item>
  </nb-card>
</template>
<script>
  import ImageModal from 'react-native-image-modal'
  //import ProductDetail from '@/components/ProductDetail'

  export default {
    data: function() {
      return {
        sourceImg:this.getImg(),
        stylesObj: {
          cardItemImage: {
            resizeMode: "cover",
            width:'100%'
          }
        }
      }
    },
    props:{
      showModal:{
        type:Function
      },
      
      product:{
        type: Object,
        required: true
      }
    },
    components:{
      ImageModal
    },

    beforeMount() {
    },

    methods:{

      getImg(){
        return this.product.img
      }
  
    }
  };


</script>
<style>
.x{
  display: flex;
  width: 100%;
}
.y{
  display: flex;
  width: 100%;
}
 
</style>