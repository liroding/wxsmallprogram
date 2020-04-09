// pages/patientcase/patientcase.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemsdata_1: {},
    itemsdata_2: {},
    itemsdata_3: {},
    caseimagesList : [],

    //1
    items: [
      { name: '1-1', value: '颈部疼痛' },
      { name: '1-2', value: '枕部疼痛'},
      { name: '1-3', value: '肩痛' },
      { name: '1-4', value: '上肢疼痛' },  
     // { name: '1-5', value: '暂无',checked: 'true'},   // checked: 'true'
    ],
    //2
    radioItems: [
      { name: '2-1', value: '早期   <2周' },
      { name: '2-2', value: '急性   <2周' },
      { name: '2-3', value: '亚急性 6-12周' },
      { name: '2-4', value: '慢性   >12周' },
  //    { name: '2-5', value: '暂无', checked: 'true' },
    ],
    uploadpicitems: [
      { name: '3-1', value: 'X线 -- 正位' },
      { name: '3-2', value: 'X线 -- 侧位'},
      { name: '3-3', value: 'X线 -- 后前斜位' },
      { name: '3-4', value: 'X线 -- 前后斜位' },   // checked: 'true'
      { name: '3-5', value: 'X线 -- 张口位' },
      { name: '3-6', value: 'X线 -- 过伸位'},
      { name: '3-7', value: 'X线 -- 过屈位' },
      { name: '3-8', value: 'MRI' }, 
      { name: '3-9', value: 'CT' },   
      { name: '3-10', value: '颈部血管超声' }, 
      { name: '3-11', value: '肌电图' },   
    ],
    


    /*
    //3
    array: ['美国', '中国', '巴西', '日本'],
    objectArray: [
      {
        id: 0,
        name: '美国'
      },
      {
        id: 1,
        name: '中国'
      },
      {
        id: 2,
        name: '巴西'
      },
      {
        id: 3,
        name: '日本'
      }
    ],

    //4
    index: 0,
    multiArray: [['无脊柱动物', '脊柱动物'], ['扁性动物', '线形动物', '环节动物', '软体动物', '节肢动物'], ['猪肉绦虫', '吸血虫']],
    objectMultiArray: [
      [
        {
          id: 0,
          name: '无脊柱动物'
        },
        {
          id: 1,
          name: '脊柱动物'
        }
      ], [
        {
          id: 0,
          name: '扁性动物'
        },
        {
          id: 1,
          name: '线形动物'
        },
        {
          id: 2,
          name: '环节动物'
        },
        {
          id: 3,
          name: '软体动物'
        },
        {
          id: 3,
          name: '节肢动物'
        }
      ], [
        {
          id: 0,
          name: '猪肉绦虫'
        },
        {
          id: 1,
          name: '吸血虫'
        }
      ]
    ],
    multiIndex: [0, 0, 0],
*/
    img: '/resources/index_bakcup/1.png'
  },

  checkboxChange_1: function (e) {
    var mythis = this 
    console.log('checkboxChange_1发送选择改变，携带值为', e.detail.value)
    this.setData({
      itemsdata_1: e.detail.value
    })
  },
  checkboxChange_2: function (e) {
    var checked = e.detail.value
    console.log('radioChange 发送选择改变，携带值为', e.detail.value)
    var changed = {}
    for (var i = 0; i < this.data.radioItems.length; i++) {
      if (checked.indexOf(this.data.radioItems[i].name) !== -1) {
        changed['radioItems[' + i + '].checked'] = true
      } else {
        changed['radioItems[' + i + '].checked'] = false
      }
    }
    this.setData(changed)
    this.setData({
      itemsdata_2: e.detail.value
    })
  },

  checkboxChange_3: function (e) {
    var mythis = this 
    console.log('checkboxChange_1发送选择改变，携带值为', e.detail.value)
    this.setData({
      itemsdata_3: e.detail.value
    })
  },
/*
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },

  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
  },
  */


  formSubmit: function (e) {
    var mythis = this
    console.log('[liro-debug]:form发生了submit事件，携带数据为itemsdata=', mythis.data.itemsdata_1)
    console.log('[liro-debug]:form发生了submit事件，携带数据为itemsdata_2=', mythis.data.itemsdata_2)
    console.log('[liro-debug]:form发生了submit事件，携带数据为itemsdata_3=', mythis.data.itemsdata_3)
    wx.showModal({
      title: '提示',
      content: '再确认是否提交',
      success: function (res) {
        if (res.confirm) {//这里是点击了确定以后
          console.log('[liro-debug]:确认提交')

          wx.showLoading({
            title: '提交中',
          })
          //submit case 1/2/3
          wx.request({
            url: 'https://dingyinglai.site/wxapp/patientcasemesgsubmit',
            method: "POST",

            data: {
              "itemsdata_1": mythis.data.itemsdata_1,
              "itemsdata_2": mythis.data.itemsdata_2,
              "itemsdata_3": mythis.data.itemsdata_3,
              "authsession": app.globalData.authsession,
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded' // post ,it is different get!!!!
            },
            success: function (res) {
              console.log(res.data)
             
              wx.hideLoading()
  /*            
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

          //upload case img 
          console.log("[liro-debug] 1>" + mythis.data.caseimagesList.length)
          if(mythis.data.caseimagesList.length > 0){
            for(var i = 0; i < mythis.data.caseimagesList.length; i ++)
            {
                var imgurl = mythis.data.caseimagesList[i]
                console.log(imgurl)
                wx.uploadFile({
                  url: 'https://dingyinglai.site/wxapp/fileupload',
                  filePath: imgurl,
                  name: 'file',
                  header: {
                      "Content-Type": "multipart/form-data",
                      'Content-Type': 'application/json'
                  },
                  formData: {
                    'authsession': app.globalData.authsession,
                    "uploadid"  : 3,
                    "casepicid" : i,
                  },
                  success:function(data){
                      console.log(data);
                      wx.hideLoading()
                      wx.navigateTo({
                       // url: '../feedbackpage/patientcase/patientcase?info=' + res.data,
                        success: function (res) {
                          // 通过eventChannel向被打开页面传送数据
                          console.log('[liro-debug]: navigate to patientcase feedback page')
                        }
                      })
                  },
                  fail:function(data){
                      console.log(data);
                  }
              }) 
  
            }
          }



        } else {//这里是点击了取消以后
          console.log('[liro-debug]:不提交')
        }
      }
    })

  },

  // 图片上传
selectcaseimg:function(){

      var that=this;
//      let imagesList=[]; 
      let maxSize=1024*1024;
      let maxLength=11; 
      let flag=true;
      console.log('nihao')
      wx.chooseImage({
            count: 11, //最多可以选择的图片总数
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
                  if(res.tempFiles[i].size>maxSize){  //Size < 1M
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
                        caseimagesList: res.tempFilePaths                         
                })
            }
  
/*
            var authsession = wx.getStorageSync('authsession')
            */
            console.log("[LIRO-DEBUG]" + res);
  
            },
  
        fail:function(res){ 
              console.log(res); 
        }
  
  })
  
  },

  //预览图片，放大预览
  previewImage:function(e) {
   
  let index = e.currentTarget.dataset.index;   
  console.log('[LIRO-DEBUG]:' + index)
  wx.previewImage({  
    //当前显示下表   
    current: this.data.caseimagesList[index],   
    //数据源   
    urls: this.data.caseimagesList
    }) 
},


chooseWxImage: function (type) {
  var that = this;
  wx.chooseImage({
    sizeType: ['original', 'compressed'],
    sourceType: [type],
    success: function (res) {
      console.log(res);
      that.setData({
        // tempFilePath可以作为img标签的src属性显示图片
        img: res.tempFilePaths[0],
      })

      var authsession = wx.getStorageSync('authsession')
      
      wx.uploadFile({
        url: 'https://dingyinglai.site/wxapp/fileupload', //仅为示例，非真实的接口地址
        filePath: res.tempFilePaths[0],
        name: 'file',
        formData: {
          'authsession': authsession
        },
        success(res) {
          const data = res.data
          //do something
        }
      })




    }
  })
},

chooseimage: function () {
  var that = this;
  wx.showActionSheet({
    itemList: ['从相册中选择', '拍照'],
    itemColor: "#a3a2a2",
    success: function (res) {

      if (!res.cancel) {
        if (res.tapIndex == 0) {
          that.chooseWxImage('album')
        } else if (res.tapIndex == 1) {
          that.chooseWxImage('camera')
        }
      }
    }
  })
},







  formReset: function () {
    console.log('[liro-ding]:form发生了reset事件')
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

  }
})