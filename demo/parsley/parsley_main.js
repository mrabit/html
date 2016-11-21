/**
 * Created by yuany on 2016/8/12 0012.
 */
define(['jquery','util','parsley'], function ($,u) {

    //设置表单验证插件配置文件
    window.ParsleyConfig = window.ParsleyConfig || {};
    window.ParsleyConfig.validators = window.ParsleyConfig.validators || {};

    (function($) {
        //配置错误提示css样式
        window.ParsleyConfig = $.extend(true, {}, window.ParsleyConfig, {
            errorsContainer: function (parsleyField) {
                return parsleyField.$element.parent();
            },
            successClass: 'jv-form-success',
            errorsWrapper: '<span class="help-block m-b-none text-danger h5 m-t-sm"></span>',
            errorTemplate: '<span ></span>'
        });

        window.ParsleyConfig = $.extend(true, {}, window.ParsleyConfig, {
            validators: {
                //手机或者email的校验的自定义
                phoneemail: {
                    fn: function(value) {
                        var phone = /^1[3|4|5|7|8][0-9]d{8}$/;
                        var email = /^((([a-z]|d|[!#$%&'*+-/=?^_`{|}~]|[u00A0-uD7FFuF900-uFDCFuFDF0-uFFEF])+(.([a-z]|d|[!#$%&'*+-/=?^_`{|}~]|[u00A0-uD7FFuF900-uFDCFuFDF0-uFFEF])+)*)|((x22)((((x20|x09)*(x0dx0a))?(x20|x09)+)?(([x01-x08x0bx0cx0e-x1fx7f]|x21|[x23-x5b]|[x5d-x7e]|[u00A0-uD7FFuF900-uFDCFuFDF0-uFFEF])|(\([x01-x09x0bx0cx0d-x7f]|[u00A0-uD7FFuF900-uFDCFuFDF0-uFFEF]))))*(((x20|x09)*(x0dx0a))?(x20|x09)+)?(x22)))@((([a-z]|d|[u00A0-uD7FFuF900-uFDCFuFDF0-uFFEF])|(([a-z]|d|[u00A0-uD7FFuF900-uFDCFuFDF0-uFFEF])([a-z]|d|-|.|_|~|[u00A0-uD7FFuF900-uFDCFuFDF0-uFFEF])*([a-z]|d|[u00A0-uD7FFuF900-uFDCFuFDF0-uFFEF]))).)+(([a-z]|[u00A0-uD7FFuF900-uFDCFuFDF0-uFFEF])|(([a-z]|[u00A0-uD7FFuF900-uFDCFuFDF0-uFFEF])([a-z]|d|-|.|_|~|[u00A0-uD7FFuF900-uFDCFuFDF0-uFFEF])*([a-z]|[u00A0-uD7FFuF900-uFDCFuFDF0-uFFEF]))){2,6}$/i;
                        return (phone.test(value) || email.test(value));
                    },
                    priority: 32
                },
                //特殊字符校验的自定义
                nospecial: {
                    fn: function(value) {
                        var myReg = /[~^@/'\"#$%&^*?(),`+;[]{}|.:：<>!！￥？（），。、]/;
                        if (myReg.test(value))
                            return false;
                        return true;
                    },
                    priority: 32

                }
            },

            messages: {
                phoneemail:"请填写正确的手机号码/电子邮箱",
                nospecial:"您输入的值不可包含特殊字符"
            }
        });
    }(window.jQuery || window.Zepto));


    $("#info_form").parsley(window.ParsleyConfig).on("form:submit", function () {
        return false;
    });
    function respAsyncloginCheck(xhr){
        var response= JSON.parse(xhr.responseText);
        this.options.remoteMessage=response.content;
        if("1" === response.status) this.attr("readonly");
        return "1" === response.status;
    }

    window.Parsley.addAsyncValidator('loginCheck', respAsyncloginCheck, '/tp/Home/index/login.html');
    return {};
});