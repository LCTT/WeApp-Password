// pages/indexcode/indexcode.js
Page({
  data: {},
  onLoad: function (options) {
    
  },
  onReady: function () {
    console.log('onReady')
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
        wx.switchTab({
          url: '../servers/servers',
          success: function(res){
            // success
          },
          fail: function() {
            // fail
          },
          complete: function() {
            // complete
          }
        })
      }
    })
  },
  onShow: function () {
    console.log('onShow')
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
        wx.switchTab({
          url: '../servers/servers',
          success: function(res){
            // success
          },
          fail: function() {
            // fail
          },
          complete: function() {
            // complete
          }
        })
      }
    })
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})