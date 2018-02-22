'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = getOpReturn;

var _lodash = require('lodash');

function getOpReturn(tx) {
    var res = (0, _lodash.filter)((0, _lodash.map)(tx.outputs, function (out) {
        if ((0, _lodash.has)(out, 'data_hex')) {
            return {
                hex: out.data_hex,
                string: out.data_string
            };
        }
    }), _lodash.isObject)[0];
    return res;
}