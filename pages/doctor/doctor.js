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
    caseimglist:null,

    //弹窗
    showModal:false,

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
    Result_1 :'',
    Result_2 :'',
    Result_3 :'',
    Result_4 :'',
  },


    //预览图片，放大预览
    previewImage:function(e) {
   
      let index = e.currentTarget.dataset.index;   
      console.log('[LIRO-DEBUG]:' + index)
      wx.previewImage({  
        //当前显示下表   
        current: this.data.caseimglist[index],   
        //数据源   
        urls: this.data.caseimglist
        }) 
    },

    doctor_preview: function (e) {
      console.log(e.currentTarget.id)
      var mythis = this
      console.log('previed onload')
      //clear data
      mythis.data.name = null
    
      mythis.data.sex = null

      mythis.data.caseimglist = null


      this.setData({
         userInfo: app.globalData.userInfo,
         authsession: app.globalData.authsession
      })
  
      wx.showLoading({
        title: '获取数据中',
      })
      
      if (e.currentTarget.id == 'serch'){
        console.log('serch')
        reqid = 5
      }else if(e.currentTarget.id == 'next'){
        console.log('next')
        reqid = 5
      }
       
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
                 caseimglist: res.data.caseimglist,
  
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },

/******
 ****弹窗
**************/
 
showDialogBtn: function () {
  this.setData({
     showModal: true
  })
}, 
  /** 
  * 弹出框蒙层截断touchmove事件
  */
   
  preventTouchMove: function () {
  },
   
  /**
  * 隐藏模态对话框
  */
   
  hideModal: function () {
    this.setData({
      showModal: false
    });
  },
   
  /**
  * 对话框取消按钮点击事件
  */
   
  onCancel: function () { 
    this.hideModal();
  },
   
  /**
  * 对话框确认按钮点击事件
  */
  onConfirm: function () {
    wx.showToast({
      title: '提交成功',
      icon: 'success',
      duration: 2000 
    })
    this.hideModal();
    console.log('[liro-debug] :input data =' + this.data.Result_1 + this.data.Result_2 + this.data.Result_3 + this.data.Result_4)
  },
  inputChangeResult_1:function(e){
    //console.log(e.detail.value)
    this.setData({
      Result_1:e.detail.value
    })
  },
  inputChangeResult_2:function(e){
    //console.log(e.detail.value)
    this.setData({
      Result_2:e.detail.value
    })
  },
  inputChangeResult_3:function(e){
    //console.log(e.detail.value)
    this.setData({
      Result_3:e.detail.value
    })
  },
  inputChange_option:function(e){
    //console.log(e.detail.value)
    this.setData({
      Result_4:e.detail.value
    })
  },

})