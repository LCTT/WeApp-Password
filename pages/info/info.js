const totp = require('../../utils/totp.js');
Page({
  data: {
    timer:0
  },
  onLoad: function (options) {
    var that = this;
    /**
     * 使用getStorage方法来加载数据。如果加载失败则提示无权限，并返回场景列表。后续地点感知功能上线后，调整至感知页面，体验更佳。
     */
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
    /**
     * 进行时间判断，如果时间在30的整除点上，计算一次code，如果不是在时间点上，则只是变更进度条数据
     */
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
    /**
     * 使用removeStorage方法来删除数据。
     */
    wx.removeStorage({
      key: that.data.keys,
      success: function (res) {
        /**
         * 提示删除场景成功。并调用switchTab方法回到场景列表页。后续考虑跳转到场景感知页面。
         */
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
        /**
         * 如果无法删除，提示无法删除，并请求联系管理员，协助排除故障。
         */
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
    /**
     * secret存放在页面的data中，直接调用totp.js方法即可生成新的code
     */
    var newToken = totp.getCode(this.data.secret);
    that.setData({
      code: newToken
    })
  },
  onPullDownRefresh: function () {
    /**
     * 下拉强制刷新更新数据。
     */
    this.updateCode();
  },
  navigateBack: function () {
    /**
     * 调用switch方法来响应右下角的返回按钮。
     */
    wx.switchTab({
      url: '../servers/servers'
    })
  },
   onShareAppMessage: function () {
    /**
     * 分享对象的设置。path可以是含参的。
     */
    return {
      title: '运维密码',
      desc: '每一位运维人员都需要的 OTP 管理工具',
      path: '/pages/servers/servers'
    }
  }
})