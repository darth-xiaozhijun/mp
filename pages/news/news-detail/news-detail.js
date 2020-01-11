var newsData = require("../../data/newsdata.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlayer:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    if (newsCollect) {
      var newCollect = newsCollect[options.newsid];
      this.setData({
        collected: newCollect
      })
    } else {
      var newsCollect = {};
      newsCollect[options.newsid] = false;
      wx.setStorageSync("newsCollect", newsCollect);
    }
  },

  collectTap: function (event) {
    var newsCollect = wx.getStorageSync("newsCollect");
    var newCollect = newsCollect[this.data.newsid];
    console.log(newCollect);
    newCollect = !newCollect;
    newsCollect[this.data.newsid] = newCollect;
    wx.setStorageSync("newsCollect", newsCollect);
    this.setData({
      collected: newsCollect[this.data.newsid]
    });

    wx.showToast({
      title: newsCollect[this.data.newsid] ? '收藏成功' : '收藏失败',
      icon: 'success',
      duration: 800,
      mask: true
    })
  },

  onShowTap: function (event) {

    /*
    *
    wx.showModal({
      title: '提示',
      content: '这是一个模态弹窗',
      success:function(res){
        if(res.confirm){
          console.log('用户点击确认')
        }
      }
    })
    */

    /**
     * 
     */
    wx.showActionSheet({
      itemList: ['分享到微信', '分享到微博', '分享到QQ'],
      success(res) {
        console.log(res.tapIndex)
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  },

  onShareAppMessage:function(){
    return {
      title: newsData.initData[this.data.newsid].title,
      path: 'pages/news/news-detail/news-detail'
    }
  },

  playerMusicTap:function(event){

    var that = this;
    //播放音乐应该判断当前音乐是否在播放
    wx.getBackgroundAudioPlayerState({
      success: function(res) {
        var status = res.status;
        if(status != 1){
         //没有在播放
         wx.playBackgroundAudio({
             dataUrl: newsData.initData[that.data.newsid].music.url,
             title:newsData.initData[that.data.newsid].music.title,
             coverImgUrl: newsData.initData[that.data.newsid].music.coverImg
         })
         that.setData({
           isPlayer:true
         })
        }else{
           wx.pauseBackgroundAudio();
           that.setData({
             isPlayer:false
           })
        }
      }
   })
  }
})