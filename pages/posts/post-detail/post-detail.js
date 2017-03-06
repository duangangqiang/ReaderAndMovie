// 此处不能使用绝对路径
var postsData = require("../../../data/posts-data.js");

Page({
    data: {

    },
    onLoad: function (option) {

        // 通过option 获取导航参数
        var postId = option.id;

        this.data.currentPostId = postId;

        // 根据数组下标对应获取
        var postData = postsData.postList[postId];

        // 设置到post上
        this.setData({
            post: postData
        });

        var postsCollected = wx.getStorageSync('posts_collected');
        
        if (postsCollected) {
            var postCollected = postsCollected[postId];
            this.setData({
                collected: postCollected
            })
        } else {
            postsCollected = {};
            postsCollected[postId] = false;

            // 如果用户不主动删除缓存，缓存将一直存在， 没有失效期， 缓存的上限不能超过10M
            wx.setStorageSync('posts_collected', postsCollected);
        }
    },

    /**
     * 响应收藏事件
     */
    onCollectionTap: function (event) {

        this.getPostsCollectedSyc();
        //this.getPostsCollectedAsy();
    },


    onMusicTap: function (event) {
        var currentPostId = this.data.currentPostId;
        var postData = postsData.postList[currentPostId];

        // 设置一个变量开关
        var isPlayingMusic = this.data.isPlayingMusic;
        if (isPlayingMusic) {

            // 暂停背景音乐
            wx.pauseBackgroundAudio();

            // 设置页面状态
            this.setData({
                isPlayingMusic: false
            })

            // app.globalData.g_currentMusicPostId = null;
            app.globalData.g_isPlayingMusic = false;
        } else {
            wx.playBackgroundAudio({
                dataUrl: postData.music.url,
                title: postData.music.title,
                coverImgUrl: postData.music.coverImg,
            })
            this.setData({
                isPlayingMusic: true
            })
            app.globalData.g_currentMusicPostId = this.data.currentPostId;
            app.globalData.g_isPlayingMusic = true;
        }
    },

    /**
     * 异步获取缓存
     */
    getPostsCollectedAsy: function () {
        var that = this;
        wx.getStorage({
            key: "posts_collected",
            success: function (res) {

                // res.data就是缓存值
                var postsCollected = res.data;
                var postCollected = postsCollected[that.data.currentPostId];
                
                // 收藏变成未收藏，未收藏变成收藏
                postCollected = !postCollected;
                postsCollected[that.data.currentPostId] = postCollected;
                
                // 显示提示
                that.showToast(postsCollected, postCollected);
            }
        })
    },

    /**
     * 同步获取缓存
     */
    getPostsCollectedSyc: function () {
        var postsCollected = wx.getStorageSync('posts_collected');
        var postCollected = postsCollected[this.data.currentPostId];
        
        // 收藏变成未收藏，未收藏变成收藏
        postCollected = !postCollected;
        postsCollected[this.data.currentPostId] = postCollected;
        this.showToast(postsCollected, postCollected);
        //this.showModal(postsCollected, postCollected);
    },

    /**
     * 显示提示
     * @param postsCollected 所有文章收藏信息
     * @param postCollected 当前文章收藏信息
     */
    showToast: function (postsCollected, postCollected) {
        
        // 更新文章是否的缓存值
        wx.setStorageSync('posts_collected', postsCollected);
        
        // 更新数据绑定变量，从而实现切换图片
        this.setData({
            collected: postCollected
        })
        wx.showToast({
            title: postCollected ? "收藏成功" : "取消成功",
            duration: 1000,
            icon: "success"
        })
    },

    /**
     * 模态对话框
     */
    showModal: function (postsCollected, postCollected) {
        var that = this;
        wx.showModal({
            title: "收藏",
            content: postCollected ? "收藏该文章？" : "取消收藏该文章？",
            showCancel: "true",
            cancelText: "取消",
            cancelColor: "#333",
            confirmText: "确认",
            confirmColor: "#405f80",
            success: function (res) {

                // res.confirm 表示是否点击了确定
                if (res.confirm) {
                    wx.setStorageSync('posts_collected', postsCollected);
                    
                    // 更新数据绑定变量，从而实现切换图片
                    that.setData({
                        collected: postCollected
                    })
                }
            }
        })
    },

    /**
     * 响应分享事件
     */
    onShareTap: function(event) {
         var itemList = [
            "分享给微信好友",
            "分享到朋友圈",
            "分享到QQ",
            "分享到微博"
        ];
        wx.showActionSheet({
            itemList: itemList,
            itemColor: "#405f80",
            success: function (res) {
                // res.cancel 用户是不是点击了取消按钮
                // res.tapIndex 数组元素的序号，从0开始
                wx.showModal({
                    title: "用户 " + itemList[res.tapIndex],
                    content: "用户是否取消？" + res.cancel + "现在无法实现分享功能，什么时候能支持呢"
                })
            }
        })
    }
})