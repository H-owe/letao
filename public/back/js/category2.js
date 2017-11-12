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
        $('#categoryId').val($(this).data('id'));
        $form.data("bootstrapValidator").updateStatus("categoryId", "VALID");
    })

    $('#fileupload').fileupload({
        dataType:'json',
        done : function(e,data){
            // console.log(data);
            $('.img_box img').attr('src',data.result.picAddr);
            $('#brandLogo').val(data.result.picAddr);
            $form.data('bootstrapValidator').updateStatus('brandLogo','VALID');

        }
    })

    $form.bootstrapValidator({
        excluded:[],
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
          },
          fields: {
              categoryId:{
                  validators:{
                      notEmpty:{
                          message:'请输入一级分类名称'
                      }
                  }
              },
              brandName: {
                validators:{
                    notEmpty:{
                        message:'请输入二级分类名称'
                    }
                }
              },
              brandLogo : {
                  validators:{
                    notEmpty:{
                        message:'请上传图片'
                    }
                  }
              }
              
          }
    })

    $form.on('success.form.bv',function(e){
        e.preventDefault();
        $.ajax({
            type:'post',
            url:'/category/addSecondCategory',
            data:$form.serialize(),
            success:function(data){
                if(data.success){
                    $('#addModal').modal('hide');
                    currentPage =1;
                    render();
                    $form[0].reset();
                    $form.data('bootstrapValidator').resetForm();
                    $('.dropdown-text').text('请输入一级分类名称');
                    $('.img_box img').attr('src','images/none.png');
                    $('#categoryId').val('');
                    $('#brandLogo').val('');
                }
            }
        })
    })
})