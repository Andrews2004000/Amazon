<template>
   <div>
       <v-app-bar app class="indigo nav">
          <span class="fa fa-bars barra" @click="drawer = !drawer"></span>
          <v-spacer></v-spacer>
           <v-toolbar-title>
               <span class="rapha orange--text">Rapha</span>
               <span class="store orange--text">Store</span>
               </v-toolbar-title>
               <v-spacer></v-spacer>
               <span class="fa fa-shopping-cart mode-1" v-if="homePage"></span>
               <span class="fa fa-user cerca" @click="dialog = !dialog" v-else></span>

       </v-app-bar>
       <v-navigation-drawer v-model="drawer" app class="success">
           
                   <v-btn class="ma-2" color="darken-2" dark>
          <v-icon dark left @click="GoAway">mdi-arrow-left</v-icon>Back To HomePage
        </v-btn>
         
           <div class="conta">
  <span class="fa fa-user mode"></span>
  
           <v-btn class="user" router-view to="/Account">Account</v-btn>
           </div>
           
          
           <v-list class="listona">
           <v-list-item v-for="list in lista" :key="list.id" class="listina" router :to="list.route">
               <v-list-item-content>
                   <v-list-item-title class="content">{{list.title}}</v-list-item-title>
               </v-list-item-content>
           </v-list-item>
           </v-list>

           <v-spacer>

           </v-spacer>
           <v-btn class="btn">LOGOUT</v-btn>

       </v-navigation-drawer>
       <div>
           <v-row>
                <v-dialog v-model="dialog" max-width="500px" v-if="Exist">
                    <v-card>
                        <v-card-title>
                            <span>Login Into The Site</span>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-form ref="form">
                                    <v-col cols="12" class="coli">
                                        <v-text-field label="Username" v-model="username" :rules="inputUser"></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field label="Email" v-model="email" :rules="EmailUser"></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field
                                            label="Password"
                                            type="password"
                                            v-model="password"
                                            :rules="inputPassword"
                                        ></v-text-field>
                                    </v-col>

                                   </v-form>
                                </v-row>
                                 <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
            <v-btn color="blue darken-1" text @click="SignUp">Save</v-btn>
                                     <v-subheader class="indigo--text sub" @click="Exist = !Exist">Already registered? Log in now</v-subheader>
                            </v-container>
                        </v-card-text>
                    </v-card>
                </v-dialog>
            </v-row>
             <v-row>
                <v-dialog v-model="dialog" router-link to="/Cart" max-width="500px" else>
                    <v-card>
                        <v-card-title>
                            <span>Access</span>
                        </v-card-title>
                        <v-card-text>
                            <v-container>
                                <v-row>
                                    <v-form ref="firm" :lazy-validation="lazy" v-model="valid">

                                   
                                    <v-col cols="12" class="coli">
                                        <v-text-field label="Email" v-model="email" :rules="EmailUser"></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field
                                            label="Password"
                                            type="password"
                                            v-model="password"
                                            :rules="inputPassword"
                                        ></v-text-field>
                                    </v-col>
                                     </v-form>

                                    
                                </v-row>
                               
                                <v-subheader class="indigo--text sub" @click="Exist = !Exist">Not registered yet?Sign up now</v-subheader>
                                <div class="bottoni">
  <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
            <v-btn color="blue darken-1" text @click="Login">Save</v-btn>
                            
                                </div>
                               
                            </v-container>
                        </v-card-text>
                    </v-card>
                </v-dialog>
            </v-row>

       </div>

  
   </div>
</template>
<script>
export default {
    data(){
        return{
            drawer:false,
            dialog:false,
            valid:false,
            Exist:false,
        username: '',
            email: '',
            password: '',
            lazy:false,
              inputUser:[
            v => v.length >= 5 || 'Minimun Length is 5 Characthers'
        ],
        EmailUser:[
            v => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
        ],
        inputPassword:[
            v => v.length >= 4 || 'Minimun Length is 4 Characthers'
        ],
            lista:[
                {title:'Tecnology',route:'/Tecnology'},
                {title:'Books',route:'/Book'},
                {title:'House',route:'/House'}
            ]
        }
    },
    methods:{
        Toogle(){
             this.Exist = !this.Exist
        },
        GoAway(){
            this.$route.push('/')
        }

    },
    computed: {
      homePage() {
        if(this.$route.path == "/Tecnology" || this.$route.path == "/House" || this.$route.path == '/Book' || this.$route.path == '/ShoppingCart' ) {
          return true
        } else {
          return false
        }
      }
    }
    
}
</script>
<style scoped>
.barra{
    color:white;
    font-size:20px;
    cursor:pointer;
}
.store{
    margin-left:5px;
    text-transform:uppercase;
    font-weight:700;
}
.rapha{
    
    text-transform:uppercase;
    font-weight:700;
}
.cerca{
    font-size:20px;
    color:white;
    cursor: pointer;
}
.listona{
    margin-top:120px;
   
}
.listina{
    margin-top:15px;
  
}
.content{
font-weight:700;
margin-left:63px;
text-transform:uppercase;
color:white;
}
.user{
   margin-left:40px;
   margin-right: 40px;
  
   
   color:white;
   margin-top:10px;
   
  
}

.btn{
    margin-top:130px;
    margin-left:70px;
    
}
.conta{
    margin-top:100px;
    display: flex;
    flex-direction: column;
}

.mode{
margin-left:100px;
font-size:60px;
color:white;
cursor: pointer;
}
.mode-1{
margin-left:100px;
font-size:30px;
color:white;
cursor: pointer;
}

.coli{
    width:400px;
}

.sub{
    font-size:12px;
    cursor: pointer;
    margin-top:5px;
  
}
.bottoni{
    margin-left:270px;
}
.freccia{
 
    margin-left:20px;
    font-size:20px;
    transform:translateY(20px);
    cursor:pointer;
}
</style>