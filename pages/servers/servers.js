const totp = require('../../utils/totp.js');
Page({
  data: {},
  onLoad: function (options) {
    this.refreshData();
  },
  scanCode: function () {
    var that = this;c
    wx.scanCode({
      success: function (res) {
        wx.navigateTo({
          url: '../add/add?secret=' + res.result.split("?")[1].split("&")[0].split("=")[1] + "&name=" + res.result.split("/")[3].split("?")[0].split(":")[0] + "&username=" + res.result.split("/")[3].split("?")[0].split(":")[1],
        })
      },
      fail: function (err) {
        wx.showModal({
          title: '扫码错误！',
          content: '是否重新扫描？',
          success: function (res) {
            if (res.confirm) {
              that.scanCode();
            }
          }
        })
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
          var keys = value;
          tmp_servers.push(wx.getStorageSync(value));
          tmp_servers.forEach(function (value, index, array) {
            value.code = totp.getCode(value.secret);
            value.keys = keys;
          })
          that.setData({
            servers: tmp_servers
          })
        })
      },
      fail: function () {
        wx.showModal({
          title: '提示',
          content: '刷新失败，是否重新刷新？',
          success: function (res) {
            if (res.confirm) {
              this.refreshData();
            }
          }
        })
      },
      complete: function () {
        // complete
      }
    })
  },
  onShareAppMessage: function () {
    return {
      title: '运维密码！帮助你更好的管理你的密码！',
      desc: 'LinuxCN 出品',
      path: '/pages/servers/servers'
    }
  }
})