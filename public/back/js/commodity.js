$(function(){
    var currentPage = 1;
    var pageSize = 5;

    var render = function(){
         $.ajax({
        type:'get',
        url:'/product/queryProductDetailList',
        data:{
            page:currentPage,
            pageSize:pageSize
        },
        success:function(data){
            console.log(data);
        }
    })
    }

    render();
   
})