$(function(){
    var currentPage = 1;
    var pageSize = 5;

    function render(){
        $.ajax({
            url:'/category/queryTopCategoryPaging',
            type:'get',
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            success:function(data){
                console.log(data);
                $('tbody').html(template('tpl',data));
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage: currentPage,
                    size:'small',
                    totalPages: Math.ceil(data.total / pageSize),
                    onPageClicked: function (a, b, c, page) {
                      //修改成当前页
                      currentPage = page;
                      //重新渲染
                      render();
                    }
                  });
            }
        });
    }
    render();
    
    $('.btn_add').on('click',function(){
        $('#addModal').modal('show');
    })

    var $form = $('form');
    $form.bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
          },
        fields: {
            categoryName : {
                validators: {
                    notEmpty : {
                        message:'内容不能为空'
                    }
                }
            }
        }
    })

    $form.on('success.form.bv',function(e){
        e.preventDefault();
        // 用ajax提交
        $.ajax({
            url:'/category/addTopCategory',
            type:'post',
            data:$form.serialize(),
            success:function(data){
                $('#addModal').modal('hide');
                currentPage = 1;
                render();
                $form.data('bootstrapValidator').resetForm();
                $form[0].reset();
            }
        })
    })
})