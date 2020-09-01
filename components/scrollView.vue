<template>
	<view>
		<scroll-view scroll-x="true" class="scroll" scroll-with-animation="true">
			<view>
				<block v-for="(item,index) in tab" :key="index">
					<view @click="tabs(index,item.nav)" class="list-cont " :class="{active:index == num}">
						<view>
							<text :class="{activea:index == num}" class="con-text-a">{{item.name}}</text>
						</view>
						<view>
							<text :class="{activeb:index == num}" class="con-text-b">{{item.title}}</text>
						</view>
					</view>
				</block>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		name:'scrollView',
		props:{
			tab:Array
		},
		data() {
			return {
				num:0,
			};
		},
		methods:{
			tabs(index,item){
				this.num = index;
				
			}
		}
	}
</script>

<style scoped>
.scroll{
	white-space: nowrap;
	width:100%;
	position:absolute;
	left:0;
	right:0;
	padding:20upx 0;
	background:white;
}
.con-text-a{
	color:#292c33;
	font-size:30upx;
	font-weight: bold;
}
.con-text-b{
	color:#9ea0a5;
	font-size: 23upx;
}
.list-cont{
	width:180upx;
	display:inline-block;
	text-align: center;
}
.active{
	background-image:linear-gradient(to right,#ccffff 0%, #ffcc00 100%);
	border-top-right-radius:50upx;
}
.activea{
	color:#292c33 !important;
	font-size:31upx !important;
}
.activeb{
	color: #292c33 !important;
	font-size: 23upx !important;
}
</style>
