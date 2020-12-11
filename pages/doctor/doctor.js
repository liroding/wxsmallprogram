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
    //PE
    PEA:null,
    PEB:null,
    PEC:null,
    PEImglist:null,

    reqid:null,

    //弹窗
    showModal:false,

    //check doctor type
    checkerdoctorid:null,
    //PEA
    PEA_data: [
      { name: 'PEA-1', value: '颈部疼痛' },
      { name: 'PEA-2', value: '枕部疼痛'},
      { name: 'PEA-3', value: '肩痛' },
      { name: 'PEA-4', value: '上肢疼痛' },   // checked: 'true'
    ],
    //PEB
    PEB_data: [
      { name: 'PEB-1', value: '早期   <2周' },
      { name: 'PEB-2', value: '急性   <2周' },
      { name: 'PEB-3', value: '亚急性 6-12周' },
      { name: 'PEB-4', value: '慢性   >12周' },
      { name: 'PEB-5', value: '暂无', checked: 'true' },
    ],
    PEC_data: [
      { name: 'PEC—1', value: 'X线 -- 正位' },
      { name: 'PEC-2', value: 'X线 -- 侧位'},
      { name: 'PEC-3', value: 'X线 -- 后前斜位' },
      { name: 'PEC-4', value: 'X线 -- 前后斜位' },   // checked: 'true'
      { name: 'PEC—5', value: 'X线 -- 张口位' },
      { name: 'PEC-6', value: 'X线 -- 过伸位'},
      { name: 'PEC-7', value: 'X线 -- 过屈位' },
      { name: 'PEC-8', value: 'MRI' }, 
      { name: 'PEC-9', value: 'CT' },   
      { name: 'PEC-10', value: '颈部血管超声' }, 
      { name: 'PEC-11', value: '肌电图' },   
    ],
    DiagnoseResult_1 :'',
    DiagnoseResult_2 :'',
    DiagnoseResult_3 :'',
    DiagnoseResult_4 :'',
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
      
      if (e.currentTarget.id == 'search_a'){
        console.log('[liro-debug]: search_a')
        mythis.data.reqid = 1
      }else if(e.currentTarget.id == 'search_b'){
        console.log('[liro-debug]: search_b')
        mythis.data.reqid = 2
      }
       
      //请求数据库，获取所有提交的信息
      wx.request({
        url: 'https://dingyinglai.site/wxapp/querymysqldb',
         method: "POST",
         data: {
            "reqid": mythis.data.reqid,    //get all submit information  id = 5
            "authsession": app.globalData.authsession,
         },
         header: {
           'content-type': 'application/x-www-form-urlencoded' // post ,it is different get!!!!
         },
         success: function (res) {
             console.log(res.data)
             wx.hideLoading()
             if (res.data == 'no other match dbcase'){
              wx.showToast({
                title: '无新数据可查！' ,  
                icon: 'fail',
                duration: 6000//持续的时间
              })

             }else{
              mythis.setData({
                name: res.data.name,
                sex: res.data.sex,
                age: res.data.age,
                department: res.data.department,
                telephone: res.data.telephone,
 
                PEA: res.data.PEA,
                PEB: res.data.PEB,
                PEC: res.data.PEC,
                PEImglist: res.data.PEImglist,
 
              })
             }
             

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
 
showDialogBtn_doctor: function () {
  this.setData({
     showModal: true,
     checkerdoctorid : 'doctor'
  })
}, 
showDialogBtn_consultants: function () {
  this.setData({
     showModal: true,
     checkerdoctorid : 'consultants'
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
  onConfirm: function (e) {
    var mythis = this
    wx.request({
      url: 'https://dingyinglai.site/wxapp/diagnoseresultsubmit',
      method: "POST",
      data: {
        "DiagnoseResult_1": mythis.data.DiagnoseResult_1,
        "DiagnoseResult_2": mythis.data.DiagnoseResult_2,
        "DiagnoseResult_3": mythis.data.DiagnoseResult_3,
        "DiagnoseResult_4": mythis.data.DiagnoseResult_4,
        "authsession": app.globalData.authsession,
        "checkerdoctorid": mythis.data.checkerdoctorid,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // post ,it is different get!!!!
      },

      success: function (res) {
        console.log(res.data) 
        wx.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 2000 
        })
        mythis.hideModal();
        console.log('[liro-debug]:input doctor id = ' + e.currentTarget.id)
        console.log('[liro-debug] :input data =' + mythis.data.DiagnoseResult_1 + mythis.data.DiagnoseResult_2 + mythis.data.DiagnoseResult_3 + mythis.data.DiagnoseResult_4)
/*           
        wx.hideLoading() 
        wx.navigateTo({
         // url: '../feedbackpage/patientcase/patientcase?info=' + res.data,
          success: function (res) {
            // 通过eventChannel向被打开页面传送数据
            console.log('[liro-debug]: navigate to patientcase feedback page')
          }
        })
*/
      }
    })

  },
  inputChangeResult_1:function(e){
    //console.log(e.detail.value)
    this.setData({
      DiagnoseResult_1:e.detail.value
    })
  },
  inputChangeResult_2:function(e){
   // console.log(e.detail.value)
    this.setData({
      DiagnoseResult_2:e.detail.value
    })
  },
  inputChangeResult_3:function(e){
   // console.log(e.detail.value)
    this.setData({
      DiagnoseResult_3:e.detail.value
    })
  },
  inputChange_option:function(e){
    //console.log(e.detail.value)
    this.setData({
      DiagnoseResult_4:e.detail.value
    })
  },

})