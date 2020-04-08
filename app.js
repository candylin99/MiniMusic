//app.js
const API = require('/API/api');
App({
  onLaunch: function () {
    var that = this;
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              this.globalData.userInfoIv = res.iv
              this.globalData.userInfoEncryptedData = res.encryptedData
              this.globalData.userInfoRawData = res.rawData
              this.globalData.userInfoSignature = res.signature
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })

    // 获取登录机型
    wx.getSystemInfo({
      success: function (res){
        that.globalData.phoneType = res.model;
        if (res.model.search('iPhone X') != -1) {
          that.globalData.isIPX = true;// iphoneX 顶部和底部tab都有个黑条刘海，得做兼容
        }  
      }
    })
},
  
  globalData: {
    userInfo: null,  //小程序内部信息
    statusBarHeight: wx.getSystemInfoSync()['statusBarHeight'], // 机型bar栏的高度
    isForceJump:false,// 在否强制跳转
    isIPX: false,// iphoneX 顶部和底部tab都有个黑条刘海，得做兼容
    userInfoIv:"",// userInfo iv   ???
    userInfoEncryptedData:"",// userInfo encryptedData
    userInfoRawData: "",// userInfo rawData
    userInfoSignature: "",// userInfo signature
    loginstatus:'',
  }
})