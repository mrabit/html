/**
 * Created with JetBrains WebStorm.
 * User: yuany/biabia123456@126.com
 * Date: 2016/9/11 0011
 * Time: 下午 21:45
 *
 */
define(["jquery","util"], function ($, u) {
    //窗口改变,取消side展示
    $(window).resize(function () {
        $("body").removeClass("side");
    })
    //mobile touch事件 & click 事件
    $("#sidebar-mask").on('touchstart click', function () {
        $("body").removeClass("side");
        return false;
    });
    //toggle 展示side
    $("#menuToggle").click(function () {
//            $('html, body').animate({scrollTop: 0}, 'fast');
        window.scrollTo(0,0);
        $("body").toggleClass("side");
    });
});