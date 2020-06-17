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
                <span class="span-1 orange--text">Tecnology</span>
            </div>
        </div>

        <div class="cerca">
            <v-form>
                <v-container>
                    <v-row>
                        <v-col cols="12" sm="12">
                            <v-text-field
                                outlined
                                label="search"
                                v-model="searchField"
                                prepend-inner-icon="fa fa-search"
                                v-debounce:300ms="searchHanlder"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                </v-container>
            </v-form>
            <div class="chip">
                <v-chip-group v-model="selectedTag">
                    <v-chip class="ma-2 cip" color="indigo" outlined value="videogames">
                        <v-icon class="fa fa-gamepad" left></v-icon>Videogames
                    </v-chip>
                    <v-chip class="ma-2 cip" color="primary" outlined value="computers">
                        <v-icon class="fa fa-laptop" left></v-icon>Computers
                    </v-chip>
                    <v-chip class="ma-2 cip" color="success" outlined value="phones">
                        <v-icon class="fa fa-mobile" left></v-icon>Phones
                    </v-chip>
                </v-chip-group>
                <!---   <v-chip-group
            mandatory
            active-class="primary white--text"
            class="d-flex mb-5"
            multiple
            @change="changeHandler"
            :value="valueIndexes"
        >
            <v-chip v-for="tag in tags" :key="tag">
                {{ tag }}
            </v-chip>
                </v-chip-group> --->
            </div>
        </div>

        <div>
            <v-container class="pinoto">
                <v-row>
                    <!-- Metti i filteredProducts al posto di products -->
                    <v-col
                        v-for="product in filteredProducts"
                        :key="product.id"
                        :products="products"
                    >
                        <v-card class="pa-6 mx-auto" width="500" tile>
                            <div class="padre">
                                <v-row>
                                    <v-card-text class="beta">
                                        <v-card-title class="titolo">Product Of The Mounth</v-card-title>
                                        <v-card-subtitle>{{ product.title }}</v-card-subtitle>
                                    </v-card-text>

                                    <v-img
                                        :src="product.imageUrl"
                                        class="pongo align-end"
                                        height="170px"
                                        max-width="150px"
                                    ></v-img>

                                    <v-rating>{{product.ratings}}</v-rating>
                                    <span class="sna">{{ product.price }}$</span>

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
import NavBar from "./NavBar";
export default {
    data() {
        return {
            searchField: "",
            selectedTag: ""
        };
    },
    components: {
        NavBar
    },
    created() {
        this.$global.LoadTecnologyProducts();
    },
    methods: {
        //...mapActions(["SearchProducts", "LoadTagsTecnologyProducts"]),

        searchHanlder() {
            console.log("Sto Ceracndo");
            const searchField = this.searchField;
            const searchQuery = searchField.split(" ").join("+");
            console.log(searchQuery);
            this.$global.SearchProducts({
                searchQuery,
                categoryType: "TecnologyProducts"
            });
        }
    },
    computed: {
        filteredProducts() {
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
        },
        products() {
            return this.$global.TecnologyProducts;
        },
        // ...mapState(["isLoggedIn", "TecnologyProducts", "AllTags"])
        isLoggedIn() {
            return this.$global.isLoggedIn;
        },
        TecnologyProducts() {
            return this.$global.TecnologyProducts;
        },
        AllTags() {
            return this.$global.AllTags;
        }
    }
};
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
        url("pas4.jpg");
}
.span-1 {
    position: relative;
    margin-left: 540px;
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
.pinoto {
    margin-left: 8rem;
}
</style>