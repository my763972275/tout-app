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
// 分页请求攻略列表的数据
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

// 条件查询数据库
var selectData = function(keywords,coll){
	return new Promise((resolve,reject) => {
		const collData = db.collection(coll).where(keywords)
		.get()
		.then(res => {
			resolve(res.data)
		})
		.catch(err => {
			reject(err)
		})
	})
}

// 云数据库添加公用函数
var addDatabase = function(userInfo,coll){
	return new Promise((resolve,reject) => {
		let users = db.collection(coll)
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

// 上传文件到云数据库的公用函数
var uploadFiles = function(newPath,data,coll){
	return new Promise((resolve,reject) => {
		wx.cloud.uploadFile({
			cloudPath:`${coll}/` + newPath,
			filePath:data
		})
		.then(res => {
			resolve(res.fileID)
		})
		.catch(err => {
			reject(err)
		})
	})
}
export {home,homelist,addDatabase,uploadFiles,selectData}
