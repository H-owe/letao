$(function(){
    function getHistory(){
        var history = localStorage.getItem('search_history') || '[]';
        return JSON.parse(history);
    }
    function render(){
        var arr = getHistory();
        console.log(arr);
        var html = template('tpl',{arr:arr});
        $('.content').html(html);
    }
    render();

    // 清空
    $('.content').on('click','.btn_empty',function(){
        // console.log(11);
        mui.confirm('您确定要清空历史记录吗？','温馨提示',['取消','确定'],function(e){
            if (e.index ==1) {
                localStorage.removeItem('search_history');
                render();
            }
        })
    })

    //删除
    $('.content').on('click','.btn_delete',function(){
        // console.log(11);
        var $this = $(this);
        mui.confirm('你确定要删除这条搜索记录?','温馨提示',['否','是'],function(e){
            if (e.index == 1) {
                var index = $this.data('index');
                var arr = getHistory();
                arr.splice(index,1);
                console.log(arr);
                localStorage.setItem('search_history',JSON.stringify(arr));
                render();
            }
        })

    })

    // 增加
    $('.search button').on('click',function(){
        var key = $('.search input').val().trim();
        $('.search input').val('');
        if (key == '') {
            mui.toast('请输入搜索内容');
            return false;
        }

        var arr = getHistory();
        var index = arr.indexOf(key);
        if (index != -1) {
            arr.splice(index,1);
        }
        if(arr.length >= 10){
            arr.pop();
        }
        arr.unshift(key);
        localStorage.setItem('search_history',JSON.stringify(arr));
        render();
        location.href='productsList.html?key='+key;
    })
})