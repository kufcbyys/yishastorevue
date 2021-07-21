import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueRouter from "vue-router";
import BookStore from "@/views/BookStore";
import YourBooks from "@/views/YourBooks";
import ReadBook from  "@/components/ReadBook"
import Login from "@/views/Login";
import axios from 'axios'//引入
import qs from 'qs';
import store from './store'

Vue.prototype.$axios= axios //正确的使用
Vue.prototype.$qs = qs;
Vue.config.productionTip = false

const router = new VueRouter ({

    mode:'history',
    base:__dirname,
    routes:[
        {
            path: '/',
            name: 'BookStore',
            component: BookStore
        },
        {
            path: '/yourBooks',
            name: 'YourBooks',
            component: YourBooks
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/readbook',
            name:'ReadBook',
            component: ReadBook
        }
    ]}
)


Vue.use(ElementUI);
Vue.use(VueRouter);

new Vue({
    router:router,
    store,
  render: h => h(App),
}).$mount('#app')
