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
	import Location from './components/location.vue';
	import {locationData} from '../../commons/js/list.js';
	import { mapState } from 'vuex';
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
				addressVal:'',
				addressdata:''
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
				// this.$store.commit('citymuta',this.addressVal)
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
		//计算属性
		// 页面进入执行一次，当数据发生变化时也会发生一次
		computed:{
			...mapState(['city']),
			getCity(){
				this.addressdata = this.city.citydata;
			}
		},
		// 侦听器
		// 当数据发生变化时才发生
		watch:{
			addressdata(newValue,oldValue){
				this.addressVal = newValue;
			}
		}
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
