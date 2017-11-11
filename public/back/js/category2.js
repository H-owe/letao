$(function(){
    var currentPage = 1;
    var pageSize = 5;
    function render(){
        $.ajax({
            url:'/category/querySecondCategoryPaging',
            type:'get',
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            success:function(data){
                $('tbody').html(template('tpl1',data));
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage:currentPage,
                    size:'small',
                    totalPages:Math.ceil(data.total/pageSize),
                    onPageClicked : function(a,b,c,page){
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
            url:'/category/queryTopCategoryPaging',
            type:'get',
            data: {
                page:1,
                pageSize : 100
            },
            success : function(data){
                console.log(data);
                $('.dropdown-menu').html(template('tpl2',data));
            }
        })
    })
    
    var $form = $('form');
    $('.dropdown-menu').on('click','a',function(){
        $('.dropdown-text').text($(this).text());
        $('#gategoryId').val($(this).data('id'));
        // $form.data('bootstrapValidator').updateStatus('categoryId','VALID');
    })
})