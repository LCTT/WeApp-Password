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
        wx.navigateTo({
          url: '../info/info?id=' + res.result
        })
      },
      fail: function (res) {
        wx.showModal({
          title: '扫描二维码出错',
          content: '您的二维码有误，是否要重新扫描？',
          success: function (res) {
             if (res.confirm) {
               that.scanCode();
             }else{
               
             }
           
          }
        })
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