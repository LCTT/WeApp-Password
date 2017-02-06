var gps = require('../../utils/gps.js');
Page({
  data: {},
  onLoad: function (options) {
    //  var longs =gps.getDistance(35.215893,113.242826,35.215893,113.243826)
    //  console.log(longs)
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
  onShareAppMessage: function () {
    return {
      title: '运维密码！帮助你更好的管理你的密码！',
      desc: 'LinuxCN 出品',
      path: '/pages/servers/servers'
    }
  }
})