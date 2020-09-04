// 图片预览函数
var previewImg = function(arr,index){
	return new Promise((resolve,reject) => {
		uni.previewImage({
			urls: arr,
			current:index,
			loop:true,
			longPressActions: {
				itemList: ['发送给朋友', '保存图片', '收藏'],
			}
		})
		.then(res => {
			resolve(res)
		})
		.catch(err => {
			reject(err)
		})
	})
	
}

// 获取当前时间函数
var timer = function(){
	var date = new Date()
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var day = date.getDay();
	var hour = date.getHours();
	var min = date.getMinutes();
	var second = date.getSeconds();
	let dateTime = year + '-' + month + '-' +day + ' ' + hour + ':' + min + ':' + second;
	return dateTime
}
export {previewImg ,timer}