// pages/import/import.js
Page({
  data: {},
  onLoad: function (options) {

  },
  onReady: function () {
    var that = this;
    wx.scanCode({
      success: function (res) {
        var data = JSON.parse(res.result);
        var server = data.s;
        var raw_data = wx.getStorageSync('servers');
        var old_servers = JSON.parse(raw_data);
        var old_length = old_servers.length;
        server.forEach(function (value, index, array) {
          if (old_length == 0) {
            old_servers.push({ "secret": value.s, "name": decodeURI(value.b), "username": decodeURI(value.b), "desc": decodeURI(value.b), "latitude": value.la, "longitude": value.lo, "signedBy": decodeURI(value.b), "key": value.s })
          } else {
            var is_exist = that.inArray(value.s, old_servers)
            if (is_exist == false) {
              old_servers.push({ "secret": value.s, "name": decodeURI(value.b), "username": decodeURI(value.b), "desc": decodeURI(value.b), "latitude": value.la, "longitude": value.lo, "signedBy": decodeURI(value.b), "key": value.s })
            }
          }

        });
        wx.setStorage({
          key: 'servers',
          data: JSON.stringify(old_servers),
          success: function (res) {
            wx.showToast({
              "title": "成功",
              "icon": "success",
              success: function () {
                setTimeout(function () {
                  wx.switchTab({
                    url: '../options/options'
                  }, 2000);
                })
              }
            })
          },
        })

      },
      fail: function () {
        wx.showModal({
          "title": "扫描失败",
          "content": "请重新扫描",
          "showCancel": false,
          "success": function (e) {
            wx.navigateBack();
          }
        })
      },

    })
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
  inArray: function (needle, haystack) {
    /**
     * inArray 源自 Jquey
     */
    var length = haystack.length;
    for (var i = 0; i < length; i++) {
      if (haystack[i].secret == needle) return true;
    }
    return false;
  }
})