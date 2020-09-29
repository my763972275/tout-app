import Vue from 'vue'
import App from './App'
// 引入vuex
import store from './store/store.js'
// 引入tab切换的loading
import loader from 'element/loading.vue'
// 引入没有数据的提示
import nonedata from 'element/none.vue'

Vue.config.productionTip = false
Vue.prototype.$store = store;
Vue.component('load-list',loader)  //引入全局组件
Vue.component('none-data',nonedata)

App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})
app.$mount()
