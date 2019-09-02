// /**
//  * 微信js-sdk
//  * 参考文档：https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141115
//  */
import wx from 'weixin-js-sdk'
import axios from 'axios'
const wxApi = {
  /**
   * [wxRegister 微信Api初始化]
   * @param  {Function} callback [ready回调函数]
   */
  wxRegister (callback) {
    axios.get('/WxJsSDk/GetJsApiPackage', {params:{'url': window.location.href}}, { timeout: 5000, withCredentials: true }).then((res) => {
      console.log('微信sdk',res.data.data.JsApiPackage)
      wx.config({
        debug: false, // 开启调试模式
        appId: res.data.data.JsApiPackage.AppId, // 必填，公众号的唯一标识
        timestamp: res.data.data.JsApiPackage.Timestamp, // 必填，生成签名的时间戳
        nonceStr: res.data.data.JsApiPackage.NonceStr, // 必填，生成签名的随机串
        signature: res.data.data.JsApiPackage.Signature, // 必填，签名，见附录1
        jsApiList: ['updateAppMessageShareData','updateTimelineShareData','onMenuShareAppMessage','onMenuShareTimeline','scanQRCode'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      })
    }).catch((error) => {
      console.log(error)
    })
    wx.ready((res) => {
      if (callback) {
        callback()
      }
    })
  },
  /**
   * [ShareTimeline 微信分享到朋友圈]
   * @param {[type]} option [分享信息]
   * @param {[type]} success [成功回调]
   * @param {[type]} error   [失败回调]
   */
  ShareTimeline (option) {
    wx.updateTimelineShareData({
      title: option.title, // 分享标题
      link: option.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: option.imgUrl, // 分享图标
      success: function () {
        console.log('分享到朋友圈',option)
      }
    })
  },
  /**
   * [ShareAppMessage 微信分享给朋友]
   * @param {[type]} option [分享信息]
   * @param {[type]} success [成功回调]
   * @param {[type]} error   [失败回调]
   */
  ShareAppMessage (option) {
    wx.updateAppMessageShareData({
      title: option.title, // 分享标题
      desc: option.link, // 分享描述
      link: option.link, // 分享链接
      imgUrl: option.imgUrl, // 分享图标
      success: function () {
        console.log('分享给朋友',option)
      },
      fail:function (res) {
        console.log('朋友fail',res)
      }
    })
  },

  // 扫面二维码
  scan(){
    wx.scanQRCode({
        needResult: 1,
        success(res){
          window.location.href = res.resultStr;
        },
        fail(res){
          console.log(res);
        },
    });
  },
}
export default wxApi
