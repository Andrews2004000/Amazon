<template>
    <div>
        <button v-google-signin-button="clientId">Continue with Google</button>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import GoogleSignInButton from "vue-google-signin-button-directive";
import axios from "axios";
@Component({
    directives: {
        GoogleSignInButton,
    },
})
export default class GoogleLoginComponent extends Vue {
    clientId =
        "918675243980-01br28kgjbn0i3ncluhti7u6mh3eaje8.apps.googleusercontent.com";
    async OnGoogleAuthSuccess(idToken: any) {
        console.log(idToken);
        const { data } = await axios.post(
            "http://localhost.com:5000/api/google-login?token=" + idToken
        );
        console.log(data);
    }
    OnGoogleAuthFail(error: any) {
        console.log(error);
        alert("An error occurred");
    }
}
</script>

<style>
</style>