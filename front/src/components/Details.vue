<template>
<div>


<v-app-bar app class="indigo nav">
                <span class="fa fa-times cross white--text" @click="exit"></span>
                <v-spacer></v-spacer>
                <v-toolbar-title>
                    <span class="rapha orange--text seller">Details</span>
                </v-toolbar-title>
                <v-spacer></v-spacer>
            </v-app-bar>
    <div class="daddy">
  <div class="iphone">
          <v-img class="phone" :src="product.imageUrl"  width="400" height="400"
                  ></v-img>
        </div>
        <div class="padre">
            <span class="titolo">{{product.title}}</span>
            <span class="description">{{product.description}}</span>
<v-rating v-model="ra" class="rating"></v-rating>
<span class="price">{{product.price}}$</span>
<span class="new">New Or Used</span>
 <v-text-field
            
            class="mx-0 ex"
            label="Quantity"
            v-model="userInputs.details.quantity"
            
            max="10"
            min="1"
            step="1"
            
            type="number"
          ></v-text-field>
 <v-select
        
                                :items="item"
                                label="Colors Available"
                                multiple
                                chips
                                hint="Choose Colors You Have"
                                persistent-hint
                                v-model="userInputs.details.selectedColor"
                            ></v-select>
  <v-select
                                :items="size"
                               
                                label="Size Available"
                                multiple
                                chips
                                hint="Choose Colors You Have"
                                persistent-hint
                                v-model="userInputs.details.sizeAvailable"
                            ></v-select>
                            <v-btn class="orange btn" @click="submit">Add To Cart</v-btn>
        </div>
        
    </div>


</div>
</template>


<script>
import {mapActions} from 'vuex'
export default {
   props:['prodId'],
   
    data(){
        return{
            userInputs:{
              details:{
selectedColor:"",
            sizeAvailable:0,
            quantity:0,
                
              }
 
               

            },
            
              size: [
                10,
                11,
                12,
                13,
                14,
                15,
                16,
                17,
                18,
                19,
                20,
                21,
                22,
                23,
                24,
                25,
                26,
                27,
                28,
                29,
                30,
                31,
                32,
                33,
                34,
                35,
                36,
                37,
                38,
                39,
                40,
                41,
                42,
                43,
                44,
                45,
                46,
                47,
                48,
                49,
                50
            ],
             item: [
                "Red",
                "Blue",
                "Orange",
                "Black",
                "White",
                "Green",
                "Purple",
                "Violet",
                "AzulMarine",
                "pink"
            ],
            it: [
                {
                    src:
                        "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/refurb-iphoneX-spacegray_AV2?wid=1144&hei=1144&fmt=jpeg&qlt=80&op_usm=0.5,0.5&.v=1548459944179",
                  
                },
                {
                    src:
                        "https://images-na.ssl-images-amazon.com/images/I/51hKehpBWML._AC_SX679_.jpg",
                  
                }
            ],
            ra:5

        }
    },
    computed: {
      product(){
           return this.$store.state.product
        }

    },
    methods:{
        ...mapActions(['AddToCart','getOneProduct']),
           async submit() {
         
            await this.AddToCart({userInputs:this.userInputs});
        
           this.$router.push('/ShoppingCart')
            
        },
exit() {
            if (!confirm("Are you sure to exit without saving?")) {
                return;
            }
            this.$router.push('/')
          
            
        },
        
        Go(){
            this.$router.push('/ShoppingCart')
        }
    },
  async  created(){
      await this.getOneProduct()

    },
 
     

}
</script>
<style scoped>
.phone{
    margin-top:10px;
    width:10px;
    height:10px;
}
.daddy{
    display: flex;
align-items: baseline;
margin-top:50px;

}
.price{
    font-size:20px;
    text-transform: uppercase;
    font-weight: 800;
}
.padre{
    transform:translateY(-290px);
    display: flex;
    flex-direction: column;
    margin-right:10px;
    
}
.new{
    color:red;
    margin-top:20px;
}
.rating{
    margin-top:10px;margin-bottom: 20px;
}
.btn{
    margin-top:30px;
}
.titolo{
    text-transform:uppercase;
    font-weight: 600;
    font-size:30px;
}
.description{
    font-weight: 300;
}
.iphone{
   transform:translateY(150px);
}
</style>