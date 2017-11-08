/**
 * Created by user on 2017/11/8.
 */
$(function(){

    $('#form').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
          },
        fields: {
            username : {
                validators : {
                    notEmpty : {
                        message : '用户名不能为空'
                    },
                    callback : {
                        message : '用户名错误'
                    }
                }
            },
            password : {
                validators : {
                    notEmpty : {
                        message : '密码不能为空'
                    },
                    stringLength : {
                        min : 6,
                        max : 16,
                        message : '密码长度必须是6-16位'
                    },
                    regexp : {
                        regexp : /^[a-zA-Z0-9_\.]+$/,
                        message : '密码由数字字母下划线及.组成'
                    }
                }
            }
            
        }
    });

    $('#form').on('success.form.bv',function(e){
        e.preventDefault();
        $.ajax({
            type:'post',
            url:'/employee/employeeLogin',
            data:$('#form').serialize(),
            success: function(data){
                if(data.success){
                    location.href="index.html";
                }
                if (data.error===1000) {
                    $('#form').data("bootstrapValidator").updateStatus("username","INVALID","callback");

                }
                if (data.error===1001) {
                    $('#form').data("bootstarpVa;idator").updateStatus("password","INVALID","callback");
                }
            }
        })
    })

})