/**
 * Created by yuany on 2016/8/8 0008.
 */
define(['jquery'], function ($) {
    var util =  {
        init: function () {

        },
        /* 替换 $[]中的数据*/
        replaceElementInnerText: function (ele, data) {
            var $ele, innerHTML;
            if (typeof ele == 'string') {
                $ele = $(ele);
                innerHTML = $ele.html();
            } else {
                $ele = (ele instanceof jQuery) ? ele : $(ele);
                innerHTML = $ele.html();
            }
            var pattern = /\$\[(\w+\.*\w*)]/g;
            var replace_attr = [];
            var i = 0;
            while (i++ < 100) {
                var result = pattern.exec(innerHTML);
                if (!result) {
                    break;
                }
                replace_attr.push(result[1]);
            }

            for (var key in replace_attr) {
                var replace = new RegExp('\\$\\[' + replace_attr[key] + '\\]', 'g');
                if (replace_attr[key].indexOf(".") > 0) {
                    var replace_attr_keys = replace_attr[key].split(".");
                    var replace_attr_str = "data";
                    if (!data[replace_attr_keys[0]] || typeof data[replace_attr_keys[0]] !== 'object') {
                        continue;
                    }
                    for (var _key in replace_attr_keys) {
                        replace_attr_str += '[\'' + replace_attr_keys[_key] + '\']';
                    }
                    if (eval(replace_attr_str) != null) {
                        innerHTML = innerHTML.replace(replace, eval(replace_attr_str));
                    }
                } else {
                    if (data[replace_attr[key]] != null) {
                        innerHTML = innerHTML.replace(replace, data[replace_attr[key]]);
                    }
                }
            }
            $ele[0].innerHTML = innerHTML;
            $ele.find('img[img-load="load"]').each(function () {
                var reg = new RegExp("(http|ftp|https):\/\/w*");
                if (reg.exec($(this).attr('_src'))) {
                    $(this).attr("src", $(this).attr('_src'));
                }
            });
            return $ele[0].outerHTML;
        },
        /**
         * 获取浏览器url 参数
         * @param name 参数值
         * @returns {null} 对应结果
         */
        getUrlParam: function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]);
            return null;
        },
        /***
         *  时间格式
         * @param times 需转换的时间
         * @param pattern 需转换的正则
         * @returns {string} 转换后的时间
         */
        formatTimeToStr: function (times, pattern) {
            var d = new Date(times).Format("yyyy-MM-dd hh:mm:ss");
            if (pattern) {
                d = new Date(times).Format(pattern);
            }
            return d.toLocaleString();
        },
        /***
         *  分割数组
         * @param array 原数组
         * @param length 分割长度
         * @returns {array} 解析后的数组
         */
        paging : function (array, length) {
            if(typeof array != "object"){
                console.error("请输入正确格式参数");
                return [];
            }
            var aaData = [];
            while (array.length > length) {
                aaData.push(array.slice(0, length));
                array = array.splice(length);
            }
            aaData.push(array);
            return aaData;
        },
        show_main: function (second) {
            setTimeout(function () {
                $("#main").fadeIn();
                $("#page_loading").hide();
            },second || 50);
        },
        load_lists_html: function (url,param, timeOut, loading_type) {
            setTimeout(function(){
                $.ajax({
                    async: false,
                    url: url,
                    data: param,
                    success: function (data) {
                        if(loading_type == 1){
                            $('#lists_content').html(data);
                            util.show_main(50);
                        }else{
                            $('#lists_content').append(data);
                        }
                        return true;
                    }
                });
            },timeOut);
        }
    };
    return util;
});