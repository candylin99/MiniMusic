// components/musiclist/musiclist.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    playList:{
      type:'Object',
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    toggleMore:false,
    playList:[]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toggleMore(){
      this.setData({
        toggleMore:!this.data.toggleMore
      })
    },
  }
})
