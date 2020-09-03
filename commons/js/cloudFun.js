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
// 请求攻略列表的数据
var homelist = function(listdata,pageid){
	return new Promise((resolve,reject) => {
		const collData = db.collection(listdata).limit(2).skip(pageid * 2)
		collData.get()
		.then(res => {
			resolve(res.data)
		})
		.catch(err => {
			reject(err)
		})
	})
}

// 公用存储用户登录的数据
var login = function(userInfo){
	return new Promise((resolve,reject) => {
		let users = db.collection('user')
		users.add({
			data:userInfo
		})
		.then(res => {
			resolve(res)
		})
		.catch(err => {
			reject(err)
		})
	})
}
export {home,homelist,login}
