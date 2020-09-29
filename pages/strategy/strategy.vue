<template>
	<view>
		<Address :address = "addressVal"></Address>
		<Location id="location"></Location>
		<Content :style="'top:'+ height + 'px'" :publishData = "publishData"></Content>
		<!-- 发表 -->
		<view class="publish" @click="navTo">+</view>
	</view>
</template>

<script>
	import Address from './components/address.vue';
	import Content from './components/content.vue';
	import Location from './components/location.vue';
	import {locationData} from '../../commons/js/list.js';
	import { mapState } from 'vuex';
	import {selectData} from '../../commons/js/cloudFun.js'
	export default{
		name:'strategy',
		components:{
			Address,
			Content,
			Location
		},
		data(){
			return{
				// content在页面上的高度值
				height:0,
				addressVal:'',
				addressdata:'',
				publishData:[]
			}
		}, 
		onLoad() {
			const query = wx.createSelectorQuery();
			query.select('#location').boundingClientRect();
			query.exec(res => {
				// 拿到某个结点距离顶部的高度值
				this.height = res[0].top + res[0].height;
			});
			
			// 监听事件
			uni.$on('tabSelect',(objdata)=>{  
			   if(objdata.name != '全部'){
				  this.cityData({address:this.addressVal,classifydata:objdata.name},'publish') 
			   }else{
				   this.cityData({address:this.addressVal},'publish')
			   }
				
			})  
		},
		onShow() {
			// 定位
			this.address();
		},
		onUnload() {
		// 移除监听事件  
			uni.$off('tabSelect');  
		},
		//计算属性
		// 页面进入执行一次，当数据发生变化时也会发生一次
		computed:{
			...mapState(['city','routing']),
			getCity(){
				this.addressdata = this.city.citydata;
				this.cityData({address:this.addressVal},'publish')
			},
			judgeFreshPage(){
				if(this.routing.flag == true){
					this.address()
				}
			}
		},
		// 侦听器
		// 当数据发生变化时才发生
		watch:{
			addressdata(newValue,oldValue){
				this.addressVal = newValue;
			}
		},
		methods:{
			address(){
				locationData()
				.then(res => {
					this.addressVal = res.result.ad_info.city;
					// 定位成功，查询数据库，取出该城市下的数据
					this.cityData({address:this.addressVal},'publish')
				})
				.catch(err => {
					console.log(err)
					this.addressVal = '无锡市'
				})
			},
			// 定位成功，查询数据库，取出该城市下的数据
			cityData(objdata,collection){
				selectData(objdata,collection)
				.then(res => {
					this.publishData = res;
				})
				.catch(err => {
					console.log(err)
				})
			},
			// 跳转到发布页面
			navTo(){
				uni.navigateTo({
					url:'../publish/publish'
				})
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
		padding:0;
		font-size:80upx;
		line-height:100upx !important;
		text-align: center;
		animation: 1s showup ease;
	}
	@keyframes showup{
		0%  {bottom:-100px;opacity: 0;}
		
		100% {bottom:20px;opacity: 1;}
	}
</style>
