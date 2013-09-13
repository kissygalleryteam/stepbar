/**
 * @fileoverview 步骤条组件
 * @author 明河<minghe36@126.com>
 * @module stepbar
 **/
KISSY.add(function (S,Node, Base) {
    var EMPTY = '';
    var $ = Node.all;

    /**
     * 步骤条组件
     * @class Stepbar
     * @constructor
     * @extends Base
     */
    function Stepbar(target, comConfig) {
        var self = this;
        //调用父类构造函数
        Stepbar.superclass.constructor.call(self, comConfig);
        self.set('target',target);
    }

    Stepbar.event = {
        RENDER : 'render'
    };
    Stepbar.color = {ORANGE:'orange',BLUE:'blue',GREEN:'green',RED:'red',PINK:'pink',GRAY:'gray'};
    Stepbar.cls = {STEPS : "step-bar",ITEM : "step-bar-item",CURRENT : "current",DONE : "done",FIRST:'first',LAST:'last'};
    Stepbar.ZINDEX = 500;
    Stepbar.ARROW_TPL = '<div class="trigon">'+
        '<span class="bor"></span>' +
        '<span class="blo"></span>'+
        '</div>';

    S.extend(Stepbar, Base, /** @lends Stepbar.prototype*/{
        /**
         * 运行组件
         */
        render: function () {
            var self = this,cls = Stepbar.cls;
            var $target = self.get('target');
            if(!$target.length) return false;

            var $steps = $target.children('li');
            if(!$steps.length) return false;

            self.set('$steps',$steps);
            $target.addClass(cls.STEPS);

            self._setItemStyle();
            self._setWidth();
            self._setColor();
            var act = Number($target.attr('data-act'));
            self._setAct(act);
            self._addTrigon();
            self.fire('render',{'$steps':$steps});

            return self;
        },
        /**
         * 支持的步骤条颜色
         * @return {Array}
         */
        allowColor : function(){
            var colors = [];
            if(colors.length == 0){
                S.each(Stepbar.color,function(v){
                    colors.push(v);
                });
            }
            return colors;
        },
        /**
         *是否支持此颜色
         * @param color
         * @return {boolean}
         */
        isAllowColor : function(color){
            var self = this,allowColor = self.allowColor(),Bool = false;
            S.each(allowColor,function(v){
                if(v == color){
                    Bool = true;
                    return true;
                }
            });
            return Bool;
        },
        /**
         * 设置li的样式
         * @private
         */
        _setItemStyle : function(){
            var self = this,$steps = self.get('$steps'),cls = Stepbar.cls,zIndex = Stepbar.ZINDEX;
            $steps.each(function($step){
                $step.addClass(cls.ITEM).css('zIndex',zIndex);
                zIndex --;
            });
            return self;
        },
        /**
         * 设置宽度
         * @param w
         * @private
         */
        _setWidth : function(w){
            var self = this;
            var width = w || self.get('width');
            var $target = self.get('target');
            var $steps = self.get('$steps');
            var itemLen = $steps.length;
            if(width == EMPTY){
                if(itemLen == 0) return false;
                var containerWidth = $target.width();
                var ret = containerWidth % itemLen;
                width = Number( (containerWidth - ret) / itemLen);
            }
            $steps.width(width);

            if (ret) {
              $steps.item(itemLen - 1).width(width + ret);
            }

            return width;
        },
        /**
         * 设置步骤条颜色
         * @param c
         * @return {String|Boolean}
         * @private
         */
        _setColor : function(c){
            var self = this;
            var color = c || self.get('color');
            var $target = self.get('target');
            var allowColors = self.allowColor();
            var isAllowColor = self.isAllowColor(color);
            if(color == EMPTY || !isAllowColor) return false;
            $target.removeClass(allowColors.join(' ')).addClass(color);
            return color;

        },
        /**
         * 设置当前激活的步骤
         * @param i
         * @return {*}
         * @private
         */
        _setAct : function(i){
            var self = this;
            var act = i || self.get('act');
            var cls = Stepbar.cls;
            var $steps = self.get('$steps');
            var itemLen = $steps.length;
            if(!itemLen) return false;
            if(act == EMPTY || act > itemLen || act < 1){
                $steps.removeClass(cls.DONE + ' ' + cls.CURRENT);
                return 0;
            }
            $steps.each(function($step,i){
                i == 0 && $step.addClass(cls.FIRST);
                i == itemLen - 1 && $step.addClass(cls.LAST);
                $step.removeClass(cls.DONE + ' ' + cls.CURRENT);
            });
            act --;
            $steps.item(act).addClass(cls.CURRENT);
            $steps.each(function($step,i){
                if(i >= act) return false;
                $step.addClass(cls.DONE);
            });
            return act;
        },
        /**
         * 添加箭头
         * @return {*}
         * @private
         */
        _addTrigon : function(){
            var self = this;
            var $steps = self.get('$steps');
            var stepLen = $steps.length;
            var html = Stepbar.ARROW_TPL;
            $steps.each(function($step,i){
                i < stepLen - 1 && $step.append(html);
            })
            return self;

        }
    }, {ATTRS: /** @lends Stepbar*/{
        target:{
            value:EMPTY,
            getter:function(v){
                return $(v);
            }
        },
        $steps:{
            value:EMPTY
        },
        width : {
            value : EMPTY,
            setter : function(v){
                var self = this;
                self._setWidth(v);
                return v;
            }
        },
        color : {
            value : Stepbar.color.ORANGE,
            setter : function(v) {
                var self = this;
                self._setColor(v);
                return v;
            }
        },
        act : {
            value : 0,
            setter : function(v){
                var self = this;
                self._setAct(v);
                return v;
            }
        }
    }});
    return Stepbar;
}, {requires: ['node', 'base']});
