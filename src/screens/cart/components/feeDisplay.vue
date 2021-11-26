<template>
  <nb-list>
    <nb-list-item>
      <nb-body>
        <nb-text v-for="fee in tempFees" :key="fee.organization_id" note :style="{fontSize:10}">Taxa de Entrega: {{organizationName(fee.organization_id)}} <nb-text note :style="{fontSize:10,color:'red'}"> R${{fee.fee}}0</nb-text>
        </nb-text>
      </nb-body>
    </nb-list-item>
  </nb-list>
</template>

<script>

import ControlComputedMixins from "@/mixins/controlComputedMixins"

export default {
  
  components:{},
  
  mixins: [ControlComputedMixins],  
  
  data() {

    return {
    }
  
  },

  props: {

    fees:{
      type: Array,
      required: true
    },

  },

  created(){
  },

  computed:{
    
    tempFees(){
      return this.fees
    },
    
  },

  methods: {

    organizationName(id){
      return this.organizations.find(x => x.id === id).name
    }
    
  },

  
};
</script>

<style>
</style>

