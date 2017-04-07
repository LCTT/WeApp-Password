const totp = require('../../util/js/totp');
Page({
  data: {
    "servers": []
  },
  onLoad: function (options) {
    var ingress = wx.getStorageSync('ingress');
    if (ingress == '') {
      wx.redirectTo({
        url: '../index/slide'
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
      var mem_server = wx.getStorageSync('servers');
      if (mem_server != '') {
        if (JSON.parse(mem_server).length != that.data.servers.length) {
          that.refreshData();
        }
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
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  // 将生成的密钥放到剪贴板中，并提示。
  copyCode: function (e) {
    /**
     * 置剪贴板
     */
    wx.setClipboardData({
      data: e.currentTarget.dataset.code,
      success: function (res) {
        /**
         * 展示提示
         */
        wx.showToast({
          title: '代码已经复制到您的剪贴板中',
          icon: 'success',
          duration: 2000
        })
      }
    })
  },
  viewInfo: function (e) {
    /**
     * 保留当前页调整
     */
    wx.navigateTo({
      url: '../view/view?id=' + e.currentTarget.dataset.key
    })
  },
  addServer: function (e) {
    wx.scanCode({
      success: function (res) {
        /** 
         * url decode 
         */
        var data = decodeURIComponent(res.result);
        /**
         * 数据截断
         */
        var username = data.split(":")[2].split("?")[0];
        var regexIssuer = data.split("/")[3].split("?")[0].split(":")[0];
        var issuer = data.split("issuer=")[1];
        var secret = data.split("?")[1].split("&")[0].split("=")[1];

        /**
         * 判断是否是 libpam 的 url
         */
        if (username == null || issuer != regexIssuer) {
          username = result.split("/")[3].split("?")[0];
        }

        wx.navigateTo({
          url: '../add/add?secret=' + secret + "&name=" + issuer + "&username=" + username
        })

      },
      fail: function (res) {
       if (res.errMsg == 'scanCode:fail cancel') {

        } else {
          wx.showModal({
            "title": "扫描失败",
            "content": "您可能扫描了错误的二维码，请重新扫描！",
            "showCancel": false,
            "success": function (e) {
            }
          })
        }
      }
    })
  },
  refreshData: function (e) {
    var that = this;
    var raw_servers = wx.getStorageSync('servers');

    if (raw_servers == '') {
      return ;
    }
    var servers = JSON.parse(raw_servers);
    if (servers.length == 0) {
      that.setData({
        servers: []
      })
      return ;
    }
   
      var server = [];
      servers.forEach(function (value, index, array) {
        value.code = totp.getCode(value.secret);
        server.push(value);
      });
      that.setData({
        servers: server
      })
    

  },
  onPullDownRefresh: function () {
    this.refreshData();
    wx.stopPullDownRefresh();
  }
})