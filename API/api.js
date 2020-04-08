// api.js
const API_BASE_URL = 'http://neteasecloudmusicapi.zhaoboy.com';
const app = getApp()
const request = (url, data,type="get") => { 
  let _url = API_BASE_URL  + url;
  return new Promise((resolve, reject) => {
    // if(app.globalData.loginSession){
    //  cookie = app.globalData.loginSession
    // }
    wx.request({
      url: _url,
      method: type,
      data: data,
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'cookie':wx.getStorageSync("sessionid") 
      },
      success(request) {
        resolve(request.data)
        // wx.setStorageSync('sessionid', request.get)
      },
      fail(error) {
        reject(error)
      }
    })
  });
}


module.exports ={
  gethotsongs:(data) =>{
    return request('/search/hot',data)//热搜接口
  },
  searchSuggest:(data)=>{
    return request('/search/suggest',data)//搜索建议接口
  },
  searchResult:(data)=>{
    return request('/search',data)//搜索结果接口
  },
  getBanner:(data)=>{
    return request('/banner',data)//个性推荐轮播
  },
  getsongsheet:(data)=>{
    return request('/top/playlist',data)//热门歌单接口
  },
  getpersonalized:(data)=>{
    return request('/personalized',data)// 推荐歌单接口
  },
  getNewSong:(data)=>{
    return request('/personalized/newsong',data)//最新音乐接口
  },
  getDjRadios:(data)=>{
    return request('/dj/recommend',data)//电台推荐接口
  },
  // getTopComments:(data)=>{
  //   return request('/comment/hot',data)
  // },
  getProgramRecommend:(data)=>{
    return request('/program/recommend',data)//推荐节目接口
  },
  getRecommendType:(data)=>{
    return request('/dj/recommend/type',data)//所有电台分类推荐
  },
  getRecommendMV:(data)=>{
    return request('/personalized/mv',data)//推荐MV
  },
  getNewMv:(data)=>{
    return request('/mv/first',data)//最新MV
  },
  getNewEst:(data)=>{
    return request('/album/newest',data)//最新专辑
  },
  getTopList:(data)=>{
    return request('/top/list',data)//排行榜
  },
  getDjList:(data)=>{
    return request('/dj/catelist',data) //电台分类
  },
  getPay:(data)=>{
    return request('/dj/paygift',data)//付费精品
  },
  getSonger:(data)=>{
    return request('/toplist/artist',data)//歌手排行
  },
  // getLoginByCellPhone:(data)=>{
  //   return request('/login/cellphone',data)// 手机号密码登录
  // },
  // postCaptcha:(data)=>{
  //   return request('/captcha/sent',data)// 手机号发送验证码
  // },
  // getCaptcha:(data)=>{
  //   return request('/captcha/verify',data)// 手机号获取验证码
  // },
  getLoginStatus:(data)=>{
    return request('/login/status',data)// 获取登录状态
  },
  getRefreshLogin:(data)=>{
    return request('/login/refresh',data)// 刷新登录状态
  },
  getLogout:(data)=>{
    return request('/logout',data) // 退出
  },
  getSubcount:(data)=>{
    return request('/user/subcount',data) // 获取用户信息 , 歌单，收藏，mv, dj 数量
  }
  
}