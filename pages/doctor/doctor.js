// pages/doctor/doctor.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    name:null,
    sex:null,
    age:null,
    department:null,
    telephone:null,
    authsession:null,
    //case
    case1:null,
    case2:null,
    case3:null,

    case1_data: [
      { name: '1-1', value: '颈部疼痛' },
      { name: '1-2', value: '枕部疼痛'},
      { name: '1-3', value: '肩痛' },
      { name: '1-4', value: '上肢疼痛' },   // checked: 'true'
    ],
    //2
    case2_data: [
      { name: '2-1', value: '早期   <2周' },
      { name: '2-2', value: '急性   <2周' },
      { name: '2-3', value: '亚急性 6-12周' },
      { name: '2-4', value: '慢性   >12周' },
      { name: '2-5', value: '暂无', checked: 'true' },
    ],
    case3_data: [
      { name: '3—1', value: 'X线 -- 正位' },
      { name: '3-2', value: 'X线 -- 侧位'},
      { name: '3-3', value: 'X线 -- 后前斜位' },
      { name: '3-4', value: 'X线 -- 前后斜位' },   // checked: 'true'
      { name: '3—5', value: 'X线 -- 张口位' },
      { name: '3-6', value: 'X线 -- 过伸位'},
      { name: '3-7', value: 'X线 -- 过屈位' },
      { name: '3-8', value: 'MRI' }, 
      { name: '3-9', value: 'CT' },   
      { name: '3-10', value: '颈部血管超声' }, 
      { name: '3-11', value: '肌电图' },   
    ],


    movies: [
      { url: 'https://dingyinglai.site/static/uploads/caseimgs/ding-丁/2020-04-05 15:34:38_0.PNG' },
      { url: 'http://wx1.sinaimg.cn/large/d030806aly1fug91w3gtwj21jk2bc7wh.jpg' },

    ],


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var mythis = this
    console.log('previed onload')
    this.setData({
       userInfo: app.globalData.userInfo,
       authsession: app.globalData.authsession
    })

    wx.showLoading({
      title: '获取数据中',
    })

    //请求数据库，获取所有提交的信息
    wx.request({
      url: 'https://dingyinglai.site/wxapp/querymysqldb',
       method: "POST",
       data: {
          "reqid": 5,    //get all submit information  id = 5
          "authsession": app.globalData.authsession,
       },
       header: {
         'content-type': 'application/x-www-form-urlencoded' // post ,it is different get!!!!
       },
       success: function (res) {
           console.log(res.data)
           wx.hideLoading()
           mythis.setData({
               name: res.data.name,
               sex: res.data.sex,
               age: res.data.age,
               department: res.data.department,
               telephone: res.data.telephone,

               case1: res.data.case1,
               case2: res.data.case2,
               case3: res.data.case3,

        })
      /*
      wx.navigateTo({
        url: '../feedbackpage/idmesg/idmesg?info=' + res.data,
        success: function (res) {
          // 通过eventChannel向被打开页面传送数据
          console.log('navigate to feedback page')
        }
      })
      */
    }
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
    var mythis = this
    console.log('previed onload')
    this.setData({
       userInfo: app.globalData.userInfo,
       authsession: app.globalData.authsession
    })

    wx.showLoading({
      title: '获取数据中',
    })

    //请求数据库，获取所有提交的信息
    wx.request({
      url: 'https://dingyinglai.site/wxapp/querymysqldb',
       method: "POST",
       data: {
          "reqid": 5,    //get all submit information  id = 5
          "authsession": app.globalData.authsession,
       },
       header: {
         'content-type': 'application/x-www-form-urlencoded' // post ,it is different get!!!!
       },
       success: function (res) {
           console.log(res.data)
           wx.hideLoading()
           mythis.setData({
               name: res.data.name,
               sex: res.data.sex,
               age: res.data.age,
               department: res.data.department,
               telephone: res.data.telephone,

               case1: res.data.case1,
               case2: res.data.case2,
               case3: res.data.case3,

        })
      /*
      wx.navigateTo({
        url: '../feedbackpage/idmesg/idmesg?info=' + res.data,
        success: function (res) {
          // 通过eventChannel向被打开页面传送数据
          console.log('navigate to feedback page')
        }
      })
      */
    }
  })
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