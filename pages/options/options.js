Page({
  cleanCache: function () {
    wx.clearStorage({

      success: function (res) {
        wx.showToast({
          title: '数据清除成功！',
          icon: 'success',
          duration: 3000
        })
      }
    })
  }
})