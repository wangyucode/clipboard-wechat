//app.js
App({
  onLaunch: function () {
    
    console.log(wx.getAccountInfoSync());
  },

  globalData: {
    SERVER_URL :"http://localhost:8082"
    // SERVER_URL: "https://wycode.cn"
  },
})