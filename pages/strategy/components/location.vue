<template>
	<view>
		<view class="locality">
			<view class="title">当地必体验</view>
		</view>
		<!-- tab -->
		<view class="menu-block">
			<block v-for="(item,index) in citytab" :key="index">
				<view :class="{'activetext':index == num}" @click="menubtn(index,item.name)">{{item.name}}</view>
			</block>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				num:0,
				citytab:[
					{
						name:'全部'
					},
					{
						name:'景点'
					},
					{
						name:'美食'
					},
					{
						name:'网红打卡'
					}
				]
			}
		},
		methods:{
			menubtn(index,name){
				this.num = index;
				// 组件间传值
				uni.$emit('tabSelect',{name:name})
			}
		}
	}
</script>

<style scoped>
	.locality{
		margin:0 20upx;
	}
	.title{
		color:#292c33;
		font-size: 50upx;
	}
	.activetext{
		color:#4CD964;
		background:#ffdd00 !important;
		border:1upx solid #ffdd00 !important;
	}
	.menu-block view{
		background:white;
		border:1upx solid #c2c5cc;
		border-radius:6upx;
		font-size:25upx;
		color:#292c33;
		font-weight:bold;
		text-align: center;
		padding:15upx;
		margin:20upx;
	}
	.menu-block{
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		flex-wrap: wrap;
	}
</style>
