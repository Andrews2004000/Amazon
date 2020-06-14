import Vue from 'vue'
import globalStore from '../store/global'

declare module 'vue/types/vue' {
    interface Vue {
        $global: globalStore;
    }
}
