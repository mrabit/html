/**
 * Created by Administrator on 2016/5/24 0024.
 */
$(document).ready(function () {
    var listArr=[
        1102,
        //1103,
        //1104,
        //1105,
        //1109
    ];
    var listName=[
        "福临小区",
        //"社区道路1",
        //"社区道路2",
        //"社区道路3",
        //"社区道路4"
    ];
    getParkingLotNum(listArr,listName);
});



var getParkingLotNum= function (listArr,listName) {
    if(listArr.length<=0){
        return false;
    }else{
        var id=listArr[0];
        var name=listName[0];
        $.ajax({
            url: "http://youhh.net/yuxiu/api/xigu/get_park_data",
            //async: false,
            dataType: 'jsonp',
            jsonp: 'json',
            jsonpCallback : "json",// 指定回调函数，这里名字可以为其他任意你喜欢的，比如callback，不过必须与下一行的GET参数一致
            data: {
                id:id,
                callback: "json"// 键与上面的jsonp值一致
            },
            success: function (json) {
                getParkingLotNum(listArr.splice(1),listName.splice(1));

                var availableNum=0;
                var noAvailableNum=0;
                if(!!json.code){
                    $.each(json.parkData, function (key,value) {
                        if(!parseInt(value.status)){
                            availableNum++;
                        }else {
                            noAvailableNum++;
                        }
                    })
                }
                var list=$("#list_template").children().prop("outerHTML");
                var $list=$(list);
                $list.find("[name=parkingLotAvailableNum]").html('<span class="text-black">'+availableNum+'</span>');
                $list.find("[name=parkingLotNoAvailableNum]").text(noAvailableNum);

                $list.attr("href","/yuxiu/mobile/parking/lists/id/"+id);
                $list.find("[name=parkingLotName]").text(name);
                $("#list_group").append($list);
            }
        });
    }
}
