// pages/video/video.js
const API = require('../../API/api');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 轮播图
    swiperList:[], 
    indicatorDots: true,
    indicatorcolor: '#ffffff',
    indicatoractivecolor: '#303639',
    autoplay: true,
    interval: 4500,
    duration: 1700,
    circular: true,
    // 乐库导航
    musicNav:[{
      icon:'icon-riqi',
      title:'喜欢'
    },{
      icon:'icon-jilu',
      title:'记录'
    },{
      icon:'icon-diantai1',
      title:'FM'
    },{
      icon:'icon-diantai',
      title:'电台'
    },{
      icon:'icon-zhibo',
      title:'直播'
    },{
      icon:'icon-faxian-copy',
      title:'发现'
    },],
    personalizedList:[], // 推荐歌单列表
    input1color:true,
    input2color:false,

    profile:[], // 手机号密码登录
    token:'',//登录的token
    account:[],// 里面有用户的id，以后没啥用就去掉
    loginstatus:'',
  },
  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    this.getLoginStatus();
    this.getSwiperList();

    // this.getPersonalizedList();
    // this.getLoginByCellPhone();
    // this.getLogout();
  },

  /**
   * 获取轮播图banner
   * type 0: pc 1: android 2: iphone 3: ipad
   */
  getSwiperList(){
    API.getBanner({
      type:1  
    }).then(res => {
      if(res.code == 200){
        this.setData({
          swiperList: res.banners
        })
      }
    })
  },
  /**
   * 获取推荐歌单
   * limit 取回来的数据量
   */
  getPersonalizedList(){
    API.getpersonalized({
      limit:6  
    }).then(res => {
      if(res.code == 200){
        this.setData({
          personalizedList: res.result
        })
      }
    })
  },
  /**
   * 手机号密码登录
   * 必选 phone：手机号码 password: 密码
   */
  getLoginByCellPhone(phone,password){
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
      if(res.data.code === 200){
        console.log('111')
        wx.setStorageSync("sessionid", res.header["set-cookie"]) // 存储本地
          that.getLoginStatus()
      }
    }
    })
  },
  // 获取用户的登录状态，更新loginstatus
  getLoginStatus(){
    API.getLoginStatus().then(res => {
      if(res.code === 200){
        app.globalData.loginstatus = res.profile.userId;
        this.setData({
          loginstatus : res.profile.userId,
        })
      } else if(res.code=== 301){
        app.globalData.loginstatus = '';
        this.setData({
          loginstatus : ""
        })
      }
    })
  },
  /**
   * 退出
   */
  getLogout(){
    API.getLogout({
    }).then(res => {
      if(res.code == 200){
        this.setData({
          captcha: res.result
        })
    
      }
    })
  },
  // 获取歌单内存  需要登录
  getSubcount(){
    API.getSubcount({
    }).then(res => {
      if(res.code == 200){
        console.log(res);
      }
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