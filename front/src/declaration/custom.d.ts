import Vue from 'vue'
import globalStore from '../store/global'
import { Framework } from 'vuetify'
declare module 'vue/types/vue' {
    interface Vue {
        $global: globalStore;
        $vuetify: Framework;
    }
}
