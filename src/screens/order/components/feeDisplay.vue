<template>
  <nb-list>
    <nb-list-item>
      <nb-body v-if="fee != null">
        <nb-text :key="fee.organization_id" note :style="{fontSize:10}">Taxa de Entrega: {{organizationName(fee.organization_id)}} <nb-text note :style="{fontSize:10,color:'red'}"> R${{fee.value}}0</nb-text>
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
      fee:null
    }
  
  },

  props: {

    fees:{
      type: Array,
      required: true
    },

    nav:{
      type: Object,
      required: true
    }

  },

  created() {
    let order = this.nav.state.params.listOrders
    for (var i in this.fees) {
      let organization_id = this.fees[i].organization_id
      if (organization_id == order[0].organization_id){
        this.fee = this.fees[i]
      }
    }
  },

  computed:{
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

