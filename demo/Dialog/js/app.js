/**
 * Created by Administrator on 2016/4/12 0012.
 */
$(document).ready(function(){

    $('[name=btn]').click(function () {
        var a= BootstrapDialog.success("下载页面有很多广告可以使用chrome安装<a href='http://www.adtchrome.com/' >广告终结者</a>", function () {

        });
    });
});



    BootstrapDialog.success= function (content,func) {
        var $success=$('<div class="padder padder-v"><div class="row m-t-sm">' +
            '<div class="col-xs-6 col-xs-offset-3 text-center" style="margin-top: 20px;"><img class="img-full img-responsive center-block" src="success.png"></div>' +
            '<div class="col-xs-12 text-center"><p class="h3">'+content+'</p></div>' +
            '<div class="col-xs-6 col-xs-offset-3 " style="padding: 0 100px;margin-bottom: 20px; margin-top: 20px;"><button class="btn btn-info btn-block" data-dismiss="modal" aria-label="Close">确 &nbsp;认</button></div>' +
            '</div></div>');
        BootstrapDialog.show({
            size:"SIZE_WIDE",
            onshow: function (dialog) {
                dialog.getModalHeader().remove();
                console.log();
                dialog.getModalDialog().css("margin-top",$(window).height()/2 *0.4+"px");
                dialog.getModalContent().html($success);
            },
            onhidden: function () {
                func.apply(this);
            }
        });
    }


//function a(){
//    var a=0;
//    var b=(function(){
//        a++;
//        alert(a);
//    })();
//    return b;
//}
//var f=a();
//f;
//f;
