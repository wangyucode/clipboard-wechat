// pages/about/help/help.js
const app = getApp();
Page({
  data: {
    apps: [],
  },

  onShareAppMessage: function () {
    return {
      title: "免登录跨平台便签！贼方便！",
      path: "pages/index/index",
      imageUrl: "https://wycode.cn/upload/image/clipboard/share.png",
    };
  },

  onLoad: function () {
    this.getApps();
  },

  getApps: function () {
    wx.showLoading({
        title: '请稍后...',
    });
    wx.request({
        url: app.globalData.SERVER_URL + '/wechat/apps',
        success: (res) => {
            console.log('apps->', res);
            if (res.data.success) {
                this.setData({
                    apps: res.data.payload
                })
            }
        },
        complete: () => {
            wx.hideLoading()
        }
    })
},

  // toFish: function () {
  //   wx.navigateToMiniProgram({ appId: "wx1d777be6c442da17" });
  // },

  // toRoll: function () {
  //   wx.navigateToMiniProgram({ appId: "wxa6e870e9d665b10b" });
  // },

  // toDota: function () {
  //   wx.navigateToMiniProgram({ appId: "wx8a383e1143f5b2c9" });
  // },

  // toDiablo: function () {
  //   wx.navigateToMiniProgram({ appId: "wxb6ce1324189f1363" });
  // },

  toReward: function () {
    wx.previewImage({
      urls: ["https://wycode.cn/upload/image/fish/reward.jpg"],
    });
  },
});
