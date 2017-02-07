
Page({
  data: {},
  onLoad: function (options) {
    var that = this;
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
    wx.setStorage({
      key: this.getUUID(),
      data: {
        secret: this.data.secret,
        name: e.detail.value.name,
        username: e.detail.value.username,
        desc: e.detail.value.desc,
        latitude: this.data.latitude,
        longitude: this.data.longitude,
        signedBy:this.data.name
      },
      success: function (res) {
        wx.redirectTo({
          url: '../addSucc/addSucc'
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
  getUUID: function () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
})