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
      tmplIds: ['8qZXmYaPl9gJsUFQmhtDb73gvkP-lKFivLyroyTpeyI'],
      success (res) {
        console.log('已授权接收订阅消息')
      }
    })

    wx.request({
      url: 'https://dingyinglai.site/wxapp/wxsubscribes',
      method: "POST",
      data: {
        "authsession": app.globalData.authsession,
        "subscribeid": 1,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // post ,it is different get!!!!
      },
      success: function (res) {
        console.log(res.data)

      }
    })

  },

/*
  uploader:function(){

    var that=this;
    
    let imagesList=[];
    
    let maxSize=1024*1024;
    
    let maxLength=3;
    
    let flag=true;
    
    wx.chooseImage({
    
    count: 6, //最多可以选择的图片总数
    
    sizeType: ['original','compressed'], // 可以指定是原图还是压缩图，默认二者都有
    
    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
    
    success: function(res) {
    
    wx.showToast({
    
    title: '正在上传...',
    
    icon: 'loading',
    
    mask: true,
    
    duration: 500
    
    })
    
    for(let i=0;i<res.tempFiles.length;i++){
    
    if(res.tempFiles[i].size>maxSize){
    
    flag=false;
    
    console.log(111)
    
    wx.showModal({
    
    content: '图片太大，不允许上传',
    
    showCancel: false,
    
    success: function (res) {
    
    if (res.confirm) {
    
    console.log('用户点击确定')
    
    }
    
    }
    
    });
    
    }
    
     
    
    }
    
    if (res.tempFiles.length>maxLength){
    
    console.log('222');
    
    wx.showModal({
    
    content: '最多能上传'+maxLength+'张图片',
    
    showCancel:false,
    
    success:function(res){
    
    if(res.confirm){
    
    console.log('确定');
    
    }
    
    }
    
    })
    
    }
    
    if (flag == true && res.tempFiles.length <= maxLength){
    
    that.setData({
    
    imagesList: res.tempFilePaths
    
    })
    
    }
    
    wx.uploadFile({
    
    url: 'https://shop.gxyourui.cn',
    
    filePath: res.tempFilePaths[0],
    
    name: 'images',
    
    header: {
    
    "Content-Type": "multipart/form-data",
    
    'Content-Type': 'application/json'
    
    },
    
    success:function(data){
    
    console.log(data);
    
    },
    
    fail:function(data){
    
    console.log(data);
    
    }
    
    })
    
    console.log(res);
    
    },
    
    fail:function(res){
    
    console.log(res);
    
    }
    
    })
    
    },
*/




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