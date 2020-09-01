<template>
	<view>
		<!-- 搜索栏组件 -->
		<Search></Search>
		<!-- 轮播图组件 -->
		<Swiper :banner = "banner"></Swiper>
		<Menu></Menu>
		<Classify :class="{ isFixed: isFixed }" id="boxFixed"></Classify>
		<!-- 滑动组件 -->
		<scroll-view style="height:140upx;" :tab="tab"></scroll-view>
		<!-- 主内容 -->
		<content-menu></content-menu>
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
import {home} from '../../commons/js/cloudFun.js'
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
			tab:[]
		};
	},
	async created() {
		this.banner = await home('banner');
		this.tab = await home('table');
		
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
