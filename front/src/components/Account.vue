<template>
    <div>
        <v-app-bar app class="indigo nav">
            <span class="fa fa-times cross" router-view to="/"></span>
         
           <v-toolbar-title>
               <span class="rapha white--text">Account</span>
              
               </v-toolbar-title>
               <v-spacer></v-spacer>
             <span class="white--text text">Save</span>

        </v-app-bar>
           <v-expansion-panels class="pannel-body">
      <v-expansion-panel
     
      >
        <v-expansion-panel-header class="account">Accoun Details</v-expansion-panel-header>
        <v-expansion-panel-content>
           <v-form>
           <v-container>
               <v-row>

       <v-col cols="12" sm="12">
        <v-text-field
        outlined
              label="UserName"
              placeholder="Username"
              v-model="username"
              :rules="inputUser"
            
            ></v-text-field>
            </v-col>
                   <v-col cols="12" sm="12">
        <v-text-field
        outlined
              label="Email"
              placeholder="Email"
              v-model="email"
              :rules="EmailUser"
            
            ></v-text-field>
            </v-col>
                   <v-col cols="12" sm="12">
        <v-text-field
        outlined
              label="Password"
              placeholder="Current Password"
              v-model="currentPassword"
              :rules="inputPassword"
            
            ></v-text-field>
            </v-col>
                   <v-col cols="12" sm="12">
        <v-text-field
        outlined
              label="ChangePassword"
              placeholder="ChangePassword"
              v-model="changePassword"
              :rules="inputPassword"
            
            ></v-text-field>
            <v-btn class="red seller" router-view to="/UpgradedUser">Wanna Become A Seller </v-btn>
            </v-col>
             </v-row>
             </v-container>
            </v-form>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
          <v-expansion-panels class="pannel-body-1">
      <v-expansion-panel
     
      >
        <v-expansion-panel-header class="account">Delete Account</v-expansion-panel-header>
        <v-expansion-panel-content>
        
   
      
            <v-btn class="red">
                Delete You Account Permanently
            </v-btn>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    
    </div>
</template>
<script>
export default {
    data(){
        return{
            drawer:false,
             inputUser:[
            v => v.length >= 5 || 'Minimun Length is 5 Characthers'
        ],
        EmailUser:[
            v => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
        ],
        inputPassword:[
            v => v.length >= 4 || 'Minimun Length is 4 Characthers'
        ],
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
    margin-left:560px;
}
</style>