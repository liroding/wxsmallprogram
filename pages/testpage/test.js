// pages/wxml/index.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    time: (new Date()).toString(),
    plain: false,
    rdata: 'nihao'
  },

  botton_1: function (e) {
    var mythis = this;
    this.setData({
      plain: !this.data.plain
    })

  },
  botton_2: function (e) {
    this.setData({
      plain: !this.data.plain
    })
  },


  testSubmit:function(e){

    wx.requestSubscribeMessage({
      tmplIds: ['yknmtxHzvfU4rE84aa9si5LuV0gAW_7KGzEXz7FQgN0'], // 此处可填写多个模板 ID，但低版本微信不兼容只能授权一个
      success (res) {
        console.log('已授权接收订阅消息')
      }
    })

    wx.request({
      url: 'https://dingyinglai.site/wxapp/helloworld',
      method: "POST",
      data: {
        "authsession": app.globalData.authsession,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // post ,it is different get!!!!
      },
      success: function (res) {
        console.log(res.data)

      }
      

    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   // this.setData({name:'buhao'},null)
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
   //console.log('hide')
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
   // console.log('unload')
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