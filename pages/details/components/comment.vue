<template>
	<view>
		<!-- 评论 -->
		<view class="cont-message cont-back" id="message">
			<view class="img-video">宝贝评价{{leaveword.length}}</view>
			<!-- 分类 -->
			<view class="menu-block">
				<block v-for="(item,index) in newmessage" :key="index">
					<view :class="{'activetext':index == num}" @click="menubtn(index)">{{item}}</view>
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
						<text>{{item.usermess}}</text>
					</view>
				</view>
			</block>
		</view>
		<!-- 评论按钮 -->
		<view class="evaluation" @click="popup()">
			<input type="text" placeholder="我来说两句" disabled="disabled">
		</view>
		<!-- 评论框 -->
		<view class="Comment-box" v-if="box">
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
	export default{
		components:{
			HMmessages,
			Modal
		},
		props:{
			
		},
		data(){
			return{
				num:0,
				newmessage:["全部","服务不好"],
				box:false,
				comment:'',
				leaveword:[
					{
						avatarUrl:"https://thirdwx.qlogo.cn/mmopen/vi_32/3LKDIliaay8SsfWfzTQA2d9B3JqCv3LRyU3lG5iaXbV9MIISSJEpEQVSnUvPUdpVbwCosGapJPavXgBcdmHFtSZw/132",
						nickName:'Vicky',
						time:'2020-9-5 9:49:0',
						usermess:'真好玩！'
					},
					{
						avatarUrl:"https://thirdwx.qlogo.cn/mmopen/vi_32/3LKDIliaay8SsfWfzTQA2d9B3JqCv3LRyU3lG5iaXbV9MIISSJEpEQVSnUvPUdpVbwCosGapJPavXgBcdmHFtSZw/132",
						nickName:'Vicky',
						time:'2020-9-5 9:49:0',
						usermess:'玩起来雕塑爱好读完浅黄色的u爱护动物前后赌气的话！'
					},
					{
						avatarUrl:"https://thirdwx.qlogo.cn/mmopen/vi_32/3LKDIliaay8SsfWfzTQA2d9B3JqCv3LRyU3lG5iaXbV9MIISSJEpEQVSnUvPUdpVbwCosGapJPavXgBcdmHFtSZw/132",
						nickName:'Vicky',
						time:'2020-9-5 9:49:0',
						usermess:'苏地区和度恒温i去大户漆黑的u契合度其后对其厚度武器和对其会对我去的确很大！'
					}
				]
			}
		},
		methods:{
			menubtn(index){
				this.num = index;
			},
			popup(){
				this.box = true;
			},
			cancel(){
				this.box = false;
			},
			submit(){
				if(this.comment == ''){
					this.HMmessages.show('请填写评论',{icon:'error',iconColor:'white',fontColor:'white',background:"rgba(255,0,51,0.8)"})
				}else{
					this.box = false;
				}
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
