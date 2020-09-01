<template>
	<view>
		<view style="margin:0 20upx;">
			<view class="content">
				<block v-for="(item,index) in tables" :key="index">
					<view>
						<text class="tick">{{item.tick}}</text>
						<text class="nametext">{{item.nametext}}</text>
					</view>
				</block>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:'classify',
		data() {
			return {
				tables:[
					{
						tick:'出境游',
						nametext:'走遍全球'
					},
					{
						tick:'国内游',
						nametext:'精选路线'
					},
					{
						tick:'周边游',
						nametext:'暑假红包'
					},
					{
						tick:'精选购',
						nametext:'免税预购'
					},
					{
						tick:'签证/签注',
						nametext:'领券'
					},
					{
						tick:'会员',
						nametext:'签到'
					},
					{
						tick:'每日福利',
						nametext:'领里程'
					},
					{
						tick:'全部',
						nametext:'更多推荐'
					}
				]
			};
		}
	}
</script>

<style scoped>
.content{
	display:flex;
	flex-wrap: wrap;
	width:100%;
	-webkit-flex-wrap:wrap;
	overflow: hidden;
	border:1upx solid #eeeeee;
	border-radius: 10upx;
}
.content view{
	width:25%;
	flex-direction: column;
	align-items: center;
	display:flex;
	box-sizing: border-box;
	padding:20upx 0;
}
.content view:nth-child(2){border-left:1upx solid #eeeeee; border-right:1upx solid #eeeeee;}
.content view:nth-child(6){border-left:1upx solid #eeeeee; border-right:1upx solid #eeeeee;}
.content view:nth-child(3){border-right:1upx solid #eeeeee;}
.content view:nth-child(7){border-right:1upx solid #eeeeee;}
.content view:nth-child(-n+4){border-bottom:1upx solid #eeeeee;}
.tick{
	font-size: 30upx;
	color:#333333;
	font-weight: bold;
}
.nametext{
	font-size: 23upx;
	color:#686868;
}
</style>
