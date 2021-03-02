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

var Card = /*#__PURE__*/function () {
  function Card() {
    _classCallCheck(this, Card);
  }

  _createClass(Card, null, [{
    key: "asToken",
    value: function () {
      var _asToken = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var params,
            _yield$request$post,
            data,
            _args = arguments;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                params = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
                _context.prev = 1;
                _context.next = 4;
                return _config.request.post('/v1/tokens/card', params);

              case 4:
                _yield$request$post = _context.sent;
                data = _yield$request$post.data;
                return _context.abrupt("return", data.numberToken);

              case 9:
                _context.prev = 9;
                _context.t0 = _context["catch"](1);
                throw (0, _Exceptions.handleError)(_context.t0);

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 9]]);
      }));

      function asToken() {
        return _asToken.apply(this, arguments);
      }

      return asToken;
    }()
  }, {
    key: "verification",
    value: function () {
      var _verification = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var params,
            _yield$request$post2,
            data,
            _args2 = arguments;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                params = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : {};
                _context2.prev = 1;
                _context2.next = 4;
                return _config.request.post('/v1/cards/verification', params);

              case 4:
                _yield$request$post2 = _context2.sent;
                data = _yield$request$post2.data;
                return _context2.abrupt("return", data);

              case 9:
                _context2.prev = 9;
                _context2.t0 = _context2["catch"](1);
                throw (0, _Exceptions.handleError)(_context2.t0);

              case 12:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[1, 9]]);
      }));

      function verification() {
        return _verification.apply(this, arguments);
      }

      return verification;
    }()
  }]);

  return Card;
}();

exports["default"] = Card;