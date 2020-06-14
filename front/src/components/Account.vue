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
                                    v-model="authInput.username"
                                    :rules="rules.nameRules"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="12">
                                <v-text-field
                                    class="col-1"
                                    outlined
                                    label="Email"
                                    placeholder="Email"
                                    v-model="authInput.email"
                                    :rules="rules.emailUser"
                                ></v-text-field>
                            </v-col>

                            <v-col cols="12">
                                <v-text-field
                                    class="col-1"
                                    outlined
                                    label="ChangePassword"
                                    placeholder="ChangePassword"
                                    v-model="authInput.password"
                                    :rules="rules.changePasswordRules"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="12">
                                <v-text-field
                                    class="col-1"
                                    outlined
                                    label="ChangeUserPhoto"
                                    placeholder="ChnageUserPhoto"
                                    v-model="authInput.ChangeUserPhoto"
                                    :rules="rules.nameRules"
                                ></v-text-field>

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
import authInput from "../mixins/authInput";
import Api from "../store/api";
export default {
    mixins: [authInput],
    data() {
        return {
            stripeConnectAccountUrl: "#",
            authInput: {},
            isAuthInputValid: true,
            inputUser: [
                v => v.length >= 5 || "Minimun Length is 5 Characthers"
            ],
            EmailUser: [
                v =>
                    !v ||
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                    "E-mail must be valid"
            ],
            inputPassword: [
                v => v.length >= 4 || "Minimun Length is 4 Characthers"
            ]
        };
    },
    methods: {
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
        },
        async changeAccountDetailsHandler() {
            const inputData = { ...this.authInput };
            const data = await this.$global.changeAccountDetails(inputData);
            this.$router.push("/");
            console.log(data);
            this.reset();
        },
        async initStripeConnectAccountUrl() {
            const { data, ok } = await Api.fetchData(
                "user/stripe-oauth/oauth-link"
            );
            if (!ok) return;

            this.stripeConnectAccountUrl = data;
        },

        exit() {
            if (!confirm("Are you sure to exit without saving?")) {
                return;
            }
            this.$router.push("/");

            this.reset();
        },
        reset() {
            this.initialize();
        },
        initialize() {
            this.authInput.username = this.userData.username;
            this.authInput.email = this.userData.email;
            this.authInput.password = "";
            this.authInput.currentUserPhoto = this.userData.currentUserPhoto;
        }
    },

    created() {
        this.initialize();
        if (!this.userData.stripeAccountId) {
            this.initStripeConnectAccountUrl();
        } else {
            console.log("Nope");
        }
    },

    computed: {
        // ...mapState(["userData"])
        userData() {
            return this.$global.userData;
        }
    }
};
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