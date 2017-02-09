Page({
  onLoad:function(options){
    var that = this;
    that.setData({
      id:options.id
    })
  },
  formSubmit: function(e) {
    wx.switchTab({
      url: '../servers/servers',
    })
  },
  previewImg:function(e){
    var img = "https://linux.cn/weixin/api/otp.php?qrcode&id="+ this.data.id
    wx.previewImage({
      current: img, // 当前显示图片的http链接
      urls: [img] // 需要预览的图片http链接列表
    })
  },
  alertInfo:function(e){
    wx.showToast({
      title:"长按预览图片并保存",
      icon:"success"
    })
  }

})