"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.ClientConfig = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to set private field on non-instance"); } if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } return value; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to get private field on non-instance"); } if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

var _sellerId = new WeakMap();

var _clientId = new WeakMap();

var _secret = new WeakMap();

var _env = new WeakMap();

var ClientConfig = /*#__PURE__*/function () {
  function ClientConfig() {
    _classCallCheck(this, ClientConfig);

    _sellerId.set(this, {
      writable: true,
      value: null
    });

    _clientId.set(this, {
      writable: true,
      value: null
    });

    _secret.set(this, {
      writable: true,
      value: null
    });

    _env.set(this, {
      writable: true,
      value: 'production'
    });
  }

  _createClass(ClientConfig, [{
    key: "sellerId",
    get: function get() {
      return _classPrivateFieldGet(this, _sellerId);
    },
    set: function set(value) {
      _classPrivateFieldSet(this, _sellerId, value);
    }
  }, {
    key: "clientId",
    get: function get() {
      return _classPrivateFieldGet(this, _clientId);
    },
    set: function set(value) {
      _classPrivateFieldSet(this, _clientId, value);
    }
  }, {
    key: "secret",
    get: function get() {
      return _classPrivateFieldGet(this, _secret);
    },
    set: function set(value) {
      _classPrivateFieldSet(this, _secret, value);
    }
  }, {
    key: "env",
    get: function get() {
      return _classPrivateFieldGet(this, _env);
    },
    set: function set(value) {
      _classPrivateFieldSet(this, _env, value);
    }
  }, {
    key: "basicAuthtoken",
    get: function get() {
      var clientSecret = "".concat(_classPrivateFieldGet(this, _clientId), ":").concat(_classPrivateFieldGet(this, _secret));
      var buffer = new Buffer.from(clientSecret);
      return buffer.toString("base64");
    }
  }]);

  return ClientConfig;
}();

exports.ClientConfig = ClientConfig;

var Singleton = /*#__PURE__*/function () {
  function Singleton() {
    _classCallCheck(this, Singleton);

    if (!Singleton.instance) {
      Singleton.instance = new ClientConfig();
    }
  }

  _createClass(Singleton, [{
    key: "getInstance",
    value: function getInstance() {
      return Singleton.instance;
    }
  }]);

  return Singleton;
}();

exports["default"] = Singleton;