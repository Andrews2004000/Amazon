<template>
   <v-app>
     <v-content>
       <router-view></router-view>
     </v-content>
   </v-app>
</template>
<script>
import { Vue, Component } from "vue-property-decorator";
@Component
export default class AnonymousComponent extends Vue {
  created() {
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


