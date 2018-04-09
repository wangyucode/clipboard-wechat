// pages/index/new/new.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    queryNumber: -1,
    text: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData(options);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },


  bindInputText: function (e) {
    this.setData({
      text: e.detail.value
    })
  },

  saveAndBack: function () {
    var that = this;
    wx.showLoading({
      title: '请稍后...',
    })
    wx.request({
      url: 'https://wycode.cn/web/api/public/clipboard/save',
      method: 'POST',
      data: {
        id: that.data.queryNumber,
        content: that.data.text
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        wx.hideLoading();
        wx.showToast({
          title: '保存成功！',
          icon: 'success'
        });
        setTimeout(() => { wx.navigateBack({}) }, 1000);
      },
      fail: function (res) {
        wx.showToast({
          title: res.errMsg,
          icon: 'none'
        });
        wx.hideLoading();
      }
    });
  },
  
  copy: function(){
    wx.setClipboardData({
      data: this.data.text,
    })
  }
})