var helper = require("../../util/js/helper");
Page({
  data: {
    items: [
      { name: '服务器', value: 'server', checked: 'true' },
      { name: '网站', value: 'website' },
      { name: 'App', value: 'app' },
      { name: '游戏', value: 'game' },
      { name: '其他', value: 'other' }
    ]
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
          "type": value.type,
        })
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
      if (value.key != that.data.secret) {
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
      "type": e.detail.value.type
    })
    console.log(servers)
    console.log(server)
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
  updateLocation:function(e){
    var that = this;
    wx.getLocation({
      type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function(res){
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude
        });
        wx.showToast({
          "title":"地址获取成功！",
          "icon":"success"
        })
      },
      fail: function(res) {
        // fail
      },
      complete: function(res) {
        // complete
      }
    })
  }
})