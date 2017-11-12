$(function(){
    $.ajax({
        type:'get',
        url:'/category/queryTopCategory',
        success:function(data){
            console.log(data);
            $('.category_l ul').html(template('tpl1',data));
            secondRender(data.rows[0].id);
        }
    });

    function secondRender(id){
        $.ajax({
            type:'get',
            url:'/category/querySecondCategory',
            data:{
                id:id
            },
            success:function(data){
                console.log(data);
                $('.category_r ul').html(template('tpl2',data));
            }
        })
    }

    $('.category_l ul').on('click','li',function(){
        $(this).addClass('now').siblings().removeClass('now');
        var id = $(this).data('id');
        secondRender(id);

        var temp = mui('.mui-scroll-wrapper').scroll()[1];
        temp.scrollTo(0,0,500);
    })
})