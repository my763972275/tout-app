<template>
	<view>
		<view class="address">
			<view class="address-img"><image src="cloud://travel-pbvky.7472-travel-pbvky-1302868032/list/bg1.jpg" mode="widthFix"></image></view>
			<view class="address-list">
				<view class="address-text">
					<text class="words">{{ address }}</text>
					<view class="changeAddress"  @click="chooseCity">
						<text>切换</text>
						<image src="../../../static/more.webp" mode="widthFix" ></image>
					</view>
				</view>
				<text class="words-eng">{{ eng }}</text>
			</view>
			<!-- 阴影 -->
			<view class="back"></view>
			<view class="menu">
				<view class="video">视频</view>
				<view class="video album">相册</view>
			</view>
		</view>
		<!-- 机票 -->
		<view class="Plane"></view>
	</view>
	
</template>

<script>
export default {
	name: 'address',
	props:{
		address:String
	},
	data() {
		return {
			eng:'WuXi'
		};
	},
	methods: {
		// 选择城市
		chooseCity() {
			uni.navigateTo({
				url:'../city/city?name=' + this.address
			})
		}
	}
};
</script>

<style scoped>
.address-text {
	display: flex;
	align-items: center;
}
.address-text image {
	width: 33upx;
	height: 33upx;
	padding-left: 30upx;
}
.address {
	position: relative;
	height: 400upx;
}
.address-list {
	position: absolute;
	left: 50upx;
	top: 100upx;
	z-index: 999;
}
.address-img {
	width: 100%;
	height: 400upx;
}
.address-img image {
	width: 100% !important;
	height: 100% !important;
}
.changeAddress{
	background-color: #F1F1F1;
	width:110upx;
	height:55upx;
	border-radius: 50upx;
	line-height:55upx;
	padding-left: 20upx;
	margin-left:25upx;
	display:inline-block;
}
.changeAddress image{
	margin-left:-20upx;
	vertical-align: middle;
	margin-top:-8upx;
}
.menu{
	position:absolute;
	bottom:8upx;
	right:10upx;
	width: 200upx;
	height:75upx;
	display:flex;
	flex-direction: row;
	justify-content: center;
}
.menu .video{
	width:45%;
	height:50upx;
	line-height:50upx;
	background-color: rgba(0,0,0,0.3);
	border-radius: 30upx;
	color:white;
	text-align: center;
	border:1upx solid white;
	font-size:22upx;
}
.menu .album{
	margin-left:20upx;
}
.words {
	font-size: 50upx;
	color: white;
	font-weight: bold;
}
.words-eng {
	font-size: 50upx;
	color: white;
}
.back {
	background: rgba(0, 51, 0, 0.3);
	position: absolute;
	top: 0;
	left: 0;
	height: 400upx;
	width: 100%;
}
/* 机票 */
.Plane{
	position:absolute;
	top:440upx;
	width: 95%;
	border-radius: 20upx;
	height: 150upx;
	margin: 0 20upx;
	/* background-image:linear-gradient(to right,#ffffff 0%, #f2f3ff 100%); */
	background-image:linear-gradient(to right,#ccffff 0%, #ffcc00 100%);
}

</style>
