<template>
	<view>
		<view class="myhome">
			<!-- 已登录 -->
			<block v-for="(item,index) in username" :key="index">
				<view class="wx-name" v-if="wxlogin">
					<view>
						<image :src="item.avatarUrl"></image>
					</view>
					<view class="wx-text">
						<text>{{item.nickName}}</text>
						<text>领取会员</text>
					</view>
				</view>
			</block>
			<!-- 未登录 -->
			<view class="wx-button" v-if="!wxlogin">
				<view class="wx-button-view">登录生如夏花，开启授权</view>
				<view>
					<button plain="true" open-type="getUserInfo" @getuserinfo="getUserInfo">去登陆</button>
				</view>
			</view>
		</view>
		<!--  -->
	</view>
</template>

<script>
	export default{
		data(){
			return{
				wxlogin:false,
				username:[
					{
						nickName:'vicky',
						avatarUrl:'https://thirdwx.qlogo.cn/mmopen/vi_32/3LKDIliaay8SsfWfzTQA2d9B3JqCv3LRyU3lG5iaXbV9MIISSJEpEQVSnUvPUdpVbwCosGapJPavXgBcdmHFtSZw/132',
					}
				]
			}
		},
		methods:{
			getUserInfo(e){
				
			},
			ifUser(){
				
			}
		},
		onShow(){
			// 判断用户是否登录
			this.ifUser();
		}
		
		
	}
</script>

<style scoped>
	.myhome{
		background: linear-gradient(to top,#ffe566 10% ,#ffd300 100%);
		height:350upx;
		display:flex;
		align-items: center;
	}
	.wx-name image{
		width:120upx !important;
		height:120upx !important;
		margin-right: 20upx;
		border-radius: 50%;
		border:10upx solid #999;
	}
	text{
		display:block;
		magin:10upx 0;
		color:#999;
	}
	.wx-name{
		display:flex;
		align-items: center;
		padding:0 30upx;
		align-content: center;
		height:200upx;
	}
	.wx-text text:nth-child(1){font-size: 35upx;}
	.wx-text text:nth-child(2){
		font-size:20upx;
		border:1upx solid white;
		border-radius:50%;
		padding:7upx;
		text-align: center;
	}
	.wx-button button{
		border:none;
		font-size:30upx;
		background:linear-gradient(to right,#28a6f1 10%,#0e8dd7 80%);
		color:white;
		border-radius: 50upx;
	}
	.wx-button{
		margin:0 auto;
	}
	.wx-button-view{
		font-size:35upx;
		color:white;
		margin-bottom:25upx;
	}
</style>
