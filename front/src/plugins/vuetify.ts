import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#333689', // Blue
                secondary: '#232838', // Dark blue
                accent: '#33BF2D', // Light green
                error: '#893333', // Red
                info: '#2DA9BF', // Light blue
                success: '#338972', // Dark green
                warning: '#ffa500', // Dark Yellow
            },
        },
    },
    icons: {
        iconfont: 'md',
    },
    rtl: navigator.languages[0].includes('ar') ? true : false
});
