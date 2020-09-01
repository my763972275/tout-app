<template>
	<view>
		<swiper 
		:indicator-dots="true" 
		:autoplay="true" 
		:interval="3000" 
		:duration="1000" 
		:circular="true" 
		indicator-color="white" 
		indicator-active-color="#ffd300">
			<block v-for="(item, index) in banner" :key="index">
				<swiper-item>
					<view class="swiper-item" id="swiper-item" @click="localCont()">
						<image :src="item.image" mode="widthFix" class="imageurl animated fadeIn"></image>
					</view>
				</swiper-item>
			</block>
		</swiper>
	</view>
</template>

<script>
export default {
	name: 'swiper',
	props:{
		banner:Array
	},
	data() {
		return {
			
		};
	},
	methods:{
		localCont(){
			
		}
	}
};
</script>

<style scoped>
	.imageurl{
		width:100%;
		height:300upx !important;
	}
	.swiper-item{
		width:100%;
		height:300upx !important;
		z-index:1000;
	}
</style>
