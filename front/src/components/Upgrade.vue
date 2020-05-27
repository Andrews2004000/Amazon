<template>
    <div>
        <v-app-bar app class="indigo nav">
            <span class="fa fa-times cross" router-view to="/"></span>
         
           <v-toolbar-title>
               <span class="rapha white--text">Seller Account</span>
              
               </v-toolbar-title>
               <v-spacer></v-spacer>
             <span class="white--text text">Save</span>

        </v-app-bar>
   
      
           <v-form>
           <v-container>
               <v-row>
                     <v-col cols="12" sm="12">
        <v-text-field
        outlined
              label="Role"
              placeholder="Role"
              v-model="role"
            
            ></v-text-field>
            </v-col>

       <v-col cols="12" sm="12">
        <v-text-field
        outlined
              label="UserName"
              placeholder="Username"
              v-model="username"
            
            ></v-text-field>
            </v-col>
               
              
                   <v-col cols="12" sm="12">
        <v-text-field
        outlined
              label="Email"
              placeholder="Email"
            v-model="email"
            ></v-text-field>
            </v-col>
                   <v-col cols="12" sm="12">
        <v-text-field
        outlined
              label="Password"
              placeholder="Password"
              v-model="password"
            
            ></v-text-field>
            </v-col>
                   <v-col cols="12" sm="12">
        <v-text-field
        outlined
              label="ConfirmPassword"
              placeholder="ConfirmPassword"
              v-model="confirmPassword"
            
            ></v-text-field>
            </v-col>
             <v-col cols="12" sm="12">
        <v-text-field
        outlined
              label="Adress"
              placeholder="Adress"
              v-model="adress"
            
            ></v-text-field>
            
              
           
            </v-col>
             
           
               <v-btn class="seller success" router-view to="/Sell">Start Selling</v-btn>
    

             </v-row>
             </v-container>
       
   
      </v-form>
    
    </div>
</template>
<script>
export default {
    data(){
        return{
            drawer:false,
            username:'',
            role:'',
            adress:'',
            password:'',
            confirmPassword:'',
            email:'',


           
               inputRules: [v => (v ? v.length >= 3 || 'Minimum length is 3 characters' : 'This field is mandatory')],
        }
    },
      
    
}
</script>
<style scoped>
.cross{
    margin-right:4px;
    color: white;
    font-size:25px;
    cursor: pointer;
}
.text{
    font-size:20px;
}
.pannel-body{
    margin-top:100px;
    width:900px;
    margin-left:260px;
}
.pannel-body-1{
    margin-top:40px;
    width:900px;
    margin-left:260px;
}
.account{
    font-size:20px;
}
.seller{
    margin-left:530px;
}
</style>