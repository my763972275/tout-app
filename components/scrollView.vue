<template>
	<view>
		<scroll-view scroll-x="true" class="scroll" scroll-with-animation="true">
			<view>
				<block v-for="(item,index) in tab" :key="index">
					<view @click="tabs(index,item.nav)" class="list-cont " :class="{active:index == num}">
						<view>
							<text :class="{activea:index == num}" class="con-text-a">{{item.name}}</text>
						</view>
						<view>
							<text :class="{activeb:index == num}" class="con-text-b">{{item.title}}</text>
						</view>
					</view>
				</block>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import {homelist} from '../commons/js/cloudFun.js'
	export default {
		name:'scrollView',
		props:{
			tab:Array
		},
		data() {
			return {
				num:0,
			}; 
		},
		methods:{
			tabs(index,item){
				this.num = index;
				// 点击tab切换loading状态显示
				let loading = true;
				// this.$store.commit('navmuat',loading);
				// tab切换的时候把pageid值置为0
				let pageid = 0;
				
				// 以对象的形式传值到vuex
				let pullobj = {
					loading:loading,
					nav:item,
					pageid:pageid
				}
				this.$store.commit('navmuta',pullobj);
				// 上拉加载值
				let listid = 0;
				homelist('recomment',listid)
				.then(res => {
					// vuex传值
					let listdata = res;
					// 当传值给actions时执行下面的命令
					this.$store.dispatch('listact',listdata)
					// 如果直接传值给mutations时执行下面的命令
					// this.$store.commit('listmut',listdata)
					let loading = false;
					this.$store.commit('loadmuat',loading)
				})
				.catch(err => {
					console.log(err)
				})
			}
		}
	}
</script>

<style scoped>
.scroll{
	white-space: nowrap;
	width:100%;
	position:absolute;
	left:0;
	right:0;
	padding:20upx 0;
	background:white;
}
.con-text-a{
	color:#292c33;
	font-size:30upx;
	font-weight: bold;
}
.con-text-b{
	color:#9ea0a5;
	font-size: 23upx;
}
.list-cont{
	width:180upx;
	display:inline-block;
	text-align: center;
}
.active{
	background-image:linear-gradient(to right,#ccffff 0%, #ffcc00 100%);
	border-top-right-radius:50upx;
}
.activea{
	color:#292c33 !important;
	font-size:31upx !important;
}
.activeb{
	color: #292c33 !important;
	font-size: 23upx !important;
}
</style>
