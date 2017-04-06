// page/book/book.js
Page({
  data: {
    book: [
      
      // {
      //   title: "在 Linux 服务器使用运维密码",
      //   color: "mainRed",
      //   url: "/page/book/linux"
      // }, 
      
      {
        title: "在 OpenSSH 上使用运维密码",
        color: "mainBlue",
        url: "/page/book/openssh"
      }, {
        title: "在 Github 上使用运维密码",
        color: "mainBlue",
        url: "/page/book/github"
      }, {
        title: "在 Linux 中国上使用运维密码",
        color: "mainBlue",
        url: "/page/book/linuxcn"
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
  }
})