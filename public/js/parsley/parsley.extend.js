window.ParsleyConfig = window.ParsleyConfig || {};

(function ($) {
  window.ParsleyConfig = $.extend( true, {}, window.ParsleyConfig, {
    asyncValidators:{
      check_timeout:{},
      remote_check_fn:function(val,url,c,k,t){
        var _this=this;
        if($.trim(val)){
          if(this.check_timeout[k]){
            clearTimeout(this.check_timeout[k]);
          }
          this.check_timeout[k]=setTimeout(function(){
            var isAvail=false;
            var f = {};
            f[c.$element.attr("name")] = val;
            $.ajax({
              url:url,
              type: "post",
              data: f,
              dataType: 'json',
              success: function (data) {
                _this.check_timeout[k]=0;
                if (data.code == "OK") {
                  isAvail=true;
                } else {
                  isAvail=false;
                }
                c.updtConstraint({
                  name: k,
                  valid: isAvail
                });
                c.manageValidationResult();
              },
              error: function () {
                throw ("\u7cfb\u7edf\u9519\u8bef");
              }
            })
          },t?t:500);
        }
      }
    },
    validators: {
      minwords: function ( val, nbWords ) {
        val = val.replace( /(^\s*)|(\s*$)/gi, "" );
        val = val.replace( /[ ]{2,}/gi, " " );
        val = val.replace( /\n /, "\n" );
        val = val.split(' ').length;

        return val >= nbWords;
      }

      , maxwords : function ( val, nbWords ) {
        val = val.replace( /(^\s*)|(\s*$)/gi, "" );
        val = val.replace( /[ ]{2,}/gi, " " );
        val = val.replace( /\n /, "\n" );
        val = val.split(' ').length;

        return val <= nbWords;
      }

      , rangewords: function ( val, obj ) {
        val = val.replace( /(^\s*)|(\s*$)/gi, "" );
        val = val.replace( /[ ]{2,}/gi, " " );
        val = val.replace( /\n /, "\n" );
        val = val.split(' ').length;

        return val >= obj[0] && val <= obj[1];
      }

      , greaterthan: function ( val, elem, self ) {
        self.options.validateIfUnchanged = true;

        return new Number(val) > new Number($( elem ).val());
      }

      , lessthan: function ( val, elem, self ) {
        self.options.validateIfUnchanged = true;

        return new Number(val) < new Number($( elem ).val());
      }

      , beforedate: function ( val, elem, self) {
        return Date.parse(val) < Date.parse($(elem).val());
      }

      , afterdate: function ( val, elem, self) {
        return Date.parse($(elem).val()) < Date.parse(val);
      }

      , inlist: function ( val, list, self ) {
        var delimiter = self.options.inlistDelimiter || ',';
        var listItems = (list + "").split(new RegExp("\\s*\\" + delimiter + "\\s*"));

        return (listItems.indexOf(val.trim()) !== -1);
      }

      , luhn: function ( val, elem, self) {
        val = val.replace(/[ -]/g, '');
        var digit, n, sum, _j, _len1, _ref2;
        sum = 0;
        _ref2 = val.split('').reverse();
        for (n = _j = 0, _len1 = _ref2.length; _j < _len1; n = ++_j) {
          digit = _ref2[n];
          digit = +digit;
          if (n % 2) {
            digit *= 2;
            if (digit < 10) {
              sum += digit;
            } else {
              sum += digit - 9;
            }
          } else {
            sum += digit;
          }
        }
        return sum % 10 === 0;
      }

      , americandate: function ( val, elem, self) {
        if(!/^([01]?[0-9])[\.\/-]([0-3]?[0-9])[\.\/-]([0-9]{4}|[0-9]{2})$/.test(val)) {
        	return false;
        }
        var parts = val.split(/[.\/-]+/);
        var day = parseInt(parts[1], 10);
        var month = parseInt(parts[0], 10);
        var year = parseInt(parts[2], 10);
        if(year == 0 || month == 0 || month > 12) {
          return false;
        }
        var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
        if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)) {
          monthLength[1] = 29;
        }
        return day > 0 && day <= monthLength[month - 1];
      }
    }
    , messages: {
        required: "\u8be5\u8f93\u5165\u9879\u4e3a\u5fc5\u586b.",
        type: {
            email: "\u8bf7\u8f93\u5165\u6709\u6548\u7684\u0065\u006d\u0061\u0069\u006c\u5730\u5740.",
            phone: "\u8bf7\u8f93\u5165\u6709\u6548\u7684\u624b\u673a\u53f7\u7801.",
            mobile: "\u8bf7\u8f93\u5165\u6709\u6548\u7684\u624b\u673a\u53f7\u7801.",
            number: "\u6b64\u503c\u5e94\u4e3a\u6709\u6548\u6570\u5b57"
        },
        minwords:       "This value should have %s words at least."
      , maxwords:       "This value should have %s words maximum."
      , rangewords:     "This value should have between %s and %s words."
      , greaterthan:    "This value should be greater than %s."
      , lessthan:       "This value should be less than %s."
      , beforedate:     "This date should be before %s."
      , afterdate:      "This date should be after %s."
      , luhn:           "This value should pass the luhn test."
      , americandate:	"This value should be a valid date (MM/DD/YYYY)."
      , rangelength:  "\u8f93\u5165\u7684\u5185\u5bb9\u957f\u5ea6\u8303\u56f4%s\u5230%s\u4e2a\u5b57\u7b26\u002e."
    }
  });
}(window.jQuery || window.Zepto));
