"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _config = require("./config");

var _Exceptions = require("./concerns/Exceptions");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Payment = /*#__PURE__*/function () {
  function Payment() {
    _classCallCheck(this, Payment);
  }

  _createClass(Payment, null, [{
    key: "onCredit",
    value: function () {
      var _onCredit = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(params) {
        var _yield$request$post, data;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _config.request.post('/v1/payments/credit', params);

              case 3:
                _yield$request$post = _context.sent;
                data = _yield$request$post.data;
                return _context.abrupt("return", data);

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](0);
                throw (0, _Exceptions.handleError)(_context.t0);

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 8]]);
      }));

      function onCredit(_x) {
        return _onCredit.apply(this, arguments);
      }

      return onCredit;
    }()
  }, {
    key: "cancelCredit",
    value: function () {
      var _cancelCredit = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(paymentId) {
        var _yield$request$post2, data;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return _config.request.post("/v1/payments/credit/".concat(paymentId, "/cancel"));

              case 3:
                _yield$request$post2 = _context2.sent;
                data = _yield$request$post2.data;
                return _context2.abrupt("return", data.status.toLowerCase() == 'canceled');

              case 8:
                _context2.prev = 8;
                _context2.t0 = _context2["catch"](0);
                throw (0, _Exceptions.handleError)(_context2.t0);

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 8]]);
      }));

      function cancelCredit(_x2) {
        return _cancelCredit.apply(this, arguments);
      }

      return cancelCredit;
    }()
  }, {
    key: "cancelRequestOnCredit",
    value: function () {
      var _cancelRequestOnCredit = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(paymentId, cancelAmount, cancelCustomKey) {
        var params, _yield$request$post3, data;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                params = {
                  paymentId: paymentId,
                  cancelAmount: cancelAmount,
                  cancelCustomKey: cancelCustomKey
                };
                _context3.next = 4;
                return _config.request.post('/v1/payments/cancel/request', params);

              case 4:
                _yield$request$post3 = _context3.sent;
                data = _yield$request$post3.data;
                return _context3.abrupt("return", data.status.toLowerCase() == 'accepted');

              case 9:
                _context3.prev = 9;
                _context3.t0 = _context3["catch"](0);
                throw (0, _Exceptions.handleError)(_context3.t0);

              case 12:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 9]]);
      }));

      function cancelRequestOnCredit(_x3, _x4, _x5) {
        return _cancelRequestOnCredit.apply(this, arguments);
      }

      return cancelRequestOnCredit;
    }()
  }]);

  return Payment;
}();

exports["default"] = Payment;