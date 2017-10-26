'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getBlockchainClient;

var _blockcypher = require('blockcypher');

var _blockcypher2 = _interopRequireDefault(_blockcypher);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getBlockchainClient() {
  return new _blockcypher2.default('btc', 'test3', process.env.BLOCKCYPHER_TOKEN || '539e6971dd0342ba988e3e4bc609c809');
}