'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bitcoinjsLib = require('bitcoinjs-lib');

var _bitcoinjsLib2 = _interopRequireDefault(_bitcoinjsLib);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var VendorSetup = function () {
    function VendorSetup() {
        _classCallCheck(this, VendorSetup);
    }

    _createClass(VendorSetup, [{
        key: 'generateKeys',
        value: function generateKeys() {
            var _this = this;

            return new Promise(function (resolve, reject) {
                Promise.all([_this.generateSigningKeyPair(), _this.generateEncryptionKeyPair()]).then(function (keys) {
                    resolve({
                        signing: keys[0],
                        encryption: keys[1]
                    });
                }).catch(function (error) {
                    reject(error);
                });
            });
        }
    }, {
        key: 'generateSigningKeyPair',
        value: function generateSigningKeyPair() {
            return new Promise(function (resolve, reject) {
                var kp = _bitcoinjsLib2.default.ECPair.makeRandom();
                if (kp) {
                    resolve(kp);
                } else {
                    reject(kp);
                }
            });
        }
    }, {
        key: 'generateEncryptionKeyPair',
        value: function generateEncryptionKeyPair() {
            return new Promise(function (resolve, reject) {
                var kp = _bitcoinjsLib2.default.ECPair.makeRandom();
                if (kp) {
                    resolve(kp);
                } else {
                    reject(kp);
                }
            });
        }
    }]);

    return VendorSetup;
}();

exports.default = VendorSetup;