
Page({
  data: {},
  onLoad: function (options) {
    var that = this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        that.setData({
          name: options.name,
          secret: options.secret,
          username: options.username,
          latitude:res.latitude,
          longitude:res.longitude
        });
      }
    })

  },
  submitData: function (e) {
    wx.setStorage({
      key: this.data.secret+'-'+this.data.latitude+','+this.data.longitude,
      data: {
        secret: this.data.secret,
        name: e.detail.value.name,
        username: this.data.username,
        desc: e.detail.value.desc,
        latitude:this.data.latitude,
        longitude:this.data.longitude
      },
      success: function (res) {
        wx.redirectTo({
          url: '../addSucc/addSucc'
        })
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  }
})