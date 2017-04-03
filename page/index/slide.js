var section = ["first", "second", "third","fourth"]
Page({
  data: {
    screenHeight: 0,
    scrollTop: 0,
    toView: "first"
  },
  onLoad: function (options) {
    var that = this;
    var systemInfo = wx.getSystemInfoSync();
    that.setData({
      screenHeight: systemInfo.windowHeight
    })
  },
  bindScroll: function (event) {
  },
  skip: function (event) {
    wx.setStorage({
      key: 'ingress',
      data: 1,
      success: function (res) {
        wx.switchTab({
          url: '../index/index',
          
        })
      }
    })
  },
  nextScreen: function (event) {
    var that = this;
    for (var i = 0; i < section.length; ++i) {
      if (section[i] === this.data.toView) {
        that.setData({
          toView: section[i + 1]
        })
        break
      }
    }
  }


})