//index.js
const app = getApp();
const crypto = require('../../utils/crypto.js');

Page({
  data: {
    queryId: '',
    text: '',
    loading: true,

    // 加密相关状态
    isEncrypted: false,       // 当前后端返回的内容是否为密文
    rawCiphertext: '',        // 加密原始密文字符串
    isUnlocked: false,        // 是否已解锁明文
    unlockPassword: '',       // 解锁输入的密码

    encryptEnabled: false,    // 保存时是否启用加密
    encryptPassword: '',      // 保存时的加密密码
    encryptPasswordConfirm: '',// 保存时的确认密码
  },

  onLoad: function () {
    wx.showLoading({
      title: '加载中...',
      mask: true
    });
    try {
      const openid = wx.getStorageSync('openid');
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

  copyQueryId: function () {
    if (!this.data.queryId) return;
    wx.setClipboardData({
      data: this.data.queryId,
      success: () => {
        wx.showToast({
          title: '查询码已复制',
          icon: 'success'
        });
      }
    });
  },

  processLoadedContent: function (id, content) {
    content = content || '';
    if (crypto.isEncryptedContent(content)) {
      this.setData({
        queryId: id,
        isEncrypted: true,
        rawCiphertext: content,
        text: '',
        isUnlocked: false,
        unlockPassword: '',
        encryptEnabled: true,
      });
    } else {
      this.setData({
        queryId: id,
        isEncrypted: false,
        rawCiphertext: '',
        text: content,
        isUnlocked: true,
      });
    }
  },

  getByOpenid: function (openid) {
    wx.request({
      url: app.globalData.SERVER_URL + '/clipboard/openid/' + openid,
      success: (res) => {
        console.log('getByOpenid-->', res);
        if (res.statusCode == 200 && res.data.success) {
          this.processLoadedContent(res.data.payload._id, res.data.payload.content);
        } else {
          this.doLogin();
        }
      },
      fail: () => {
        wx.showToast({
          title: '网络请求失败',
          icon: 'none'
        });
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
        if (res.statusCode == 200 && res.data.success && res.data.payload && res.data.payload.value) {
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
        if (res.code) {
          wx.request({
            url: `${app.globalData.SERVER_URL}/clipboard/wx/${res.code}`,
            success: (res) => {
              console.log('wxsession-->', res);
              if (res.statusCode == 200 && res.data.success) {
                const openid = res.data.payload.openid;
                wx.setStorage({
                  key: "openid",
                  data: openid
                });
                this.processLoadedContent(res.data.payload._id, res.data.payload.content);
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
            title: res.errMsg || '登录失败',
            icon: 'none'
          });
          this.setData({
            loading: false
          });
        }
      },
      fail: () => {
        this.setData({
          loading: false
        });
      }
    });
  },

  bindInputText: function (e) {
    this.setData({
      text: e.detail.value
    });
  },

  bindUnlockPassword: function (e) {
    this.setData({
      unlockPassword: e.detail.value
    });
  },

  unlockContent: function () {
    const pwd = this.data.unlockPassword;
    if (!pwd) {
      wx.showToast({
        title: '请输入解密密码',
        icon: 'none'
      });
      return;
    }

    wx.showLoading({
      title: '正在解密...',
      mask: true
    });

    setTimeout(() => {
      try {
        console.log('开始解密, rawCiphertext:', this.data.rawCiphertext ? this.data.rawCiphertext.substring(0, 30) + '...' : '');
        const decrypted = crypto.decryptText(this.data.rawCiphertext, pwd);
        console.log('解密成功, 明文长度:', decrypted.length);
        this.setData({
          text: decrypted,
          isUnlocked: true,
          encryptPassword: pwd,
          encryptPasswordConfirm: pwd,
        });
        wx.hideLoading();
        wx.showToast({
          title: '解密成功',
          icon: 'success'
        });
      } catch (e) {
        wx.hideLoading();
        console.error('解密失败详情 stack:', e && e.stack);
        wx.showModal({
          title: '解密异常详情',
          content: (e && e.stack) ? e.stack.substring(0, 300) : String(e),
          showCancel: false
        });
      }
    }, 50);
  },

  toggleEncryptSwitch: function (e) {
    const enabled = e.detail.value;
    this.setData({
      encryptEnabled: enabled
    });
  },

  bindEncryptPassword: function (e) {
    this.setData({
      encryptPassword: e.detail.value
    });
  },

  bindEncryptPasswordConfirm: function (e) {
    this.setData({
      encryptPasswordConfirm: e.detail.value
    });
  },

  save: function () {
    if (this.data.isEncrypted && !this.data.isUnlocked) {
      wx.showToast({
        title: '请先解密内容',
        icon: 'none'
      });
      return;
    }

    if (this.data.encryptEnabled) {
      if (!this.data.encryptPassword) {
        wx.showToast({
          title: '请设置加密密码',
          icon: 'none'
        });
        return;
      }
      if (this.data.encryptPassword !== this.data.encryptPasswordConfirm) {
        wx.showToast({
          title: '两次输入的密码不一致',
          icon: 'none'
        });
        return;
      }
    }

    this.setData({
      loading: true
    });

    wx.showLoading({
      title: this.data.encryptEnabled ? '加密并保存中...' : '保存中...',
      mask: true
    });

    setTimeout(() => {
      let payloadContent = this.data.text;
      if (this.data.encryptEnabled) {
        try {
          payloadContent = crypto.encryptText(this.data.text, this.data.encryptPassword);
        } catch (e) {
          wx.hideLoading();
          this.setData({ loading: false });
          wx.showToast({
            title: '加密失败：' + (e.message || '未知错误'),
            icon: 'none'
          });
          return;
        }
      }

      wx.request({
        url: app.globalData.SERVER_URL + '/clipboard',
        data: {
          _id: this.data.queryId,
          content: payloadContent
        },
        method: 'POST',
        success: (res) => {
          console.log('save->', res);
          if (res.data && res.data.success) {
            wx.showToast({
              title: '已保存！',
              icon: 'success'
            });
            if (this.data.encryptEnabled) {
              this.setData({
                isEncrypted: true,
                rawCiphertext: payloadContent,
              });
            } else {
              this.setData({
                isEncrypted: false,
                rawCiphertext: '',
              });
            }
          } else {
            wx.showToast({
              title: (res.data && res.data.message) || '保存失败',
              icon: 'none'
            });
          }
        },
        fail: () => {
          wx.showToast({
            title: '网络连接失败',
            icon: 'none'
          });
        },
        complete: () => {
          wx.hideLoading();
          this.setData({
            loading: false
          });
        }
      });
    }, 50);
  },

  checkClipboard: function () {
    wx.getClipboardData({
      success: (res) => {
        console.log("getClipboardData->", res.data);
        if (!res.data) return;
        wx.showModal({
          title: '是否粘贴剪切板内容？',
          content: res.data.length > 100 ? res.data.substring(0, 100) + '...' : res.data,
          success: (resModal) => {
            if (resModal.confirm) {
              const newText = this.data.text ? this.data.text + '\n' + res.data : res.data;
              this.setData({
                text: newText
              });
            }
          }
        });
      }
    });
  }
});
