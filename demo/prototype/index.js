/**
 * Created by yuany on 2016/11/22 0022.
 */
(function () {
    var dependencies = ["script"];
    define(dependencies,function ($) {
        var Test = function (options) {
            var defaultOption = {
                name: "yuany"
            };
            this.options = $.extend(true,{},defaultOption,options);
        };
        Test.prototype = {
            say: function () {
                console.log(this.options.name);
            }
        };
        return Test;
    });
})();
