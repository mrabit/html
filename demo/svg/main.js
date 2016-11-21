/**
 * Created by Administrator on 2016/5/23 0023.
 */
$(document).ready(function () {
    var interval;
    var id=1102;
    Date.prototype.pattern=function(fmt) {
        var o = {
            "M+" : this.getMonth()+1, //月份
            "d+" : this.getDate(), //日
            "h+" : this.getHours()%12 == 0 ? 12 : this.getHours()%12, //小时
            "H+" : this.getHours(), //小时
            "m+" : this.getMinutes(), //分
            "s+" : this.getSeconds(), //秒
            "q+" : Math.floor((this.getMonth()+3)/3), //季度
            "S" : this.getMilliseconds() //毫秒
        };
        var week = {
            "0" : "/u65e5",
            "1" : "/u4e00",
            "2" : "/u4e8c",
            "3" : "/u4e09",
            "4" : "/u56db",
            "5" : "/u4e94",
            "6" : "/u516d"
        };
        if(/(y+)/.test(fmt)){
            fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
        }
        if(/(E+)/.test(fmt)){
            fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "/u661f/u671f" : "/u5468") : "")+week[this.getDay()+""]);
        }
        for(var k in o){
            if(new RegExp("("+ k +")").test(fmt)){
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
            }
        }
        return fmt;
    }
    var getTimeDifference= function (Time) {
        Time=Time.replace(/-/g,"/");
        var lastUpdateTime=new Date(Time);
        var myDateTime = new Date();
        var timeDiff=(myDateTime-lastUpdateTime); //毫秒
        var days=0;var hours=0;var minutes=0;
        console.log(timeDiff)
        /***
         * 大于一天
         */
        if(timeDiff>1000*60*60*24){ //大于一天
            days=Math.floor(timeDiff / (1000*60*60*24)); //取出天数
            timeDiff-=days*1000*60*60*24; //剩余时间
            console.log(timeDiff)
            if(timeDiff>1000*60*60){
                hours=Math.floor(timeDiff/ (1000*60*60));
                timeDiff-=hours*1000*60*60; //剩余时间
            }
            if(timeDiff>1000*60) minutes=Math.floor(timeDiff / (1000*60));
            return days+"天"+(hours<10?"0"+hours:hours)+"小时";
        }
        /***
         * 大于一小时
         */
        if(timeDiff>1000*60*60) {
            hours=Math.floor(timeDiff / (1000*60*60)); //取出小时数
            timeDiff-=hours*1000*60*60;
            minutes=Math.floor(timeDiff/(1000*60)); //去除小时数的占用取出分钟数
            return (hours<10?"0"+hours:hours)+"小时"+(minutes<10?"0"+minutes:minutes)+"分";
        }
        /***
         * 大于一分钟
         */
        if(timeDiff>1000*60) {
            minutes= (Math.floor(timeDiff / (1000*60))).toFixed(0);
            return (minutes<10?"0"+minutes:minutes)+"分钟";
        }
        ///***
        // * 大于1秒钟
        // */
        //if(timeDiff>1000&&timeDiff<1000*30){
        //    var s=0;
        //    s=timeDiff/1000;
        //    return (s<10?"0"+s:s)+"秒";
        //}
        return "1分钟";
    }
    setTimeout(function(){

        //$('#map_loading').hide();
        var embedTag = document.getElementById('embed');
        embedTag.type = "image/svg+xml";
        //embedTag.width =  body_width_val;
        //embedTag.height = canvas_height;
        embedTag.width =  $("#map").width();
        embedTag.height = $("#map").width();

        //embedTag.src = "__STATIC__/parking_svg/whole.svg";
        embedTag.src = "1.svg";
        document.getElementById('map').appendChild(embedTag);
        embedTag.onload = function () {



            var obj = embedTag.getSVGDocument();
            var polygon = obj.getElementsByTagName("polygon");
            var length = polygon.length;
            var i=0;
                var time=setInterval(function () {
                    if(i>28) clearInterval(time);
                    polygon.item(i).setAttribute("fill", '#FF0000');
                    i++;
                },100)

//            $.ajax({
//                url: "http://127.0.0.1/json.html",
////                    url: "http://youhh.net/yuxiu/api/xigu/get_park_data",
//                async: false,
//                dataType: 'jsonp',
//                jsonp: 'json',// 指定回调函数，这里名字可以为其他任意你喜欢的，比如callback，不过必须与下一行的GET参数一致
//                jsonpCallback : "json",
//                data: {
//                    id:id,
//                    callback: "json"// 键与上面的jsonp值一致
//                },
//                success: function (json) {
//                    firstLoadData(json,polygon);
//                }
//            });
////
//            interval = setInterval(function(){
//                $.ajax({
//                    url: "http://127.0.0.1/json.html",
//                    //url: "http://youhh.net/yuxiu/api/xigu/get_park_data",
//                    async: false,
//                    dataType: 'jsonp',
//                    jsonp: 'json',// 指定回调函数，这里名字可以为其他任意你喜欢的，比如callback，不过必须与下一行的GET参数一致
//                    jsonpCallback : "json",
//                    data: {
//                        id:id,
//                        callback: "json"// 键与上面的jsonp值一致
//                    },
//                    success: function (json) {
//                        firstLoadData(json,polygon);
//                    }
//                });
//            },3000);
        }



    },1000);


    function loadOption(id, type){
        clearInterval(interval);
        option_ajax_load(id,type);
        continue_option_loading(id, type);
    }

    function  firstLoadData(json,polygon){
        for(var i=0;i<json.parkData.length;i++){
            if(i==0) $("#parkList").empty();
            var temp_json=json.parkData[i];
            //console.log(temp_json.status==1?"red":"yellow")
            var color="bg-warning";
            if(temp_json.status==1){
                polygon.item(i).setAttribute("fill", '#FF0000');
                color="bg-danger";
            }else{
                polygon.item(i).setAttribute("fill", '#fad733');
            }
            var parkList=$("#parkList_template").children().prop("outerHTML");
            var num=i+1;
            num=(""+num).length<2?"0"+num:num;
            var $parkList=$(parkList);
            //$parkList.find("[name=status]").text(temp_json.status==1?"无效":"有效");
            $parkList.find("[name=bg-color]").addClass(color);

            if(temp_json.status==0){
                $parkList.find("[name=parkId]").html('<span  class=text-black>'+num+'</span>');
                $parkList.find("[name=updateTime]").html('<span class=text-black>空</span>');
                $("#parkList").append($parkList);
            }

        }
    }

    function  loadData(json,type){
        for(var i=0;i<json.parkData.length;i++){
            if(i==0) $("#parkList").empty();
            var temp_json=json.parkData[i];
            //console.log(temp_json.status==1?"red":"yellow")
            var color="bg-warning";
            var parkList=$("#parkList_template").children().prop("outerHTML");
            var num=i+1;
            num=(""+num).length<2?"0"+num:num;
            var $parkList=$(parkList);

            //$parkList.find("[name=status]").text(temp_json.status==1?"无效":"有效");
            $parkList.find("[name=bg-color]").addClass(color);

            if(type == 1){
                //只显示空车位
                if(temp_json.status==0){
                    $parkList.find("[name=parkId]").html('<span  class=text-black>'+num+'</span>');
                    $parkList.find("[name=updateTime]").html('<span class=text-black>空</span>');
                    color="bg-warning";
                    $parkList.find("[name=bg-color]").addClass(color);
                    $("#parkList").append($parkList);
                }
            }else{
                if(temp_json.status==1){
                    $parkList.find("[name=parkId]").text(num);
                    $parkList.find("[name=updateTime]").text(getTimeDifference(temp_json.lastUpdateTime));
                    color="bg-danger";
                }else{
                    color="bg-warning";
                    $parkList.find("[name=parkId]").html('<span  class=text-black>'+num+'</span>');
                    $parkList.find("[name=updateTime]").html('<span class=text-black>空</span>');
                }
                $parkList.find("[name=bg-color]").addClass(color);
                $("#parkList").append($parkList);
            }
        }
    }
    var option_ajax_load = function(id, type){
        //alert(111);
        var url;
        var min=getTimeDifference($("#lastTime").text()).replace(/([0-9]+)[\u4e00-\u9fa5]+/g,"$1");
        if(min<3){
            url="http://127.0.0.1/JsonData/json.html";
        }else{
            url="http://127.0.0.1/JsonData/index.php";
            $("#lastTime").text(new Date().pattern("yyyy-MM-dd HH:mm:ss"));
        }
        $.ajax({
            //url: "http://127.0.0.1/json.html",
            url: url,
            async: false,
            dataType: 'jsonp',
            jsonp: 'json',// 指定回调函数，这里名字可以为其他任意你喜欢的，比如callback，不过必须与下一行的GET参数一致
            jsonpCallback : "json",
            data: {
                id:id,
                callback: "json"// 键与上面的jsonp值一致
            },
            success: function (json) {
                for(var i=0;i<json.parkData.length;i++){
                    if(i==0) $("#parkList").empty();
                    var temp_json=json.parkData[i];
                    //console.log(temp_json.status==1?"red":"yellow")
                    var color="bg-warning";
                    var parkList=$("#parkList_template").children().prop("outerHTML");
                    var num=i+1;
                    num=(""+num).length<2?"0"+num:num;
                    var $parkList=$(parkList);

                    //$parkList.find("[name=status]").text(temp_json.status==1?"无效":"有效");
                    $parkList.find("[name=bg-color]").addClass(color);

                    if(type == 1){
                        //只显示空车位
                        if(temp_json.status==0){
                            $parkList.find("[name=parkId]").html('<span  class=text-black>'+num+'</span>');
                            $parkList.find("[name=updateTime]").html('<span class=text-black>空</span>');
                            color="bg-warning";
                            $parkList.find("[name=bg-color]").addClass(color);
                            $("#parkList").append($parkList);
                        }
                    }else{
                        if(temp_json.status==1){
                            $parkList.find("[name=parkId]").text(num);
                            $parkList.find("[name=updateTime]").text(temp_json.lastUpdateTime);
                            color="bg-danger";
                        }else{
                            color="bg-warning";
                            $parkList.find("[name=parkId]").html('<span  class=text-black>'+num+'</span>');
                            $parkList.find("[name=updateTime]").html('<span class=text-black>空</span>');
                        }
                        $parkList.find("[name=bg-color]").addClass(color);
                        $("#parkList").append($parkList);
                    }
                }
            }
        });
    }

    var continue_option_loading = function(id, type){

        interval = setInterval(function(){
            var url;
            var min=getTimeDifference($("#lastTime").text()).replace(/([0-9]+)[\u4e00-\u9fa5]+/g,"$1");
            if(min<3){
                url="http://127.0.0.1/JsonData/json.html";
            }else{
                url="http://127.0.0.1/JsonData/index.php";
                $("#lastTime").text(new Date().pattern("yyyy-MM-dd HH:mm:ss"));
            }
            $.ajax({
                //url: "http://127.0.0.1/json.html",
                url: url,
                async: false,
                dataType: 'jsonp',
                jsonp: 'json',// 指定回调函数，这里名字可以为其他任意你喜欢的，比如callback，不过必须与下一行的GET参数一致
                jsonpCallback : "json",
                data: {
                    id:id,
                    callback: "json"// 键与上面的jsonp值一致
                },
                success: function (json) {
                    for(var i=0;i<json.parkData.length;i++){
                        if(i==0) $("#parkList").empty();
                        var temp_json=json.parkData[i];
                        //console.log(temp_json.status==1?"red":"yellow")
                        var color="bg-warning";
                        var parkList=$("#parkList_template").children().prop("outerHTML");
                        var num=i+1;
                        num=(""+num).length<2?"0"+num:num;
                        var $parkList=$(parkList);

                        //$parkList.find("[name=status]").text(temp_json.status==1?"无效":"有效");
                        $parkList.find("[name=bg-color]").addClass(color);

                        if(type == 1){
                            //只显示空车位
                            if(temp_json.status==0){
                                $parkList.find("[name=parkId]").html('<span  class=text-black>'+num+'</span>');
                                $parkList.find("[name=updateTime]").html('<span class=text-black>空</span>');
                                color="bg-warning";
                                $parkList.find("[name=bg-color]").addClass(color);
                                $("#parkList").append($parkList);
                            }
                        }else{
                            if(temp_json.status==1){
                                $parkList.find("[name=parkId]").text(num);
                                $parkList.find("[name=updateTime]").text(temp_json.lastUpdateTime);
                                color="bg-danger";
                            }else{
                                color="bg-warning";
                                $parkList.find("[name=parkId]").html('<span  class=text-black>'+num+'</span>');
                                $parkList.find("[name=updateTime]").html('<span class=text-black>空</span>');
                            }
                            $parkList.find("[name=bg-color]").addClass(color);
                            $("#parkList").append($parkList);
                        }

                    }
                }
            });
        },3000);
    }

    $("[id*=options_]").on("click", function () {
        var options = $(this).attr("id");

        var type = options.split('_')[1];

        loadOption(id, type);
//        if($(this).attr("id")=="options_1"){
//            loadPart(id);
//            clearInterval(interval);
//            interval=setInterval(loadPart(id),2000);
//        }else{
//            loadAll(id);
//            clearInterval(interval);
//            interval=setInterval(loadAll(id),2000);
//
//        }
    });

});




