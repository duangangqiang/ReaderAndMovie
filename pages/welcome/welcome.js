Page({
  onTap: function (event) {
    wx.redirectTo({
      url: '../posts/post',
      success: function(res){
        // success
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    });

    // wx.navigateTo({
    //   url: 'String',
    //   success: function(res){
    //     // success
    //   },
    //   fail: function() {
    //     // fail
    //   },
    //   complete: function() {
    //     // complete
    //   }
    // })
  }
})