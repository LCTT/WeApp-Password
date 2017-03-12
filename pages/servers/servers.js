const totp = require('../../utils/totp.js');
Page({
  data: {
    servers: [],
    timer: 0
  },
  /**
   * 页面进入时，首先加载一次数据
   */
  onLoad: function (options) {

    var ingress = wx.getStorageSync('ingress');
    /**
     * 如果Ingress 为空，则跳转到引导页
     */
    if (ingress == '') {
      wx.redirectTo({
        url: '../ingress/ingress'
      })
    }
    this.refreshData();
  },
  onReady: function () {
    var that = this;
    /**
     * 每秒执行一次
     */
    setInterval(function () {
      /**
       * 如果当前数据的长度和本地存储中数据长度不同。强制刷新一次数据
       */
      if (that.data.servers.length != wx.getStorageInfoSync().keys.length) {
        that.refreshData();
      }
      var timestamp = (new Date()).getTime().toString().substr(0, 10);
      var timeHook = timestamp % 30;
      /**
       * 如果不是30S整点，不更新数据，只更新进度条
       */
      if (timeHook != 0) {
        that.setData({
          timer: timeHook * 3.3333334
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
    var servers = wx.getStorageSync('servers');
    var servers = JSON.parse(servers);
    /**
     * 判断当前是否有添加好的场景
     */
    if (servers.length == 0) {
      that.setData({
        servers: []
      })
    }
    /**
     * 判断是否新增了场景
     */
    if (servers.length == that.data.servers.length) {
      var server = that.data.servers;
      server.forEach(function (value, index, array) {
        value.code = totp.getCode(value.secret);
      })
      that.setData({
        servers: server
      })
    } else {
      var server = [];
      servers.forEach(function (value, index, array) {
        value.code = totp.getCode(value.secret);
        server.push(value);
      });
      that.setData({
        servers: server
      })
    }
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
  },
  scanCode: function () {
    var that = this;
    /**
     * 调用系统二维码接口
     */
    wx.scanCode({
      success: function (res) {
        /**
         * 截取扫描结果。如果前7个字符为otpauth（otp二维码的规定URL），则提示已经识别，并利用split进行分段、作为参数传递
         * 传递到add页面。
         */
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
          /**
           * 如果不是otp二维码，则提示错误。
           */
          wx.showToast({
            title: "场景二维码需要使用微信扫一扫扫描哦！",
            icon: 'loading',
            duration: 2000,
            success: function () {

            }
          })
        }
      },
      fail: function (res) {
        /**
         * 如果是取消扫描二维码，不执行任何操作。
         * 如果是其他报错，则提示。并询问是否要重新扫描。
         */
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
  }
})