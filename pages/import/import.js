// pages/import/import.js
Page({
  data: {},
  onLoad: function (options) {
   
  },
  onReady: function () {
     wx.scanCode({
      success: function (res) {
        console.log(res.result);
        var data = JSON.parse(res.result);
        console.log(data);
        data.forEach(function (e) {
          wx.setStorage({
            key: e.k, // 使用secret作为key方便判断数据是否已经存在
            data: {
              secret: e.k,
              name: e.s, // 此处为表单数据，
              username: e.u,
              desc: e.u,
              latitude: 0, //此处为页面的data
              longitude: 0,
              signedBy: e.s,
              key: e.k,
            },
            success: function (res) {
              /*
              * 成功后跳转到addSuccess页面，传递参数id，用于该页面跳转success。
              */
              wx.redirectTo({
                url: '../addSucc/addSucc?id=' + e.k
              })
            },
            fail: function () {
              /*
               * 如果数据存储出错。提示报错。
               */
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
            }
          })
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
  }
})