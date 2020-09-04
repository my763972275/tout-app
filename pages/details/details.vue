<template>
	<view>
		<view class="scroll-flex" v-show="isshow"  :style="{opacity:styleOpacity}">
			<Navs ref="nav"></Navs>
		</view>
		<Swiper :banner = "banners" :nav = "'details'" :title ="title"></Swiper>
		<Matter :imgArr = "banners" :video = "videos"></Matter>
		<Comment></Comment>
	</view>
</template>

<script>
	import Navs from './components/navs.vue';
	import Swiper from '../../components/swiper.vue';
	import Matter from './components/matter.vue';
	import Comment from './components/comment.vue';
	import {selectData} from '../../commons/js/cloudFun.js';
	export default{
		components:{
			Navs,
			Swiper,
			Matter,
			Comment
		},
		// 监听页面滚动
		onPageScroll(e) {
			if(e.scrollTop > 90){
				let opacity = e.scrollTop / 170
				opacity = opacity > 1 ? 1 : opacity;
				this.styleOpacity = opacity;
				this.isshow = true;
			}else{
				this.isshow = false;
			}
		},
		data(){
			return {
				isshow:false,
				styleOpacity:'',
				banners:[],
				title:'',
				videos:'',
				msgList:{}
			}
		},
		onLoad(e){
			this.getUserDetails(e.id)
		},
		methods:{
			getUserDetails(id){
				selectData({_id:'60173c665f519d0c00d700cc5582f6c5'},'publish')
				.then(res => {
					console.log(res)
					this.banners = res[0].album;
					this.title = res[0].title;
					this.videos = res[0].video;
					this.msgList = {
						avatarUrl:res[0].avatarUrl,
						nickName:res[0].avatarUrl,
						openid:res[0]._openid,
						time:res[0].time
					}
				})
				.catch(err => {
					console.log(err)
				})
			}
		}
	}
</script>

<style>
	page{
		background: #f8f8f8;
	}
	.scroll-flex{
		position:fixed;
		top:0;
		left:0;
		right:0;
		background:#ffd00c;
		z-index:2;
	}
	Swiper{
		height:620upx;
	}
</style>
