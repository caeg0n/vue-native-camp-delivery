<template>
	<!-- <nb-list-item :onPress="toggle" class="x" icon>
   	<nb-left>
   		<nb-radio :selected="isCurrentAddress()" />
   	</nb-left>
   	<nb-body>
   		<nb-text>{{address.name}}</nb-text>
     	<nb-text note>{{address.address}}</nb-text>
   	</nb-body>
  </nb-list-item> -->
</template>

<script>
export default {
  data() {
    return {
    }
  },

  created() {
    this.isCurrentAddress()
  },

  computed:{

    currentAddress(){
      return this.$store.state.addresses.current_item
    }

  },
  props:{
    address:{
      type: Object,
      required: true
    },
  },
  methods: {
    isCurrentAddress(){
      if (this.currentAddress.id == this.address.id){
        return true
      }else{
        return false
      }
    },
    toggle() {
      this.radio = true
      this.$store.dispatch('addresses/setCurrentAddress',this.address)
    },
  }
};
</script>

<style>
.x{
  padding-top: 10px;
}
</style>

