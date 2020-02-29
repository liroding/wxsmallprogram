// pages/login/login.js
// pages/index_bakcup/index.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    motto: 'Every Step Is Progress',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    flag: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
        flag: 1   //add by liro new
      })
      wx.navigateTo({
        url: '../index/index'
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        app.globalData.userInfo = res.userInfo
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
          flag:1   //add by liro new
        })
        wx.navigateTo({
          url: '../index/index'
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    } 
  },
  getUserInfo: function (e) {
       console.log(e) 
      // 可以将 res 发送给后台解码出 unionId
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
 
  },


//按钮的点击事件
bindGetUserInfo: function (res) {
      let info = res;
      console.log(info);

      if (info.detail.userInfo) {
          console.log("[liro-debug]:点击了同意授权");
          app.globalData.userInfo = info.detail.userInfo
          var that = this
          // 登录  add by ding to send username & code 
          wx.login({
          success: res => {
            console.log('[liro-debug]: wx.code ='+res.code)  //debug
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
            if (res.code) {
              wx.request({
                url: 'https://dingyinglai.site/wxapp/onlogin',
                method: "GET",
                data: {
                  "code": res.code,
                  "username": info.detail.userInfo.nickName
                },
                header: {
                  'content-type': 'application/json' // 默认值
                },
                success: function (res) {
                  console.log('[liro-debug]: server return authsession ')
                  console.log('[liro-debug]: authsession='+ res.data.authsession)
                  if (res.data.authsession) {
                    app.globalData.authsession = res.data.authsession
                    wx.setStorage({
                      key: "authsession",
                      data: res.data.authsession,
                    })
                  }
                  //console.log('<debug>' + info.detail.userInfo.nickName)
                  wx.navigateTo({
                    url: '../index/index'
                  })
                }
              })
            } else {
              console.log('获取用户登录态失败：' + res.errMsg)
            }

          }
        })
  } else {
          //用户按了拒绝按钮
        wx.showModal({
                    title: '警告',
                    content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
                    showCancel: false,
                    confirmText: '返回授权',
                    success: function (res) {
                           if (res.confirm) {
                              console.log('[liro-debug]: 用户点击了“返回授权”')
                          }
                        }
                    })
        }
},


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('onready')
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  console.log("onshow")
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