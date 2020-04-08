var app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabindex: {            // 属性名
      type: String,     // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: '0'     // 属性初始值（可选），如果未指定则会根据类型选择一个
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    statusBarHeight: app.globalData.statusBarHeight,
    tabBar: [
      {
        pagePath: "/pages/mine/mine",
        text: "我的",
        isSpecial: false
      },
      {
      pagePath: "/pages/descovery/descovery",
      text: "发现",
      isSpecial: false
    },
  ]

  },

  /**
   * 组件的方法列表
   */
  methods: {

    tabBarClick(e) {

      console.log(e);
      var pages = getCurrentPages();
      var currPage = '/' + pages[pages.length - 1].route; //当前页面

      if (e.currentTarget.dataset.url == currPage) {
        // 如果点当前页面则不做操作
      } else {
        console.log(e)
        wx.redirectTo({
          url: e.currentTarget.dataset.url
        })
      }
    }
  }
})
