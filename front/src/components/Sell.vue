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
        <v-text-field
        outlined
              label="Description"
              placeholder="Description"
              v-model="description"
              :rules="inputDescription"
            
            ></v-text-field>
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
              <v-col cols="12" sm="12">
        <v-text-field
        outlined
              label="Category"
              placeholder="Category"
              v-model="category"
             
            
            ></v-text-field>
           
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
                                :value="formatedDate"
                                v-on="on"
                                label="Due Date"
                                prepend-icon="date_range"
                                
                                v-model="data"
                            ></v-text-field>
                        </template>
                        <v-date-picker v-model="due"></v-date-picker>
                    </v-menu>
                    
                    </v-col>
                      <v-col cols="12" sm="12">
            <span class="ratings"> Add Ratings</span>
         <v-rating v-model="rating"></v-rating>
           
            </v-col>
             </v-row>
             </v-container>
            </v-form>
            <v-btn class="yellow btn" router-view to="/">Post Your Product</v-btn>
        </div>
       
    </div>
</template>
<script>
export default {
  data(){
    return{
      ratings:4,
      title:'',
      description:'',
      price:'',
      data:'',
      category:'',
      maxQuantity:'',
      image:'',
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
      if (!isNaN(parseFloat(v)) && v >= 0 && v <= 10) return true;
      return 'Number has to be between 0 and 10';
        }
      

    }
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