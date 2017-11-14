mui(".mui-scroll-wrapper").scroll({
    indicators:false
  });

var gallery = mui('.mui-slider');
gallery.slider({
  interval:500//自动轮播周期，若为0则不自动播放，默认为0；
});

//封装函数到工具对象
var tools= {
  getParamObj: function getParamObj() {
    //获取url的参数
    var search = location.search;
    //url中的中文需要转译
    search = decodeURI(search);
    //把?截取掉
    search = search.slice(1);
    // console.log(search);
    //把search字符串转换为obj对象
    var arr = search.split('&');
    console.log(arr);
    var obj = {};
    for (var i = 0; i < arr.length; i++) {
      var k = arr[i].split('=')[0];
      var v = arr[i].split('=')[1];
      obj[k] = v;
    }

    console.log(obj);
    return obj;
  },
  getParam : function(key) {
    return this.getParamObj()[key];
  }
}