<template>
    <div>
        <div>
            <NavBar />
        </div>
        <div class="big">
            <h1 class="title">All The Products You Sold</h1>
            <v-card
                class="blue card"
                v-for="product in ownedProducts"
                :key="product._id"
            >
                <v-list-item>
                    <v-list-item-content class="container">
                        <div class="content__group">
                            <span class="content__group__name">{{
                                product.title
                            }}</span>
                            <span class="content__group__price">{{
                                product.price
                            }}</span>
                        </div>
                        <div class="container__image">
                            <v-img
                                class="images"
                                :src="product.imageUrl"
                            ></v-img>
                        </div>
                        <v-icon
                            class="fa fa-times cross"
                            @click="deleteOwnedProducts(product._id)"
                        ></v-icon>
                    </v-list-item-content>
                </v-list-item>
            </v-card>
            <div class="all__earnings">
                <h1>Tutti i Guadagni</h1>
                <span class="earn">100 $</span>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import NavBar from "./NavBar.vue";
import Api from "../store/api";
import { Vue, Component } from "vue-property-decorator";
@Component({
    components: {
        NavBar,
    },
})
export default class PersonalPage extends Vue {
    ownedProducts = [];
    AllEarnings = [];
    Orders = {};
    users = [] as any;
    async mounted() {
        const result = await Api.fetchData(`order/order-retrive`, true, "GET");
        if (!result.ok) {
            return;
        }
        const data = result.data;
        console.log(data);
        return data;
    }
    get userData() {
        return this.$global.userData;
    }

    async created() {
        this.ownedProducts = await this.$global.getAllOwnedProducts();
    }
    get products() {
        return this.$global.Products;
    }
    async deleteOwnedProducts(id) {
        await this.$global.DeleteProduct(id);
        this.ownedProducts = await this.$global.getAllOwnedProducts();
    }
}
</script>
<style lang="scss">
.card {
    height: 7.5rem;
    width: 40rem;
    margin-bottom: 1rem;
    position: relative;
}
.content__group {
    margin-top: 1rem;
    flex-direction: column;
    display: flex;
    &__price {
        font-size: 2rem;
        font-weight: 600;
    }
    &__name {
        font-size: 2rem;
        font-weight: 700;
    }
}
.images {
    height: 6rem;
    width: 5rem;
}
.container__image {
    width: 10rem;
    position: absolute;
    margin-left: 30rem;
}
.container {
    position: relative;
    display: flex;
    flex-direction: row;
    width: 100%;
}
.title {
    font-size: 5rem;
}
.big {
    display: flex;
    width: 100%;
    flex-direction: column;

    align-items: center;
}
.cross {
    position: absolute;
    right: -18rem;
    top: -3rem;
}
.all__earnings {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.earn {
    font-size: 2rem;
}
</style>