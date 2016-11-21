/**
 * Created by yuany on 2016/9/24 0024.
 */
//更改tagsinput特定参数
require(["jquery","tagsinput"], function ($) {
    var htmlEncodeContainer = $('<div />');
    function htmlEncode(value) {
        if (value) {
            return htmlEncodeContainer.text(value).html();
        } else {
            return '';
        }
    }
    $.fn.tagsinput.Constructor.prototype.add = function(item, dontPushVal, options) {
        var self = this;

        if (self.options.maxTags && self.itemsArray.length >= self.options.maxTags)
            return;

        // Ignore falsey values, except false
        if (item !== false && !item)
            return;

        // Trim value
        if (typeof item === "string" && self.options.trimValue) {
            item = $.trim(item);
        }

        // Throw an error when trying to add an object while the itemValue option was not set
        if (typeof item === "object" && !self.objectItems)
            throw("Can't add objects when itemValue option is not set");

        // Ignore strings only containg whitespace
        if (item.toString().match(/^\s*$/))
            return;

        // If SELECT but not multiple, remove current tag
        if (self.isSelect && !self.multiple && self.itemsArray.length > 0){
            console.log("If SELECT but not multiple, remove current tag");
            self.remove(self.itemsArray[0]);
        }


        if (typeof item === "string" && this.$element[0].tagName === 'INPUT') {
            var delimiter = (self.options.delimiterRegex) ? self.options.delimiterRegex : self.options.delimiter;
            var items = item.split(delimiter);
            if (items.length > 1) {
                for (var i = 0; i < items.length; i++) {
                    this.add(items[i], true);
                }

                if (!dontPushVal)
                    self.pushVal(self.options.triggerChange);
                return;
            }
        }
        // 判断,当objectItems有值(有值表示需要键值对的支持)
        // 并且item类型为string(单纯的为string则表示是手动添加的值)
        // 则给item赋值json对象,默认值为0,后台判断默认值为0时则添加tags
        // {"value":0,"text":"值"}
        // 判断输入值是否存在,存在则读取已存在值
        if(self.objectItems && typeof item === "string"){
            var id = "0";
            var tags_name = item;
            if(window.tags_arr.has(item)){
                var temp =  window.tags_arr.get(item);
                id = temp.id;
                tags_name = temp.tags_name;
            }
            var json = {};
            json[self.objectItems] = id;
            json["tags_name"] = tags_name;
            item = json;
        }
        var itemValue = self.options.itemValue(item),
            itemText = self.options.itemText(item),
            tagClass = self.options.tagClass(item),
            itemTitle = self.options.itemTitle(item);

        // Ignore items allready added 判断itemValue是否存在
        var existing = $.grep(self.itemsArray, function(item) { return self.options.itemValue(item) === itemValue; } )[0];

        //如果itemValue存在,并且itemValue!=0,则判定重复
        if (existing && !self.options.allowDuplicates && itemValue != 0) {
            // Invoke onTagExists
            if (self.options.onTagExists) {
                var $existingTag = $(".tag", self.$container).filter(function() { return $(this).data("item") === existing; });
                self.options.onTagExists(item, $existingTag);
            }
            return;
        }
        //判断itemText是否存在
        existing = $.grep(self.itemsArray, function(item) { return self.options.itemText(item) === itemText; } )[0];
        //如果itemValue存在,并且itemValue=0,则判定重复
        if(existing && itemValue == 0){
            if (self.options.onTagExists) {
                var $existingTag = $(".tag", self.$container).filter(function() { return $(this).data("item") === existing; });
                self.options.onTagExists(item, $existingTag);
            }
            return;
        }
        // if length greater than limit
        if (self.items().toString().length + item.length + 1 > self.options.maxInputLength)
            return;

        // raise beforeItemAdd arg
        var beforeItemAddEvent = $.Event('beforeItemAdd', { item: item, cancel: false, options: options});
        self.$element.trigger(beforeItemAddEvent);
        if (beforeItemAddEvent.cancel)
            return;

        // register item in internal array and map
        self.itemsArray.push(item);

        // add a tag element

        var $tag = $('<span class="tag ' + htmlEncode(tagClass) + (itemTitle !== null ? ('" title="' + itemTitle) : '') + '">' + htmlEncode(itemText) + '<span data-role="remove"></span></span>');
        $tag.data('item', item);
        self.findInputWrapper().before($tag);
        $tag.after(' ');

        // Check to see if the tag exists in its raw or uri-encoded form
        var optionExists = (
            $('option[value="' + encodeURIComponent(itemValue) + '"]', self.$element).length ||
            $('option[value="' + htmlEncode(itemValue) + '"]', self.$element).length
        );

        // add <option /> if item represents a value not present in one of the <select />'s options
        if (self.isSelect && !optionExists) {
            var $option = $('<option selected>' + htmlEncode(itemText) + '</option>');
            $option.data('item', item);
            $option.attr('value', itemValue);
            self.$element.append($option);
        }

        if (!dontPushVal)
            self.pushVal(self.options.triggerChange);

        // Add class when reached maxTags
        if (self.options.maxTags === self.itemsArray.length || self.items().toString().length === self.options.maxInputLength)
            self.$container.addClass('bootstrap-tagsinput-max');

        // If using typeahead, once the tag has been added, clear the typeahead value so it does not stick around in the input.
        if ($('.typeahead, .twitter-typeahead', self.$container).length) {
            self.$input.typeahead('val', '');
        }

        if (this.isInit) {
            self.$element.trigger($.Event('itemAddedOnInit', { item: item, options: options }));
        } else {
            self.$element.trigger($.Event('itemAdded', { item: item, options: options }));
        }
    };
    /**
     * Removes the given item. Pass true to dontPushVal to prevent updating the
     * elements val()
     */
    $.fn.tagsinput.Constructor.prototype.remove = function(item, dontPushVal, options) {
        var self = this;

        if (self.objectItems) {
            //当value!=0,则根据value值删除字段
            if (typeof item === "object" && self.options.itemValue(item) != 0)
                item = $.grep(self.itemsArray, function(other) { return self.options.itemValue(other) ==  self.options.itemValue(item); } );
            //当value=0,需要通过Text值删除字段
            else if(typeof item === "object" && self.options.itemValue(item) == 0)
                item = $.grep(self.itemsArray, function(other) { return self.options.itemText(other) ==  self.options.itemText(item); } );
            else
                item = $.grep(self.itemsArray, function(other) { return self.options.itemValue(other) ==  item; } );

            item = item[item.length-1];
        }

        if (item) {
            var beforeItemRemoveEvent = $.Event('beforeItemRemove', { item: item, cancel: false, options: options });
            self.$element.trigger(beforeItemRemoveEvent);
            if (beforeItemRemoveEvent.cancel)
                return;

            $('.tag', self.$container).filter(function() { return $(this).data('item') === item; }).remove();
            $('option', self.$element).filter(function() { return $(this).data('item') === item; }).remove();
            if($.inArray(item, self.itemsArray) !== -1)
                self.itemsArray.splice($.inArray(item, self.itemsArray), 1);
        }

        if (!dontPushVal)
            self.pushVal(self.options.triggerChange);

        // Remove class when reached maxTags
        if (self.options.maxTags > self.itemsArray.length)
            self.$container.removeClass('bootstrap-tagsinput-max');

        self.$element.trigger($.Event('itemRemoved',  { item: item, options: options }));
    };
});