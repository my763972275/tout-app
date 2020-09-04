import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

// 首页table切换传输存储的值
const list = {
	listing:[]
}
// tab切换的状态
const load = {
	loading:false
}
const navmin = {
	loading:false,
	nav:'',
	pageid:0
}
const city = {
	citydata:''
}
const routing ={
	flag:false
}
const state = {
	list,
	load,
	navmin,
	city,
	routing
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
		},
		// tab切换的loading状态
		loadmuat(state,loading){
			// console.log(loading)
			state.load = {
				loading:loading
			}
		},
		// 以对象形式传过来的参数
		navmuta(state,obj){
			state.navmin = {
				loading:obj.loading,  //loading标志
				nav:obj.nav,          //集合名
				pageid:obj.pageid     //分页查询的页码
			}
		},
		// 获取城市参数
		citymuta(state,data){
			state.city = {
				citydata:data
			}
		},
		// 发布成功后是否重新刷新页面
		routmuta(state,flag){
			state.routing = {
				flag:flag
			}
		}
	}
})