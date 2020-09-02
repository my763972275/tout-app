<template>
	<view>
		<Address :address = "addressVal"></Address>
		<Location id="location"></Location>
		<Content :style="'top:'+ height + 'px'"></Content>
		<!-- 发表 -->
		<view class="publish">+</view>
	</view>
</template>

<script>
	import Address from './components/address.vue';
	import Content from './components/content.vue';
	import Location from './components/location.vue'
	import {locationData} from '../../commons/js/list.js'
	export default{
		name:'strategy',
		components:{
			Address,
			Content,
			Location
		},
		data(){
			return{
				height:0,
				addressVal:''
			}
		},
		methods:{
			address(){
				locationData()
				.then(res => {
					this.addressVal = res.result.ad_info.city
				})
				.catch(err => {
					console.log(err)
					this.addressVal = '无锡市'
				})
			}
		},
		created() {
			// 定位
			this.address()
		},
		onLoad() {
			const query = wx.createSelectorQuery();
			query.select('#location').boundingClientRect();
			query.exec(res => {
				// 拿到某个结点距离顶部的高度值
				this.height = res[0].top + res[0].height;
			});
		},
	}
</script>

<style scoped>
	Location{
		position:absolute;
		top:620upx;
	}
	Content{
		position:absolute;
	}
	.publish{
		position:fixed;
		bottom:20upx;
		left:50%; 
		transform: translate(-50%);
		width:120upx !important;
		height:100upx !important;
		border-radius: 40upx;
		background-color: #ffd300;
		color:white;
		font-size:70upx;
		line-height:100upx;
		text-align: center;
		animation: 1s showup ease;
	}
	@keyframes showup{
		0%  {bottom:-100px;opacity: 0;}
		
		100% {bottom:20px;opacity: 1;}
	}
</style>
