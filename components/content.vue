<template>
	<view class="active">
		<view class="content">
			<block v-for="(item,index) in recomment" :key="index">
				<view class="content-article" @click="localCont">
					<view class="content-img">
						<image :src="item.image" mode="aspectFill" class="animated fadeIn"></image>
					</view>
					<!-- 文字介绍 -->
					<view class="active-introduce">
						<view class="active-name">{{item.title}}</view>
						<view class="active-title">{{item.list}}</view>
						<view class="active-label">{{item.label}}</view>
						<view class="purchase">
							<text class="active-price">￥{{item.price}}</text>
							<text class="active-purchase">{{item.buy}}人已购</text>
						</view>
					</view>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			recomment:Array
		},
		data() {
			return {
			
			};
		},
		methods:{
			localCont(){
				
			}
		}
	}
</script>

<style scoped>
	@import '../commons/css/uni.css';
/* .active{
	margin:0 20upx;
}
.content{
	display:flex;
	flex-wrap: wrap;
	justify-content: space-between;
	width:100%;
	-webkit-flex-wrap:wrap;
	overflow: hidden;
}
.content-article{
	width:48%;
	flex-direction: column;
	display:flex;
	box-sizing: border-box;
}
.purchase{
	display:flex;
	align-items: center;
	padding-bottom: 10upx;
}
.content-img{
	height:400upx !important;
	object-fit: cover;   // 图片剪裁
	overflow: hidden;
}
.content-img image{
	width:100% !important;
	height:100% !important;
	object-fit: cover;
	border-radius:10rpx;
}
.active-name{
	font-size:32upx;
	color:#d0b083;
	margin:10upx 0;
	display: -webkit-box;
	-webkit-box-orient:vertical;
	-webkit-line-clamp:1;
	overflow: hidden;
}
.active-title{
	font-size: 32upx;
	color:#444444;
	font-weight:bold;
	line-height:50upx;
	display:-webkit-box;
	-webkit-box-orient:vertical;
	-webkit-line-clamp:2;
	overflow: hidden;
	height:100upx !important;
}
.active-label{
	font-size: 25upx;
	color:#d0b083;
	padding:10upx 0;
}
.active-price{
	font-size: 36upx;
	color:#ff6b28;
	padding-right: 9upx;
}
.active-purchase{
	font-size:30upx;
	color:#cacaca;
}
.active-introduce{
	padding-left:10upx;
} */
</style>
