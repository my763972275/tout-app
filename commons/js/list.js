// 定位
var QQMapWX = require('./qqmap-wx-jssdk.js');
var qqmapsdk;

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

export {locationData}