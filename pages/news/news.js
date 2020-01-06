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
  }
})