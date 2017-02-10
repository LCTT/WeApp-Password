// pages/addSucc/addSucc.js
Page({
  data:{},
  onLoad:function(options){
    var that = this ;
    that.setData({
      id : options.id
    })
  },
  returnIndex:function(){
    /*
     * 使用跳转函数跳转到指定页面
     */
    wx.redirectTo({
      url: '../info/info?id='+this.data.id
    })
  }
})