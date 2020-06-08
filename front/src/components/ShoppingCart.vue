<template>
    <div>
<NavBar/>
<div class="centro">
<span class="emp">Your Cart Is Empty</span>
 
<v-card class="pa-5  card" width="1000">
    <v-container>
        <v-row>
            <div class="image">
<v-img src="https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/refurb-iphoneX-spacegray_AV2?wid=1144&hei=1144&fmt=jpeg&qlt=80&op_usm=0.5,0.5&.v=1548459944179" height="100" width="100"></v-img>
            </div>
            <div class="sub">

           
<span>Quantity 1</span>
            <span>Total Ammount 399$</span>
            </div>
            <v-spacer></v-spacer>
            <v-btn class="red btn2">Remove</v-btn>
            <v-btn class="orange btn">Proceed Payment</v-btn>


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
            ratings_1:1,
              checkbox: true,
        }
    },
    
    
}
</script>
<style scoped>
.emp{
    font-size:2rem;
    font-weight:700;

    text-transform: uppercase;
}
.sub{
    display: flex;
    flex-direction: column;
   
    justify-content: center;
    margin-left:80px;
}
.check{
    transform:translateY(120px);
    margin-left:10px
}



.centro{
    text-align:center;
    margin-right:50px;
}


.card{
    margin-left:220px;
}
.btn{
    margin-top:25px;
}
.btn2{
     margin-top:25px;
     margin-right: 50px;

}
</style>