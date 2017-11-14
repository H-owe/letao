$(function(){
    var currentPage = 1;
    var pageSize = 50;
    // 将url字符串参数转换为对象
    // function getParamObj(){
    //     //获取url的参数
    //     var search = location.search;
    //     //url中的中文需要转译
    //     search = decodeURI(search);
    //     //把?截取掉
    //     search = search.slice(1);
    //     // console.log(search);
    //     //把search字符串转换为obj对象
    //     var arr = search.split('&');
    //     // console.log(arr);
    //     var obj = {};
    //     for(var i=0 ; i<arr.length;i++){
    //         var k = arr[i].split('=')[0];
    //         var v = arr[i].split('=')[1];
    //         obj[k] = v;
    //     }
       
    //     console.log(obj);
    //     return obj;
        
    // }
    // getParamObj();
    // //获取url参数对象里面的属性值
    // function getParam(key){
        
    //    return getParamObj()[key];
       
    // }
    // console.log(getParam('key')) ;
    var key = tools.getParam('key');
    console.log(key);
    $('.search input').val(key);

    function render(){
        var type = $('.sort a[data-type].now').data('type');
        var value = $('.sort a[data-type].now').find('span').hasClass('fa-angle-down')?2:1;
        var obj = {};
        obj.page = currentPage;
        obj.pageSize = pageSize;
        obj.proName = key;
        if (type) {
            obj[type] = value;
        }
      $.ajax({
        type:'get',
        url:'/product/queryProduct',
        data:obj,
        success:function(data){
            setTimeout(function(){
                console.log(data);
                $('.products').html(template('tpl',data));
            },1000);
        }
    })  
    }
    render();
    
    $('.search button').on('click',function(){
        key = $('.search input').val().trim();
        if (key=='') {
            mui.toast('请输入搜索内容');
            return false;
        }

        $('.sort a').removeClass('now').find('span').removeClass('fa-angle-up').addClass('fa-angle-down');
        $('.products').html('<div class="loading"></div>');
        render();
    })

    $('.sort [data-type]').on('click',function(){
        var $this = $(this);
        if ($this.hasClass('now')) {
            $this.find('span').toggleClass('fa-angle-up').toggleClass('fa-angle-down');
        }else{
            $this.addClass('now').siblings().removeClass('now');
            $('.sort a').find('span').removeClass('fa-angle-up').addClass('fa-angle-down');
        }
        $('.products').html('<div class="loading"></div>');
        render();
    })
})