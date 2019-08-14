// $.validator.addMethod('isPhone',function(value, element) {
//     var tel = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
//     return this.optional(element) || (tel.test(value));
// }, '手机号码不正确');

jQuery.validator.addMethod(
    "isPassWord",
    function(value, element) {
        var tel = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/;
        return this.optional(element) || tel.test(value);
    },
    "密码规则不正确"
);

jQuery.validator.addMethod(
    "mobilePhone",
    function(value, element) {
        var tel = /(^1[34578])\d{9}$/;
        return this.optional(element) || tel.test(value);
    },
    "手机号码不正确"
);

jQuery.validator.addMethod(
    "sendCode",
    function(value, element) {
        var tel = /^\d{6}$/;
        return this.optional(element) || tel.test(value);
    },
    "验证码不正确"
);
