// 此处不能使用绝对路径
var postsData = require("../../data/posts-data.js");

Page({
  data:{
      // data做数据绑定这个动作是在onLoad执行之后做的
      postData: []
  },

  /**
   * 加载
   */
  onLoad:function(options){
    this.setData({
        postData: postsData.postList
    });
  },

  /**
   * 响应卡片点击
   */
  onPostTap: function (event) {

    // 获取页面中的 data-post-id 的值
    var postId = event.currentTarget.dataset.postId
    
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postId // 传递参数
    })
  }
})