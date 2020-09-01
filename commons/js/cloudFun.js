// class 面向对象类
// promise 封装
const db = wx.cloud.database()
// 请求轮播，tab数据
var home = function(coll){
	return new Promise((resolve,reject) => {
		const collection = db.collection(coll)
		collection.get()
		.then(res => {
			resolve(res.data)
		})
		.catch(err => {
			reject(err)
		})
	})
}

export {home}
