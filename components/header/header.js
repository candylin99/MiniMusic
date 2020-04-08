var app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {            // 属性名
      type: String,     // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: 'MiNiMusic'     // 属性初始值（可选），如果未指定则会根据类型选择一个
    },
    ishidden: { //是否隐藏
      type: Boolean,
      value: true
    },
    whetherretreat:{// 是否回退
      type: Boolean,
      value: true
    },
    isshowbg: {// 是否显示底色
      type: Boolean,
      value: true
    },
    isSubpage: {// 是否是子页面
      type: Boolean,
      value: true
    },
    pageroute:{// 页面路由
      type: String,
      value:''
    },
    returnTwoSteps: {// 是否返回两步
      type: Boolean,
      value: false
    },
    isForceJump: {// 是否强制跳转
      type: Boolean,
      value: false
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    statusBarHeight: app.globalData.statusBarHeight,
    gobackurl:"/image/global/go_back.png",
    gobawhiteckurl: "/image/global/gowhite_back.png"
  },
  
  /**
   * 组件的方法列表
   */
  methods: {

    goback:function (){
      if (this.properties.whetherretreat){
        var pages = getCurrentPages();

        var currPage = pages[pages.length - 1]; //当前页面
        var prevPage = pages[pages.length - 2]; //上一级页面
        if (this.data.isForceJump && app.globalData.gobackroute){
          wx.redirectTo({
            url: app.globalData.gobackroute
          })
          app.globalData.gobackroute = '';
          app.globalData.gobackObj = null;
        }else if (prevPage == undefined) {// 无上一级页面
          if (app.globalData.gobackroute != '' && app.globalData.gobackroute != null) {
            wx.redirectTo({
              url: app.globalData.gobackroute
            })
          }else{
            if (this.properties.isSubpage){
              wx.redirectTo({
                url: '../../video/video'
              })
            }else{
              wx.redirectTo({
                url: '../video/video'
              })
            }
            
          }

        } else {
          if (this.data.returnTwoSteps){
            wx.navigateBack({
              delta: 2, // 回退前 delta(默认为2) 页面
            })
          }else{
            wx.navigateBack({
              delta: 1, // 回退前 delta(默认为1) 页面
            })
          }
         

        }
      }
      if (this.properties.pageroute == 'myinfo'){
        // 个人中心-信息页面
        this.triggerEvent('myinfoevent', { routestr: 'myinfo' });
      }
     
    }
  }
})
