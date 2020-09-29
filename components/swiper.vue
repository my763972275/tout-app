<template>
	<view>
		<view class="banner-posi">
			<view>
				<swiper
					:indicator-dots="true"
					:autoplay="true"
					:interval="3000"
					:duration="1000"
					:circular="true"
					indicator-color="white"
					indicator-active-color="#ffd300"
					@change="bannerFun"
				>
					<block v-for="(item, index) in banner" :key="index">
						<swiper-item>
							<view class="swiper-item" id="swiper-item" @click="localCont(index)">
								<image :src="item" mode="widthFix" class="imageurl" v-if="nav == 'details'"></image>
								<image :src="item.image" mode="widthFix" class="imageurl animated fadeIn" v-else></image>
							</view>
						</swiper-item>
					</block>
				</swiper>
			</view>
			<!-- 轮播数字 -->
			<view class="banner-num" v-if="nav == 'details'">
				<text>{{ bannerIndex }}/{{ banner.length }}</text>
			</view>
		</view>
		<!-- 标题 -->
		<view class="cont-back" v-if="nav == 'details'">
			<view class="title-con">{{ title }}</view>
			<!-- 销量之类 -->
			<view class="volumn">
				<text>5分 超出预期</text>
				<text>评论{{leaveword.length}}条</text>
				<text>月销100笔</text>
			</view>
		</view>
	</view>
</template>

<script>
import { previewImg } from '../commons/js/common.js';
export default {
	name: 'swiper',
	props: {
		banner: Array,
		nav: String,
		title: String,
		leaveword:Array
	},
	data() {
		return {
			bannerIndex: 1
		};
	},
	watch: {
		banner(newValue, oldValue) {
			return newValue.slice(0, 3);
		}
	},
	methods: {
		// 轮播图预览
		localCont(id) {
			previewImg(this.banner,id)
		},
		// 监听轮播图左右滑动事件
		bannerFun(e) {
			this.bannerIndex = e.detail.current + 1;
		}
	}
};
</script>

<style scoped>
.imageurl {
	width: 100%;
	height: 400upx !important;
}
.swiper-item {
	width: 100%;
	height: 400upx !important;
	z-index: 1000;
	position: relative;
}
swiper {
	height: 400upx !important;
}
.banner-num {
	background: #333;
	width: 100upx;
	color: white;
	text-align: center;
	border-radius: 15upx;
	font-size: 25upx;
	height: 40upx;
	line-height: 40upx;
	position: absolute;
	right: 20upx;
	bottom: 20upx;
	z-index: 2000;
}
.banner-posi {
	height: 400upx;
	position: relative;
}
.cont-back {
	padding: 20upx;
	background: white;
}
.title-com {
	color: #333;
	font-size: 35upx;
	font-weight: bold;
	line-height: 1.5;
	padding-bottom: 30upx;
}
.volumn {
	font-size: 25upx;
	color: #999;
	display: flex;
	justify-content: space-between;
}
</style>
