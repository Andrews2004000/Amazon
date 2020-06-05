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
              label="Phone Number"
              placeholder="Phone Number"
              v-model="PhoneNumber"
            
            ></v-text-field>
            </v-col>
                   <v-col cols="12" sm="12">
        <v-text-field
        outlined
              label="Adress"
              placeholder="Adress"
              v-model="Adress"
            
            ></v-text-field>
            </v-col>
             <v-col cols="12" sm="12">
        <v-select
            v-model="e1"
            :items="states"
            menu-props="auto"
            label="Country You Come"
            hide-details
            prepend-icon="fa fa-flag"
            single-line
          ></v-select>
              
           
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
            states: [
        "Afghanistan", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antarctica", "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia and Herzegowina", "Botswana", "Bouvet Island", "Brazil", "British Indian Ocean Territory", "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Cocos (Keeling) Islands", "Colombia", "Comoros", "Congo", "Congo, the Democratic Republic of the", "Cook Islands", "Costa Rica", "Cote d'Ivoire", "Croatia (Hrvatska)", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands (Malvinas)", "Faroe Islands", "Fiji", "Finland", "France", "France Metropolitan", "French Guiana", "French Polynesia", "French Southern Territories", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Heard and Mc Donald Islands", "Holy See (Vatican City State)", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran (Islamic Republic of)", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, Democratic People's Republic of", "Korea, Republic of", "Kuwait", "Kyrgyzstan", "Lao, People's Democratic Republic", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libyan Arab Jamahiriya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia, The Former Yugoslav Republic of", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia, Federated States of", "Moldova, Republic of", "Monaco", "Mongolia", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfolk Island", "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcairn", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russian Federation", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Seychelles", "Sierra Leone", "Singapore", "Slovakia (Slovak Republic)", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Georgia and the South Sandwich Islands", "Spain", "Sri Lanka", "St. Helena", "St. Pierre and Miquelon", "Sudan", "Suriname", "Svalbard and Jan Mayen Islands", "Swaziland", "Sweden", "Switzerland", "Syrian Arab Republic", "Taiwan, Province of China", "Tajikistan", "Tanzania, United Republic of", "Thailand", "Togo", "Tokelau", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks and Caicos Islands", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "United States Minor Outlying Islands", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Virgin Islands (British)", "Virgin Islands (U.S.)", "Wallis and Futuna Islands", "Western Sahara", "Yemen", "Yugoslavia", "Zambia", "Zimbabwe"
      ],
            drawer:false,
            username:'',
            role:'',
            Country:'',
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