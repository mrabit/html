/**
 * Created by yuany on 2016/9/13 0013.
 * AngularJs控制器：页面index的Controller
 */
define(['init-angular'], function (app) {
    var pageNum = 0;
    app.controller('web_title', function ($scope) {
        $scope.web_title = "counter";
    });
    app.controller('body', function ($scope) {
        $scope.toggle= function ($event) {
            var num =eval(pageNum + $($event.currentTarget).attr("operation") + "1");
            pageNum = num < 0?0:num;
            $scope.container_style = {
                "counter-reset": "issues " + pageNum * $(".issue").length
            };
        };
    });

});