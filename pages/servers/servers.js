const totp = require('../../utils/totp.js');
Page({
  data: {},
  onLoad: function (options) {
    this.refreshData();
  },
  onReady: function () {
    var that = this;
    setInterval(function () {
      that.refreshData();
    }, 10000)

  },
  scanCode: function () {
   var that = this;
    wx.scanCode({
      success: function (res) {
        if (res.result.substr(0, 7) == 'otpauth') {
          wx.showToast({
            title: '识别到创建场景二维码！',
            icon: 'success',
            duration: 2000,
            success: function () {
              wx.navigateTo({
                url: '../add/add?secret=' + res.result.split("?")[1].split("&")[0].split("=")[1] + "&name=" + res.result.split("/")[3].split("?")[0].split(":")[0] + "&username=" + res.result.split("/")[3].split("?")[0].split(":")[1],
              })
            }
          })
        } else {
          wx.showToast({
            title: "识别到密码信息二维码!",
            icon: 'success',
            duration: 2000,
            success: function () {
              wx.navigateTo({
                url: '../info/info?id=' + res.result
              })
            }
          })
        }
      },
      fail: function (res) {

        if (res.errMsg == 'scanCode:fail cancel') {

        } else {
          wx.showModal({
            title: '扫描二维码出错',
            content: '您的二维码有误，是否要重新扫描？',
            success: function (res) {
              if (res.confirm) {
                that.scanCode();
              } else {

              }

            }
          })
        }
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
        var tmp_servers = that.data.servers;
        res.keys.forEach(function (value, index, array) {
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