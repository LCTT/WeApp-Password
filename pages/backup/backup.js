// pages/backup/backup.js
Page({
  data:{
    key:[]
  },
  onLoad:function(options){
    var that = this;
    wx.showToast({
      "title":"加载本地数据中",
      "icon":"loading",
      "duration":1000
    })
    
    var secret = wx.getStorageInfoSync();
    secret.keys.forEach(function(e){
      var new_key = that.data.key;
      new_key.push(wx.getStorageSync(e))
      that.setData({
        key : new_key
      });
    
    });
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
  },
  redirectTo:function(){
    wx.navigateTo({
      url: '../backupImg/backupImg'
    })
  }
})