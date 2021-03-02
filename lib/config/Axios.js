"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.authInstance = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _http = _interopRequireDefault(require("axios/lib/adapters/http"));

var _camelcaseKeys = _interopRequireDefault(require("camelcase-keys"));

var _snakecaseKeys = _interopRequireDefault(require("snakecase-keys"));

var _qs = _interopRequireDefault(require("qs"));

var _Getnet = _interopRequireDefault(require("./Getnet"));

var _Client = _interopRequireDefault(require("./Client"));

var _Exceptions = require("./../concerns/Exceptions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var client = new _Client["default"]().getInstance();

var authInstance = _axios["default"].create({
  adapter: _http["default"]
});

exports.authInstance = authInstance;

var instance = _axios["default"].create({
  adapter: _http["default"]
});

var getAccessToken = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var params, headers, _yield$authInstance$p, data;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            params = {
              scope: 'oob',
              grantType: 'client_credentials'
            };
            headers = {
              'Authorization': "Basic ".concat(client.basicAuthtoken),
              'content-type': 'application/x-www-form-urlencoded'
            };
            _context.prev = 2;
            _context.next = 5;
            return authInstance.post('/auth/oauth/v2/token', params, {
              headers: headers
            });

          case 5:
            _yield$authInstance$p = _context.sent;
            data = _yield$authInstance$p.data;
            return _context.abrupt("return", data.accessToken);

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](2);
            return _context.abrupt("return", null);

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 10]]);
  }));

  return function getAccessToken() {
    return _ref.apply(this, arguments);
  };
}();

var responseCamelcaseInterceptor = function responseCamelcaseInterceptor(response) {
  if (response.data) {
    response.data = (0, _camelcaseKeys["default"])(response.data, {
      deep: true
    });
  }

  return response;
};

var requestInterceptor = function requestInterceptor(config) {
  if (config.data) {
    config.data = (0, _snakecaseKeys["default"])(config.data, {
      deep: true
    });

    if (config.headers['content-type'] == 'application/x-www-form-urlencoded') {
      config.data = _qs["default"].stringify(config.data);
    }
  }

  if (config.params) {
    config.params = (0, _snakecaseKeys["default"])(config.params, {
      deep: true
    });
  }

  config.baseURL = _Getnet["default"][client.env].endpoint;
  return config;
};

var responseErrorInterceptor = function responseErrorInterceptor(error) {
  if (error.response) {
    error.response.data = (0, _camelcaseKeys["default"])(error.response.data, {
      deep: true
    });
  }

  return Promise.reject(error);
};

authInstance.interceptors.request.use(requestInterceptor);
authInstance.interceptors.response.use(responseCamelcaseInterceptor);
instance.interceptors.response.use(responseCamelcaseInterceptor, responseErrorInterceptor);
instance.interceptors.request.use(requestInterceptor);
instance.interceptors.request.use( /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(config) {
    var sellerId, accessToken;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            sellerId = client.sellerId;
            _context2.next = 3;
            return getAccessToken();

          case 3:
            accessToken = _context2.sent;
            config.headers['seller_id'] = sellerId;
            config.headers['Authorization'] = "Bearer ".concat(accessToken);
            return _context2.abrupt("return", config);

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x) {
    return _ref2.apply(this, arguments);
  };
}());
var _default = instance;
exports["default"] = _default;