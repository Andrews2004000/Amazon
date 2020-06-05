<template>
    <div>
        <v-app-bar app class="indigo nav">
            <span class="fa fa-times cross" router-view to="/"></span>
         
           <v-toolbar-title>
               <span class="rapha white--text">Account</span>
              
               </v-toolbar-title>
               <v-spacer></v-spacer>
             <v-btn class="orange text" @click="ChangeAccountDetails" >Save</v-btn>

        </v-app-bar>
           <v-expansion-panels class="pannel-body">
      <v-expansion-panel
     
      >
        <v-expansion-panel-header class="account">Accoun Details</v-expansion-panel-header>
        <v-expansion-panel-content>
        
         
               <v-row>
                   <v-form ref="authForm" v-model="isAuthInputValid">

       <v-col cols="12" sm="12">
        <v-text-field
        outlined
              label="UserName"
              placeholder="Username"
              v-model="authInput.username"
              :rules="rules.nameRules"
            
            ></v-text-field>
            </v-col>
                   <v-col cols="12" sm="12">
        <v-text-field
        outlined
              label="Email"
              placeholder="Email"
              v-model="authInput.email"
              :rules="rules.emailUser"
            
            ></v-text-field>
            </v-col>
                  
                   <v-col cols="12" sm="12">
        <v-text-field
        outlined
              label="ChangePassword"
              placeholder="ChangePassword"
              v-model="authInput.password"
              :rules="rules.changePasswordRules"
            
            ></v-text-field>
            </v-col>
                <v-col cols="12" sm="12">
        <v-text-field
        outlined
              label="ChangeUserPhoto"
              placeholder="ChnageUserPhoto"
              v-model="authInput.ChangeUserPhoto"
              :rules="rules.nameRules"
            
            ></v-text-field>
          
           
            
            <v-btn class="red seller" router-view to="/UpgradedUser">Wanna Become A Seller </v-btn>
           </v-col>
        </v-form>
             </v-row>
       
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
          <v-expansion-panels class="pannel-body-1">
      <v-expansion-panel
     
      >
        <v-expansion-panel-header class="account" >Delete Account</v-expansion-panel-header>
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
import { mapState, mapActions } from "vuex";
import authInput from "../mixins/authInput";
export default {
    mixins:[authInput],
    data(){
        return{
            authInput:{},
            isAuthInputValid:true,
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
    },
    methods:{
             ...mapActions(["changeAccountDetails"]),
        async ChangeAccountDetails(){
if(this.isAuthInputValid){
    console.log('1')
    const inputData = {...this.authInput};
    console.log('3')
    const data = await this.changeAccountDetails(inputData);
    console.log(data)
    
    console.log('4')
    this.reset();
}
        },
        exit() {
            if (!confirm("Are you sure to exit without saving?")) {
                return;
            }
          
            this.reset();
        },
        reset() {
            this.initialize();
        },
        initialize() {
            this.authInput.username = this.userData.username;
            this.authInput.email = this.userData.email;
          
            this.authInput.currentUserPhoto = this.userData.currentUserPhoto;
            this.authInput.changePassword = "";
        },
       
       
    },
    created() {
        this.initialize();
    },

    computed:{
        ...mapState(["userData"])
   
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