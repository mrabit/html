/**
 * Created by yuany on 2017/4/19.
 */
(function (app) {
    app.AppModule =
        ng.core.NgModule({
            imports: [ ng.platformBrowser.BrowserModule ],
            declarations: [ app.AppComponent ],
            bootstrap: [ app.AppComponent ]
        })
        .Class({
            constructor: function () {

            }
        });
})(window.app || (window.app = {}))