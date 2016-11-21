/**
 * Created by yuany on 2016/9/29 0029.
 */
define(["jquery"], function ($) {
    $.show_main = function (second) {
        setTimeout(function () {
            $(".main").fadeIn();
            $("#page_loading").hide();
        },second || 50);
    };
    $.load_img_lists_html = function (url,param, timeOut, currPage) {
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
    }
    $.initMasonry = function (ele,ele2) {
        require(["masonry"], function (Masonry) {
            var elem = document.querySelector(ele || '.masonry_main');
            var msnry = new Masonry( elem, {
                // options
                itemSelector: ele2 || '.masonry_item',
                columnWidth: ele2 || '.masonry_item'
            });
        });
    };
    $.swal_timer = function (param) {
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
    };
    $.html_encode = function (str) {
        var s = "";
        if (str.length == 0) return "";
        s = str.replace(/<script/g, "&lt;script");
        s = s.replace(/<\/script>/g, "&lt;/script&gt; ");
        return s;
    };
    $.extend({
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
    return $;
});