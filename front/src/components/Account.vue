<template>
    <div>
        <v-app-bar app class="indigo nav">
            <!-- <span class="fa fa-times cross" router-view to="/"></span>-->
            <v-btn icon dark @click="exit">
                <v-icon>clear</v-icon>
            </v-btn>
            <v-toolbar-title>
                <span class="rapha white--text">Account</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn dark text @click="changeAccountDetailsHandler">Save</v-btn>
        </v-app-bar>
        <v-expansion-panels class="pannel-body">
            <v-expansion-panel>
                <v-expansion-panel-header class="account">Accoun Details</v-expansion-panel-header>
                <v-expansion-panel-content>
                    <v-row>
                        <v-form ref="authForm">
                            <v-col cols="12" sm="12">
                                <v-text-field
                                    class="col-1"
                                    outlined
                                    label="UserName"
                                    placeholder="Username"
                                    v-model="authInputs.username"
                                    :rules="rules.nameRules"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="12">
                                <v-text-field
                                    class="col-1"
                                    outlined
                                    label="Email"
                                    placeholder="Email"
                                    v-model="authInputs.email"
                                    :rules="rules.emailUser"
                                ></v-text-field>
                            </v-col>

                            <v-col cols="12">
                                <v-text-field
                                    class="col-1"
                                    outlined
                                    label="ChangePassword"
                                    placeholder="ChangePassword"
                                    v-model="authInputs.password"
                                    :rules="rules.changePasswordRules"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="12">
                                <v-file-input
                                    class="col-1"
                                    accept="image/png, image/jpeg, image/bmp"
                                    placeholder="Pick an avatar"
                                    prepend-icon="mdi-camera"
                                    label="Avatar"
                                ></v-file-input>

                                <a :href="stripeConnectAccountUrl">Connect With Stripe</a>
                            </v-col>
                        </v-form>
                    </v-row>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>
        <v-expansion-panels class="pannel-body-1">
            <v-expansion-panel>
                <v-expansion-panel-header class="account">Delete Account</v-expansion-panel-header>
                <v-expansion-panel-content>
                    <v-btn class="red" @click="DeleteUser">Delete You Account Permanently</v-btn>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>
    </div>
</template>
<script>
import { Vue, Component, Watch } from "vue-property-decorator";
import authInput from "../mixins/authInput";
import Api from "../store/api";
@Component({
    mixins: [authInput]
})
export default class AccountComponent extends Vue {
    stripeConnectAccountUrl = "#";
    authInputs = {};
    isAuthInputValid = true;

    inputUser = [v => v.length >= 5 || "Minimun Length is 5 Characthers"];

    EmailUser = [
        v =>
            !v ||
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
            "E-mail must be valid"
    ];

    inputPassword = [v => v.length >= 4 || "Minimun Length is 4 Characthers"];

    // ...mapActions(["changeAccountDetails", "deleteMe"]),
    async DeleteUser() {
        if (
            !confirm(
                "Are you sure to delete your account (this action can't be undone)?"
            )
        ) {
            return;
        }

        await this.$global.deleteMe();
        this.$router.push("/");
    }

    async changeAccountDetailsHandler() {
        const inputData = { ...this.authInput };
        const data = await this.$global.changeAccountDetails(inputData);
        this.$router.push("/");
        console.log(data);
        this.reset();
    }

    async initStripeConnectAccountUrl() {
        const { data, ok } = await Api.fetchData(
            "user/stripe-oauth/oauth-link"
        );
        if (!ok) return;

        this.stripeConnectAccountUrl = data;
    }

    exit() {
        if (!confirm("Are you sure to exit without saving?")) {
            return;
        }
        this.$router.push("/");

        this.reset();
    }

    reset() {
        this.initialize();
    }
    @Watch("UserData.user")
    WatchingUserData() {
        this.initialize();
    }

    initialize() {
        if (this.userData.user) {
            this.authInputs.username = this.userData.user.username;
            this.authInputs.email = this.userData.user.email;
            this.authInputs.password = "";
        } else {
            console.log("Please SignUp or Login");
        }
    }

    created() {
        this.initialize();
        if (!this.userData.stripeAccountId) {
            this.initStripeConnectAccountUrl();
        } else {
            console.log("Nope");
        }
    }

    // ...mapState(["userData"])
    get userData() {
        return this.$global.userData;
    }
}
</script>
<style scoped>
.cross {
    margin-right: 4px;
    color: white;
    font-size: 25px;
    cursor: pointer;
}
.text {
    font-size: 20px;
}
.pannel-body {
    margin-top: 100px;
    width: 900px;
    margin-left: 260px;
}
.pannel-body-1 {
    margin-top: 40px;
    width: 900px;
    margin-left: 260px;
}
.connectButton {
    background-position: center;
    background-size: contain;
    width: 200px;
    height: 40px;
    cursor: pointer;
    display: block;
}
.col-1 {
    width: 10000px;
}
.account {
    font-size: 20px;
}
.seller {
    margin-left: 560px;
}
</style>