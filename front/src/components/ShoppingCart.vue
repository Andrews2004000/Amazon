<template>
    <div>
        <NavBar />
        <div class="centro">
            <span class="emp" v-if="product.length == 0">Your Cart Is Empty</span>

            <v-card class="pa-5 card" width="1000" v-for="prod in product" :key="prod.id">
                <v-container>
                    <v-row>
                        <div class="image">
                            <v-img :src="prod.product.imageUrl" height="100" width="100"></v-img>
                        </div>
                        <div class="sub">
                            <span class="qu">Quantity {{prod.details.quantity}}</span>
                            <span class="qu">{{prod.product.price * prod.details.quantity}} $</span>

                            <span>{{CurrentPrice}}</span>
                        </div>
                        <v-spacer></v-spacer>
                        <v-btn class="red btn2">Remove</v-btn>
                        <v-btn class="orange btn">Proceed Payment</v-btn>
                    </v-row>
                </v-container>
            </v-card>
            <span class="totalAmount">Total: {{TotalAmount}}</span>
        </div>
    </div>
</template>
<script>
import NavBar from "./NavBar";
import { mapState } from "vuex";
export default {
    components: {
        NavBar
    },

    data() {
        return {
            rating: 4,
            number: ["1", "2"],
            ratings_1: 1,
            checkbox: true
        };
    },
    created() {
        this.$store.dispatch("getCartItem");

        // this.$store.dispatch("load")
    },
    computed: {
        product() {
            return this.$store.state.itemFromCart;
        },
        //CurrentPrice() {
        //     const QuantityProduct = this.product.map(prod => {
        //         return prod.product.price * prod.details.quantity;
        //     });
        //    return QuantityProduct;
        // },

        TotalAmount() {
            if (this.product.length > 0) {
                return this.product
                    .map(item => item.product.price)
                    .reduce((total, amount) => total + amount);
            } else {
                return 0;
            }
        },
        ...mapState(["cart"])
    }
};
</script>
<style scoped>
.emp {
    font-size: 2rem;
    font-weight: 700;

    text-transform: uppercase;
}
.totalAmount {
    font-size: 30px;
    text-transform: uppercase;
    font-weight: 800;
    margin-left: 600px;
}
.sub {
    display: flex;
    flex-direction: column;

    justify-content: center;
    margin-left: 80px;
}
.check {
    transform: translateY(120px);
    margin-left: 10px;
}

.centro {
    text-align: center;
    margin-right: 50px;
}

.card {
    margin-left: 220px;
}
.btn {
    margin-top: 25px;
}
.btn2 {
    margin-top: 25px;
    margin-right: 50px;
}
.qu {
    text-transform: uppercase;
    font-weight: 400;
}
</style>