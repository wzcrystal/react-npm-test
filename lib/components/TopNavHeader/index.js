'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _umi = require('umi');

var _RightContent = require('../GlobalHeader/RightContent');

var _RightContent2 = _interopRequireDefault(_RightContent);

var _BaseMenu = require('../SiderMenu/BaseMenu');

var _BaseMenu2 = _interopRequireDefault(_BaseMenu);

var _SiderMenuUtils = require('../SiderMenu/SiderMenuUtils');

var _index = require('./index.less');

var _index2 = _interopRequireDefault(_index);

var _defaultSettings = require('../../defaultSettings');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TopNavHeader = function (_PureComponent) {
  _inherits(TopNavHeader, _PureComponent);

  function TopNavHeader() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, TopNavHeader);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = TopNavHeader.__proto__ || Object.getPrototypeOf(TopNavHeader)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      maxWidth: undefined
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(TopNavHeader, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          theme = _props.theme,
          contentWidth = _props.contentWidth,
          menuData = _props.menuData,
          logo = _props.logo;
      var maxWidth = this.state.maxWidth;

      var flatMenuKeys = (0, _SiderMenuUtils.getFlatMenuKeys)(menuData);
      return _react2.default.createElement(
        'div',
        { className: _index2.default.head + ' ' + (theme === 'light' ? _index2.default.light : '') },
        _react2.default.createElement(
          'div',
          {
            ref: function ref(_ref2) {
              _this2.maim = _ref2;
            },
            className: _index2.default.main + ' ' + (contentWidth === 'Fixed' ? _index2.default.wide : '')
          },
          _react2.default.createElement(
            'div',
            { className: _index2.default.left },
            _react2.default.createElement(
              'div',
              { className: _index2.default.logo, key: 'logo', id: 'logo' },
              _react2.default.createElement(
                _umi.Link,
                { to: '/' },
                _react2.default.createElement('img', { src: logo, alt: 'logo' }),
                _react2.default.createElement(
                  'h1',
                  null,
                  _defaultSettings.title
                )
              )
            ),
            _react2.default.createElement(
              'div',
              {
                style: {
                  maxWidth: maxWidth
                }
              },
              _react2.default.createElement(_BaseMenu2.default, _extends({}, this.props, { flatMenuKeys: flatMenuKeys, className: _index2.default.menu }))
            )
          ),
          _react2.default.createElement(_RightContent2.default, this.props)
        )
      );
    }
  }], [{
    key: 'getDerivedStateFromProps',
    value: function getDerivedStateFromProps(props) {
      return {
        maxWidth: (props.contentWidth === 'Fixed' ? 1200 : window.innerWidth) - 280 - 165 - 40
      };
    }
  }]);

  return TopNavHeader;
}(_react.PureComponent);

exports.default = TopNavHeader;