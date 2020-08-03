<template>
    <div>
        <div>
            <v-app-bar app class="indigo nav">
                <span class="fa fa-times cross white--text" @click="exit"></span>
                <v-spacer></v-spacer>
                <v-toolbar-title>
                    <span class="rapha orange--text">Reset Password</span>
                    <span class="store orange--text">Form</span>
                </v-toolbar-title>
                <v-spacer></v-spacer>
            </v-app-bar>
        </div>

        <v-container class="container">
            <v-form v-model="isValid" ref="resetPasswordForm" class="form">
                <v-text-field
                    v-model="userData.password"
                    label="password"
                    type="password"
                    class="mb-5 field"
                    placeholder="Insert New Password"
                    outlined
                ></v-text-field>

                <v-btn color="green" @click="resetPasswordHandler">Send Password</v-btn>
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
    userData = {
        password: ""
    };

    isForgotPasswordDataValid = true;
    loading = false;
    isValid = false;

    get resetToken() {
        return this.$route.params.token;
    }
    async resetPasswordHandler() {
        const resetPasswordForm = this.$refs
            .resetPasswordForm as HTMLFormElement;

        resetPasswordForm.resetValidation();

        if (
            this.userData.password &&
            this.isValid &&
            this.resetToken &&
            !this.loading
        ) {
            this.loading = true;
            const success = await this.$global.resetPassword({
                userData: this.userData,
                resetToken: this.resetToken
            });
            this.loading = false;
            if (success) {
                alert("messages.password-reset-success");
                this.$router.push("/");
            }
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