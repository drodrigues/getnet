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

var Safebox = /*#__PURE__*/function () {
  function Safebox() {
    _classCallCheck(this, Safebox);
  }

  _createClass(Safebox, null, [{
    key: "add",
    value: function () {
      var _add = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(params) {
        var _yield$request$post, data;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _config.request.post('/v1/cards', params);

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

      function add(_x) {
        return _add.apply(this, arguments);
      }

      return add;
    }()
  }, {
    key: "findAllByCustomerId",
    value: function () {
      var _findAllByCustomerId = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(customerId) {
        var status,
            params,
            _yield$request$get,
            data,
            _args2 = arguments;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                status = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : 'all';
                _context2.prev = 1;
                params = {
                  customerId: customerId,
                  status: status
                };
                _context2.next = 5;
                return _config.request.get('/v1/cards', {
                  params: params
                });

              case 5:
                _yield$request$get = _context2.sent;
                data = _yield$request$get.data;
                return _context2.abrupt("return", data.cards);

              case 10:
                _context2.prev = 10;
                _context2.t0 = _context2["catch"](1);
                throw (0, _Exceptions.handleError)(_context2.t0);

              case 13:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[1, 10]]);
      }));

      function findAllByCustomerId(_x2) {
        return _findAllByCustomerId.apply(this, arguments);
      }

      return findAllByCustomerId;
    }()
  }, {
    key: "findOne",
    value: function () {
      var _findOne = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(cardId) {
        var _yield$request$get2, data;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return _config.request.get("/v1/cards/".concat(cardId));

              case 3:
                _yield$request$get2 = _context3.sent;
                data = _yield$request$get2.data;
                return _context3.abrupt("return", data);

              case 8:
                _context3.prev = 8;
                _context3.t0 = _context3["catch"](0);
                throw (0, _Exceptions.handleError)(_context3.t0);

              case 11:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 8]]);
      }));

      function findOne(_x3) {
        return _findOne.apply(this, arguments);
      }

      return findOne;
    }()
  }, {
    key: "remove",
    value: function () {
      var _remove = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(cardId) {
        var _yield$request$delete, data;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _context4.next = 3;
                return _config.request["delete"]("/v1/cards/".concat(cardId));

              case 3:
                _yield$request$delete = _context4.sent;
                data = _yield$request$delete.data;
                return _context4.abrupt("return", true);

              case 8:
                _context4.prev = 8;
                _context4.t0 = _context4["catch"](0);
                throw (0, _Exceptions.handleError)(_context4.t0);

              case 11:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[0, 8]]);
      }));

      function remove(_x4) {
        return _remove.apply(this, arguments);
      }

      return remove;
    }()
  }]);

  return Safebox;
}();

exports["default"] = Safebox;