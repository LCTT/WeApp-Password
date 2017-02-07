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
    wx.navigateTo({
      url: '../info/info?id='+this.data.id
    })
  }
})