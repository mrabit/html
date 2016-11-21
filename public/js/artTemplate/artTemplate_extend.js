/**
 * Created by yuany on 2016/11/7 0007.
 */
define(["jquery","artTemplate/artTemplate"], function ($,template) {
   $.extend({
       replaceElement: function (ele, replaceEle, data){
           var $replaceEle;
           if(typeof replaceEle == 'string'){
               //判断replaceEle是否为字符串
               $replaceEle=$("#"+replaceEle);
           }else if(replaceEle instanceof jQuery){
               //判断replaceEle是否为jQuery对象
               $replaceEle = replaceEle;
           }else if(typeof(replaceEle) == "object" && Object.prototype.toString.call(replaceEle).toLowerCase() == "[object object]"){
               //判断replaceEle是否为JSON数组
               [$replaceEle,data] = [$("#"+ele),replaceEle];
           }else{
               //replaceEle为document实例对象
               $replaceEle = $(replaceEle);
           }
           $replaceEle.html(template(ele,data));
       }
   })
});