'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getBlockchainClient;

var _blockcypher = require('blockcypher');

var _blockcypher2 = _interopRequireDefault(_blockcypher);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getBlockchainClient(apiKey) {
  return new _blockcypher2.default('btc', 'test3', apiKey);
}