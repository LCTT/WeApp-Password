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
    /**
     * forEach 处理
     */
    servers.forEach(function (value, index, key) {
      /**
       * 找到目标数据
       */
      if (value.secret == options.id) {
        that.setData({
          name: value.name,
          username: value.username,
          desc: value.desc,
          secret: value.secret,
          code: totp.getCode(options.id),
          signedBy: value.signedBy,
          longitude:value.longitude,
          latitude:value.latitude,
          "type":value.type
        })
        wx.setNavigationBarTitle({
          title: value.name
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
})