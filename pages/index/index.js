//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    queryNumber: -1,
    isShowResult: false,
    text: '',
    isLoading:false
  },
  
  onLoad: function () {
    
  },

  query: function(){
    this.setData({ isShowResult:true});
  },

  create: function(){

  },

  save: function () {

  }
  
})
