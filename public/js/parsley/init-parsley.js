/**
 * Created by yuany on 2016/9/24 0024.
 */
require(["jquery","parsley"], function ($) {
    //设置表单验证插件配置文件
    window.ParsleyConfig = window.ParsleyConfig || {};
    window.ParsleyConfig.validators = window.ParsleyConfig.validators || {};

    (function($) {
        //配置错误提示css样式
        window.ParsleyConfig = $.extend(true, {}, window.ParsleyConfig, {
            successClass: 'jv-form-success',
            errorsWrapper: '<span class="help-block m-b-none text-danger"></span>',
            errorTemplate: '<span ></span>'
        });
    }(window.jQuery || window.Zepto));
});