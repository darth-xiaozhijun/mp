var newsData = require("../data/newsdata.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots:true,
    autoplay:true,
    interval:2000,
    circular:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(newsData);

    //this.setData可以让view重绘
    this.setData({
      useData:newsData.initData
    })
  },

  getNewsDetail: function (event) {
    // console.log("11111");
    // console.log(event);
    var newsId = event.currentTarget.dataset.newsid;
    wx.navigateTo({
      url: 'news-detail/news-detail?newsid=' + newsId,
    })
  }
})