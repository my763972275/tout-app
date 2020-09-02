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
					</view>
						<!-- <view class="active-label">{{item.label}}</view> -->
						<view class="purchase userInfo">
							<!-- <text class="active-price">￥{{item.price}}</text> -->
							<image :src="item.nameimg" mode="widthFix"></image>
							<text class="active-purchase">{{item.name}}</text>
						</view>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				recomment:[
					{
						"image":"cloud://travel-pbvky.7472-travel-pbvky-1302868032/list/bg1.jpg",
						"title":"普吉岛6天自由行",
						"list":"全国-普吉岛6天自由行直飞泰国旅游海岛游往返机票（可代订接机）",
						"nameimg":"cloud://travel-pbvky.7472-travel-pbvky-1302868032/list/bg1.jpg",
						"name":"马化腾"
					},
					{
						"image":"cloud://travel-pbvky.7472-travel-pbvky-1302868032/list/bg2.jpg",
						"title":"普吉岛6天自由行",
						"list":"泰国深度旅游 全国直飞普吉岛自由行 6天4晚 机票+酒店自由组合",
						"nameimg":"cloud://travel-pbvky.7472-travel-pbvky-1302868032/list/bg2.jpg",
						"name":"马化腾"
					},
					{
						"image":"cloud://travel-pbvky.7472-travel-pbvky-1302868032/list/bg3.jpg",
						"title":"希尔顿泰国旅游",
						"list":"普吉岛5-6天自由行 芭东新开国五网红消享/索菲特/希尔顿泰国旅游",
						"nameimg":"cloud://travel-pbvky.7472-travel-pbvky-1302868032/list/bg3.jpg",
						"name":"马化腾"
					},
					{
						"image":"cloud://travel-pbvky.7472-travel-pbvky-1302868032/list/bg4.jpg",
						"title":"普吉岛6天自由行",
						"list":"全国-普吉岛6天自由行直飞泰国旅游海岛游往返机票（可代订接机）",
						"nameimg":"cloud://travel-pbvky.7472-travel-pbvky-1302868032/list/bg4.jpg",
						"name":"马化腾"
					},
					{
						"image":"cloud://travel-pbvky.7472-travel-pbvky-1302868032/list/bg5.jpg",
						"title":"普吉岛6天自由行",
						"list":"泰国深度旅游 全国直飞普吉岛自由行 6天4晚 机票+酒店自由组合",
						"nameimg":"cloud://travel-pbvky.7472-travel-pbvky-1302868032/list/bg5.jpg",
						"name":"马化腾"
					},
					{
						"image":"cloud://travel-pbvky.7472-travel-pbvky-1302868032/list/bg7.jpg",
						"title":"希尔顿泰国旅游",
						"list":"普吉岛5-6天自由行 芭东新开国五网红消享/索菲特/希尔顿泰国旅游",
						"nameimg":"cloud://travel-pbvky.7472-travel-pbvky-1302868032/list/bg7.jpg",
						"name":"马化腾"
					}
				]
			}
		},
		methods:{
			localCont(){
				
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
