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
    <span class="span-1 orange--text">Tecnology</span>
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
        <v-icon class="fa fa-gamepad" left></v-icon>
       Videogames
      </v-chip>
          <v-chip
        class="ma-2 cip"
        color="primary"
        outlined
      >
        <v-icon class="fa fa-laptop" left></v-icon>
      Computers
      </v-chip>
          <v-chip
        class="ma-2 cip"
        color="success"
        outlined
      >
        <v-icon class="fa fa-mobile" left></v-icon>
       Phones
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
                       rgba(0, 0, 0, 0.5)),url('pas4.jpg')

}
.span-1{
    position: relative;
    margin-left:560px;
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