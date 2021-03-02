"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Card", {
  enumerable: true,
  get: function get() {
    return _Card["default"];
  }
});
Object.defineProperty(exports, "Safebox", {
  enumerable: true,
  get: function get() {
    return _Safebox["default"];
  }
});
Object.defineProperty(exports, "Payment", {
  enumerable: true,
  get: function get() {
    return _Payment["default"];
  }
});
exports["default"] = void 0;

require("regenerator-runtime/runtime");

var _config = require("./config");

var _Card = _interopRequireDefault(require("./Card"));

var _Safebox = _interopRequireDefault(require("./Safebox"));

var _Payment = _interopRequireDefault(require("./Payment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var client = new _config.Client().getInstance();

var config = function config(sellerId, clientId, secret) {
  client.sellerId = sellerId;
  client.clientId = clientId;
  client.secret = secret;
};

var useEnv = function useEnv(env) {
  return client.env = env;
};

var _default = {
  config: config,
  client: client,
  useEnv: useEnv
};
exports["default"] = _default;