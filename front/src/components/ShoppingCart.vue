<template>
    <div>
        <NavBar />
        <div class="centro">
            <span class="emp" v-if="product.length == 0">Your Cart Is Empty</span>

            <v-card class="pa-6 card" width="1000" v-for="prod in product" :key="prod.id">
                <v-container>
                    <v-row>
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
import { Vue, Component } from "vue-property-decorator";
import NavBar from "./NavBar";
import { loadStripe } from "@stripe/stripe-js";
@Component({
    components: {
        NavBar
    }
})
export default class AnonymousComponent extends Vue {
    sessionId = null;
    rating = 4;
    number = ["1", "2"];
    ratings_1 = 1;
    checkbox = true;

    mounted() {
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
    }

    // ...mapActions(["AddFakePaymentToDatabase"]),
    async submit() {
        await this.$global.AddFakePaymentToDatabase();

        this.$router.push("/");
    }

    async DeleteProductCart(prodId) {
        await this.$global.DeleteFromCart(prodId);
    }

    async orderHanlder() {
        console.log("1");
        const data = await this.$global.createCheckSession();
        console.log("2");
        const { stripeClientId, sessionId } = data;
        console.log(sessionId);
        console.log(stripeClientId);

        console.log("3");
        const stripe = await loadStripe(stripeClientId);
        console.log(stripe);
        console.log("4");
        const result = await stripe.redirectToCheckout({
            sessionId
        });
        console.log("5");
        if (result.error) {
            alert("An Error occured: +" + result.error);
        }
        console.log("6");
    } //  async bookHandler() {//    if (!this.sessionId) return;////    const { error } = await stripe.redirectToCheckout({//        sessionId: this.sessionId//  });//  if (error) {//      alert(error.message);//  }

    created() {
        this.$global.getCartItem();

        // this.$store.dispatch("load")
    }

    get product() {
        return this.$global.itemFromCart;
    }

    get TotalAmount() {
        if (this.product.length >= 1) {
            return this.product
                .map(item => item.product.price * item.details.quantity)
                .reduce((total, amount) => total + amount);
        } else {
            return 0;
        }
    }
}
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