<template>
    <div>
        <div>

        
        <v-app-bar app class="indigo nav">
            <span class="fa fa-times cross" router-view to="/"></span>
         <v-spacer></v-spacer>
           <v-toolbar-title>
               <span class="rapha orange--text seller">Seller</span>
              
               </v-toolbar-title>
               <v-spacer></v-spacer>
 

        </v-app-bar>
        </div>
        <div>
 <span class="tes">Create Your Products</span>
        </div>
        <div>
            <v-form>
           <v-container>
               <v-row>

       <v-col cols="12" sm="12">
        <v-text-field
        outlined
              label="Title"
              placeholder="Title"
              v-model="title"
              :rules="inputUser"
            
            ></v-text-field>
            </v-col>
                   <v-col cols="12" sm="12">
        <v-textarea
            outlined
            placeholder="Description"
            :rules="inputDescription"
            name="input-7-4"
            label="Description"
            
          ></v-textarea>
            </v-col>
                   <v-col cols="12" sm="12">
        <v-text-field
        outlined
              label="ImageUrl"
              placeholder="ImageUrl"
              v-model="image"
              :rules="imageUrl"
            
            ></v-text-field>
            </v-col>
                   <v-col cols="12" sm="12">
        <v-text-field
        outlined
              label="Price"
              placeholder="Price"
            v-model="price"

            ></v-text-field>
           
            </v-col>
              <v-col cols="6" sm="12">
         <v-select
            v-model="e7"
            :items="item"
            label="Colors Available"
            multiple
            chips
            hint="Choose Colors You Have"
            persistent-hint
          ></v-select>
           
            </v-col>
             <v-col cols="6" sm="12">
         <v-select
            v-model="e6"
            :items="size"
            label="Size Available"
            multiple
            chips
            hint="Choose Colors You Have"
            persistent-hint
          ></v-select>
           
            </v-col>
          
              <v-col cols="12" sm="12">
         <v-select
            :items="items"
            label="Category"
            placeholder="Category"
            outlined
          ></v-select>
           
            </v-col>
            <v-col cols="12" sm="12">
         <v-select
            :items="tags"
            label="Tags"
            placeholder="Tags"
            outlined
          ></v-select>
           
            </v-col>


            
             <v-col cols="12" sm="12">
        <v-text-field
        outlined
              label="Max Quantity"
              placeholder="Max Quantity"
              v-model="maxQuantity"
              :rules="[MaxQuantity]"
              
            
            ></v-text-field>
           
            </v-col>
             <v-col cols="12">
                    <v-menu>
                        <template v-slot:activator="{ on }">
                            <v-text-field
                               
                                v-on="on"
                                label="Due Date"
                                prepend-icon="date_range"
                                readonly
                                :rules="notEmptyRule"
                                
                                v-model="data"
                            ></v-text-field>
                        </template>
                        <v-date-picker v-model="inputData.dates" range no-title scrollable></v-date-picker>
                      <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                            <v-btn text color="primary" @click="$refs.menu.save(inputData.dates)">OK</v-btn>
                    </v-menu>
                    
                    </v-col>
                      <v-col cols="12" sm="12">
            <span class="ratings"> Add Ratings</span>
         <v-rating></v-rating>
           
            </v-col>
             </v-row>
             </v-container>
            </v-form>
            <v-btn class="yellow btn" @submit="submit">Post Your Product</v-btn>
        </div>
       
    </div>
</template>
<script>
import {mapState,mapActions} from 'vuex'
export default {
  data(){
    return{
      inputData:{
        dates:[]

      },
       notEmptyRule: [v => !!v || "This field is required"],
      e6:[],
      e7:[],
     
      title:'',
      description:'',
      price:'',
      data:'',
      category:'',
      maxQuantity:'',
      image:'',
      size:[10,11,12,13,14,15,16,17,18,19,20,
21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,
41,42,43,44,45,46,47,48,49,50],
      items:['Tecnology','House','Book'],
      tags:["videogames","phones","computers","fantasy","action","history","livingroom","garden","bedroom"],
      item:['Red','Blue','Orange','Black','White','Green','Purple','Violet','AzulMarine','pink'],
       inputUser:[
            v => v.length >= 3 || 'Minimun Length is 3 Characthers'
        ],
        EmailUser:[
            v => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
        ],
        imageUrl:[
          v => !v || /\.(gif|jpe?g|tiff|png|webp|bmp)$/i.test(v) || 'Image Not valid'

        ],
        inputPassword:[
            v => v.length >= 4 || 'Minimun Length is 4 Characthers'
        ],
        inputDescription:[
          v => v.length >= 15 || 'Minimun Length is 15 Characthers'

        ],
        MaxQuantity: v=>{
         if (!v.trim()) return true;
      if (!isNaN(parseFloat(v)) && v >= 1 && v <= 20) return true;
      return 'Number has to be between 1 and 20';
        }
      

    }
  
  },
    methods:{
      ...mapActions(['CreteNewProducts']),
      async submit(data){
        await this.CreteNewProducts(data)
        this.$router.push('/')

      }

     

      
    },
    computed:{
       ...mapState(["userData"]),
   
    }
    
}
</script>
<style scoped>
.cross{
    margin-right:4px;
    color: white;
    font-size:25px;
    cursor: pointer;
}
.ratings{
  text-transform: uppercase;
  font-weight: 300;
  font-size:30px;

}
.text{
    font-size:20px;
}
.seller{
text-transform:uppercase;
font-weight:600;

}
.tes{
    margin-left:570px;
    font-size:30px;
    text-transform: uppercase;
    font-weight:700;

}

.btn{
    margin-left:640px;
}
</style>