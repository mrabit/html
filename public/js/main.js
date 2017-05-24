/**
 * Created by yuany on 2016/6/23 0023.
 */
(function (w) {
    requirejs.config({
        baseUrl: "/public/js",
        waitSeconds: 15,
        paths:{
            'jquery': 'jquery',
            'arttpl': 'artTemplate/artTemplate_extend',
            'ajaxQueue': 'jquery.ajaxQueue/jquery.ajaxQueue',
            'angular': 'angular/angular.min',
            'ngMessages': 'angular/angular-messages/angular-messages',
            'init-angular': 'angular/init',
            'angular-route': 'angular/angular-route.min',
            'easypiechart': 'jquery.easypiechart/jquery.easypiechart',
            'daterangepicker': 'bootstrap-daterangepicker/daterangepicker',
            'tagsinput': 'bootstrap-tagsinput/bootstrap-tagsinput',
            'typeahead': 'bootstrap-tagsinput/typeahead.bundle',
            'moment': 'moment/moment',
            'skycons': 'skycons/skycons',
            'bootstrapDialog': 'bootstrap-dialog/bootstrap-dialog',
            'bootstrapPaginator': 'bootstrap-paginator/bootstrap-paginator',
            'bs_paginator': 'bootstrap-paginator/paginator_extend',
            'bootstrap-wysiwyg': 'bootstrap-wysiwyg/bootstrap-wysiwyg',
            'datatables': 'jquery.datatables/dataTables.bootstrap.min',
            'datatables.net': 'jquery.datatables/jquery.dataTables.min',
            'lazyload': 'jquery.lazyload/jquery.lazyload.min',
            'hotkeys': 'bootstrap-wysiwyg/external/jquery.hotkeys',
            'cookie': 'jquery.cookie/jquery.cookie',
            'fullPage': 'jquery.fullPage/jquery.fullPage',
            'cropper': 'cropper/cropper',
            'masonry': 'masonry-docs/masonry.pkgd',
            'app.min': 'app.min',
            'bootstrap': 'bootstrap',
            'util': 'util',
            'parsley': 'parsley/parsley.min',
            'parsley.extend': 'parsley/parsley.extend',
            'parsley.lang': 'parsley/i18n/zh_cn',
            'parsley.lang.extend': 'parsley/i18n/zh_cn.extra',
            'swal': 'sweetalert2/sweetalert2',
            'nprogress': 'nprogress/nprogress',
            'laytpl': 'laytpl',
            'pagination': 'mricode.pagination/mricode.pagination',
            'slider': 'bootstrap-slider/bootstrap-slider',
            'pjax': 'jquery.pjax/jquery.pjax',
            'awardRotate': 'jquery.prize/awardRotate',
            'prize': 'jquery.prize/jquery.prize',
        },
        shim:{
            //'jquery': ['../js/jquery', 'bootstrap'],
            'ajaxQueue': ["jquery"],
            'easypiechart':['jquery'],
            'angular':{
                exports: 'angular'
            },
            'angular-route': {
                exports: 'angular-route',
                deps: ['angular']
            },
            'ngMessages': ['angular'],
            'init-angular': ['ngMessages'],
            'daterangepicker': ['jquery', 'moment', 'css!../js/bootstrap-daterangepicker/daterangepicker.css'],
            'tagsinput': ['jquery', '../js/bootstrap-tagsinput/init-bootstrap-tagsinput', 'css!../js/bootstrap-tagsinput/bootstrap-tagsinput.css'],
            'typeahead': ['jquery', 'css!../js/bootstrap-tagsinput/bootstrap-tagsinput-typeahead.css'],
            'moment': ['jquery'],
            'bootstrap': ['jquery'],
            'bootstrapPaginator': ['jquery', 'bootstrap'],
            'bs_paginator': ['bootstrapPaginator'],
            'bootstrap-wysiwyg': ['jquery'],
            'datatables': ['jquery', 'css!../js/jquery.datatables/dataTables.bootstrap.min.css'],
            //'datatables.net':['../js/jquery.datatables/fnReloadAjax'],
            'lazyload': ['jquery'],
            'cookie': ['jquery'],
            'fullPage': ['jquery', 'css!../js/jquery.fullPage/jquery.fullPage.min.css'],
            'masonry': ['jquery'],
            'util': ['jquery'],
            'cropper': ['jquery', 'css!../js/cropper/cropper.css'],
            'parsley': ['jquery', '../js/parsley/init-parsley', 'css!../js/parsley/parsley.css'],
            'parsley.extend': ['parsley', 'parsley.lang', 'parsley.lang.extend'],
            'parsley.lang': ['parsley'],
            'parsley.lang.extend': ['parsley'],
            'swal': ['jquery', 'css!../js/sweetalert2/sweetalert2.css'],
            'nprogress': ['jquery', 'css!../js/nprogress/nprogress.css'],
            'pagination': ['jquery','css!../js/mricode.pagination/mricode.pagination.css'],
            'slider': ['jquery','css!../js/bootstrap-slider/bootstrap-slider.css'],
            'pjax': ['jquery'],
            'awardRotate': ['jquery'],
            'prize': ['jquery','awardRotate','css!../js/jquery.prize/jquery.prize.css']
        }
    });
})(window);
(function (w, d) {
    var dependencies = ['jquery', 'bootstrap'];
    require(dependencies, function ($) {
        $.extend({
            show_main: function (second) {
                setTimeout(function () {
                    $(".main").fadeIn();
                    $("#page_loading").hide();
                },second || 50);
            },
            load_img_lists_html: function (url,param, timeOut, currPage) {
                $("#img_loading").fadeIn();
                $.ajax_loading = true;
                setTimeout(function(){
                    $.ajax({
                        async: false,
                        url: url,
                        data: param,
                        success: function (data) {
                            //当前页数currPage为0,则是第一次加载数据
                            if(currPage == 0){
                                $('.bing_main').html(data);
                            }else{
                                $('.bing_main').append(data);
                            }
                            $("#img_loading").hide();
                            $.ajax_loading = false;
                        }
                    });
                },timeOut);
            },
            initMasonry: function (ele,ele2) {
                require(["masonry"], function (Masonry) {
                    var elem = document.querySelector(ele || '.masonry_main');
                    var msnry = new Masonry( elem, {
                        // options
                        itemSelector: ele2 || '.masonry_item',
                        columnWidth: ele2 || '.masonry_item'
                    });
                });
            },
            swal_timer: function (param) {
                require(["swal"], function () {
                    swal({
                        title: param.title,
                        text: param.text,
                        type: param.type,
                        timer: param.timer || 2000,
                        showConfirmButton: false
                    }).then(function () {
                        if(typeof param.func == "function"){
                            param.func.apply();
                        }
                    }, function (dismiss) {
                        if(typeof param.dismiss == "function"){
                            param.dismiss(dismiss);
                        }
                    })
                });
            },
            html_encode: function (str) {
                var s = "";
                if (str.length == 0) return "";
                s = str.replace(/<script/g, "&lt;script");
                s = s.replace(/<\/script>/g, "&lt;/script&gt; ");
                return s;
            },
            /***
             * 图片预加载
             * @param data 图片路径数组
             * @param return_param 指定Promise返回参数
             * @returns {Promise.<T>|Promise<U>}
             */
            loadImage: function(data,return_param){
                var loadImage = function (img_url) {
                    return new Promise(function (resolve, reject) {
                        var img = new Image();
                        img.src = img_url;
                        $(img).load(function () {
                            resolve(img_url);
                        });
                    });
                };
                var func_arr = [];
                data.forEach(function (v) {
                    func_arr.push(loadImage(v));
                });
                return Promise.all(func_arr).then(function (result) {
                    return return_param || result;
                });
            },
            //随机秒
            GetRandomNum: function (Min,Max) {
                var Range = Max - Min;
                var Rand = Math.random();
                return(Min + Math.round(Rand * Range * 1000));
            }
        });
    });
})(window, document);
