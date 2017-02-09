const totp = require('../../utils/totp.js');
Page({
  data: {
    timer:0
  },
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: options.id,
      success: function (res) {
        that.setData({
          keys: options.id,
          name: res.data.name,
          username: res.data.username,
          desc: res.data.desc,
          secret: res.data.secret,
          code: totp.getCode(res.data.secret),
        })
      },
      fail: function (e) {
        
          wx.showModal({
            title: "权限不足！",
            content: "您无权查看当前场景！",
            success: function (res) {
              if (res.confirm) {
                wx.switchTab({
                  url: '../servers/servers'
                })
              } else {
                wx.switchTab({
                  url: '../servers/servers'
                })
              }
            }
          })
        

      }
    })
  },
  onReady: function () {
    var that = this;
    setInterval(function () {
       var timestamp = new Date().getTime().toString().substr(0,10);
       var timeHook = timestamp%30;
       if( timeHook != 0 ){
          that.setData({
            timer:timeHook*3.4
          })
       }else{
         that.setData({
            timer:0
          })
        that.updateCode();
       }
      
    }, 1000)

  },
  deleteOne: function (e) {
    var that = this;
    wx.removeStorage({
      key: that.data.keys,
      success: function (res) {
        wx.showToast({
          title: '删除场景成功',
          icon: 'success',
          duration: 2000,
          success: function () {
            wx.switchTab({
              url: '../servers/servers'
            })
          }
        })

      },
      fail: function () {
        wx.showModal({
          title: '删除失败！',
          content: '当前场景无法删除，请联系管理员！',
          success: function (res) {
            if (res.confirm) {
              wx.switchTab({
                url: '../servers/servers'
              })
            }
          }
        })
      }
    })
  },
  updateCode: function () {
    var that = this;
    var newToken = totp.getCode(this.data.secret);
    that.setData({
      code: newToken
    })
  },
  onPullDownRefresh: function () {
    this.updateCode();
  },
  navigateBack: function () {
    wx.switchTab({
      url: '../servers/servers'
    })
  }
})