var newsData = require("../../data/newsdata.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.setData(newsData.initData[options.newsid]);
    // console.log(newsData.initData[options.newsid]);
    newsid: options.newsid
  }
})