import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        vueserver:'http://localhost:8181/book'
        //vueserver:'http://47.107.85.69:8181/book'
    }
})
export default store
