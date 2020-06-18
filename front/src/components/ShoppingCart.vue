<template>
    <div>
        <NavBar />
        <div class="centro">
            <span class="emp" v-if="product.length == 0">Your Cart Is Empty</span>

            <v-card class="pa-6 card" width="1000" v-for="prod in product" :key="prod.id">
                <v-container>
                    <v-row>
                        <span>{{product}}</span>
                        <div class="image">
                            <v-img :src="prod.product.imageUrl" height="100" width="100"></v-img>
                        </div>

                        <div class="sub">
                            <span class="qu">Quantity {{prod.details.quantity}}</span>
                            <span class="qu">{{prod.product.price * prod.details.quantity}} $</span>
                        </div>
                        <v-spacer></v-spacer>
                        <v-btn class="red btn2" @click="DeleteProductCart(prod._id)">Remove</v-btn>
                    </v-row>
                </v-container>
            </v-card>
            <span class="totalAmount" v-if="product.length > 0">Total: {{TotalAmount}} $</span>
            <v-btn class="orange btn" @click="orderHanlder">Proceed Payment</v-btn>
        </div>
    </div>
</template>
<script>
import NavBar from "./NavBar";
import { loadStripe } from "@stripe/stripe-js";
export default {
    components: {
        NavBar
    },

    data() {
        return {
            sessionId: null,
            rating: 4,
            number: ["1", "2"],
            ratings_1: 1,
            checkbox: true
        };
    },
    async mounted() {
        // try {
        //     const result = await Api.fetchData(
        //         "bookings/checkout-session",
        //         true,
        //        "POST",
        //       {
        //           bookingData: this.inputFormattedData
        //        }
        //   );
        //   if (!result.ok) return;
        //   if (
        //      !result.data.sessionId ||
        //      !result.data.vendorStripeAccountId ||
        //      !result.data.stripeClientId
        //  )
        //   throw new Error("Cannot create stripe session");
        //this.sessionId = result.data.sessionId;
        // stripe = await loadStripe(result.data.stripeClientId, {
        //    stripeAccount: result.data.vendorStripeAccountId
        //  });
        //   } catch (err) {
        //       alert(err);
        //   }
    },
    methods: {
        // ...mapActions(["AddFakePaymentToDatabase"]),
        async submit() {
            await this.$global.AddFakePaymentToDatabase();

            this.$router.push("/");
        },
        async DeleteProductCart(prodId) {
            await this.$global.DeleteFromCart(prodId);
        },
        async orderHanlder() {
            const data = await this.$global.createCheckSession();
            const { vendorStripeAccountId, stripeClientId, sessionId } = data;
            const stripe = await loadStripe(stripeClientId, {
                stripeAccount: vendorStripeAccountId
            });
            const result = await stripe.redirectToCheckout({
                sessionId
            });
            if (result.error) {
                alert("An Error occured: +" + result.error);
            }
        }
        //  async bookHandler() {
        //    if (!this.sessionId) return;
        //
        //    const { error } = await stripe.redirectToCheckout({
        //        sessionId: this.sessionId
        //  });
        //  if (error) {
        //      alert(error.message);
        //  }
    },
    created() {
        this.$global.getCartItem();

        // this.$store.dispatch("load")
    },
    computed: {
        product() {
            return this.$global.itemFromCart;
        },

        TotalAmount() {
            if (this.product.length >= 1) {
                return this.product
                    .map(item => item.product.price * item.details.quantity)
                    .reduce((total, amount) => total + amount);
            } else {
                return 0;
            }
        }
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
    margin-top: 20px;
}
.btn {
    margin-left: 20px;
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