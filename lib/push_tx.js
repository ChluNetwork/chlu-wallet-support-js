'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _blockchain_client = require('./blockchain_client');

var _blockchain_client2 = _interopRequireDefault(_blockchain_client);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PushTx = function () {
  function PushTx() {
    _classCallCheck(this, PushTx);

    this.blockchainClient = (0, _blockchain_client2.default)();
  }

  _createClass(PushTx, [{
    key: 'push',
    value: function push(txHash) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        _this.blockchainClient.pushTX(txHash, function (err, tx) {
          if (err) {
            reject(err);
          } else {
            resolve(tx);
          }
        });
      });
    }
  }]);

  return PushTx;
}();

exports.default = PushTx;