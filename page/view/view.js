const totp = require('../../util/js/totp');
Page({
  data: {},
  onLoad: function (options) {
    var that = this;

    /**
    * 获取数据
    */
    var servers = wx.getStorageSync('servers');
    /**
     * str to obj
     */
    servers = JSON.parse(servers);
    var is_exist = false;
    /**
     * forEach 处理
     */

    servers.forEach(function (value, index, key) {
      /**
       * 找到目标数据
       */
      if (value.secret == options.id) {
        is_exist = true;
        that.setData({
          name: value.name,
          username: value.username,
          desc: value.desc,
          secret: value.secret,
          code: totp.getCode(options.id),
          signedBy: value.signedBy,
          longitude: value.longitude,
          latitude: value.latitude,
          "type": value.type,
          is_exist: is_exist
        })

        wx.setNavigationBarTitle({
          title: value.name
        })
      }
    })
    if (is_exist == false) {
      wx.showModal({
        title: '您无权查看当前场景',
        content: '您无权查看当前场景，请联系场景所有者！',
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
  },
  onReady: function () {
    var that = this;
    /**
     * 进行时间判断，如果时间在30的整除点上，计算一次code，如果不是在时间点上，则只是变更进度条数据
     */
    setInterval(function () {
      var timestamp = new Date().getTime().toString().substr(0, 10);
      var timeHook = timestamp % 30;
      if (timeHook != 0) {
        that.setData({
          timer: timeHook * 3.4
        })
      } else {
        that.setData({
          timer: 0
        })
        that.updateCode();
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
  createQR: function () {
    var that = this;
    wx.redirectTo({
      url: './qr?id=' + that.data.secret + '&username=' + that.data.username + '&name=' + that.data.name + '&desc=' + that.data.desc
    })
  },
  deleteOne: function (e) {
    var that = this;
    wx.showModal({
      title: "注意！",
      content: "你是否要删除由“" + that.data.signedBy + "”颁发的，用户名为 " + that.data.username + " 的密码吗？此操作不可恢复。",
      success: function (res) {
        if (res.confirm) {

          var servers = wx.getStorageSync('servers');
          servers = JSON.parse(servers);
          var server = [];
          servers.forEach(function (value, index, array) {
            if (value.key != that.data.secret) {
              server.push(value);
            }
          });
          server = JSON.stringify(server);
          wx.setStorage({
            key: 'servers',
            data: server,
            success: function (res) {
              wx.showToast({
                title: '删除场景成功',
                icon: 'success',
                duration: 2000,
                success: function () {
                  wx.switchTab({
                    url: '../index/index'
                  })
                }
              })
            }
          })
        } else {

        }
      }
    })

  },
  editOne:function(){
    var that =this;
    wx.redirectTo({
      url: './edit?id='+that.data.secret
    })
  }
})