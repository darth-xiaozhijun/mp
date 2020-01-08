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
  onLoad: function(options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.setData(newsData.initData[options.newsid]);
    // console.log(newsData.initData[options.newsid]);
    this.setData({
      newsid: options.newsid
    })

    //测试本地存储
    // wx.setStorageSync("key", "value");
    // console.log(wx.getStorageSync("key"));
    // wx.removeStorageSync("key");
    // wx.clearStorageSync();

    var newsCollect = wx.getStorageSync("newsCollect");
    if (newsCollect){
      var newCollect = newsCollect[options.newsid];
      this.setData({
        collected: newCollect
      })
    }else{
      var newsCollect = {};
      newsCollect[options.newsid] = false;
      wx.setStorageSync("newsCollect", newsCollect);
    }
  },

  collectTap: function(event) {
    var newsCollect = wx.getStorageSync("newsCollect");
    var newCollect = newsCollect[this.data.newsid];
    console.log(newCollect);
    newCollect = !newCollect;
    newsCollect[this.data.newsid] = newCollect;
    wx.setStorageSync("newsCollect", newsCollect);
    this.setData({
      collected: newsCollect[this.data.newsid]
    });
  }
})