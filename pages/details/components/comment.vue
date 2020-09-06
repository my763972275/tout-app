<template>
	<view>
		<!-- 评论 -->
		<view class="cont-message cont-back" id="message">
			<view class="img-video">宝贝评价({{leaveword.length}})</view>
			<!-- 分类 -->
			<view class="menu-block">
				<block v-for="(item,index) in newmessage" :key="index">
					<view :class="{'activetext':index == num}" @click="menubtn(index,item)">{{item}}</view>
				</block>
			</view>
			<!-- 评价 -->
			<block v-for="(item,index) in leaveword" :key="index">
				<view class="message-dist">
					<view class="users-message">
						<view class="cont-name">
							<image mode="widthFix" :src="item.avatarUrl"></image>
							<text>{{item.nickName}}</text>
						</view>
						<!-- 时间 -->
						<view class="message-time">
							{{item.time.substr(0,9)}}
						</view>
					</view>
					<view class="cont-name-text">
						<text>{{item.comment}}</text>
					</view>
				</view>
			</block>
		</view>
		<!-- 评论按钮 -->
		<view class="evaluation" @click="popup()">
			<input type="text" placeholder="我来说两句" disabled="disabled">
		</view>
		<!-- 评论框 -->
		<view class="Comment-box" v-if="box" :catchtouchmove="true">
			<view class="Comment-text">
				<textarea v-model="comment" placeholder="写下你对这篇游记的评价" />
			</view>
			<!-- 发表按钮 -->
			<view class="published">
				<view @click="cancel">取消</view>
				<view @click="submit">发表</view>
			</view>
		</view>
		<HMmessages ref="HMmessages" @complete="HMmessages = $refs.HMmessages"></HMmessages>
		<!-- 引入模态框 -->
		<Modal ref="modal"></Modal>
	</view>
</template>

<script>
	import HMmessages from "@/element/HM-messages/HM-messages.vue";
	import Modal from "../../../element/modal.vue";
	import {selectData,addDatabase,home} from '../../../commons/js/cloudFun.js'
	import { timer } from '../../../commons/js/common.js';
	export default{
		components:{
			HMmessages,
			Modal
		},
		props:{
			commentid:String,
			leaveword:Array,
			messageword:Array
		},
		watch:{
			messageword(newvalue,oldvalue){
				this.newmessage = ['全部',...newvalue];
				// this.num = 0;
			}
		},
		data(){
			return{
				num:0,
				name:'全部',
				box:false,
				comment:'',
				avatarUrl:'',
				nickName:'',
				openid:'',
				flag:false,
				newmessage:[]
			}
		},
		methods:{
			getCommentList(){
				selectData({id:this.commentid},'comment')
				.then(res => {
					this.leaveword = res
				})
				.catch(err => {
					console.log(err)
				})
			},
			aiMessage(){
				return new Promise((resolve,reject) => {
					wx.cloud.callFunction({
						name:'aimessage',
						data:{
							message:this.comment
						}
					})
					.then(res => {
						let aidata = res.result.aimessage.items
						resolve(aidata);
					})
					.catch(err => {
						reject(err)
					})
				})
			},
			menubtn(index,name){
				this.num = index;
				this.name = name;
				this.$parent.fatherMethod(this.commentid,this.name);
			},
			// 显示评论框
			popup(){
				// 评论之前先判断用户是否登录
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
						this.box = true;
					}
				})
				.catch(err => {
					console.log(err)
				})
				
			},
			cancel(){
				this.box = false;
				this.comment = '';
			},
			async submit(){
				if(this.comment == ''){
					this.HMmessages.show('请填写评论',{icon:'error',iconColor:'white',fontColor:'white',background:"rgba(255,0,51,0.8)"})
				}else{
					let stamess = await this.aiMessage();
					console.log(stamess)
					if(stamess.length == 0){
						// 提交到数据库 
						await this.messdata('')
					}else{
						// 百度返回标签不为空
						let ali = stamess[stamess.length - 1]
						let [prop,adj] = [ali.prop,ali.adj]
						let classif = prop+adj;
						// 提交到数据库
						await this.messdata(classif)
					}
				}
			},
			// 把所有数据提交到数据库
			messdata(classif){
				uni.showLoading({
					title:'上传中...'
				})
				return new Promise((resolve,reject) => {
					let commentdata = {
						id:this.commentid,
						avatarUrl:this.avatarUrl,
						nickName:this.nickName,
						openid:this.openid,
						comment:this.comment,
						classify:classif,
						time:timer()
					}
					addDatabase(commentdata,'comment')
					.then(res => {
						this.box = false;
						this.flag = true;
						uni.hideLoading();
						this.HMmessages.show('评论成功',{icon:'success',iconColor:'black',fontColor:'black',background:"rgba(0,255,0,0.8)"})
						// 清空输入框
						this.comment = '';
						// 留言成功，刷新留言数据，用户实时看到，执行父组件的方法
						// 子组件调用父组件的方法
						this.$parent.fatherMethod(this.commentid,this.name);
						
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
	.cont-message{
		margin-top:20upx;
		margin-bottom: 80upx;
	}
	.cont-back{
		padding:20upx;
		background: white;
	}
	.img-video{
		color:#333;
		font-size:30upx;
		font-weight: bold;
		padding:20upx 0;
	}
	.users-message{
		display:flex;
		justify-content: space-between;
		height:50upx;
		align-items: center;
		margin-bottom: 15upx;
	}
	.message-time{
		font-size: 25upx;
		color:#a8a8a8;
	}
	.cont-name image{
		width:50upx !important;
		height:50upx !important;
		border-radius: 50%;
		margin-right:9upx;
	}
	.cont-name text{
		font-size:30upx;
		color:#a8a8a8;
	}
	.cont-name{
		display:flex;
		align-items: center;
		height:50upx;
	}
	.cont-name-text text{
		font-size:27upx;
		color:#333;
		line-height: 1.5;
		display:-webkit-box;
		-webkit-box-orient:vertical;
		-webkit-line-clamp:2;
		overflow: hidden;
	}
	.message-dist{
		margin-bottom: 30upx;
		border-bottom: 1upx solid #f8f8f8;
		padding-bottom:25upx;
	}
	.evaluation{
		background: #f8f8f8;
		position:fixed;
		bottom:0;
		left:0;
		right:0;
		height:90upx;
		display:flex;
		align-items:center;
	}
	.evaluation input{
		font-size:30upx;
		color:#9a9a9a;
		background:#f0f0f0;
		height:70upx;
		width:100%;
		border-radius:50upx;
		margin:0 30upx;
		padding-left:10upx;
	}
	.Comment-text textarea{
		width:100%;
		color:#808080 !important;
		padding: 8upx;
		font-size:30upx;
	}
	.Comment-text{
		background:white;
		padding-top:70upx;
	}
	.Comment-box{
		position:fixed;
		top:0;
		bottom:0;
		right:0;
		left:0;
		background:#F1F1F1;
		z-index:9999;
	}
	.activetext{
		color:#4CD964;
		background:#ffdd00 !important;
		border:1px solid #ffdd00 !important;
	}
	.published view{
		font-size:35upx;
		background: #ffdd00;
		width:200upx;
		text-align: center;
		padding:10upx 0;
		border-radius: 10upx;
	}
	.published{
		display:flex;
		justify-content: space-around;
		margin-top:20upx;
	}
	.menu-block view{
		background-color: white;
		border:1px solid #c2c5cc;
		border-radius:6upx;
		font-size:25upx;
		color:#292c33;
		font-weight:bold;
		text-align: cener;
		padding:15upx;
		margin:15upx;
	}
	.menu-block{
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		flex-wrap:wrap;
	}
</style>
