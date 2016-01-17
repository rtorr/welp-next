(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", './Dispatcher', './Store', './Component'], factory);
    }
})(function (require, exports) {
    var Dispatcher_1 = require('./Dispatcher');
    exports.Dispatcher = Dispatcher_1.default;
    var Store_1 = require('./Store');
    exports.Store = Store_1.default;
    var Component_1 = require('./Component');
    exports.Component = Component_1.default;
});
//# sourceMappingURL=Welp.js.map