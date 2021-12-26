'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _desc, _value, _class;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _umi = require('umi');

var _debounce = require('lodash-decorators/debounce');

var _debounce2 = _interopRequireDefault(_debounce);

var _index = require('./index.less');

var _index2 = _interopRequireDefault(_index);

var _RightContent = require('./RightContent');

var _RightContent2 = _interopRequireDefault(_RightContent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

var GlobalHeader = (_dec = (0, _debounce2.default)(600), (_class = function (_PureComponent) {
  _inherits(GlobalHeader, _PureComponent);

  function GlobalHeader() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, GlobalHeader);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = GlobalHeader.__proto__ || Object.getPrototypeOf(GlobalHeader)).call.apply(_ref, [this].concat(args))), _this), _this.toggle = function () {
      var _this$props = _this.props,
          collapsed = _this$props.collapsed,
          onCollapse = _this$props.onCollapse;

      onCollapse(!collapsed);
      _this.triggerResizeEvent();
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(GlobalHeader, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.triggerResizeEvent.cancel();
    }
    /* eslint-disable*/

  }, {
    key: 'triggerResizeEvent',
    value: function triggerResizeEvent() {
      // eslint-disable-line
      var event = document.createEvent('HTMLEvents');
      event.initEvent('resize', true, false);
      window.dispatchEvent(event);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          collapsed = _props.collapsed,
          isMobile = _props.isMobile,
          logo = _props.logo;

      return _react2.default.createElement(
        'div',
        { className: _index2.default.header },
        isMobile && _react2.default.createElement(
          _umi.Link,
          { to: '/', className: _index2.default.logo, key: 'logo' },
          _react2.default.createElement('img', { src: logo, alt: 'logo', width: '32' })
        ),
        _react2.default.createElement(_RightContent2.default, this.props)
      );
    }
  }]);

  return GlobalHeader;
}(_react.PureComponent), (_applyDecoratedDescriptor(_class.prototype, 'triggerResizeEvent', [_dec], Object.getOwnPropertyDescriptor(_class.prototype, 'triggerResizeEvent'), _class.prototype)), _class));
exports.default = GlobalHeader;