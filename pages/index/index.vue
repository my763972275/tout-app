<template>
	<view>
		<!-- 搜索栏组件 -->
		<Search></Search>
		<!-- 轮播图组件 -->
		<Swiper :banner = "banner"></Swiper>
		<Menu></Menu>
		<Classify></Classify>
		<!-- 滑动组件 -->
		<scroll-view style="height:140upx;" :tab="tab" id="boxFixed" :class="{ 'isFixed': isFixed }"></scroll-view>
		<!-- 主内容 -->
		<content-menu :recomment = "recomment"></content-menu>
	</view>
</template>

<script>
import Search from '../../components/search.vue';
import Swiper from '../../components/swiper.vue';
import Menu from '../../components/menu.vue';
import Classify from '../../components/classify.vue';
import ScrollView from '../../components/scrollView.vue';
import ContentMenu from '../../components/content.vue'
// 引入公用方法
import {home,homelist} from '../../commons/js/cloudFun.js';
import {mapState} from 'vuex'
export default {
	components: {
		Search,
		Swiper,
		Menu,
		Classify,
		ScrollView,
		ContentMenu
	},
	data() {
		return {
			isFixed: false,
			rect: '',
			menuTop: '',
			banner:[],
			tab:[],
			recomment:[]
		};
	},
	async created() {
		Promise.all([home('banner'),home('table'),homelist('recomment')])
		.then(res => {
			this.banner = res[0];
			this.tab = res[1];
			this.recomment = res[2]
		}).catch(err => {
			console.log(err)
		})
	},
	onLoad() {
		const query = wx.createSelectorQuery();
		query.select('#boxFixed').boundingClientRect();
		query.exec(res => {
			// 拿到某个结点距离顶部的高度值
			this.menuTop = res[0].top;
		});
	},
	// 监听页面滚动
	onPageScroll(e) {
		this.rect = e.scrollTop;
		// if (this.rect > this.menuTop) {
		// 	this.isFixed = true;
		// } else {
		// 	this.isFixed = false;
		// }
	},
	// 计算属性 时刻监听数据的变化，只要数据发生变化，计算数据就会重新执行
	computed: {
		// 滑动组件置顶
		namepage() {
			if (this.rect > this.menuTop) {
				this.isFixed = true;
			} else {
				this.isFixed = false;
			}
		},
		// 取出vuex数据仓库里的数据
		...mapState(['list']),
		// 取到tab切换的数据
		count(){
			this.recomment = this.list.listing;
		}
	}
};
</script>

<style scoped>
.isFixed {
	position: fixed;
	left: 0;
	right: 0;
	top: 0;
}
</style>
