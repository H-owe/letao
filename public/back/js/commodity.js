$(function(){
    var currentPage = 1;
    var pageSize = 5;

    function render(){
        $.ajax({
        type:'get',
        url:'/product/queryProductDetailList',
        data:{
            page:currentPage,
            pageSize:pageSize
        },
        success:function(data){
            console.log(data);
            $('tbody').html(template('tpl',data));

            $('#paginator').bootstrapPaginator({
                bootstrapMajorVersion:3,
                currentPage:currentPage,
                size:'small',
                totalPages:Math.ceil(data.total/pageSize),
                onPageClicked:function(a,b,c,page){
                    currentPage = page;
                    render();
                }
            })
        }
    })
    }

    render();

    $('.btn_add').on('click',function(){
        $('#addModal').modal('show');
        $.ajax({
            type:'get',
            url:'/category/querySecondCategoryPaging',
            data:{
                page:1,
                pageSize:100
            },
            success:function(data){
                console.log(data);
                $('.dropdown-menu').html(template('tpl2',data));
            }
        })
    })

    $('.dropdown').on('click','a',function(){
        $('.dropdown-text').text($(this).text());
    })
    
})