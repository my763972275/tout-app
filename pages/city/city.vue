<template>
	<view>
		<!-- 搜索城市 -->
		<view class="margin-search">
			<view class="search-cont">
				<view class="city-search">
					<image src="../../static/search.png" mode="widthFix" class="search-img"></image>
					<input type="text" placeholder="发现你感兴趣的目的地" v-model="keywords" @focus="searchCity" @input="searchInput">
				</view>
				<view class="search-code" v-if="!cityVal" @click="cancle">X</view>
			</view>
		</view>
		<!-- 点击搜索隐藏 -->
		<view v-if="cityVal">
			<!-- 定位城市 -->
			<view class="city-view">
				<view class="city-text">当前定位城市</view>
				<view class="posit-city">
					<image src="../../static/location.png" mode="widthFix"></image>
					<text class="city-text" @click="clickCity">{{addressVal}}</text>
				</view>
			</view>
			<!-- 热门城市 -->
			<view class="hot-city">热门城市</view>
			<view class="menu-block">
				<block v-for="(item,index) in city" :key="index">
					<view @click="hotcity(item.name)">{{item.name}}</view>
				</block>
			</view>
		</view>
		<view class="results" v-if="!cityVal">
			<block v-for="(item,index) in citydata" :key="index">
				<view class="results-city" @click="seekCity(item)">
					<image src="../../static/location.png" mode="widthFix"></image>
					<text>{{item.name}}</text>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	import {locationData} from '../../commons/js/list.js'
	export default {
		name:'city',
		data() {
			return {
				cityVal:true,
				keywords:'',
				addressVal:'无锡市',
				city:[
					{
						name:'无锡市'
					},
					{
						name:'南京市'
					},
					{
						name:'苏州市'
					},
					{
						name:'常州市'
					},
					{
						name:'徐州市'
					}
				],
				citydata:[
					{
						name:'上海市'
					},
					{
						name:'杭州市'
					}
				]
			}
		},
		onLoad(e) {
			this.addressVal = e.name
		},
		mounted() {
			// this.address()
		},
		methods: {
			// 点击定位取到城市名
			clickCity(){
				this.$store.commit('citymuta',this.addressVal)
				uni.switchTab({
					url:'../strategy/strategy'
				})
			},
			// 取到热门城市
			hotcity(city){
				this.$store.commit('citymuta',city)
				// 注：跳转回tab页面不能再使用navigateTo方法，该方法有层级限制，详见开发者文档
				// 该方法不能带参数跳转 navigateTo是可以带参数的
				uni.switchTab({
					url:'../strategy/strategy'
				})
			},
			searchCity(e){
				this.cityVal = false;
			},
			searchInput(){
				
			},
			cancle(){
				this.cityVal = true;
			},
			seekCity(index){
				
			},
			// address(){
			// 	locationData()
			// 	.then(res => {
			// 		this.addressVal = res.result.ad_info.city
			// 	})
			// 	.catch(err => {
			// 		console.log(err)
			// 		this.addressVal = '无锡市'
			// 	})
			// }
		}
	}
</script>

<style scoped>
page{
	background-color: white;
}
.margin-search{
	margin-bottom:40upx;
}
.city-search{
	height:70upx;
	line-height:70upx;
	width:100%;
	display:flex;
	flex-direction: row;
	background: #f8f8f8;
	border-radius: 50upx;
}
.search-img{
	margin:auto 0 auto 20upx;
	width:40upx;
	height:40upx;
}
.city-search input{
	height:70upx;
	line-height:70upx;
	width:100%;
	font-size:30upx;
	color:#666;
}
.search-cont{
	display:flex;
	justify-content: space-between;
	height:70upx;
	align-items: center;
	background:linear-gradient(to top,#ffe566 10%,#ffd300 100%);
	padding:30upx 20upx;
}
.search-code{
	width:50upx;
	height:50upx;
	text-align: center;
	line-height: 50upx;
	padding:4upx;
	border-radius: 50%;
	background-color: rgba(0,0,0,0.4);
	margin-left:18upx;
	font-size:24upx;
	color:lightgray;
}
.city-view image{
	width:40upx;
	height:40upx;
	padding-right:20upx;
}

.city-text{
	font-size:30upx;
	color:#3f3f3f;
}

.posit-city{
	display:flex;
	align-items: center;
	padding-left:35upx;
}
.city-view{
	display: flex;
	align-items: center;
	background:#f7f7f7;
	padding:20upx 10upx;
	margin:0 20upx;
	border-radius: 6upx;
}
.hot-city{
	font-size: 30upx;
	color:#999999;
	margin:50upx 20upx 0 20upx;
}
.menu-block view{
	background:#f7f7f7;
	border-radius: 6upx;
	font-size:27upx;
	color:#333;
	text-align: center;
	padding:15upx;
	margin:20upx;
}
.menu-block{
	display:flex;
	flex-direction: row;
	justify-content: flex-start;
	flex-wrap: wrap;
}
.results text{
	display:block;
	font-size:30upx;
	color:#ee9900;
}
.results-city image{
	width:40upx;
	height: 40upx;
	padding-right: 20upx;
}
.results-city{
	display:flex;
	align-items: center;
	border-bottom:1upx solid #e5e5e5;
	padding:20upx 0;
	margin:0 20upx;
}
</style>
