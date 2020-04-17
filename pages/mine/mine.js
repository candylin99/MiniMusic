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
    playList:[],
    saveList:[],
    likeOne:'',//这里只取得喜欢的列表的id
    likeOneMusic:[],// 喜欢音乐中的第一个
    indicatorDots: true,
    indicatorcolor: '#ffffff',
    indicatoractivecolor: '#3ABA7D',
    autoplay: true,
    interval: 4500,
    duration: 1700,
    circular: true,
    // 乐库导航 因为要做异形的 first-child之类的用不了所以没用
    musicNav:[{
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
    
    toggleActive:true,
  },
  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    this.getSwiperList();
    this.getPlayList();
    this.getLikeList();
    this.getPersonalFM();
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
   * 获取用户歌单
   */
  getPlayList(){
    API.getPlaylist({
      uid:app.globalData.loginstatus
    }).then(res =>{
      if(res.code === 200){
        console.log(res)
        let userId =app.globalData.loginstatus,playList=[],saveList=[];
        res.playlist.forEach(item=>{
          if(item.userId === userId){
            playList.push(item)
          }else{
            saveList.push(item)
          }
        })
        console.log(playList)
        console.log(saveList)
        this.setData({
          playList:playList,
          saveList:saveList
        })
      }
    })
  },
   /**
   * 获取用户喜欢的歌曲的第一个id
   */
  getLikeList(){
    API.getLikeList({
      uid:app.globalData.loginstatus
    }).then(res =>{
      if(res.code === 200){
        console.log(res)
        this.setData({
          likeOne:res.ids[0]
        })
        this.getSongDetail()
      }
    })
  },
  /**
   * 根据音乐ids获取音乐详情
   */
  getSongDetail(){
    API.getSongDetail({
      ids:this.data.likeOne
    }).then(res=>{
      if(res.code === 200){
      this.setData({
        likeOneMusic:res.songs
      })
    }
    })
  },
  /**
   * 根据音乐ids获取音乐详情
   */
  getPersonalFM(){
    API.getPersonalFM({
    }).then(res=>{
      if(res.code === 200){
      console.log(res)
    }
    })
  },
  // 显示更多歌单
  toggleMore(){
    this.setData({
      toggleMore:!this.data.toggleMore
    })
  },
  changeList(){
    this.setData({
      toggleActive:!this.data.toggleActive
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