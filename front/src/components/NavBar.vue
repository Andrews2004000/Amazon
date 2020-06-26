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
            <span class="fa fa-shopping-cart mode-1" v-if="isLoggedIn" @click="GoThere"></span>

            <span class="fa fa-user cerca" @click="dialog = !dialog" v-else></span>
            <div class="ball orange" v-if="isLoggedIn">
                <span class="number dark" v-if="isLoggedIn">{{product.length}}</span>
            </div>
        </v-app-bar>

        <v-navigation-drawer v-model="drawer" app dark class="secondary">
            <v-btn class="ma-2" color="darken-2" dark v-if="homePage" router-view to="/">
                <v-icon dark left v-if="homePage">mdi-arrow-left</v-icon>Back To HomePage
            </v-btn>
            <!-- <span else>ok</span>-->

            <div class="conta">
                <span class="fa fa-user mode"></span>
                <v-btn class="user orange" router-view to="/Account" v-if="isLoggedIn">Account</v-btn>

                <v-btn class="success user" @click="Go" v-if="userData">sell</v-btn>

                <!-- <span else>ok</span>-->
                <span class="name" v-if="userDataRole">{{userData.user.username}}</span>
                <!-- <span else>ok</span>-->
                <v-btn class="btn-5 orange" v-if="isLoggedIn == false">
                    <span class="LoginDetail">Login</span>
                </v-btn>
                <!--  <span else>ok</span>-->
            </div>

            <v-list class="listona">
                <v-list-item
                    v-for="list in lista"
                    :key="list.id"
                    class="listina"
                    router
                    :to="list.route"
                >
                    <v-list-item-content>
                        <v-list-item-title class="content">{{list.title}}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>

            <v-spacer></v-spacer>
            <v-btn class="btn success" @click="LogoutHanlder" v-if="isLoggedIn">LOGOUT</v-btn>
        </v-navigation-drawer>

        <v-dialog v-model="dialog" max-width="500px">
            <v-card>
                <v-form v-if="!isAlreadyRegistered" ref="SignUpform" v-model="isSignUpDataValid">
                    <v-card-title>
                        <span class="headline">SignUp</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="12" class="coli">
                                    <v-text-field
                                        label="Username"
                                        v-model="userDatas.username"
                                        :rules="rules.fullName"
                                        required
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field
                                        label="Email"
                                        v-model="userDatas.email"
                                        :rules="rules.emailRules"
                                        required
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field
                                        label="Password"
                                        type="password"
                                        required
                                        v-model="userDatas.password"
                                        :rules="rules.passwordRules"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field
                                        label="Password"
                                        type="password"
                                        required
                                        v-model="userDatas.passwordConfirmation"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="12">
                                    <v-file-input
                                        placeholder="PhotoProfile"
                                        prepend-icon="mdi-camera"
                                        label="Profile"
                                        v-model="photoProfile"
                                    ></v-file-input>
                                </v-col>
                            </v-row>
                        </v-container>

                        <small>
                            <a @click="isAlreadyRegistered = true">Already registered,sign in</a>
                        </small>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>

                        <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
                        <v-btn color="blue darken-1" text @click="SignUpHandler">Save</v-btn>
                    </v-card-actions>
                </v-form>
                <v-form v-else ref="Loginform" :lazy-validation="lazy" v-model="isLoginDataValid">
                    <v-card-title>
                        <span class="headline">Log Into The WebSite</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="12" class="coli">
                                    <v-text-field
                                        label="Email"
                                        v-model="userDatas.email"
                                        :rules="rules.emailRules"
                                        required
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field
                                        required
                                        label="Password"
                                        type="password"
                                        v-model="userDatas.password"
                                        :rules="rules.passwordRules"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                        </v-container>

                        <small>
                            <a @click="isAlreadyRegistered = false">Not ?</a>
                        </small>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>

                        <div class="bottoni">
                            <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
                            <v-btn color="blue darken-1" @click="LoginHandler" text>Save</v-btn>
                        </div>
                    </v-card-actions>
                </v-form>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
import { Vue, Component } from "vue-property-decorator";
import authInput from "../mixins/authInput";
@Component({
    mixins: [authInput],

    watch: {
        isAlreadyRegistered() {
            if (this.$refs.signupForm) {
                this.$refs.signupForm.resetValidation();
            }
            if (this.$refs.loginForm) {
                this.$refs.loginForm.resetValidation();
            }
        }
    }
})
export default class AnonymousComponent extends Vue {
    drawer = false;
    dialog = false;
    valid = false;
    photoProfile = null;
    isAlreadyRegistered = true;
    isLoginDataValid = true;
    isSignUpDataValid = true;
    userDatas = {};
    lazy = false;

    inputUser = [v => v.length >= 5 || "Minimun Length is 5 Characthers"];

    EmailUser = [
        v =>
            !v ||
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
            "E-mail must be valid"
    ];

    inputPassword = [v => v.length >= 4 || "Minimun Length is 4 Characthers"];

    lista = [
        { title: "Tecnology", route: "/Tecnology" },
        { title: "Books", route: "/Book" },
        { title: "House", route: "/House" }
    ];

    //...mapActions(["Signup", "Login", "Logout"]),
    async SignUpHandler() {
        if (this.isSignUpDataValid) {
            await this.$global.Signup(this.userDatas);
            this.dialog = false;
        }
    }

    async LoginHandler() {
        if (this.isLoginDataValid) {
            await this.$global.Login(this.userDatas, this.photoProfile);

            this.dialog = false;
        }
    }

    async LogoutHanlder() {
        await this.$global.Logout();
        this.drawer = false;
    }

    GoAway() {
        this.$route.push("/");
    }

    Go() {
        this.$router.push("/Sell");
    }

    GoThere() {
        this.$router.push("/ShoppingCart");
    }

    get passwordConfirmationRule() {
        return () =>
            this.userDatas.password === this.userDatas.passwordConfirmation ||
            "Password must match";
    }

    get homePage() {
        if (
            this.$route.path == "/Tecnology" ||
            this.$route.path == "/House" ||
            this.$route.path == "/Book" ||
            this.$route.path == "/ShoppingCart"
        ) {
            return true;
        } else {
            return false;
        }
    }

    get product() {
        return this.$global.itemFromCart;
    }

    get isLoggedIn() {
        return this.$global.isLoggedIn;
    }

    get userDataRole() {
        return this.$global.userData.role === "vendor";
    }

    get userData() {
        return this.$global.userData;
    } // ...mapState(["isLoggedIn", "userData"])
}
</script>
<style scoped>
.sma {
    margin-left: 30px;
}
.barra {
    color: white;
    font-size: 20px;
    cursor: pointer;
}
.store {
    margin-left: 5px;
    text-transform: uppercase;
    font-weight: 700;
}
.famous {
    text-transform: uppercase;
    font-size: 20px;
    color: white;
    margin-left: 100px;
    margin-top: 30px;
}
.btn-5 {
    width: 60%;
    margin-left: 50px;
    margin-top: 30px;
}
.rapha {
    text-transform: uppercase;
    font-weight: 700;
}
.name {
    color: white;
    margin-left: 95px;
    font-size: 20px;
    font-weight: 300;
    text-transform: uppercase;
}
.cerca {
    font-size: 20px;
    color: white;
    cursor: pointer;
}
.listona {
    margin-top: 120px;
}
.number {
    transform: translateX(-8px) translateY(-6px);
    font-weight: 700;
    font-size: 19px;
    margin-left: 9px;
    margin-top: 5px;
}
.LoginDetail {
    text-transform: uppercase;
    font-weight: 800;
    font-size: 17px;
}
.ball {
    border-radius: 20px;
    height: 30px;
    width: 30px;
    background-color: green;
    transform: translateX(-10px) translateY(-12px);
}
.listina {
    margin-top: 15px;
}
.initila {
    margin-left: 55px;
    text-transform: uppercase;
    font-weight: 700;
    font-size: 20px;
    transform: translateY(-60px);
}
.content {
    font-weight: 700;
    margin-left: 63px;
    text-transform: uppercase;
    color: white;
}
.user {
    margin-left: 40px;
    margin-right: 40px;

    color: white;
    margin-top: 10px;
}

.btn {
    margin-top: 130px;
    margin-left: 70px;
}
.conta {
    margin-top: 100px;
    display: flex;
    flex-direction: column;
}

.mode {
    margin-left: 100px;
    font-size: 60px;
    color: white;
    cursor: pointer;
}
.mode-1 {
    margin-left: 100px;
    font-size: 30px;
    color: white;
    cursor: pointer;
}

.coli {
    width: 400px;
}

.sub {
    font-size: 12px;
    cursor: pointer;
    margin-top: 5px;
}
.bottoni {
    margin-left: 270px;
}
.freccia {
    margin-left: 20px;
    font-size: 20px;
    transform: translateY(20px);
    cursor: pointer;
}
</style>