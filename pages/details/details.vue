<template>
	<view>
		<view class="scroll-flex" v-show="isshow"  :style="{opacity:styleOpacity}">
			<Navs ref="nav"></Navs>
		</view>
		<Swiper :banner = "banners" :nav = "'details'" :title ="title" :leaveword="leaveword" style="height:600upx;"></Swiper>
		<!-- 详情组件 -->
		<view class="matter-page">
			<Matter :imgArr = "banners" :video = "videos"></Matter>
		</view>
		<!-- 留言组件 -->
		<view class="message-page">
			<Comment :commentid = "commentid" :leaveword="leaveword" :messageword="messageword"></Comment>
		</view>
		<!-- 留言为空的提示 -->
		<view style="margin-bottom: 90upx;" v-if="leaveword.length == 0">
			<none-data></none-data>
		</view>
	</view>
</template>

<script>
	import Navs from './components/navs.vue';
	import Swiper from '../../components/swiper.vue';
	import Matter from './components/matter.vue';
	import Comment from './components/comment.vue';
	import {selectData,home} from '../../commons/js/cloudFun.js';
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
				commentid:'',
				isshow:false,
				styleOpacity:'',
				banners:[],
				leaveword:[],
				messageword:[],
				title:'',
				videos:'',
				msgList:{}
			}
		},
		onLoad(e){
			this.commentid = e.id
			this.getUserDetails(e.id)
			this.getCommentList({id:e.id})
		},
		methods:{
			// 获取用户评论
			getCommentList(keywords){
				selectData(keywords,'comment')
				.then(res => {
					this.leaveword = res;
					let word = res.map(item => {
						return item.classify
					})
					// 数组去重
					let newarr = Array.from(new Set(word))
					// 数组去空
					let newarrdata = newarr.filter(item => item)
					this.messageword = newarrdata;
				})
				.catch(err => {
					console.log(err)
				})
			},
			// 获取详细信息
			getUserDetails(id){
				selectData({_id:id},'publish')
				.then(res => {
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
			},
			// 子组件执行父组件方法，请求留言数据
			fatherMethod(item,name){
				if(name == '全部'){
					this.getCommentList({id:item})
				}else{
					this.getCommentList({id:item,classify:name})
				}
				
			},
			// 锚点链接跳转
			fatherTab(index){
				var anchor ;
				if(index == 1){
					anchor = '.matter-page'
				}else{
					anchor = '.message-page'
				}
				const query = this.createSelectorQuery();
				query.select(anchor).boundingClientRect();
				query.selectViewport().scrollOffset();
				query.exec((res) => {
					wx.pageScrollTo({
						scrollTop:res[0].top + res[1].scrollTop - 50,
						duration:300
					})
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
</style>
