/**
 * Created by yuany on 2017/4/19.
 */
(function (app) {
    app.AppComponent =
        ng.core.Component({
            selector: "my-app",
            template: "<h1>这是我的第一个Angular应用1</h1>"
        }).Class({
            constructor: function () {

            }
        });
})(window.app || (window.app = {}))
