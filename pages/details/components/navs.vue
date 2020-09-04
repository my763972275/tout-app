<template>
	<view>
		<view class="navs">
			<block v-for="(item,index) in navalue" :key="index">
				<text :class="{activetext:index == num}">{{item}}</text>
			</block>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				num:0,
				navalue:['宝贝','详情','评价']
			}
		}
	}
</script>

<style scoped>
	.navs text{
		display:block;
		font-size:30upx;
		width:100upx;
		text-align: center;
		color:#464230;
		margin-bottom:-8upx;
	}
	.navs{
		display:flex;
		justify-content: center;
		height:50upx;
		line-height: 50upx;
		padding:5upx 0;
	}
	.activetext{
		border-bottom: 6upx solid #C0C0C0;
	}
</style>
