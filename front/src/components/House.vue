<template>
    <div>
        <div>
            <NavBar />
        </div>
        <div>
            <div class="image-container">
                <v-img class="image" max-width="10000"></v-img>
            </div>
            <div>
                <span class="span-1 orange--text">For Your House</span>
            </div>
        </div>

        <div class="cerca">
            <v-form>
                <v-container>
                    <v-row>
                        <v-col cols="12" sm="12">
                            <v-text-field
                                outlined
                                v-model="searchField"
                                label="search"
                                prepend-inner-icon="fa fa-search"
                                v-debounce:300ms="searchHanlder"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                </v-container>
            </v-form>
            <div class="chip">
                <v-chip-group v-model="selectedTag">
                    <v-chip class="ma-2 cip" color="indigo" outlined value="bedroom">
                        <v-icon class="fa fa-bed" left></v-icon>bedroom
                    </v-chip>
                    <v-chip class="ma-2 cip" color="primary" outlined value="garden">
                        <v-icon class="fa fa-tree" left></v-icon>Garden
                    </v-chip>
                    <v-chip class="ma-2 cip" color="success" outlined value="livingroom">
                        <v-icon class="fa fa-home" left></v-icon>livingRoom
                    </v-chip>
                </v-chip-group>
            </div>
        </div>
        <div>
            <v-container class="pinoto">
                <v-row>
                    <v-col
                        v-for="product in filteredProducts"
                        :key="product.id"
                        :products="products"
                    >
                        <v-card class="pa-5 mx-auto" max-width="400" tile>
                            <div class="padre">
                                <v-row>
                                    <v-card-text class="beta">
                                        <v-card-title class="titolo">Product Of The Mounth</v-card-title>
                                        <v-card-subtitle>{{ product.title }}</v-card-subtitle>
                                        <span>{{product.description}}</span>
                                    </v-card-text>

                                    <v-img
                                        :src="product.imageUrl"
                                        class="pongo align-end"
                                        height="190px"
                                        max-width="230px"
                                    ></v-img>
                                    <span class="pu">ONLY</span>
                                    <span>{{product.description}}</span>
                                    <span class="sna">{{ product.price }}$</span>
                                    <span>{{product.ratings}}</span>
                                    <span>{{product.MaxQuantity}}</span>
                                    <span>{{product.scadenza}}</span>

                                    <v-card-actions>
                                        <v-btn
                                            class="success putin"
                                            router-view
                                            to="/ShoppingCart"
                                            v-if="isLoggedIn"
                                        >Add To Cart</v-btn>
                                        <v-btn
                                            class="success putin"
                                            disabled
                                            v-if="!isLoggedIn"
                                        >Add To Cart</v-btn>
                                    </v-card-actions>
                                </v-row>
                            </div>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </div>
    </div>
</template>
<script>
import { Vue, Component } from "vue-property-decorator";
import NavBar from "./NavBar";
@Component({
    components: {
        NavBar
    }
})
export default class AnonymousComponent extends Vue {
    searchField = "";
    selectedTag = "";

    // ...mapActions(["SearchProducts"]),
    searchHanlder() {
        console.log("Sto Ceracndo");
        const searchField = this.searchField;
        const searchQuery = searchField.split(" ").join("+");
        console.log(searchQuery);
        this.$global.SearchProducts({
            searchQuery,
            categoryType: "HouseProducts"
        });
    }

    created() {
        this.$global.LoadHouseProducts();
    }

    get filteredProducts() {
        const products = this.products;

        // Se non è selezionato alcun tag, restituisci tutti i prodotti
        if (!this.selectedTag) return products;

        // Crea un array di prodotti che presentano il tag selezionato e restituiscilo
        const filteredProducts = products.filter(product => {
            // Controlla se product tags esiste, se è un array e se include il tag con cui si sta filtrando
            if (
                product.tags &&
                Array.isArray(product.tags) &&
                product.tags.includes(this.selectedTag)
            ) {
                return true;
            } else {
                return false;
            }
        });

        // Se non ha trovato nulla, restituisci tutti i prodotti
        if (filteredProducts.length === 0) return products;

        // Altrimenti restituisci quelli filtrati
        return filteredProducts;
    }

    get products() {
        return this.$global.HouseProducts;
    }

    //    ...mapState(["isLoggedIn"])
    get isLoggedIn() {
        return this.$global.isLoggedIn;
    }
}
</script>
<style scoped>
.image-container {
    height: 100px;
}

.cip {
    margin-top: 3px;
    cursor: pointer;
}
.image {
    height: 350px;

    background-size: 100%;

    background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
        url("house.jpg");
}
.span-1 {
    position: relative;
    margin-left: 560px;
    text-transform: uppercase;
    font-size: 50px;
    color: white;
    font-weight: 800;
}
.cerca {
    margin-top: 200px;
}
.chip {
    margin-left: 850px;
    transform: translateY(-30px);
}
</style>