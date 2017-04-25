/**
 * Created by yuany on 2017/4/25 0025.
 */
(function (global,factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node / CommonJS
        factory(require('jquery'));
    } else {
        // Globals
        global.Prize = factory(jQuery);
    }
})(this,function ($) {
    let Prize = function (container, options) {
        let defaultOption = {
            restaraunts:[],				//大转盘奖品名称
            colors:[],					//大转盘奖品区块对应背景颜色
            outsideRadius:192,			//大转盘外圆的半径
            textRadius:155,				//大转盘奖品位置距离圆心的距离
            insideRadius:60,			//大转盘内圆的半径
            startAngle:0,				//开始角度
            bRotate:false,              //转盘锁定,转动未完成禁止点击事件
            event: {
                click: null,           //转盘点击事件
                rotate: null           //转盘结束转动事件
            }
        };
        this.options = $.extend(true, {}, defaultOption, options);
        this.container = container;     //转盘容器
        this.init();
    };
    Prize.prototype = {
        init: function () {
            this.initHtml();
            this.initEvent();
            this.drawRouletteWheel();
        },
        initHtml: function () {
            let html = '<div class="banner"><div class="turnplate"><canvas class="item" id="wheelcanvas" width="422px" height="422px"></canvas><div class="prize_pointer"></div></div>';
            this.container.empty().append($(html));
            this.$element = document.getElementById('wheelcanvas');
        },
        initEvent: function () {
            let _this = this;
            this.container
                .on("click",'.prize_pointer',function () {
                    //默认执行超时事件
                    _this.rotateTimeOut();
                    //超时时间内获取到奖品数据,终止超时事件
                    typeof _this.options.event.click === "function" && _this.options.event.click(_this);
                });
        },
        rotateFn: function (item){
            //超时
            if(typeof item === "boolean" || typeof item === "undefined" || item === "" || item === null){
                this.rotateTimeOut(5000);
                return false;
            }
            //判断当前是否转动
            if(this.options.bRotate) return false;
            let _this = this;
            //更改状态为正在转动
            this.options.bRotate = !this.options.bRotate;
            //获取奖品名
            let txt = this.options.restaraunts[item-1];
            //获取奖品到达角度 =  位置数 * 每个所占角度 - 每个所占中间角度
            let angles = item * (360 / this.options.restaraunts.length) - (360 / (this.options.restaraunts.length*2));
            if(angles<270){
                angles = 270 - angles;
            }else{
                angles = 360 - angles + 270;
            }
            this.container.find('#wheelcanvas').stopRotate();
            this.container.find('#wheelcanvas').rotate({
                angle:0,
                animateTo:angles + 1800,      //至少5*360
                duration:8000,
                callback:function (){
                    typeof _this.options.event.rotate === "function" && _this.options.event.rotate(txt);
                    _this.options.bRotate = !_this.options.bRotate;
                }
            });
        },
        rotateTimeOut: function (duration){
            //超时时间,默认10000ms
            this.container.find('#wheelcanvas').rotate({
                angle:0,
                animateTo:parseInt((Math.random()*(8-5+1)+5) * 360),
                duration: duration || 10000,
                callback:function (){
                    alert('网络超时，请检查您的网络设置！');
                }
            });
        },
        drawRouletteWheel: function() {
            let canvas = this.$element;
            if (canvas.getContext) {
                //根据奖品个数计算圆周角度
                let arc = Math.PI / (this.options.restaraunts.length/2);
                let ctx = canvas.getContext("2d");
                //在给定矩形内清空一个矩形
                ctx.clearRect(0,0,422,422);
                //strokeStyle 属性设置或返回用于笔触的颜色、渐变或模式
                ctx.strokeStyle = "#FFBE04";
                //font 属性设置或返回画布上文本内容的当前字体属性
                ctx.font = '16px Microsoft YaHei';
                for(let i = 0; i < this.options.restaraunts.length; i++) {
                    let angle = this.options.startAngle + i * arc; //开始位置=开始角度+当前个数*每个角度
                    ctx.fillStyle = this.options.colors[i%this.options.colors.length]; //填充颜色
                    ctx.beginPath();
                    //arc(x,y,r,起始角,结束角,绘制方向) 方法创建弧/曲线（用于创建圆或部分圆）
                    ctx.arc(211, 211, this.options.outsideRadius, angle, angle + arc, false);
                    ctx.arc(211, 211, this.options.insideRadius, angle + arc, angle, true);
                    ctx.stroke();
                    ctx.fill();
                    //锁画布(为了保存之前的画布状态)
                    ctx.save();

                    //----绘制奖品开始----
                    ctx.fillStyle = "#E5302F";
                    let text = this.options.restaraunts[i];
                    let line_height = 15;
                    //translate方法重新映射画布上的 (0,0) 位置
                    ctx.translate(211 + Math.cos(angle + arc / 2) * this.options.textRadius, 211 + Math.sin(angle + arc / 2) * this.options.textRadius);

                    //rotate方法旋转当前的绘图
                    ctx.rotate(angle + arc / 2 + Math.PI / 2);

                    /** 下面代码根据奖品类型、奖品名称长度渲染不同效果，如字体、颜色、图片效果。(具体根据实际情况改变) **/
                    if(this.options.restaraunts.length>6){//奖品名称长度超过一定范围
                        let texts = text.split('');
                        for(let j = 0; j<texts.length; j++){
                            if(this.options.restaraunts.length >= 15){
                                ctx.font = '12px Microsoft YaHei';
                                ctx.fillText(texts[j], -ctx.measureText(texts[j]).width / 2, j * line_height);
                                continue;
                            }
                            ctx.fillText(texts[j], -ctx.measureText(texts[j]).width / 2, j * line_height);
                        }
                    }else{
                        //在画布上绘制填色的文本。文本的默认颜色是黑色
                        //measureText()方法返回包含一个对象，该对象包含以像素计的指定字体宽度
                        ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
                    }

//                    //添加对应图标
//                    if(text.indexOf("金币")>0){
//                        var img= document.getElementById("shan-img");
//                        img.onload=function(){
//                            ctx.drawImage(img,-15,10);
//                        };
//                        ctx.drawImage(img,-15,10);
//                    }else if(text.indexOf("谢谢参与")>=0){
//                        var img= document.getElementById("sorry-img");
//                        img.onload=function(){
//                            ctx.drawImage(img,-15,10);
//                        };
//                        ctx.drawImage(img,-15,10);
//                    }
                    //把当前画布返回（调整）到上一个save()状态之前
                    ctx.restore();
                    //----绘制奖品结束----
                }
            }
            this.container.find(".turnplate").height(this.container.find(".turnplate").width());
        }
    };
    $.fn.prize = function (option) {
        if (typeof option === 'undefined') {
            return $(this).data('prize') || false;
        } else {
            let result;
            let args = arguments;
            this.each(function () {
                let $this = $(this);
                let data = $this.data('prize');
                if (!data && typeof option === 'string') {
                    throw new Error('参数错误');
                }
                else if (data && typeof option === 'object') {
                    throw new Error('已实例化过');
                }
                //初始化
                else if (!data && typeof option === 'object') {
                    let options = typeof option == 'object' && option;
                    let data_api_options = $this.data();
                    options = $.extend(options, data_api_options);
                    $this.data('prize', (data = new Prize($(this), options)));
                }
                else if (data && typeof option === 'string') {
                    result = data[option].apply(data, Array.prototype.slice.call(args, 1));
                }
            });
            return typeof result === 'undefined' ? this : result;
        }
    };
});