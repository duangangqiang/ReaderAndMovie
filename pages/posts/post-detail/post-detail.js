// 此处不能使用绝对路径
var postsData = require("../../../data/posts-data.js");

Page({
    data: {

    },
    onLoad: function (option) {

        // 通过option 获取导航参数
        var postId = option.id;

        // 根据数组下标对应获取
        var postData = postsData.postList[postId];

        // 设置到post上
        this.setData({
            post: postData
        });

        // 如果用户不主动删除缓存，缓存将一直存在， 没有失效期， 缓存的上限不能超过10M
        wx.setStorageSync('duangangqiang', "heheh")
    },

    /**
     * 响应收藏事件
     */
    onCollectionTap: function (event) {

        // 获取缓存
        var storage = wx.getStorageSync('duangangqiang');
        console.log(storage);
    },

    /**
     * 响应分享事件
     */
    onShareTap: function(event) {

        // 删除缓存
        wx.removeStorageSync('duangangqiang');

        // 清空所有缓存
        // wx.clearStorageSync();
    }
})