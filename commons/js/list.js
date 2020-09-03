// 定位
var QQMapWX = require('./qqmap-wx-jssdk.js');
var qqmapsdk;

// 逆地址解析
var locationData = function(){
	return new Promise((resolve,reject) => {
		qqmapsdk = new QQMapWX({
			key:'CHNBZ-JL4WO-KK3WK-SW53F-VTK3K-VGFNT'
		});
		qqmapsdk.reverseGeocoder({
			success:(res) => {
				resolve(res)
			},
			fail:(err) => {
				reject(err)
			}
		})
	})
}

// 关键字关联查询
var cityDetail = function(value){
	return new Promise((resolve,reject) =>{
		qqmapsdk = new QQMapWX({
			key:'CHNBZ-JL4WO-KK3WK-SW53F-VTK3K-VGFNT'
		});
		qqmapsdk.getSuggestion({
			//获取输入框值并设置keyword参数
			keyword: value,
			filter:'category=火车站,景点',
			success:(res) => {
				resolve(res.data)
			},
			fail: function(error) {
			    console.error(error);
			}
		})
	})
}

export {locationData,cityDetail}