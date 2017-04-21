// page/options/options.js
Page({
  data:{
    // 定义页面的跳转
    config:[
      {
        "url":"/page/backup/backup",
        "name":"数据备份",
        "desc":"备份/恢复",
        "color":"mainRed",
        "typed" :"restore"
      },
      // {
      //   "url":"/page/view/view",
      //   "name":"云服务",
      //   "desc":"同步云端",
      //   "color":"mainBlue",
      //    "typed" :"cloud"
      // },
      {
        "url":"/page/book/book",
        "name":"使用指南",
        "desc":"教你玩转运维密码",
        "color":"mainRed",
         "typed" :"book"
      },
      {
        "url":"/page/about/about",
        "name":"关于我们",
        "desc":"运维密码和我们",
        "color":"mainRed",
         "typed" :"about"
      },
      {
        "url":"/page/feedback/feedback",
        "name":"建议反馈",
        "desc":"倾听来自您的意见",
        "color":"mainRed",
        "typed" :"feedback"
      }
    ]
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})