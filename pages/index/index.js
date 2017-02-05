var gps = require('../../utils/gps.js');
Page({
  data:{},
  onLoad:function(options){
   var longs =gps.getDistance(35.215893,113.242826,35.215893,113.243826)
   console.log(longs)
  },
  scanCode:function(){
    wx.scanCode({
      success: function(res){
        console.log(res);
      }
    })
  }
})