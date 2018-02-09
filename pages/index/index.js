//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    queryNumber: -1,
    isShowResult: false,
    text: '',
    isLoading: false
  },

  onLoad: function () {

  },

  bindInput: function (e) {
    this.setData({
      queryNumber: e.detail.value
    })
  },

  query: function () {
    if (this.data.queryNumber <= 0) {
      wx.showToast({
        title: '查询码不正确！',
        icon: 'none'
      });
      return
    }

    var that = this;
    wx.request({
      url: 'https://wycode.cn/web/api/public/clipboard/query',
      data: { 'id': this.data.queryNumber },
      success: function (res) {
        if (!res.data.success || res.data.data == null) {
          wx.showToast({
            title: '查询码不正确！',
            icon: 'none'
          });
        } else {
          that.setData({
            isShowResult: true,
            queryNumber: res.data.data.id,
            text: res.data.data.content
          });
        }
      },
      fail: function (res) {
        wx.showToast({
          title: res,
          icon: 'none'
        });
      }
    });

  },

  create: function () {
    var that = this;
    wx.request({
      url: 'https://wycode.cn/web/api/public/clipboard/create',
      method: 'POST',
      success: function (res) {

        that.setData({
          isShowResult: true,
          queryNumber: res.data.data.id,
          text: res.data.data.content
        });

      },
      fail: function (res) {
        wx.showToast({
          title: res.errMsg,
          icon: 'none'
        });
      }
    });
  },

  save: function () {

  }

})
