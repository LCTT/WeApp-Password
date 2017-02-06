const totp = require('../../utils/totp.js');
Page({
  data: {

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
      fail: function () {
        wx.showModal({
          title: '数据读取错误！',
          content: '当前二维码不正确或场景不是你创建的！请确认后重新扫描！',
          success: function (res) {
            if (res.confirm) {
              var that = this;
              wx.scanCode({
                success: function (res) {
                  wx.redirectTo({
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
                      } else {
                        wx.switchTab({
                          url: '../index/index'
                        })
                      }

                    }
                  })
                }
              })
            } else {
              wx.switchTab({
                url: '../index/index'
              })
            }
          }
        })
      }
    })
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
    wx.navigateBack()
  }
})