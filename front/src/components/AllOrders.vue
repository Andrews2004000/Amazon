<template>
    <div>
        <div>
            <v-app-bar app class="indigo nav">
                <span class="fa fa-times cross white--text" @click="exit"></span>
                <v-spacer></v-spacer>
                <v-toolbar-title>
                    <span class="rapha orange--text seller">You Orders</span>
                </v-toolbar-title>
                <v-spacer></v-spacer>
            </v-app-bar>
        </div>
        <v-card class="pa-5 card">
            <v-container>
                <v-row>
                    <div class="image">
                        <v-img
                            src="https://p.bigstockphoto.com/GeFvQkBbSLaMdpKXF1Zv_bigstock-Aerial-View-Of-Blue-Lakes-And--227291596.jpg"
                            height="100"
                            width="100"
                        ></v-img>
                    </div>

                    <span class="qu">Products name</span>
                    <span class="qu">Products price</span>

                    <v-spacer></v-spacer>
                    <v-btn class="red btn2">Delete You Order Permanently</v-btn>
                </v-row>
            </v-container>
        </v-card>
        <div>
            <span class="totalPrice">Total:1909$</span>
        </div>
    </div>
</template>
<script>
export default {
    methods: {
        exit() {
            if (!confirm("Are you sure to exit without saving?")) {
                return;
            }
            this.$router.push("/");

            this.reset();
        }
    }
};
</script>
<style>
.qu {
    text-transform: uppercase;
    font-weight: 800;
    margin-left: 40px;
    transform: translateY(40px);
}
.btn2 {
    margin-top: 25px;
}
.totalPrice {
    margin-left: 450px;
    text-transform: uppercase;
    font-weight: 300;
    font-size: 70px;
}
</style>