<template>
    <div>
        <div>
            <NavBar />
        </div>
        <div>
            <v-carousel>
                <v-carousel-item
                    class="slide"
                    v-for="(item,i) in items"
                    :key="i"
                    :src="item.src"
                    reverse-transition="fade-transition"
                    transition="fade-transition"
                ></v-carousel-item>
            </v-carousel>
        </div>
        <div>
            <span class="sup">Products To Buy</span>
            <span class="sold orange--text">All Our Products</span>
            <div class="cerca">
                <v-form>
                    <v-container>
                        <v-row>
                            <v-col cols="12" sm="12">
                                <v-text-field
                                    outlined
                                    dense
                                    hide-details
                                    v-model="searchField"
                                    v-debounce:300ms="searchHanlder"
                                    label="search"
                                    class="mx-sm-10 mx-md-0 mr-md-10 mb-3 mb-md-0"
                                    prepend-inner-icon="fa fa-search"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-form>
                <v-row justify="space-around">
                    <v-col cols="12" sm="6">
                        <v-chip-group multiple active-class="primary--text">
                            <v-chip v-for="tag in tags" :key="tag">{{ tag }}</v-chip>
                        </v-chip-group>
                    </v-col>
                </v-row>
            </div>
        </div>
        <div>
            <v-container class="pinoto">
                <v-row>
                    <v-col v-for="product in products" :key="product.id" :product="product">
                        <v-card class="pa-5 mx-auto" max-width="400" tile>
                            <div class="padre">
                                <!--<v-row>-->

                                <v-card-text class="beta">
                                    <v-card-title class="titolo">Product Of The Mounth</v-card-title>
                                    <v-card-subtitle>{{product.title}}</v-card-subtitle>

                                    <v-rating readonly v-model="product.ratings"></v-rating>
                                </v-card-text>

                                <v-img
                                    :src="product.imageUrl"
                                    class="pongo align-end"
                                    height="280px"
                                    max-width="200px"
                                    alt="image"
                                ></v-img>
                                <v-spacer></v-spacer>

                                <!--_ <span class="pu">ONLY</span> -->

                                <span class="sna">{{ product.price }}$</span>

                                <v-card-actions>
                                    <v-btn
                                        class="success putin"
                                        v-if="isLoggedIn"
                                        @click="Go(product._id)"
                                    >Add To Cart</v-btn>
                                    <v-btn
                                        class="success putin"
                                        disabled
                                        v-if="!isLoggedIn"
                                    >Add To Cart</v-btn>
                                </v-card-actions>
                                <!--  </v-row>-->
                            </div>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </div>

        <v-footer dark padless>
            <v-card flat tile class="indigo lighten-1 white--text text-center">
                <v-card-text>
                    <v-btn v-for="icon in icons" :key="icon" class="mx-4 white--text" icon>
                        <v-icon size="24px">{{ icon }}</v-icon>
                    </v-btn>
                </v-card-text>

                <v-card-text
                    class="white--text pt-0"
                >Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet. Mauris cursus commodo interdum. Praesent ut risus eget metus luctus accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim a sit amet dui. Duis commodo vitae velit et faucibus. Morbi vehicula lacinia malesuada. Nulla placerat augue vel ipsum ultrices, cursus iaculis dui sollicitudin. Vestibulum eu ipsum vel diam elementum tempor vel ut orci. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</v-card-text>

                <v-divider></v-divider>

                <v-card-text class="white--text">
                    {{ new Date().getFullYear() }} —
                    <strong>Rapha Store</strong>
                </v-card-text>
            </v-card>
        </v-footer>
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
    ok = false;
    searchField = "";
    open = false;
    amenities = [1, 4];
    neighborhoods = [1];

    tags = [
        "MaxPrice",
        "Best Ratings",
        "LowerPrice",
        "Country",
        "EarlyScadenza",
        "LowerRatings",
        "JustScadenza"
    ];

    icons = ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"];

    items = [
        {
            src:
                "https://leganerd.com/wp-content/uploads/2018/10/d39w7f4ix9f5s9.cloudfront-999x485.png",
            title: "Alexa Products"
        },
        {
            src:
                "https://www.lifestyleblog.it/wp-content/uploads/2020/01/xbox-series-x-.jpg",
            title: "Xbox Series X"
        }
    ];

    //  ...mapActions(["SearchProducts", "AddToCart"]),
    searchHanlder() {
        console.log("Sto Ceracndo");
        const searchField = this.searchField;
        const searchQuery = searchField.split(" ").join("+");
        console.log(searchQuery);
        this.$global.SearchProducts({
            searchQuery,
            categoryType: "AllProducts"
        });
    }

    Go(id) {
        this.$router.push("Detail/" + id);
    }

    created() {
        this.$global.LoadAllProducts();
        // this.$store.dispatch("load")
    }

    get products() {
        return this.$global.Products;
    }

    get isLoggedIn() {
        return this.$global.isLoggedIn;
    }

    get userData() {
        return this.$global.userData;
    } //...mapState(["isLoggedIn", "product", "userData"])
}
</script>
<style scoped>
.slide {
    position: absolute;
    width: 100%;
}
.padre {
    display: flex;
    flex-direction: column;
}
.sup {
    position: absolute;
    transform: translateY(-300px);
    margin-left: 300px;
    font-size: 70px;
    color: white;
    text-transform: uppercase;
    font-weight: 600;
}
.sold {
    margin-left: 420px;
    text-transform: uppercase;
    font-weight: 600;
    font-size: 60px;
}
.pu {
    margin-right: 10px;
    text-transform: uppercase;
    font-size: 38px;
    margin-left: 50px;
}
.sna {
    text-transform: uppercase;
    font-size: 38px;
}
.nope {
    margin-right: 30px;
    font-size: 40px;
    cursor: pointer;
}
.pongo {
    margin-left: 50px;
}
.sna {
    margin-left: 5px;
}
.pu {
    margin-left: 4px;
}
.pinoto {
    margin-left: 13rem;
}
.putin {
    width: 360px;
}
.titolo {
    margin-left: 10px;
}
</style>