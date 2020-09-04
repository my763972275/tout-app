<template>
	<view>
		<view class="warp" v-show="modalshow">
			<view class="warp-view">
				<view class="warp-text">{{message}}</view>
				<view class="warp-flex">
					<button plain="true" @click="cancel">取消</button>
					<button plain="true" open-type="getUserInfo" @getuserinfo="getUserInfo">去登陆</button>
				</view>
			</view>
		</view>
		<HMmessages ref="HMmessages" @complete="HMmessages = $refs.HMmessages"></HMmessages>
	</view>
</template>

<script>
	import {addDatabase} from '../commons/js/cloudFun.js';
	import HMmessages from "@/element/HM-messages/HM-messages.vue"
	export default{
		components:{
			HMmessages
		},
		data(){
			return{
				modalshow:false,
				message:''
			}
		},
		methods:{
			init(message){
				this.modalshow = true;
				this.message = message;
			},
			cancel(){
				this.modalshow = false;
			},
			getUserInfo(e){
				// 存储用户信息到user数据库
				let user = e.detail.userInfo
				addDatabase(user,'user')
				.then(res => {
					this.modalshow = false;
					this.HMmessages.show('登录成功',{icon:'success',iconColor:'black',fontColor:'black',background:"rgba(0,255,20,0.8)"})
				})
				.catch(err => {
					console.log(err)
				})
			}
		}
	}
</script>

<style scoped>
	.warp{
		position:fixed;
		left:0;
		right:0;
		top:0;
		bottom:0;
		background:rgba(0,0,0,0.6);
		z-index:9999;
	}
	.warp-view{
		width:500upx;
		height:200upx;
		background:white;
		margin:auto;
		position: absolute;
		-webkit-position:absolute;
		top:0;
		left:0;
		bottom:0;
		right:0;
		border-radius: 8upx;
		overflow: hidden;
	}
	.warp-text{
		text-align: center;
		margin-top:30upx;
		font-size: 34upx;
		color:#666;
	}
	.warp-flex{
		display:flex;
		justify-content: space-around;
		border-top:1upx solid #EEE;
		position: absolute;
		bottom:0;
		left:0;
		right:0;
		height:80upx;
		line-height:80upx;
		-webkit-transform:translateZ(0);
	}
	.warp-flex button{
		border:none;
		flex:1;
		font-size:30upx;
	}
	.warp-flex button:nth-child(2){
		background:#007AFF;
		color:white;
	}
</style>
