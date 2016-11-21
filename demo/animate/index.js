/**
 * Created by yuany on 2016/9/9 0009.
 */

//需实现效果的div,div需隐藏 class="hide"
var arr = $(".col-xs-6");

//使用一个效果来显示一个元素
animate_show($(arr[0]), 'slideInLeft');

//顺序显示后面的元素的效果
$.each(arr, function (k,v) {
    var ani = "slideInLeft";
    if(k % 2 == 0) ani = "slideInRight";
    animate_delay($(v), $(arr[k+1]), ani);
});

/**
 * 使用一个效果来显示一个元素
 * @param  {string} element 元素
 * @param  {string} animate animate.css的效果
 * @return {void}
 */
function animate_show(element, animate) {
    $(element).removeClass("hide").addClass('animated ' + animate);
}

/**
 * 顺序显示后面的元素的效果
 * @param  {string} element1 等待结束的元素
 * @param  {string} element2 接下来要显示的元素
 * @param  {string} animate  animate.css的效果
 * @return {void}
 */
function animate_delay(element1, element2, animate) {
    $(element1).one('webkitAnimationEnd mozAnimationEnd oAnimationEnd animationEnd', function() {
        animate_show(element2, animate);
    });
}