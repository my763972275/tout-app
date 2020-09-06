<template>
	<view>
		<view class="search-cont">
			<view class="search">
				<input type="text" placeholder-class="inputclass" confirm-type="search"
				focus="true"
				placeholder="请输入关键字"
				v-model="searchdata"
				@confirm="onKeyInput">
			</view>
			<view class="search-code" @click="search()">搜索</view>
		</view>
		<!-- 搜索历史 -->
		<view class="search-history" v-if="ishistory">
			<view class="search-title" >
				<view>搜索历史</view>
				<view @click="removeStorage()">
					<image src="../../static/delete.png" mode="widthFix"></image>
				</view>
			</view>
			<!-- tab -->
			<view class="menu-block">
				<block v-for="(item,index) in setdata" :key="index">
					<view :class="{'activetext':index == num}" @click="menubtn(index,item)">{{item}}</view>
				</block>
			</view>
		</view>
		<!-- 内容展示 -->
		<view  class="active">
			<view class="content">
				<block v-for="(item,index) in localdata" :key="index">
					<view class="content-artical newing" @click="localContent(item._id)">
						<view class="content-img">
							<image mode="aspectFill" :src="item.album[0]"></image>
						</view>
						<!-- 文字介绍 -->
						<view class="active-introduce">
							<view class="active-name">{{item.title}}</view>
							<view class="active-title">{{item.content}}</view>
						</view>
						<view class="purchase userinfo">
							<image :src="item.avatarUrl" mode="widthFix"></image>
							<text class="active-purchase" v-if="item.nickName != ''">{{item.nickName}}</text>
						</view>
					</view>
				</block>
			</view>
		</view>
		<!-- 没有数据的展示 -->
		<none-data v-if="nonedata"></none-data>
		<HMmessages ref="HMmessages" @complete="HMmessages = $refs.HMmessages"></HMmessages>
	</view>
</template>

<script>
	import {selectData} from '../../commons/js/cloudFun.js';
	import HMmessages from "@/element/HM-messages/HM-messages.vue"
	export default {
		data() {
			return {
				num:0,
				searchdata:'',
				nonedata:false,
				ishistory:false,
				localdata:[],
				setdata:[]
			}
		},
		onLoad() {
			this.getStorage();
		},
		methods: {
			menubtn(index,name){
				this.num = index
				this.searchdata = name;
				this.ishistory = false;
				// 模糊查询
				const db = wx.cloud.database()
				let keywords = {
					address:db.RegExp({
						regexp:this.searchdata,
						options:'m'
					})
				}
				selectData(keywords,'publish')
				.then(res => {
				   if(res.length == 0){
					   this.nonedata = true;
					   this.localdata = [];
				   }else{
					   this.localdata = res;
					   this.nonedata = false;
				   }
				})
				.catch(err => {
				   console.log(err)
				})
			},
			getStorage(){
				this.setdata = uni.getStorageSync('city')
				if(this.setdata.length == 0){
					this.ishistory = false
				}else{
					this.ishistory = true;
				}
			},
			onKeyInput(){
				this.search()
			},
			search(){
				if(this.searchdata == ''){
					this.HMmessages.show('请填写要输入的关键字',{icon:'error',iconColor:'white',fontColor:'white',background:"rgba(255,0,51,0.8)"})
				}else{
					// 搜索历史本地缓存
					const cityarr = uni.getStorageSync('city') || [];
					cityarr.unshift(this.searchdata);
					let newcity = Array.from(new Set(cityarr))
					// 判断长度是否过长
					if(newcity.length>8){
						newcity.pop()
					}
					uni.setStorageSync('city',newcity);
					this.getStorage();
					this.ishistory = false;
					// 模糊查询
					const db = wx.cloud.database()
					let keywords = {
						address:db.RegExp({
							regexp:this.searchdata,
							options:'m'
						})
					}
					selectData(keywords,'publish')
		            .then(res => {
					   if(res.length == 0){
						   this.nonedata = true;
						   this.localdata = []
					   }else{
						   this.localdata = res;
						   this.nonedata = false;
					   }
		            })
		            .catch(err => {
			           console.log(err)
		            })
				}
			},
			removeStorage(){
				this.setdata = [];
				this.searchdata = '';
				this.localdata = [];
				uni.removeStorageSync('city');
			},
			localContent(idx){
				uni.navigateTo({
					url:'../details/details?id=' + idx
				})
			}
		}
	}
</script>

<style scoped>
@import '../../commons/css/uni.css';
.search{
	height: 70upx;
	line-height:70upx;
	width:100%;
	display:flex;
	flex-direction: row;
	background: #f8f8f8;
	border-top-left-radius:50upx;
	border-bottom-left-radius:50upx;
	border-bottom-right-radius:50upx;
	margin-left:20upx;
}
.search input{
	height:70upx;
	line-height: 70upx;
	width:100%;
	font-size:30upx;
	color:#666;
	padding-left: 30upx;
}
.search-cont{
	display:flex;
	justify-content: space-between;
	heiht:70upx;
	align-items: center;
	padding:30upx 0;
}
.search-code{
	width:150upx;
	height:50upx;
	text-align: center;
	font-size:30upx;
}
.search-history{
	margin:20upx;
}
.search-title{
	font-size:30upx;
	font-weight:bold;
	display:flex;
	justify-content: space-between;
	align-items: center;
	height:60upx;
	line-height:60upx;
}
.search-title image{
	width:36upx;
	height:36upx;
	display:block;
}
.menu-block view{
	background:#f7f8fa;
	border-radius:6upx;
	font-size:27upx;
	color:#292c33;
	text-align: center;
	padding:10upx;
	margin:20upx 20upx 0 0;
}
.menu-block{
	display:flex;
	flex-direction: row;
	justify-content: flex-start;
	flex-wrap: wrap;
}
.newing{
	padding-bottom:30upx;
}
.userinfo image{
	width:50upx;
	height:50upx;
	border-radius: 50upx;
}
.userinfo text{
	padding-left:20upx;
}
.userinfo{
	padding-top:20upx;
}
</style>
