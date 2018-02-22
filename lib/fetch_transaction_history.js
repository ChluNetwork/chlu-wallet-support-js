'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _blockchain_client = require('./blockchain_client');

var _blockchain_client2 = _interopRequireDefault(_blockchain_client);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FetchTransactionHistory = function () {
    function FetchTransactionHistory(apiKey) {
        _classCallCheck(this, FetchTransactionHistory);

        this.blockchainClient = (0, _blockchain_client2.default)(apiKey);
    }

    _createClass(FetchTransactionHistory, [{
        key: 'getFromBlockchain',
        value: function getFromBlockchain(address) {
            var _this = this;

            return new Promise(function (resolve, reject) {
                _this.blockchainClient.getAddrFull(address, {}, function (err, res) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(res.txs);
                    }
                });
            });
        }
    }]);

    return FetchTransactionHistory;
}();

exports.default = FetchTransactionHistory;