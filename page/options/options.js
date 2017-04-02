// page/options/options.js
Page({
  data:{
    config:[
      {
        "url":"/page/view/view",
        "name":"数据备份",
        "desc":"备份/恢复",
        "color":"mainRed",
        "type" :"website"
      },
      {
        "url":"/page/view/view",
        "name":"云服务",
        "desc":"同步云端",
        "color":"mainBlue",
         "type" :"website"
      },
      {
        "url":"/page/view/view",
        "name":"使用指南",
        "desc":"教你玩转运维密码",
        "color":"mainGreen",
         "type" :"website"
      },
      {
        "url":"/page/view/view",
        "name":"关于我们",
        "desc":"运维密码和我们",
        "color":"mainYellow",
         "type" :"website"
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