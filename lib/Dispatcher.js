(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", 'flux'], factory);
    }
})(function (require, exports) {
    var flux_1 = require('flux');
    var WelpDispatcher = new flux_1.Dispatcher();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = WelpDispatcher;
});
//# sourceMappingURL=Dispatcher.js.map