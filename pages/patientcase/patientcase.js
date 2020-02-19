// pages/patientcase/patientcase.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //1
    items: [
      { name: 'USA', value: '是否抽烟' },
      { name: 'CHN', value: '是否喝酒', checked: 'true' },
      { name: 'BRA', value: '是否头疼' },
      { name: 'JPN', value: '其他' },
    ],
    //2
    items_2: [
      { name: 'yes', value: '检出过' },
      { name: 'no', value: '未检查过', checked: 'true' },
    ],
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

    img: '/resources/index_bakcup/1.png'
  },


  checkboxChange_1: function (e) {
    console.log('checkboxChange_1发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },

  checkboxChange_2: function (e) {
    console.log('checkboxChange_2发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },

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
          url: 'http://39.107.48.2:8000/wxapp/fileupload', //仅为示例，非真实的接口地址
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

  formSubmit: function (e) {
    console.log('[liro-debug]:form发生了submit事件，携带数据为：', e.detail.value)
    wx.showModal({
      title: '提示',
      content: '再确认是否提交',
      success: function (res) {
        if (res.confirm) {//这里是点击了确定以后
          console.log('[liro-debug]:确认提交')
/*
          wx.request({
            url: 'http://39.107.48.2:8000/wxapp/usermesgsubmit',
            method: "POST",
            data: {
              "name": e.detail.value.user,
              "checkbox": e.detail.value.checkbox,
              "age": e.detail.value.age,
              "department": e.detail.value.department,
              "telephone": e.detail.value.telephone,
              "authsession": app.globalData.authsession,
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded' // post ,it is different get!!!!
            },
            success: function (res) {
              console.log(res.data)
              wx.navigateTo({
                url: '../feedbackpage/idmesg/idmesg?info=' + res.data,
                success: function (res) {
                  // 通过eventChannel向被打开页面传送数据
                  console.log('navigate to feedback page')
                }
              })
            }
          })
*/

        } else {//这里是点击了取消以后
          console.log('[liro-debug]:不提交')
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