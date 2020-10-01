<template>
    <div>
        <h1 class="success">Order Success</h1>
        <router-link :to="{ name: 'Main' }">Come Back</router-link>
    </div>
</template>
<script lang="ts">
import Button from "/Button.vue";
import { Vue } from "vue-property-decorator";
import Api from "../store/api";

export default class OrderSuccess extends Vue {}
</script>
<style lang="scss">
.success {
    font-size: 2rem;
    display: flex;
    justify-content: center;
}
</style>