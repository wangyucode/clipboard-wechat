// pages/about/feedback/feedback.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    contact: '',
    content: ''
  },

  contentInput: function (e) {
    this.setData({
      content: e.detail.value
    })
  },

  contactInput: function (e) {
    this.setData({
      contact: e.detail.value
    })
  },

  submit: function () {
    //内容不能为空
    if (this.data.content.length == 0) {
      wx.showToast({
        title: '建议内容不能为空！',
        icon: 'none'
      });
      return;
    }

    var that = this;
    wx.showLoading({
      title: '请稍后...',
    })
    wx.request({
      url: app.globalData.SERVER_URL + '/node/comments',
      method: 'POST',
      data: {
        type: 0,
        key: 'dPXB07TiOBdoYAyRbNnz5E5CnAu3ZBSy',
        app: 'clipboard',
        user: that.data.contact,
        content: that.data.content,
        topic: '/feedback'
      },
      success: function (res) {
        wx.hideLoading();
        wx.showToast({
          title: '提交成功！',
          icon: 'success'
        });
        that.setData({
          contact: '',
          content: ''
        })
        setTimeout(() => {
          wx.navigateBack({})
        }, 1000);
      },
      fail: function (res) {
        wx.showToast({
          title: res.errMsg,
          icon: 'none'
        });
        wx.hideLoading();
      }
    });
  }
})