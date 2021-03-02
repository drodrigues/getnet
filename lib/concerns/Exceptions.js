"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleError = exports.PaymentDeniedError = exports.NotFoundError = exports.UnauthorizedError = exports.InvalidRequest = exports.GenericError = void 0;

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var BaseError = /*#__PURE__*/function (_Error) {
  _inherits(BaseError, _Error);

  var _super = _createSuper(BaseError);

  function BaseError(details) {
    _classCallCheck(this, BaseError);

    var messages = details === null || details === void 0 ? void 0 : details.map(function (e) {
      return e.descriptionDetail;
    }).flat();
    return _super.call(this, messages);
  }

  return BaseError;
}( /*#__PURE__*/_wrapNativeSuper(Error));

var GenericError = /*#__PURE__*/function (_BaseError) {
  _inherits(GenericError, _BaseError);

  var _super2 = _createSuper(GenericError);

  function GenericError(details) {
    _classCallCheck(this, GenericError);

    return _super2.call(this, details);
  }

  _createClass(GenericError, [{
    key: "httpStatus",
    get: function get() {
      return 500;
    }
  }]);

  return GenericError;
}(BaseError);

exports.GenericError = GenericError;

var InvalidRequest = /*#__PURE__*/function (_BaseError2) {
  _inherits(InvalidRequest, _BaseError2);

  var _super3 = _createSuper(InvalidRequest);

  function InvalidRequest(details) {
    _classCallCheck(this, InvalidRequest);

    return _super3.call(this, details);
  }

  _createClass(InvalidRequest, [{
    key: "httpStatus",
    get: function get() {
      return 400;
    }
  }]);

  return InvalidRequest;
}(BaseError);

exports.InvalidRequest = InvalidRequest;

var UnauthorizedError = /*#__PURE__*/function (_BaseError3) {
  _inherits(UnauthorizedError, _BaseError3);

  var _super4 = _createSuper(UnauthorizedError);

  function UnauthorizedError(details) {
    _classCallCheck(this, UnauthorizedError);

    return _super4.call(this, details);
  }

  _createClass(UnauthorizedError, [{
    key: "httpStatus",
    get: function get() {
      return 401;
    }
  }]);

  return UnauthorizedError;
}(BaseError);

exports.UnauthorizedError = UnauthorizedError;

var NotFoundError = /*#__PURE__*/function (_BaseError4) {
  _inherits(NotFoundError, _BaseError4);

  var _super5 = _createSuper(NotFoundError);

  function NotFoundError(details) {
    _classCallCheck(this, NotFoundError);

    return _super5.call(this, details);
  }

  _createClass(NotFoundError, [{
    key: "httpStatus",
    get: function get() {
      return 404;
    }
  }]);

  return NotFoundError;
}(BaseError);

exports.NotFoundError = NotFoundError;

var PaymentDeniedError = /*#__PURE__*/function (_BaseError5) {
  _inherits(PaymentDeniedError, _BaseError5);

  var _super6 = _createSuper(PaymentDeniedError);

  function PaymentDeniedError(details) {
    _classCallCheck(this, PaymentDeniedError);

    return _super6.call(this, details);
  }

  _createClass(PaymentDeniedError, [{
    key: "httpStatus",
    get: function get() {
      return 402;
    }
  }]);

  return PaymentDeniedError;
}(BaseError);

exports.PaymentDeniedError = PaymentDeniedError;

var handleError = function handleError(error) {
  var response = error.response;

  if (response) {
    switch (response.status) {
      case 400:
        return new InvalidRequest(response.data.details);
        break;

      case 401:
        return new UnauthorizedError(response.data.details);
        break;

      case 402:
        return new PaymentDeniedError(response.data.details);
        break;

      case 404:
        return new NotFoundError(response.data.details);
        break;

      default:
        return new GenericError(response.data.details);
        break;
    }
  } else {
    return error;
  }
};

exports.handleError = handleError;