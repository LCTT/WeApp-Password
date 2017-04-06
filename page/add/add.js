var helper = require("../../util/js/helper");
Page({
  data: {
    items: [
      { name: '服务器', value: 'server', checked: 'true' },
      { name: '网站', value: 'website' },
      { name: 'App', value: 'app' },
      { name: '游戏', value: 'game' },
      { name: '其它', value: 'other' }
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
      if (value.secret == options.secret) {
        wx.showModal({
          title: '该场景已经添加过！',
          content: '当前场景已经添加过！请返回重新扫描！',
          showCancel: false,
          success: function (res) {
            /*
            * 使用switchTab方法切换到场景管理页面
            */
            wx.switchTab({
              url: '../index/index'
            })
          }
        })
      }
    });
    wx.getLocation({
      type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function (res) {
        /*
      * 获取到GPS信息后，连带传入的options参数中的值都同步到视图中，用于页面展示和后续数据存储时使用。
      */
        that.setData({
          name: options.name,
          secret: options.secret,
          username: options.username,
          latitude: res.latitude,
          longitude: res.longitude
        });
      },
      fail: function (res) {
        /*
       * 获取到GPS信息后，连带传入的options参数中的值都同步到视图中，用于页面展示和后续数据存储时使用。
       */
        that.setData({
          name: decodeURI(options.name),
          secret: options.secret,
          username: decodeURI(options.username),
          latitude: res.latitude,
          longitude: res.longitude
        });
      },
      complete: function (res) {
        // complete
      }
    })
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
    var old_length = servers.length;
    servers.push({
      secret: that.data.secret,
      name: e.detail.value.name, // 此处为表单数据，
      username: e.detail.value.username,
      desc: e.detail.value.desc,
      latitude: that.data.latitude, //此处为页面的data
      longitude: that.data.longitude,
      signedBy: that.data.name,
      "type": e.detail.value.type
    })
    var new_length = servers.length;
    if (new_length == old_length) {
      wx.showModal({
        title: '数据存储出错！',
        content: '数据存储出错！请联系管理员！',
        success: function (res) {
          if (res.confirm) {
            wx.switchTab({
              url: '../servers/servers'
            })
          }
        }
      })
    } else {
      var servers_str = JSON.stringify(servers);
      wx.setStorageSync('servers', servers_str);
      wx.showToast({
        "title": "添加成功",
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
  }
})