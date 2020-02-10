//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
//add by liro for debug
    const res = wx.getSystemInfoSync()
    console.log(res.model)
////////////////////////////////////////   

    // 获取用户信息
    wx.getSetting({
      success: res => {
       // console.log(res)
        if (res.authSetting['scope.userInfo']) {
          
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              console.log(this.globalData.userInfo)
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    // 登录
    wx.login({
      success: res => {
        console.log(res.code)
        
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          wx.request({
            url: 'http://47.94.80.84:8000/wxapp/onlogin',
            method: "GET",
            data: {
              "code": res.code,
              "username": this.globalData.userInfo
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: function (res) {
              console.log(res)
              if (res.data.openid) {
                wx.setStorage({
                  key: "tokenId",
                  data: res.data.openid,
                })
              }
            }
          })
        }

      }
    })

  },
  globalData: {
    userInfo: null,
  }
})