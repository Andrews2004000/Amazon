<template>
    <div>
        <div>
            <v-app-bar app class="indigo nav">
                <span class="fa fa-times cross white--text" @click="exit"></span>
                <v-spacer></v-spacer>
                <v-toolbar-title>
                    <span class="rapha orange--text">Forgot Password</span>
                    <span class="store orange--text">Form</span>
                </v-toolbar-title>
                <v-spacer></v-spacer>
            </v-app-bar>
        </div>

        <v-container class="container">
            <v-form v-model="isValid" ref="sendEmailForm" class="form">
                <v-text-field
                    v-model="userDatas.email"
                    label="Email"
                    class="mb-5 field"
                    placeholder="Insert The Email"
                    outlined
                ></v-text-field>

                <v-btn color="green" @click="forgotPasswordHandler">Send Email</v-btn>
            </v-form>
        </v-container>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

interface GenericObject {
    [key: string]: any;
}
@Component
export default class AuthModalComponent extends Vue {
    userDatas: GenericObject = {};
    isForgotPasswordDataValid = true;
    loading = false;
    isValid = false;
    async forgotPasswordHandler() {
        if (this.isForgotPasswordDataValid && !this.loading) {
            this.loading = true;
            const success = await this.$global.forgotPassword(this.userDatas);
            this.loading = false;
            if (success) {
                alert("the email has been submitted");
            }
            console.log("ok");
        }
    }
    exit() {
        if (!confirm("Are you sure to exit without saving?")) {
            return;
        }
        this.$router.push("/");
    }
}
</script>
<style scoped>
.rapha,
.store {
    font-size: 19px;
    text-transform: uppercase;
    letter-spacing: 0.1rem;
}
.store {
    margin-left: 10px;
}

.cross {
    font-size: 1.9rem;
    cursor: pointer;
}
.container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.title {
    font-size: 10rem;
}
.form {
    display: flex;
    flex-direction: column;
}
</style>