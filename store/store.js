import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

// 首页table切换传输存储的值
const list = {
	listing:[]
}

const state = {
	list
}



export default new Vuex.Store({
	state,
	// 可以执行异步操作
	actions:{
		listact(listact,listdata){
			// 三个页面同时传值过来发送ajax请求
			// 得到请求结果之后再传给mutations
			listact.commit('listmut',listdata)
		}
	},
	// 直接执行同步操作
	mutations:{
		listmut(state,listdata){
			state.list = {
				listing:listdata
			}
		}
	}
})