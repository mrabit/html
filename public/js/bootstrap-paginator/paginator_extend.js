/**
 * Created by yuany on 2016/9/30 0030 9:46.
 */
require(["bootstrapPaginator"], function () {
    $.fn.bootstrapPaginator.Constructor.prototype.render = function () {

        //fetch the container class and add them to the container
        var containerClass = this.getValueFromOption(this.options.containerClass, this.$element),
            size = this.options.size || "normal",
            alignment = this.options.alignment || "left",
            pages = this.getPages(),
            listContainer = this.options.bootstrapMajorVersion === 2 ? $("<ul></ul>") : this.$element,
            listContainerClass = this.options.bootstrapMajorVersion === 2 ? this.getValueFromOption(this.options.listContainerClass, listContainer) : null,
            first = null,
            prev = null,
            next = null,
            last = null,
            p = null,
            ele_input = null,
            view = null,
            i = 0;

        pages["ele_input"] = '<div class="input-group m-l-xs" style="position: static;display: inline-table;">' +
            '<input type="text" class="form-control m-l-xs pull-left" style="width:80px;" placeholder="跳转到">' +
            '<p style="line-height: 35px;margin-bottom: 0px;" class="pull-left m-l-xs" name="pageCount">页,<span>共1/2页</span></p>' +
            '</div>';
        //pages["view"] = '<div class="m-l-sm" ></div>';

        this.$element.prop("class", "");

        this.$element.addClass("pagination");

        switch (size.toLowerCase()) {
            case "large":
            case "small":
            case "mini":
                this.$element.addClass($.fn.bootstrapPaginator.sizeArray[this.options.bootstrapMajorVersion][size.toLowerCase()]);
                break;
            default:
                break;
        }

        if (this.options.bootstrapMajorVersion === 2) {
            switch (alignment.toLowerCase()) {
                case "center":
                    this.$element.addClass("pagination-centered");
                    break;
                case "right":
                    this.$element.addClass("pagination-right");
                    break;
                default:
                    break;
            }
        }


        this.$element.addClass(containerClass);

        //empty the outter most container then add the listContainer inside.
        this.$element.empty();

        if (this.options.bootstrapMajorVersion === 2) {
            this.$element.append(listContainer);

            listContainer.addClass(listContainerClass);
        }

        //update the page element reference
        this.pageRef = [];

        if (pages.first) {//if the there is first page element
            first = this.buildPageItem("first", pages.first);

            if (first) {
                listContainer.append(first);
            }

        }

        if (pages.prev) {//if the there is previous page element

            prev = this.buildPageItem("prev", pages.prev);

            if (prev) {
                listContainer.append(prev);
            }

        }


        for (i = 0; i < pages.length; i = i + 1) {//fill the numeric pages.

            p = this.buildPageItem("page", pages[i]);

            if (p) {
                listContainer.append(p);
            }
        }

        if (pages.next) {//if there is next page

            next = this.buildPageItem("next", pages.next);

            if (next) {
                listContainer.append(next);
            }
        }

        if (pages.last) {//if there is last page

            last = this.buildPageItem("last", pages.last);

            if (last) {
                listContainer.append(last);
            }
        }

        if(pages.ele_input){
            ele_input = this.buildPageItem("ele_input", pages.ele_input);
            if (ele_input) {
                listContainer.append(ele_input);
            }
        }


    };
    $.fn.bootstrapPaginator.Constructor.prototype.buildPageItem =function (type, page) {

        var itemContainer = $("<li></li>"),//creates the item container
            itemContent = $("<a></a>"),//creates the item content
            text = "",
            title = "",
            itemContainerClass = this.options.itemContainerClass(type, page, this.currentPage),
            itemContentClass = this.getValueFromOption(this.options.itemContentClass, type, page, this.currentPage),
            tooltipOpts = null;


        switch (type) {

            case "first":
                if (!this.getValueFromOption(this.options.shouldShowPage, type, page, this.currentPage)) { return; }
                text = this.options.itemTexts(type, page, this.currentPage);
                title = this.options.tooltipTitles(type, page, this.currentPage);
                break;
            case "last":
                if (!this.getValueFromOption(this.options.shouldShowPage, type, page, this.currentPage)) { return; }
                text = this.options.itemTexts(type, page, this.currentPage);
                title = this.options.tooltipTitles(type, page, this.currentPage);
                break;
            case "prev":
                if (!this.getValueFromOption(this.options.shouldShowPage, type, page, this.currentPage)) { return; }
                text = this.options.itemTexts(type, page, this.currentPage);
                title = this.options.tooltipTitles(type, page, this.currentPage);
                break;
            case "next":
                if (!this.getValueFromOption(this.options.shouldShowPage, type, page, this.currentPage)) { return; }
                text = this.options.itemTexts(type, page, this.currentPage);
                title = this.options.tooltipTitles(type, page, this.currentPage);
                break;
            case "page":
                if (!this.getValueFromOption(this.options.shouldShowPage, type, page, this.currentPage)) { return; }
                text = this.options.itemTexts(type, page, this.currentPage);
                title = this.options.tooltipTitles(type, page, this.currentPage);
                break;
        }

        if(type == "ele_input"){
            itemContainer = $("<li style='position: absolute'></li>")
            var pa = this;
            var show_time;
            $(this.$element).off("input").on("input","input",function () {
                clearTimeout(show_time);
                var val = $(this).val();
                var reg = /\d+/;
                if(val > pa.totalPages || val == pa.options.currentPage || !reg.test(val)){
                    return false;
                }
                show_time = setTimeout(function () {
                    pa.show(val);
                },300);
            });
            var $page = $(page);
            $page.find('[name="pageCount"] span').text("共"+this.options.currentPage+"/"+this.totalPages+"页");
            return itemContainer.addClass(itemContainerClass).append($page);
        }

        itemContainer.addClass(itemContainerClass).append(itemContent);

        itemContent.addClass(itemContentClass).html(text).on("click", null, {type: type, page: page}, $.proxy(this.onPageItemClicked, this));

        if (this.options.pageUrl) {
            itemContent.attr("href", this.getValueFromOption(this.options.pageUrl, type, page, this.currentPage));
        }

        if (this.options.useBootstrapTooltip) {
            tooltipOpts = $.extend({}, this.options.bootstrapTooltipOptions, {title: title});

            itemContent.tooltip(tooltipOpts);
        } else {
            itemContent.attr("title", title);
        }

        return itemContainer;
    };
});