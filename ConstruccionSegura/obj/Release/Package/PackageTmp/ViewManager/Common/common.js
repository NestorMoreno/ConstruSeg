var BaseObjects = function () { };
if (!String.prototype.supplant) {
    String.prototype.supplant = function (o) {
        return this.replace(/{([^{}]*)}/g,
            function (a, b) {
                var r = o[b];
                return typeof r === 'string' || typeof r === 'number' || typeof r === 'boolean' ? r : a;
            }
        );
    };
};

var commonFunctions = {
    showLoading: function () {
        $(".overlay").show();
    },
    hideLoading: function () {
        $(".overlay").hide();
    },
    showLoadingPartial: function (element) {
        element.removeClass('hide');
    },
    hideLoadingPartial: function (element) {
        element.addClass('hide');
    }
}

var TextResources = {
    'Texto': ''
};

var Enums = {
    RegisterState: RegisterState = { Deactive: 0, Active: 1, Inactive: 2 },
};

$(function () {
    
});