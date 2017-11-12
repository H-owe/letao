/**
 * Created by user on 2017/11/8.
 */
NProgress.configure({ showSpinner: false });
$(document).ajaxStart(function(){
    NProgress.start();
})
$(document).ajaxStop(function(){
    setTimeout(function(){
        NProgress.done();
    })
    
})
if (location.href.indexOf('login.html') == -1) {
    $.ajax({
        url:'/employee/checkRootLogin',
        type:'get',
        success:function(data){
            if (data.error===400) {
                location.href="login.html";
            }
        }
    
    })
}


$('.nav2').prev().on('click',function(){
    $(this).next().slideToggle();
})
$('.btn_menu').on('click',function(){
    $('.main').toggleClass('now');
    $('.aside').toggleClass('now');
    $('.topbar').toggleClass('now');
})
$('.btn_loginout').on('click',function(){
    console.log('1');
    $('#out').modal('toggle');
})
$('.btn_comfirm').on('click',function(){
    $.ajax({
        url:'/employee/employeeLogout',
        type:'get',
        success:function(data){
            if(data.success){
                location.href="login.html";
            }
        }
    })
})