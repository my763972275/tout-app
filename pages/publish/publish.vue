<template>
	<view>
		<view class="travels">
			<!-- 分类 -->
			<!-- HBuilderx 向左缩进快捷键 shift+Tab 向右缩进 ctrl+Tab -->
			<view class="classify-view">
				<view class="classify-text">分类</view>
				<block v-for="(item,index) in fication" :key ="index">
					<view class="classify">
						<text :class="{'activetext':index == num}" @click="menubtn(index)">{{item.name}}</text>
					</view>
				</block>
			</view>
			<!-- 标题 -->
			<view class="travels-title">
				<input type="text" placeholder="给旅行日记起个标题吧" class="place-text" v-model="titledata">
			</view>
			<!-- 描述 -->
			<view class="travels-describe">
				<textarea  placeholder="描述下你的旅行心得,相助更多旅行的人" v-model="tipsdata"/>
			</view>
		</view>
		<!-- 上传图片 -->
		<view class="travels-image">
			<view class="topimg">
				<image src="../../static/camera.png" mode="widthFix" @click="uploadImg"></image>
				<text>上传图片</text>
			</view>
			<!-- 九宫格 -->
			<view class="content">
				<block v-for="(item,index) in topimg" :key="index">
					<view class="content-img">
						<image :src="item" mode="aspectFill" class="uploadimg" @click="preImg(index)"></image>
						<image src="../../static/clear.png" mode="widthFix" class="deleteimg" @click="deleteImg(index)"></image>
					</view>
				</block>
			</view>
		</view>
		<!-- 上传视频 -->
		<view class="travels-video">
			<view class="topimg">
				<image src="../../static/video.png" mode="widthFix" @click="uploadVideo"></image>
				<text>上传视频</text>
			</view>
			<view class="uploadvideo" v-if="uploadvideos">
				<!-- poster参数设置视频封面 -->
				<video :src="videos" controls objectFit="cover"></video>
				<!-- <view class="pause"></view> -->
				<image class="deleteimg" @click="deleteVideo" src="../../static/clear.png" mode="widthFix"></image>
			</view>
		</view>
		<!-- 定位 -->
		<view class="address">
			<view class="address-text">你在哪里</view>
			<view class="address-site">
				<image src="../../static/map.png" mode="widthFix"></image>
				<text>{{address}}</text>
			</view>
			
		</view>
		<view  class="publish" @click="publishContext">发布</view>
		<HMmessages ref="HMmessages" @complete="HMmessages = $refs.HMmessages"></HMmessages>
	</view>
</template>

<script>
	import { previewImg } from '../../commons/js/common.js';
	import {mapState} from 'vuex';
	import {locationData} from '../../commons/js/list.js';
	import HMmessages from "@/element/HM-messages/HM-messages.vue"
	export default {
		name:'travels',
		components:{
			HMmessages
		},
		data() {
			return {
				num:0,
				address:'',
				titledata:'',
				tipsdata:'',
				topimg:[],
				videos:'',
				uploadvideos:false,
				fication:[
					{
						name:"景点"
					},
					{
						name:"美食"
					},
					{
						name:"网红打卡"
					}
				]
			}
		},
		onLoad() {
			uni.getSystemInfo({
			    success: function (res) {
					console.log(res.statusBarHeight)
			        console.log(res.model);
			        console.log(res.pixelRatio);
			        console.log(res.windowWidth);
			        console.log(res.windowHeight);
			        console.log(res.language);
			        console.log(res.version);
			        console.log(res.platform);
			    }
			});
		},
		created() {
			this.getLocation()
		},
		methods: {
			menubtn(index){
				this.num = index
			},
			// 图片预览
			preImg(index){
				// 预览图片
				previewImg(this.topimg,index)
			},
			// 上传图片
			uploadImg(){
				uni.showLoading({
					title:'上传中',
					icon:'../../static/loading.svg'
				})
				uni.chooseImage({
					count: 6, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: res => {
					 uni.hideLoading();
					 this.topimg = [...this.topimg,...res.tempFilePaths];
					}
				})
			},
			// 上传视频
			uploadVideo(){
				var self = this;
				uni.showLoading({
					title:'上传中',
					icon:'../../static/loading.svg'
				})
				uni.chooseVideo({
					count: 1,
					maxDuration:20,
					sourceType: ['camera', 'album'],
					success: function (res) {
						uni.hideLoading();
						self.uploadvideos = true;
						self.videos = res.tempFilePath;
					}
				});
			},
			// 删除图片
			deleteImg(index){
				this.topimg.splice(index,1);
			},
			// 删除视频
			deleteVideo(){
				this.videos = '';
				this.uploadvideos = false;
			},
			getLocation(){
				locationData()
				.then(res => {
					this.address = res.result.ad_info.city
				})
				.catch(err => {
					console.log(err)
					// this.addressVal = '无锡市'
				})
			},
			// 发布函数
			publishContext(){
				let data ={
					classifydata:this.fication[this.num].name,
					title:this.titledata,
					content:this.tipsdata,
					album:this.topimg,
					video:this.videos,
					address:this.address
				}
				console.log(data)
			}
		}
	}
</script>

<style scoped>
.travels{
	padding:10upx 20upx;
}
.classify text{
	display: block;
	font-size:27upx;
	color:#14181e;
	background:#f7f7f7;
	padding:10upx 20upx;
	border-radius: 20upx;
	margin:0 30upx;
}
.classify{
	display: flex;
}
.classify-text{
	font-size:30upx;
	color:#14181e;
	font-weight:bold;
}
.classify-view{
	display:flex;
	justify-content: flex-start;
	align-items: center;
}
.activetext{
	background:#ffdd00 !important;
}
.place-text{
	color:#808080 !important;
	font-size:30upx;
}
.travels-title{
	margin:40upx 0;
}
.travels-describe textarea{
	width:100%;
	color:#808080 !important;
	font-size:30upx;
}
.topimg{
	padding-left: 20upx;
	padding-top:10upx;
	width:150upx;
	height:150upx;
	border-radius: 20upx;
}
.topimg image{
	display:block;
	width:80upx;
	height:80upx;
}
.topimg text{
	text-align: center;
	font-size:22upx;
}
.content{
	display:flex;
	flex-wrap: wrap;
	margin-left:4px;
	margin-right: 4px;
}
.content-img{
	width:calc((100% / 4) - 8px) !important;    margin:8upx;
    height:176upx;
	position:relative;
}
.uploadvideo{
	margin:0 8upx;
	border-radius: 5upx;
}
.uploadvideo video{
	width:100%;
	height:400upx;
	position:relative;
	border-radius: 5upx;
}
.deleteimg{
	position:absolute;
	width:35upx;
	height: 35upx;
	top:-15upx;
	right:-15upx;
}
.uploadimg{
	width:100% !important;
	height:100% !important;
	border-radius: 10upx;
}
/* 绘制播放三角形的写法 */
.pause{
	position:absolute;
	width: 0;
	height: 0;
	border-top: 50px solid transparent;
	border-left: 100px solid #c0c0c0;
	border-bottom: 50px solid transparent;
}
.publish{
	width:100%;
	height:100upx;
	line-height: 100upx;
	text-align: center;
	background: #ffdd00;
	position:fixed;
	bottom:0;
	left:0;
	right:0;
	z-index:999;
	font-size:40upx;
}
.address-site{
	display:flex;
	align-items: center;
}
.address-site image{
	width:40upx;
	height:40upx;
	margin-right:10upx;
}
.address-site text{
	font-size: 30upx;
	color:#00a2ff;
}
.address-text{
	font-size:30upx;
	color:#333;
	padding-right:40upx;
}
.address{
	display:flex;
	background:#f1f1f1;
	padding:20upx 0 20upx 20upx;
	margin-bottom:160upx;
	margin-top:30upx;
}
</style>
