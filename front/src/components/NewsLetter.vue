<template>
    <div>
        <div class="container">
            <!-- ADD TRANSLATION -->
            <h1>{{$t('newsletter.newsletter-editor')}}</h1>

            <div id="email-editor">
                <email-editor ref="emailEditor"></email-editor>
            </div>
            <v-btn color="accent mt-10" @click="save">{{$t('general.submit')}}</v-btn>
        </div>
    </div>
</template>

<script lang="ts">
import { EmailEditor } from "vue-email-editor";
import { Vue, Component } from "vue-property-decorator";

@Component({
    components: {
        EmailEditor,
    },
})
export default class EditPlaceView extends Vue {
    save() {
        (this.$refs.emailEditor as any).editor.exportHtml((data) => {
            this.sendNewsletter(data.html);
        });
    }

    async sendNewsletter(html) {
        const result = await this.$global.sendNewsLetter(html);
        if (result) {
            alert(this.$t("newsletter.newsletter-sent"));
            this.$router.push("/");
        }
    }
}
</script>

<style>
#email-editor > div {
    display: grid;
    align-items: stretch;
    height: 80vh !important;
}
</style>