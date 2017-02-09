const totp = require('../../utils/totp.js');
Page({
  data: {
    servers: [],
    timer: 0
  },
  onLoad: function (options) {
    this.refreshData();
  },
  onReady: function () {
    var that = this;
    setInterval(function () {
      var timestamp = (new Date()).getTime().toString().substr(0, 10);
      var timeHook = timestamp % 30;
      if (timeHook != 0) {
        that.setData({
          timer: timeHook * 3.4
        })
      } else {
        that.setData({
          timer: 0
        })
        that.refreshData();
      }

    }, 1000)

  },

  refreshData: function () {
    var that = this;
    wx.getStorageInfo({
      success: function (res) {
        var keys = res.keys;
        if (keys.length == 0) {
          that.setData({
            servers: []
          })
        }
        if (keys.length == that.data.servers.length) {
          var server = that.data.servers;
          server.forEach(function (value, index, array) {
            var newCode = totp.getCode(value.secret);
            value.code = newCode;
          })
          that.setData({
            servers: server
          })

        } else {
          var server = [];
          keys.forEach(function (i, v, array) {
            var data = wx.getStorageSync(i);
            server.push(data);
            server.forEach(function (value, index, array) {
              value.code = totp.getCode(value.secret);
            })
            that.setData({
              servers: server
            })
          })
        }

      }
    })
  },
  onShareAppMessage: function () {
    return {
      title: '运维密码！帮助你更好的管理你的密码！',
      desc: 'LinuxCN 出品',
      path: '/pages/servers/servers'
    }
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
  isInArray: function (arr, obj) {
    var i = arr.length;
    while (i--) {
      if (arr[i] === obj) {
        return true;
      }
    }
    return false;
  }
})