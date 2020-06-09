<template>
   <v-app>
     <v-content>
       <router-view></router-view>
     </v-content>
   </v-app>
</template>
<script>
export default {
  created(){
    this.$store.dispatch("load")
  }
}
</script>

<!--<script lang="ts">

 
        
 
import Vue from 'vue';



export default Vue.extend({
  name: 'App',
 
});
</script>-->


