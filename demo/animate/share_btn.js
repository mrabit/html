/**
 * Created by yuany on 2016/9/12 0012.
 */
(function ($) {
    var docElemStyle = document.documentElement.style;
    var transitionProp = typeof docElemStyle.transition == 'string' ?
        'transition' : 'WebkitTransition';
    var items = document.querySelectorAll('.itemArea');
    for ( var i=0; i < items.length; i++ ) {
        var item = items[i];
        item.style[ transitionProp + 'Delay' ] = ( (i+1) * 50 ) + 'ms';
    }
    $(".share_btn").click(function () {
        $(".share").toggleClass("share_active");
        $(".share").find(".itemArea").toggleClass("move");
        $(".share").find(".itemArea:eq(1)").toggleClass("move2");
    })
})(jQuery);