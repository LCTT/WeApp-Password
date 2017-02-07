// pages/debug/debug.js
Page({
  data:{},
  onLoad:function(options){
    var that =this;
     wx.getLocation({
       type: 'wgs84', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
       success: function(res){
         that.setData({
           latitude:res.latitude,
           longitude:res.longitude
         })
       }
     })
     wx.getSystemInfo({
       success: function(res) {
         that.setData({
           language:res.language,
           model:res.model,
           system:res.system,
           version:res.version,
           windowHeight:res.windowHeight,
           windowWidth:res.windowWidth
         })
       }
     })
     wx.getStorageInfo({
       
       success: function(res){
         that.setData({
           size:res.currentSize,
           limitSize:res.limitSize,
           lenth:res.keys.length
         })
       }
     })
  }
})