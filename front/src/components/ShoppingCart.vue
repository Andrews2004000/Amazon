<template>
    <div>
<NavBar/>
<div class="centro">
<span class="emp">Your Cart Is Empty</span>
<v-card class="pa-5  card" width="1000">
    <v-container>
        <v-row>
        <v-col>
            <v-img src="https://www.01net.it/wp-content/uploads/sites/14/2018/06/macOS-Mojave.png" height="200" width="250"></v-img>
            <v-btn class="success btn">Buy</v-btn>
        </v-col>
        <v-col>
            <v-btn class="red btn-2">Remove</v-btn>
            <v-row>
                
                <div class="diva">
<v-card-title>Mac 2020</v-card-title>
                <span>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est illo porro mollitia id odit nostrum molestiae libero tenetur recusandae nesciunt veniam cumque vero cupiditate debitis incidunt repudiandae accusamus, minus blanditiis.</span>
                </div>
                
                <v-rating class="ratings" v-model="rating"></v-rating>
        </v-row>
        </v-col>
        
         <v-text-field
            v-model="rows"
            class="mx-4 ex"
            label="Quantity"
            
            max="10"
            min="1"
            step="1"
            
            type="number"
          ></v-text-field>
            <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-header class="orange--text comment">See Some Comments</v-expansion-panel-header>
       
        <v-expansion-panel-content>    
            <div class="com">
                  <span class="toti">Andrews</span>

          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            <v-rating class="ratings" v-model="ratings_1"></v-rating>
                </div>   
          
                 
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

            </v-row>
      
  

    </v-container>
</v-card>


</div>


    </div>
</template>
<script>
import NavBar from './NavBar'
export default {
    components:{
        NavBar
    },
    
    data(){
        return{
            rating:4,
            number:['1','2'],
            ratings_1:1
        }
    }
}
</script>
<style scoped>
.emp{
    font-size:2rem;
    font-weight:700;

    text-transform: uppercase;
}
.diva{
    margin-right:35px;
    padding:0;
}
.btn-2{
    margin-right:-290px;
    margin-top:-10px;
}
.like{
    margin-left:50px;
}
.ex{
    width:1000px;
}
.toti{
    margin-left:100px;
    font-weight:300;
    font-size:20px;
    margin-bottom:10px;
    font-family:Bold
}
.com{
    display: flex;
    flex-direction: column;
}
.comment{
    text-transform: uppercase;
    font-weight: 700;
}
.centro{
    text-align:center;
    margin-right:50px;
}
.btn{
    margin-left:-198px;
  
    width:250px;
    margin-top:20px;
}
.card{
    margin-left:220px;
}
.ratings{
    margin-top:5px;
}
</style>