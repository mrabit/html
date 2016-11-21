/**
 * Created with JetBrains WebStorm.
 * User: yuany/biabia123456@126.com
 * Date: 2016/9/11 0011
 * Time: 上午 5:23
 *
 */
define(['init-angular'], function (controllers) {
    console.log(controllers)
    controllers.controller('web_title', function($scope) {
        $scope.firstName = "John";
    });
});