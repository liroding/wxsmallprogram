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
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  inputid_message: function () {
    wx.navigateTo({
      url: '../idmessage/idmessage'
    })
  },
  showlog_message: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  inputcase_message: function () {
    wx.navigateTo({
      url: '../patientcase/patientcase'
    })
  },
  download_message: function () {
    if (app.globalData.userInfo.nickName == 'ding-丁'){
      console.log(app.globalData.userInfo.nickName)
      wx.navigateTo({
        url: '../download/download'
      })
    }else{
      console.log('[liro-debug]:no access rights !!!')

      wx.showModal({
        title: '提示',
        content: '您没有权限访问此功能',
        success: function (res) {
          if (res.confirm) {//这里是点击了确定以后
            console.log('[liro-debug]:用户点击确定')
          } else {//这里是点击了取消以后
            console.log('[liro-debug]:用户点击取消')
          }
        }
      })

    }
  
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })

      // 登录  add by ding to send username & code 
      if (app.globalData.wxcodereqflag){
        wx.login({
          success: res => {
            console.log(res.code)  //debug
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
            if (res.code) {
              wx.request({
                url: 'http://39.107.48.2:8000/wxapp/onlogin',
                method: "GET",
                data: {
                  "code": res.code,
                  "username": app.globalData.userInfo.nickName
                },
                header: {
                  'content-type': 'application/json' // 默认值
                },
                success: function (res) {
                  console.log('[liro-debug]: server return authsession ')
                  console.log(res.data.authsession)

                  if (res.data.authsession) {
                    app.globalData.authsession = res.data.authsession
                    wx.setStorage({
                      key: "authsession",
                      data: res.data.authsession,
                    })
                  }
                }
              })
            } else {
              console.log('获取用户登录态失败：' + res.errMsg)
            }

          }
        })
        app.globalData.wxcodereqflag = 0
      }


    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })

        if (app.globalData.wxcodereqflag) {
          // 登录  add by ding to send username & code 
          wx.login({
            success: res => {
              console.log(res.code)
              // 发送 res.code 到后台换取 openId, sessionKey, unionId
              if (res.code) {
                wx.request({
                  url: 'http://39.107.48.2:8000/wxapp/onlogin',
                  method: "GET",
                  data: {
                    "code": res.code,
                    "username": app.globalData.userInfo.nickName
                  },
                  header: {
                    'content-type': 'application/json' // 默认值
                  },
                  success: function (res) {
                    console.log('[liro-debug]: server return authsession ')
                    console.log(res.data.authsession)
                    if (res.data.authsession) {
                      app.globalData.authsession = res.data.authsession
                      wx.setStorage({
                        key: "authsession",
                        data: res.data.authsession,
                      })
                    }
                  }
                })
              }

            }
          })

          app.globalData.wxcodereqflag = 0
        }


        



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
    
  console.log("index onload")
    
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
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