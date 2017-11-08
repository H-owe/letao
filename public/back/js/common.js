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