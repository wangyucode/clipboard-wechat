//app.js
App({
  onLaunch: function () {
    
    console.log(wx.getAccountInfoSync());
  },

  globalData: {
    // SERVER_URL :"http://localhost:8083/api/v1"
    SERVER_URL: "https://wycode.cn/api/v1"
  },
})