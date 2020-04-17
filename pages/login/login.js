// pages/login/login.js
const API = require('../../API/api');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

    loginstatus:'',
    input1color:true,
    input2color:false,

    profile:[], // 手机号密码登录
    token:'',//登录的token
    account:[],// 里面有用户的id，以后没啥用就去掉

    listActive:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getLoginStatus();
  },
  submitLoginForm(e){
  // 保存手机号密码
  let phone = e.detail.value.phone,password = e.detail.value.password;
    this.getLoginByCellPhone(phone,password);
  },
  /**
   * 手机号密码登录
   * 必选 phone：手机号码 password: 密码
   */
  getLoginByCellPhone(phone,password){
    wx.showToast({
      title: '登录中...',
      icon: 'loading'
  })
    var that = this
    wx.request({
      url: 'http://neteasecloudmusicapi.zhaoboy.com/login/cellphone',
      data: {
        phone:phone,
        password:password
      },
      method:'get',
      header:{
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      success(res) {
        wx.hideToast();
        if(res.data.code === 200){
          console.log('111')
          wx.setStorageSync("sessionid", res.header["set-cookie"]) // 存储本地
          that.getLoginStatus()
        }else{
          wx.showModal({
            title: '提示',
            content: '登录失败，请重试！'
          })
          return;
        }
      }
    })
  },
  // 获取用户的登录状态，更新loginstatus
  getLoginStatus(){
    wx.showToast({
      title: '正在获取登录信息',
      icon: 'loading'
    })
    API.getLoginStatus().then(res => {
      if(res.code === 200){
        console.log('222');
        wx.hideToast();
        app.globalData.loginstatus = res.profile.userId;
        wx.redirectTo({
          url: '/pages/mine/mine',
        })
        // this.setData({
        //   loginstatus : res.profile.userId,
        // })
      } else if(res.code=== 301){
        app.globalData.loginstatus = '';
        this.setData({
          loginstatus : ""
        })
      }
    })
  },

  changeColor1(){
    this.setData({
      input1color:true,
      input2color:false
    })
  },
  changeColor2(){
    this.setData({
      input1color:false,
      input2color:true
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})