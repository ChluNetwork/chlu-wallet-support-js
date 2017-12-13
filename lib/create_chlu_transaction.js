'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bitcoinjsLib = require('bitcoinjs-lib');

var _bitcoinjsLib2 = _interopRequireDefault(_bitcoinjsLib);

var _coinselect = require('coinselect');

var _coinselect2 = _interopRequireDefault(_coinselect);

var _import_private_key = require('./import_private_key');

var _import_private_key2 = _interopRequireDefault(_import_private_key);

var _get_utxos = require('./get_utxos');

var _get_utxos2 = _interopRequireDefault(_get_utxos);

var _push_tx = require('./push_tx');

var _push_tx2 = _interopRequireDefault(_push_tx);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CreateChluTransaction = function () {
  function CreateChluTransaction() {
    _classCallCheck(this, CreateChluTransaction);
  }

  _createClass(CreateChluTransaction, [{
    key: 'getImportedKey',
    value: function getImportedKey(mnemonic) {
      var keyPath = "m/44'/1'/0'/0/0";
      var importPrivateKey = new _import_private_key2.default();
      this.importedKp = importPrivateKey.importFromMnemonic(mnemonic, keyPath);
      this.feeRate = 55;
    }
  }, {
    key: 'getInputTxs',
    value: function getInputTxs(fromAddress, targets, feeRate) {
      var getter = new _get_utxos2.default();
      return getter.getFromBlockchain(fromAddress).then(function (utxos) {
        var unspents = (0, _lodash.map)(utxos.txrefs, function (tx) {
          return { txId: tx.tx_hash, vout: tx.tx_output_n, value: tx.value };
        });

        var _coinSelect = (0, _coinselect2.default)(unspents, targets, feeRate),
            inputs = _coinSelect.inputs,
            outputs = _coinSelect.outputs,
            fee = _coinSelect.fee;

        return { inputs: inputs, outputs: outputs, fee: fee };
      });
    }
  }, {
    key: 'pushTransaction',
    value: function pushTransaction(tx) {
      var pusher = new _push_tx2.default();
      return pusher.push(tx.toHex()).then(function (tx) {
        console.log(tx);
      });
    }
  }, {
    key: 'create',
    value: function create(fromAddress, toAddress, amount, changeAddress, contentHash) {
      var _this = this;

      if ((0, _lodash.isEmpty)(this.importedKp)) {
        throw new Error('No key pair specified');
      }

      changeAddress = (0, _lodash.isEmpty)(changeAddress) ? fromAddress : changeAddress;

      var targets = [{ address: toAddress, value: amount }];

      return this.getInputTxs(fromAddress, targets, this.feeRate).then(function (_ref) {
        var inputs = _ref.inputs,
            outputs = _ref.outputs,
            fees = _ref.fees;

        var txb = new _bitcoinjsLib2.default.TransactionBuilder(_bitcoinjsLib2.default.networks.testnet);

        (0, _lodash.forEach)(outputs, function (o) {
          if (!(0, _lodash.isEmpty)(o.address)) {
            txb.addOutput(o.address, o.value);
          } else {
            txb.addOutput(changeAddress, o.value);
          }
        });

        var data = Buffer.from(contentHash, 'utf8');
        var dataScript = _bitcoinjsLib2.default.script.nullData.output.encode(data);
        txb.addOutput(dataScript, 0);

        // only one input allowed for now
        txb.addInput(inputs[0].txId, inputs[0].vout);
        txb.sign(0, _this.importedKp);
        return txb.build();
      });
    }
  }]);

  return CreateChluTransaction;
}();

exports.default = CreateChluTransaction;