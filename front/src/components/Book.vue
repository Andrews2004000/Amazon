<template>
<div>


    <div>
<NavBar/>
    </div>
    <div>

    
<div class="image-container">
    <v-img  class="image" max-width="10000"></v-img>
</div>
<div>
    <span class="span-1 orange--text">Book</span>
</div>
  
   </div>

   <div class="cerca">
       <v-form>
           <v-container>
               <v-row>

              

           
       <v-col cols="12" sm="12">
        <v-text-field
        outlined
              label="search"
              prepend-inner-icon="fa fa-search"
            ></v-text-field>
            </v-col>
             </v-row>
             </v-container>
            </v-form>
            <div class="chip">

           

            <v-chip
        class="ma-2 cip"
        color="indigo"
        outlined
      >
        <v-icon class="fa fa-magic" left></v-icon>
       Fantasy
      </v-chip>
          <v-chip
        class="ma-2 cip"
        color="red"
        outlined
      >
        <v-icon class="fa fa-fire" left></v-icon>
      Action
      </v-chip>
          <v-chip
        class="ma-2 cip"
        color="success"
        outlined
      >
        <v-icon class="fa fa-history" left></v-icon>
       History
      </v-chip>
       </div>
           
   </div>

 
   
    </div>
</template>
<script>
import NavBar from './NavBar'
export default {
    components:{
        NavBar
    }
}
</script>
<style scoped>
.image-container{
 
    height:100px;

}
.cip{
    margin-top:3px;
    cursor:pointer;
}
.image{
height:350px;


background-size:100%;

background-image: linear-gradient(rgba(0, 0, 0, 0.5),
                       rgba(0, 0, 0, 0.5)),url('book.jpg')

}
.span-1{
    position: relative;
    margin-left:620px;
    text-transform: uppercase;
    font-size:50px;
    color:white;
    font-weight: 800;
}
.cerca{
    margin-top:200px;
}
.chip{
    margin-left:850px;
    transform:translateY(-30px)
}
</style>