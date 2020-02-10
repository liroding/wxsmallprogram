// pages/wxml/index.js
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
    wx.request({
      
      url: 'http://47.94.80.84:8000/wxapp/helloworld',

      success: function (res) {

        console.log(res.data)// 服务器回包信息
        mythis.setData({
          rdata: res.data
        })
      }

    })
  },
  botton_2: function (e) {
    this.setData({
      plain: !this.data.plain
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