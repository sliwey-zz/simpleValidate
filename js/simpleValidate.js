/**
 *  simpleValidate.js   v1.0.0
 *  
 *	author: sliwey
 *  date: 2014-10-20
 *  update: 2014-10-20	
 */

 ;(function($, undefined) {

 	var defaluts = {
 		msg: {

 		},
 		rules: []
 	};

 	var Message = {
 		requiredMsg: "该项不能为空！",
 		correctMsg: "验证成功！",
		errorMsg: "验证失败！"
 	};

 	var validRegExp = {
 		"number": /\d+/,
 	};

 	$.fn.extend({
 		simpleValidate : function(options) {
 			var setting = $.extend({}, defaluts, options);
			init(setting, this);
			return this;
 		}
 	});


 	function init(setting, _this) {
 		var rules = setting.rules,
 			length = rules.length;

		// 初始化提示位置
 		for (var i = 0; i < length; i++) {
 			var input = $("#" + rules[i].id);

 			if (!rules[i].msgWrap) {
 				input.after("<span class='simpleValidate-msg'></span>");
 			}
 		}

 		_this.on("submit", function() {
 			var canSubmit = true;

	 		for (var i = 0; i < length; i++) {
	 			var rule = rules[i],
	 				input = $("#" + rule.id),
 					msgWrap = rule.msgWrap || input.next();

	 			if (rule.required) {
	 				canSubmit = isRequired(input, msgWrap, rule.msg);

	 				// 逐条验证
	 				if (!canSubmit) {
	 					break;
	 				}
	 			}

	 			if (rule.minLength !== undefined || rule.maxLength !== undefined) { 				
	 				canSubmit = checkLength(input, msgWrap, rule.minLength, rule.maxLength);

	 				// 逐条验证
	 				if (!canSubmit) {
	 					break;
	 				}
	 			}

	 			if (rule.regExp) {
	 				canSubmit = checkRegExp(input, msgWrap, rule.msg, rule.regExp);

	 				// 逐条验证
	 				if (!canSubmit) {
	 					break;
	 				}
	 			}
	 		}

 			if (!canSubmit) {
 				return false
 			}
 		});

 		// validateType[setting.type](_this, msgWrap, setting.msg);
 	};

 	function isRequired(input, msgWrap, msg) {
 		var message = msg !== undefined && msg.requiredMsg !== undefined ? msg.requiredMsg : Message.requiredMsg;

 		if (!/\S+/.test(input.val())) {
 			msgWrap.text(message);
 			input.focus();
			return false;
 		} else {
 			// msgWrap.text(obj.msg.correctMsg);
			return true;
 		}
 	};

 	function checkLength(input, msgWrap, min, max) {
 		var length = input.val().trim().length;

 		if (min !== undefined && max !== undefined) {
 			if (length < min || length > max) {
 				msgWrap.text("长度应在" + min + "-" + max + "之间");
 				input.focus();
				return false;
 			} else {
 				return true;
 			}
 		} else if (min === undefined) {
			if (length > max) {
				msgWrap.text("长度至多为" + max);
				input.focus();
				return false;
			} else {
				return true;
			}
		} else {
			if (length < min) {
				msgWrap.text("长度至少为" + min);
				input.focus();
				return false;
			} else {
				return true;
			}
		}
 	};

 	function checkRegExp(input, msgWrap, msg, regExp) {
 		var reg = typeof regExp === "string" ? validRegExp[regExp] : regExp,
 			errMsg = msg !== undefined && msg.errorMsg !== undefined ? msg.errorMsg : Message.errorMsg,
 			corMsg = msg !== undefined && msg.correctMsg !== undefined ? msg.correctMsg : Message.correctMsg;

 		if (!reg.test(input.val())) {
 			msgWrap.text(errMsg);
			input.focus();
			return false;
 		} else {
 			msgWrap.text(corMsg);
			return true;
 		}

 		// return false;
 	};

 })(jQuery);