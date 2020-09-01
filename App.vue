<script>
	export default {
		onLaunch: function() {
			if(!wx.cloud){
				console.error('请使用2.2.3或以上的基础库以使用云能力')
			}else{
				// 指定云开发环境
				wx.cloud.init({
					env:'travel-pbvky',
					traceUser:true,
				})
			}
		}
	}
</script>

<style>
	/*每个页面公共css */
	::-webkit-scrollbar{
		width:0;
		height:0;
		color:transparent;
	}
</style>
