'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bip = require('bip39');

var _bip2 = _interopRequireDefault(_bip);

var _bitcoinjsLib = require('bitcoinjs-lib');

var _bitcoinjsLib2 = _interopRequireDefault(_bitcoinjsLib);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ImportPrivateKey = function () {
  function ImportPrivateKey() {
    _classCallCheck(this, ImportPrivateKey);
  }

  _createClass(ImportPrivateKey, [{
    key: 'importFromMnemonic',
    value: function importFromMnemonic(mnemonic, path) {

      var seed = _bip2.default.mnemonicToSeed(mnemonic);
      var hdNode = _bitcoinjsLib2.default.HDNode.fromSeedHex(seed, _bitcoinjsLib2.default.networks.testnet);

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.getPathComponents(path)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var component = _step.value;

          if (this.isHardened(component)) {
            hdNode = hdNode.deriveHardened(this.getComponent(component));
          } else {
            hdNode = hdNode.derive(this.getComponent(component));
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return hdNode.keyPair;
    }
  }, {
    key: 'getPathComponents',
    value: function getPathComponents(path) {
      if (path[0] !== 'm') {
        throw new Error('Key specification should start with \'m\'');
      }
      var ar = path.split('/');
      return ar.slice(1, ar.length);
    }
  }, {
    key: 'isHardened',
    value: function isHardened(component) {
      return component[component.length - 1] === '\'';
    }
  }, {
    key: 'getComponent',
    value: function getComponent(component) {
      if (this.isHardened(component)) {
        return parseInt(component.slice(0, component.length - 1), 10);
      }
      return parseInt(component, 10);
    }
  }]);

  return ImportPrivateKey;
}();

exports.default = ImportPrivateKey;