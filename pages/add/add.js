
Page({
  data: {},
  onLoad: function (options) {
    var that = this;
    if (wx.getStorageSync(options.secret) == '') {
      
    } else {
        wx.showModal({
           title: '该场景已经添加过！',
          content: '当前场景已经添加过！点击取消继续修改，数据将被覆盖！',
          success: function (res) {
            if (res.confirm) {
              wx.switchTab({
                url: '../servers/servers'
              })
            }
          }
        })
    }
    wx.getLocation({
        type: 'wgs84',
        success: function (res) {
          that.setData({
            name: decodeURI(options.name),
            secret: options.secret,
            username: decodeURI(options.username),
            latitude: res.latitude,
            longitude: res.longitude
          });
        },
      })


  },
  submitData: function (e) {
    var that = this
    wx.setStorage({
      key: that.data.secret,
      data: {
        secret: that.data.secret,
        name: e.detail.value.name,
        username: e.detail.value.username,
        desc: e.detail.value.desc,
        latitude: that.data.latitude,
        longitude: that.data.longitude,
        signedBy: that.data.name,
        key: that.data.secret
      },
      success: function (res) {

        wx.redirectTo({
          url: '../addSucc/addSucc?id=' + that.data.secret
        })
      },
      fail: function () {
        wx.showModal({
          title: '数据存储出错！',
          content: '数据存储出错！请联系管理员！',
          success: function (res) {
            if (res.confirm) {
              wx.switchTab({
                url: '../index/index'
              })
            }
          }
        })
      }
    })
  },
})