<template>
	<view class="search-cont">
		<view class="searchCode"><image src="../static/scan.png" mode="widthFix"></image></view>
		<view class="search">
			<image src="../static/search.png" mode="widthFix" class="search-img"></image>
			<input type="text" placeholder="请输入关键字" disabled />
		</view>
		<view class="searchCode"><image src="../static/news.png" mode="widthFix"></image></view>
	</view>
</template>

<script>
export default {
	name: 'search',
	data() {
		return {};
	}
};
</script>

<style scoped>
	.search-cont{
		display:flex;
		justify-content: space-between;
		height:70upx;
		align-items: center;
		background:linear-gradient(to top, #ffe566 10%, #ffd300 100%);
		padding: 30upx 0;
	}
.searchCode {
	width: 50upx;
	height: 50upx;
	padding: 0 15upx;
}
.searchCode image {
	width: 50upx;
	height: 50upx;
}
.search-img {
	width: 40upx;
	height: 40upx;
	margin:auto 0 auto 20upx;
}
.search {
	height: 70upx;
	width:100%;
	display:flex;
	flex-direction: row;
	line-height: 70upx;
	background: #fff7d4;
	border-top-left-radius: 50upx;
	border-bottom-left-radius: 50upx;
	border-bottom-right-radius: 50upx;
}
.search input{
	height:70upx;
	line-height:70upx;
	width:100%;
	font-size:30upx;
	color:#666;
}
</style>
