// pages/about/help/help.js
Page({

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

  toDota:function(){
    wx.navigateToMiniProgram({ appId: 'wx8a383e1143f5b2c9'})
  },

  toDiablo:function(){
    wx.navigateToMiniProgram({ appId: 'wxb6ce1324189f1363'})
  },

  toReward: function () {
    wx.previewImage({
      urls: ["https://wycode.cn/upload/image/fish/reward.jpg"],
    })
  }
})