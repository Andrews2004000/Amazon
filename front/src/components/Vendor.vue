<template>
<main>


    <div>
        <div>
           <v-app-bar app class="indigo nav">
            <span class="fa fa-times cross" router-view to="/"></span>
         
           <v-toolbar-title>
               <span class="rapha white--text">All Your Products</span>
              
               </v-toolbar-title>
               <v-spacer></v-spacer>
             <v-btn class="orange text" @click="changeAccounDetails">Save</v-btn>

        </v-app-bar>
      

        
        <v-card class="pa-5 elevation-20 card" width="700"  >
    <v-container>
        <v-row>
        <v-col>
            <v-img src="https://www.01net.it/wp-content/uploads/sites/14/2018/06/macOS-Mojave.png" height="200" width="250"></v-img>
           
        </v-col>
        <v-col>
            
            <v-row>
                
                <div class="diva">
<v-card-title>Mac 2020</v-card-title>
<v-btn class="red btn-2">Delete Permanentily</v-btn>
<v-btn class="orange up" router-view to="EditProduct">Edit Product</v-btn>


                </div>
                
              
        </v-row>
        </v-col>
        
        
     
            
                  
          
                 
       

           
  
</v-row>
    </v-container>
</v-card>

</div>
       </div>
     
       </main>

</template>
<script>
export default {
    
}
</script>
<style scoped>
.cross{
    margin-right: 15px;
    font-size:20px;
    color:white;

}

.up{
    margin-top:50px;
    margin-right:200px;
}
.card{
    margin-top:100px;
    margin-left:50px;
    


}

</style>