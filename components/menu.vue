<template>
	<view>
		<view class="ticket">
			<!-- <image src="../static/plane.png" mode="widthFix"></image> -->
			<block  v-for="(item,index) in menuList" :key="index">
				<view>
					<image :src="item.image" ></image>
					<text>{{item.name}}</text>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	export default {
		name:'menu',
		data() {
			return {
				rect:'',
				isFixed:false,
				menuList:[
					{
						"image":'../static/plane.jpg',
						"name":'机票'
					},
					{
						"image":'../static/hotel.jpg',
						"name":'酒店'
					},
					{
						"image":'../static/train.jpg',
						"name":'火车票'
					},
					{
						"image":'../static/bus.jpg',
						"name":'汽车票'
					},
					{
						"image":'../static/ticket.jpg',
						"name":'门票'
					}
				]
			};
		}
	}
</script>

<style scoped>
.ticket{
	display:flex;
	justify-content: space-around;
	text-align: center;
	margin:30upx 0;
}
.ticket image{
	width:90upx;
	height:90upx;
}
.ticket text{
	font-size: 30upx;
	display: block;
}
</style>
