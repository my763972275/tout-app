<template>
	<view style="margin-top:20upx;">
		<view class="cont-back">
			<view class="img-video">图片视频介绍</view>
			<view>
				<video objectFit="fill" @error="videoErrorCallback" @play="playcall" v-if="videoing" :src="video"></video>
				<view class="cont-introduce">
					<block v-for="(item,index) in imgArr" :key="index">
						<image :src="item" mode="widthFix"></image>
					</block>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		name:'matter',
		props:{
			imgArr:Array,
			video:String
		},	
		data(){
			return{
				videoing:false
			}
		},
		onLoad() {
			uni.showToast({
				icon:'../../../static/loading.svg'
			})
		},
		watch:{
			video(newValue,oldValue){
				if(newValue.video != ''){
					this.videoing = true;
				}
			}
		}
	}
</script>

<style scoped>
	.cont-back{
		width:95%;
		margin:0 auto;
		padding: 20upx;
		background: white;
	}
	.cont-back video{
		width:100%;	
		margin-bottom:5upx;
	}
	.cont-back .cont-introduce image{
		width:100%;	
		margin-bottom:5upx;
	}
	.img-video{
		font-size:40upx;
	}
</style>
