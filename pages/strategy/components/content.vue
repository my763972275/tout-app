<template>
	<view class="active">
		<view class="content">
			<block v-for="(item,index) in publishData" :key="index">
				<view class="content-article" @click="localCont(item._id)">
					<view class="content-img">
						<image :src="item.album[0]" mode="aspectFill"></image>
					</view>
					<!-- 文字介绍 -->
					<view class="active-introduce">
						<view class="active-name">{{item.title}}</view>
						<view class="active-title">{{item.content}}</view>
					</view>
						<!-- <view class="active-label">{{item.label}}</view> -->
						<view class="purchase userInfo">
							<!-- <text class="active-price">￥{{item.price}}</text> -->
							<image :src="item.avatarUrl" mode="widthFix"></image>
							<text class="active-purchase">{{item.nickName}}</text>
						</view>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			publishData:Array
		},
		data(){
			return{
			
			}
		},
		methods:{
			// 点击跳转到当前标题的详细页面
			localCont(id){
				uni.navigateTo({
					url:'../../details/details?id=' + id
				})
			}
		}
	}
</script>

<style scoped>
	@import '../../../commons/css/uni.css';
	/* 用户头像 */
	.userInfo image{
		width:50upx;
		height:50upx;
		border-radius:50upx;
	}
	.userInfo text{
		padding-left:20upx;
	}
	.userInfo{
		padding-top:20upx;
	}
</style>
