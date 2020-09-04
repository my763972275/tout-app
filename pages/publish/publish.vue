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
		<view class="publish" @click="publishContext">发布</view>
		<HMmessages ref="HMmessages" @complete="HMmessages = $refs.HMmessages"></HMmessages>
		<!-- 登录模态框 -->
		<Modal ref="modal"></Modal>
	</view>
</template>

<script>
	import { previewImg,timer } from '../../commons/js/common.js';
	import {mapState} from 'vuex';
	import {locationData} from '../../commons/js/list.js';
	import HMmessages from "@/element/HM-messages/HM-messages.vue"
	import Modal from '../../element/modal.vue';
	import {home,addDatabase,uploadFiles} from '../../commons/js/cloudFun.js'
	export default {
		name:'travels',
		components:{
			HMmessages,
			Modal
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
				avatarUrl:'',
				nickName:'',
				openid:'',
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
				],
				formData:{}
			}
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
				wx.showLoading({
					title:'上传中',
					icon:'../../static/loading.svg'
				})
				uni.chooseImage({
					count: 6, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: res => {
					 wx.hideLoading();
					 this.topimg = [...this.topimg,...res.tempFilePaths];
					}
				})
			},
			// 上传视频
			uploadVideo(){
				var self = this;
				wx.showLoading({
					title:'上传中',
					icon:'../../static/loading.svg'
				})
				uni.chooseVideo({
					count: 1,
					maxDuration:20,
					sourceType: ['camera', 'album'],
					success: function (res) {
						wx.hideLoading();
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
			// 获取当前位置
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
			// 必填项校验提示
			publishContext(){
				if(this.titledata == ''){
					this.HMmessages.show('标题必填',{icon:'error',iconColor:'white',fontColor:'white',background:"rgba(255,0,51,0.8)"})
				}else if(this.tipsdata == ''){
					this.HMmessages.show('描述必填',{icon:'error',iconColor:'white',fontColor:'white',background:"rgba(255,0,51,0.8)"})
				}else{
					wx.showLoading({
						title:'发布中',
						mask:true
					})
					this.userInfo()
				}
			},
			// 判断用户是否登录
			userInfo(){
				// 请求数据库查看用户是否存在，存在就是登录，反之未登录
				home('user')
				.then(res => {
					// 用户没有登录
					if(res.length == 0){
						let message = '请登陆后再操作'
						// dom更新循环结束之后的延迟回调
						this.$nextTick(() =>{
							this.$refs.modal.init(message)
						})
					}else{
						this.avatarUrl = res[0].avatarUrl;
						this.nickName = res[0].nickName;
						this.openid = res[0]._openid;
						this.userdata()
					}
				})
				.catch(err => {
					console.log(err)
				})
			},
			// 用户上传数据到数据库 1.先上传图片到云存储 2.上传视频到云存储 3.上传所有数据到数据库
			async userdata(){
				// 先将图片上传到云存储
				let staticimg = await this.staticImg();
				// 将视频上传到云存储
				if(this.videos != ''){
					var staticvideo = await this.staticVideo();
				}
				
				let users = {
					classifydata:this.fication[this.num].name,
					title:this.titledata,
					content:this.tipsdata,
					album:staticimg,
					video:staticvideo,
					address:this.address,
					avatarUrl:this.avatarUrl,
					nickName:this.nickName,
					openid:this.openid,
					time:timer()
				}
				// 上传参数到云数据库
				addDatabase(users,'publish')
				.then(res => {
					this.$store.commit('routmuta',true)
				    wx.hideLoading();
					this.HMmessages.show('发布成功',{icon:'success',iconColor:'black',fontColor:'black',background:"rgba(0,255,20,0.8)"})
					uni.switchTab({
						url:'../strategy/strategy'
					})
				})
				.catch(err => {
					console.log(err)
				})
			},
			// 上传图片到云数据库
			staticImg(){
				// 把上传成功返回的图片放到数组里
				var imgFileID = []
				return new Promise((resolve,reject) => {
					this.topimg.forEach(item => {
						// 随机字符串拼接，防止图片url被重名覆盖
						let imgion = item.lastIndexOf('.')
						let eximg = item.slice(imgion);
						let cloudpath =  Date.now() + Math.floor(Math.random(0,1) * 10000000) + eximg;
						uploadFiles(cloudpath,item,'static')
						.then(res => {
							imgFileID.push(res);
							// 判断云存储返回的图片是否和用户上传的图片一样多
							if(imgFileID.length == this.topimg.length){
								resolve(imgFileID)
							}
						})
						.catch(err => {
							reject(err)
						})
					})
				})
			},
			// 上传视频到云数据库
			staticVideo(){
				return new Promise((resolve,reject) => {
					let videoion = this.videos.lastIndexOf('.')
					let exvideo = this.videos.slice(videoion);
					let videopath =  Date.now() + Math.floor(Math.random(0,1) * 10000000) + exvideo;
						uploadFiles(videopath,this.videos,'videos')
						.then(res => {
							resolve(res)
						})
						.catch(err => {
							reject(err)
						})
					
				})
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
