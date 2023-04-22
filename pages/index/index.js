//index.js
//获取应用实例
const app = getApp();

Page({
  data: {
    queryId: '',
    text: '',
    loading: true,
  },

  onLoad: function () {
    wx.showLoading({
      title: '加载中...',
      mask: true
    });
    try {
      const openid = wx.getStorageSync('openid')
      if (openid) {
        this.getByOpenid(openid);
      } else {
        this.doLogin();
      }
    } catch (e) {
      console.error(e);
      this.doLogin();
    }
    this.getNotification();
  },

  getByOpenid: function (openid) {
    wx.request({
      url: app.globalData.SERVER_URL + '/clipboard/openid/' + openid,
      success: (res) => {
        console.log('getByOpenid-->', res);
        if (res.statusCode == 200 && res.data.success) {
          this.setData({
            queryId: res.data.payload._id,
            text: res.data.payload.content
          });
        }
      },
      complete: () => {
        wx.hideLoading();
        this.setData({
          loading: false
        });
      },
    });
  },

  getNotification: function () {
    wx.request({
      url: app.globalData.SERVER_URL + '/clipboard/notification',
      success: (res) => {
        console.log('getNotification-->', res);
        if (res.statusCode == 200 && res.data.success && res.data.payload.value) {
          wx.showModal({
            title: '重要通知',
            content: res.data.payload.value,
            showCancel: false
          });
        }
      }
    });
  },

  doLogin: function () {
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          wx.request({
            url: app.globalData.SERVER_URL + '/node/clipboard/wx/session',
            data: {
              'code': res.code
            },
            success: (res) => {
              console.log('wxsession-->', res);
              if (res.statusCode == 200 && res.data.success) {
                const openid = res.data.payload.openid;
                wx.setStorage({
                  key: "openid",
                  data: openid
                });
                this.setData({
                  queryId: res.data.payload._id,
                  text: res.data.payload.content
                });
              }
            },
            complete: () => {
              wx.hideLoading();
              this.setData({
                loading: false
              });
            },
          });
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
    this.data.text = e.detail.value;
  },

  save: function () {
    this.setData({
      loading: true
    });
    wx.request({
      url: app.globalData.SERVER_URL + '/clipboard',
      data: {
        _id: this.data.queryId,
        content: this.data.text
      },
      method: 'POST',
      success: (res) => {
        console.log('save->', res);
        if (res.data.success) {
          wx.showToast({
            title: '已保存！',
          })
        }
      },
      complete: () => {
        this.setData({
          loading: false
        });
      }
    });
  },

  checkClipboard: function () {
    wx.getClipboardData({
      success: (res) => {
        console.log("getClipboardData->", res.data)
        wx.showModal({
          title: '是否粘贴剪切板内容？',
          content: res.data,
          success: (resModal) => {
            if (resModal.confirm) {
              console.log('用户点击确定')
              this.setData({
                text: this.data.text + '\n' + res.data
              });
              this.save()
            }
          }
        });
      }
    })
  }
})