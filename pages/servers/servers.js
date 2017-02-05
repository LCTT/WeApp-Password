const totp = require('../../utils/totp.js');
Page({
  data: {},
  onLoad: function (options) {
    this.refreshData();
  },
  scanCode: function () {
    wx.scanCode({
      success: function (res) {
        wx.navigateTo({
          url: '../add/add?secret=' + res.result.split("?")[1].split("&")[0].split("=")[1] + "&name=" + res.result.split("/")[3].split("?")[0].split(":")[0] + "&username=" + res.result.split("/")[3].split("?")[0].split(":")[1],
        })
      },
      fail: function (err) {

      }
    })
  },
  onPullDownRefresh: function () {
    this.refreshData();
    wx.stopPullDownRefresh();
  },
  refreshData: function () {
    var that = this;
    that.data.servers = [];
    wx.getStorageInfo({
      success: function (res) {
        res.keys.forEach(function (value, index, array) {
          var tmp_servers = that.data.servers;
          tmp_servers.push(wx.getStorageSync(value));
          tmp_servers.forEach(function (value, index, array) {
            value.code = totp.getCode(value.secret);
          })
          that.setData({
            servers: tmp_servers
          })
        })
      },
      fail: function () {
        
      },
      complete: function () {
        // complete
      }
    })
  }
})