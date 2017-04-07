var helper = require("../../util/js/helper");
Page({
  data: {
    array: ["服务器", "网站", "App", "游戏", "其它"],
    index:0
  },
  onLoad: function (options) {
    var that = this;
    /* 从存储中取出所有的server  */
    var serverStr = wx.getStorageSync('servers');
    if (serverStr == '') {
      serverStr = "[]";
    }
    var servers = JSON.parse(serverStr);
    servers.forEach(function (value, index, array) {
      if (value.secret == options.id) {
        that.setData({
          name: value.name,
          username: value.username,
          desc: value.desc,
          secret: value.secret,
          signedBy: value.signedBy,
          longitude: value.longitude,
          latitude: value.latitude,
          typed: value.type,
        })
        that.setIndex(value.type)
      }
    });

  },
  onReady: function () {
    // 页面渲染完成
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
  radioChange: function () { },
  submitData: function (e) {
    var that = this;
    var old_data = wx.getStorageSync('servers');
    if (old_data == '') {
      old_data = '[]'
    }
    var servers = JSON.parse(old_data);
    var server = [];
    var old_length = servers.length;
    servers.forEach(function (value, index, array) {
      if (value.secret != that.data.secret) {
        server.push(value);
      }
    });
    server.push({
      secret: that.data.secret,
      name: e.detail.value.name, // 此处为表单数据，
      username: e.detail.value.username,
      desc: e.detail.value.desc,
      latitude: that.data.latitude, //此处为页面的data
      longitude: that.data.longitude,
      signedBy: that.data.name,
      "type": that.data.typed
    })
    var new_length = server.length;
    if (new_length != old_length) {
      wx.showModal({
        title: '数据存储出错！',
        content: '数据存储出错！请联系管理员！',
        success: function (res) {
          if (res.confirm) {
            wx.switchTab({
              url: '../index/index'
            })
          }
        }
      })
    } else {
      var servers_str = JSON.stringify(server);
      wx.setStorageSync('servers', servers_str);
      wx.showToast({
        "title": "编辑成功！",
        "icon": "success",
        complete: function (e) {
          wx.redirectTo({
            url: '../view/view?id=' + that.data.secret
          })
        }
      })
    }
  },
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },
  updateLocation: function (e) {
    var that = this;
    
    wx.chooseLocation({
      success: function(res){
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude
        });
        wx.showToast({
          "title": "地址获取成功！",
          "icon": "success"
        })
      },
      fail: function(res) {
        wx.showToast({
          "title": "地址获取失败！！",
          "icon": "loading"
        })
      }
    })
  },
  bindPickerChange: function (e) {
    var that = this;
    that.setData({index:e.detail.value})
    switch (e.detail.value) {
      case "0":
        that.setData({ typed: "server"});
        break;
      case "1":
        that.setData({ typed: "website" });
        break;
      case "2":
        that.setData({ typed: "app" });
        break;
      case "3":
        that.setData({ typed: "game" });
        break;
      default:
        that.setData({ typed: "other" });
        break;

    }
  },
  setIndex:function(num){
    var that = this;
    switch(num){
      case "server":
        that.setData({ index: 0 });
        break;
      case "website":
        that.setData({ index: 1 });
        break;
      case "app":
        that.setData({ index: 2 });
        break;
      case "game":
        that.setData({ index: 3 });
        break;
      default:
        that.setData({ index: 4 });
        break;
    }
  }
})