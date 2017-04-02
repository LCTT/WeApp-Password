// page/index/index.js
Page({
  data: {
    "server": [
      {
        username: "bestony@linux.cn",
        name: "Linux 中国",
        code: "123 456",
        typed: "server",
        key: "ABCSXS"
      },
      {
        username: "bestony@linux.cn",
        name: "Linux 中国",
        code: "456 789",
        typed: "app",
        key: "ABCSXS"
      },
      {
        username: "bestony@linux.cn",
        name: "Linux 中国",
        code: "456 789",
        typed: "game",
        key: "ABCSXS"
      },
      {
        username: "bestony@linux.cn",
        name: "Linux 中国",
        code: "456 789",
        typed: "website",
        key: "ABCSXS"
      },
    
      {
        username: "bestony@linux.cn",
        name: "Linux 中国",
        code: "456 789",
        typed: "linux",
        key: "ABCSXS"
      }
    ]
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
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
  // 将生成的密钥放到剪贴板中，并提示。
  copyCode: function (e) {
    wx.setClipboardData({
      data: e.currentTarget.dataset.code,
      success: function (res) {
        wx.showToast({
          title: '代码已经复制到您的剪贴板中',
          icon: 'success',
          duration: 2000
        })
      }
    })
  },
  viewInfo: function (e) {
    wx.navigateTo({
      url: '../view/view?id=' + e.currentTarget.dataset.key,
      success: function (res) {
        // success
      }
    })
  },
  addServer: function (e) {

  }
})