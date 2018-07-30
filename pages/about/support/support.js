// pages/about/help/help.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
    return {
      title:"免登录跨平台便签！贼方便！",
      path:"pages/index/index",
      imageUrl:"https://wycode.cn/upload/image/clipboard/share.png"
    }
  },

  toFish:function(){
    wx.navigateToMiniProgram({ appId: 'wx1d777be6c442da17'})
  },

  toRoll:function(){
    wx.navigateToMiniProgram({ appId: 'wxa6e870e9d665b10b'})
  },

  toReward: function () {
    wx.previewImage({
      urls: ["https://wycode.cn/upload/image/fish/reward.jpg"],
    })
  }
})