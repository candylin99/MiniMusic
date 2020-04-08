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
    indicatoractivecolor: '#DC4238',
    autoplay: true,
    interval: 4500,
    duration: 1700,
    circular: true,
    // 乐库导航
    musicNav:[{
      icon:'icon-riqi',
      title:'每日推荐'
    },{
      icon:'icon-tubiaozhizuomoban',
      title:'歌单'
    },{
      icon:'icon-zhibo',
      title:'排行榜'
    },{
      icon:'icon-diantai',
      title:'电台'
    },{
      icon:'icon-gedan',
      title:'直播'
    },],
    // 推荐歌单列表
    personalizedList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSwiperList();
    this.getPersonalizedList();
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