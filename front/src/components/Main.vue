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
            <div class="sidebar">
                <h6 class="sidebar__title">Mostra Risultati Per</h6>
                <div class="sidebar__card__brand">
                    <h6 class="sidebar__card__brand__title">Selezione Brand</h6>
                    <label class="sidebar__card__brand__label">
                        <input type="checkbox" name id />
                        Brand popolari
                    </label>
                    <label class="sidebar__card__brand__label">
                        <input type="checkbox" />
                        I nostri brand
                    </label>
                </div>
                <div class="sidebar__card__clothing">
                    <h6 class="sidebar__card__clothing__title">Abbigliamento</h6>
                    <ul class="sidebar__card__clothing__list">
                        <li class="sidebar__card__clothing__list__items">Uomo</li>
                        <li class="sidebar__card__clothing__list__items">Donna</li>
                        <li class="sidebar__card__clothing__list__items">Bambine e ragazze</li>
                        <li class="sidebar__card__clothing__list__items">Bambini e ragazii</li>
                        <li class="sidebar__card__clothing__list__items">Prima infanzia</li>
                        <li class="sidebar__card__clothing__list__items">Abbigliamneto Specifico</li>
                    </ul>
                </div>
                <h6 class="filterBy">Filtra Per</h6>
                <div class="sidebar__card__shipping">
                    <h6 class="sidebar__card__shipping__title">Modalità Di Spedizione</h6>
                    <label class="sidebar__card__shipping__label">
                        <input type="checkbox" name id />
                        Prime
                    </label>
                    <label class="sidebar__card__shipping__label">
                        <input type="checkbox" />
                        Spedione gratuita
                    </label>
                </div>
                <div class="sidebar__card__make">
                    <h6 class="sidebar__card__make__title">Marca</h6>
                    <!--  <label
                        class="sidebar__card__shipping__label"
                        v-for="brand in brands"
                        :key="brand"
                    >
                        <input type="checkbox" v-model="products.brand" :value="brand" />
                        {{brand}}
                        <v-checkbox v-for="brand in brands" :key="brand" :label="brand" v-model="products.brand" :value="brand"></v-checkbox>

                    </label>-->
                    <!-- <v-radio-group v-model="QueryObject.brand">
                        <v-radio
                            v-for="brand in brands"
                            :key="brand"
                            :label="brand"
                            :value="brand"
                            @click="loadFilteredProducts"
                        ></v-radio>
                    </v-radio-group>-->
                    <v-radio-group v-model="QueryObject.brand">
                        <v-radio v-for="brand in brands" :key="brand" :label="brand" :value="brand"></v-radio>
                    </v-radio-group>
                </div>
                <div class="sidebar__card__color">
                    <h6 class="sidebar__card__color__title">Colors</h6>
                    <div class="sidebar__card__color__container">
                        <div class="sidebar__card__color__box"></div>
                        <div class="sidebar__card__color__box"></div>
                        <div class="sidebar__card__color__box"></div>
                        <div class="sidebar__card__color__box"></div>
                    </div>
                </div>
                <div class="sidebar__card__arrivi">
                    <h6 class="sidebar__card__arrivi__title">Giorni di Consegna</h6>
                    <label class="sidebar__card__shipping__label">
                        <input type="checkbox" />
                        Ricevi Oggi
                    </label>
                    <label class="sidebar__card__shipping__label">
                        <input type="checkbox" />
                        Ricevi Domani
                    </label>
                </div>
                <div class="sidebar__card__delivery">
                    <h6 class="sidebar__card__delivery__title">Nuovi Arrivi</h6>
                    <h6 class="sidebar__card__delivery__items">Ultima settimana</h6>
                    <h6 class="sidebar__card__delivery__items">Ultimo mese</h6>
                    <h6 class="sidebar__card__delivery__items">Ultimi tre mesi</h6>
                </div>
                <div class="sidebar__card__price"></div>
                <div class="sidebar__card__vendors">
                    <h6 class="sidebar__card__vendors__title">Venditori</h6>
                    <label class="sidebar__card__shipping__label">
                        <input type="checkbox" />
                        srrl.com
                    </label>
                    <label class="sidebar__card__shipping__label">
                        <input type="checkbox" />
                        Gianni Morandi
                    </label>
                    <label class="sidebar__card__shipping__label">
                        <input type="checkbox" />
                        Stuma
                    </label>
                    <label class="sidebar__card__shipping__label">
                        <input type="checkbox" />
                        Andrews
                    </label>
                </div>
            </div>
            <v-container class="container__cards">
                <v-row>
                    <v-col v-for="product in products" :key="product.id" :product="product">
                        <v-card class="card" max-width="400" tile>
                            <div class="container__cards__typography">
                                <v-card-text>
                                    <v-card-title
                                        class="container__cards__typography__title"
                                    >{{$t('general.save')}}</v-card-title>
                                    <v-card-subtitle>{{product.title}}</v-card-subtitle>

                                    <v-rating readonly v-model="product.ratings"></v-rating>
                                </v-card-text>

                                <v-img :src="product.imageUrl" class="product__image" alt="image"></v-img>
                                <v-spacer></v-spacer>

                                <!--_ <span class="pu">ONLY</span> -->

                                <span
                                    class="container__cards__typography__price"
                                >Price:{{ product.price }}$</span>

                                <v-card-actions>
                                    <v-btn
                                        class="container__cards__typography__btn"
                                        v-if="isLoggedIn"
                                        @click="Go(product._id)"
                                    >Add To Cart</v-btn>
                                    <v-btn
                                        class="container__cards__typography__btn"
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
        <div class="pages indigo">
            <div class="card-footer pb-0 pt-3">
                <jw-pagination :items="exampleItems" @changePage="onChangePage" class="orange"></jw-pagination>
            </div>
            <!--<div class="page">
                <span class="page__content">1</span>
            </div>
            <div class="page">
                <span class="page__content">2</span>
            </div>-->
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
import Api from "../store/api";
import { Vue, Component, Watch } from "vue-property-decorator";
import NavBar from "./NavBar";
@Component({
    components: {
        NavBar,
    },
})
export default class AnonymousComponent extends Vue {
    ok = false;
    langs = ["en", "fr", "it", "ar", "de"];
    searchField = "";
    open = false;
    amenities = [1, 4];
    neighborhoods = [1];
    pageOfItems = [];
    brands = [];
    Snoopy = "Helo";
    QueryObject = { brand: "" };
    tags = [
        "MaxPrice",
        "Best Ratings",
        "LowerPrice",
        "Country",
        "EarlyScadenza",
        "LowerRatings",
        "JustScadenza",
    ];
    radioGroup = 1;
    icons = ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"];

    items = [
        {
            src:
                "https://leganerd.com/wp-content/uploads/2018/10/d39w7f4ix9f5s9.cloudfront-999x485.png",
            title: "Alexa Products",
        },
        {
            src:
                "https://www.lifestyleblog.it/wp-content/uploads/2020/01/xbox-series-x-.jpg",
            title: "Xbox Series X",
        },
    ];
    exampleItems = [...Array(150).keys()].map((i) => ({
        id: i + 1,
        name: "Item " + (i + 1),
    }));

    //  ...mapActions(["SearchProducts", "AddToCart"]),

    searchHanlder() {
        console.log("Sto Cearcando");
        const searchField = this.searchField;
        const searchQuery = searchField.split(" ").join("+");
        console.log(searchQuery);
        this.$global.SearchProducts({
            searchQuery,
            categoryType: "AllProducts",
        });
    }

    onChangePage(pageOfItems) {
        // update page of items
        this.pageOfItems = pageOfItems;
    }
    Go(id) {
        this.$router.push("Detail/" + id);
    }

    async created() {
        this.$global.LoadAllProducts();

        this.brands = (
            await Api.fetchData(`dictionary/brands`, true, "GET")
        ).data.brand;

        console.log(this.brands);
    }

    get currentLocale() {
        return this.$i18n.locale.substring(0, 2);
    }
    get FiltersModel() {
        return this.$global.QueryObject;
    }

    loadFilteredProducts() {
        this.$global.LoadFilteredProducts(this.QueryObject);
    }
    get products() {
        return this.$global.Products;
    }

    get isLoggedIn() {
        return this.$global.isLoggedIn;
    }

    get userData() {
        return this.$global.userData;
    }

    //   get productsBrands() {
    //       return this.$global.LoadFilteredProducts;
    //  }
    //...mapState(["isLoggedIn", "product", "userData"])
}
</script>
<style scoped lang="scss">
.filterBy {
    font-size: 1rem;
}
.sidebar {
    margin-left: 2rem;
    display: flex;
    width: 100%;
    flex-direction: column;
    &__title {
        font-size: 1rem;
    }
    &__card {
        &__vendors {
            display: flex;
            width: 100%;
            flex-direction: column;
            &__title {
                font-size: 1rem;
            }
        }
        &__delivery {
            display: flex;
            flex-direction: column;
            width: 100%;
            &__title {
                font-size: 1rem;
            }
            &__items {
                font-size: 1rem;
                font-weight: 500;
            }
        }
        &__arrivi {
            &__title {
                font-size: 1rem;
            }
            display: flex;
            flex-direction: column;
            width: 100%;
        }
        &__make {
            display: flex;
            flex-direction: column;
            width: 100%;
            &__title {
                font-size: 1rem;
            }
        }
        &__shipping {
            display: flex;
            flex-direction: column;
            width: 100%;
            &__title {
                font-size: 1rem;
            }
        }
        &__color {
            &__container {
                display: flex;
                flex-direction: row;
                width: 15rem;
            }
            &__title {
                font-size: 1rem;
            }
            &__box {
                margin: 0.5rem;
                width: 1.4rem;
                height: 1.4rem;
                background-color: #f13c20;
            }
        }
        &__clothing {
            display: flex;
            width: 100%;
            flex-direction: column;
            &__title {
                font-size: 1rem;
            }
            &__list {
                list-style: none;
                display: flex;
                flex-direction: column;
                margin-left: -1rem;
            }
        }
        &__brand {
            display: flex;
            flex-direction: column;
            width: 100%;
            justify-content: center;
            &__title {
                font-size: 1rem;
            }
        }
    }
}
.slide {
    position: absolute;
    width: 100%;
}
.padre {
    display: flex;
    flex-direction: column;
    width: 100%;
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
    // margin-left: 50px;
}
.sna {
    text-transform: uppercase;
    font-size: 38px;
}
.nope {
    //  margin-right: 30px;
    font-size: 40px;
    cursor: pointer;
}

.pinoto {
    // margin-left: 13rem;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
}
.putin {
    width: 360px;
}
.titolo {
    margin-left: 10px;
}
.pages {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}
.page {
    width: 3rem;
    height: 3rem;
    margin: 10px;
    background-color: grey;
    position: relative;
    background-color: orange;
}
.page:hover {
    transition: background-color 1s;
    background-color: orangered;
}
.page__content {
    position: absolute;
    bottom: 10px;

    left: 18.5px;
    text-transform: uppercase;
    font-size: 20px;
    font-weight: 600;
}
.card {
    display: flex;
    width: 20rem;
    flex-direction: column;
}
.container__cards {
    display: flex;
    width: 100%;
    margin-left: 14rem;
    align-items: center;
    justify-content: center;
    &__typography {
        display: flex;
        justify-content: center;
        //  align-items: center;
        //margin-left: 1rem;
        flex-direction: column;
        &__title {
            font-size: 1rem;
            color: #000;
        }
        &__price {
            font-size: 2rem;
            font-weight: 600;
            margin-left: 1rem;
        }
        &__btn {
            background-color: #f13c20;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
        }
    }
}
.product__image {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 20rem;
    width: 15rem;
    margin-top: -5rem;
    //   margin: 2.4rem;
}
</style>