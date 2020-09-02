import Vue from 'vue'
import App from './App'
// 引入vuex
import store from './store/store.js'
// 引入tab切换的loading
import loader from 'element/loading.vue'


Vue.config.productionTip = false
Vue.prototype.$store = store;
Vue.component('load-list',loader)  //引入全局组件

App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})
app.$mount()
