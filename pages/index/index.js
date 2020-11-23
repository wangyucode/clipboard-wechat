//index.js
//获取应用实例
const app = getApp()
var textTimerId
var tipsTimerId

Page({
  data: {
    queryId: '',
    text: '',
    tips: '',

  },

  onLoad: function () {
    wx.showLoading({
      title: '加载中...',
      mask: true
    });
    this.doLogin();
  },

  doLogin: function () {
    var that = this;
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          wx.request({
            url: app.globalData.SERVER_URL + '/web/api/public/clipboard/getSession',
            data: { 'jsCode': res.code },
            success: function (res) {
              console.log(res)
              if (res.statusCode == 200 && res.data.success) {
                let key = res.data.data.key;
                // wx.setStorage({
                //   key: "accessKey",
                //   data: key
                // });
                app.globalData.accessKey = key;
                that.setData({
                  queryId: res.data.data.id,
                  text: res.data.data.content,
                  tips: res.data.data.tips
                });

                wx.hideLoading()
                that.checkClipboard()
              }
            },
            fail: function (res) { },
            complete: function (res) { },
          })
        } else {
          wx.showToast({
            title: res.errMsg,
            icon: 'none'
          })
        }
      }
    })
  },


  bindInputText: function (e) {
    clearTimeout(textTimerId)
    this.data.text = e.detail.value
    textTimerId = setTimeout(() => {
      this.save()
    }, 1000)
  },


  bindInputTips: function (e) {
    clearTimeout(tipsTimerId)
    this.data.tips = e.detail.value
    tipsTimerId = setTimeout(() => {
      this.save()
    }, 1000)
  },

  query: function (accessKey) {
    if (this.data.queryNumber <= 0) {
      wx.showToast({
        title: '查询码不正确！',
        icon: 'none'
      });
      return
    }

    var that = this;
    wx.request({
      url: app.globalData.SERVER_URL + '/web/api/public/clipboard/queryByKey',
      data: { key: accessKey },
      success: function (res) {
        if (!res.data.success || res.data.data == null) {
          that.doLogin();
        } else {
          that.setData({
            queryId: res.data.data.id,
            text: res.data.data.content,
            tips: res.data.data.tips
          });
          wx.hideLoading();
          that.checkClipboard()
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

  save: function () {

    var that = this;
    wx.request({
      url: app.globalData.SERVER_URL + '/web/api/public/clipboard/saveById',
      data: {
        id: this.data.queryId,
        content: this.data.text,
        tips: this.data.tips
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res)
        if (res.data.success) {
          wx.showToast({
            title: '已保存！',
          })
        }
      }
    });

  },

  checkClipboard:function(){
    var that = this;
    wx.getClipboardData({
      success: function (res) {
        console.log(res.data)
        wx.showModal({
          title: '是否粘贴剪切板内容？',
          content: res.data,
          success: function (resModal) {
            if (resModal.confirm) {
              console.log('用户点击确定')
              that.setData({ text: that.data.text + res.data})
              that.save()
            }
          }
        })
      }
    })
  }

})