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

export {previewImg}