'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _compatible = require('@ant-design/compatible');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _index = require('./index.less');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var NumberInfo = function NumberInfo(_ref) {
  var theme = _ref.theme,
      title = _ref.title,
      subTitle = _ref.subTitle,
      total = _ref.total,
      subTotal = _ref.subTotal,
      status = _ref.status,
      suffix = _ref.suffix,
      gap = _ref.gap,
      rest = _objectWithoutProperties(_ref, ['theme', 'title', 'subTitle', 'total', 'subTotal', 'status', 'suffix', 'gap']);

  return _react2.default.createElement(
    'div',
    _extends({
      className: (0, _classnames2.default)(_index2.default.numberInfo, _defineProperty({}, _index2.default['numberInfo' + theme], theme))
    }, rest),
    title && _react2.default.createElement(
      'div',
      { className: _index2.default.numberInfoTitle, title: typeof title === 'string' ? title : '' },
      title
    ),
    subTitle && _react2.default.createElement(
      'div',
      {
        className: _index2.default.numberInfoSubTitle,
        title: typeof subTitle === 'string' ? subTitle : ''
      },
      subTitle
    ),
    _react2.default.createElement(
      'div',
      { className: _index2.default.numberInfoValue, style: gap ? { marginTop: gap } : null },
      _react2.default.createElement(
        'span',
        null,
        total,
        suffix && _react2.default.createElement(
          'em',
          { className: _index2.default.suffix },
          suffix
        )
      ),
      (status || subTotal) && _react2.default.createElement(
        'span',
        { className: _index2.default.subTotal },
        subTotal,
        status && _react2.default.createElement(_compatible.Icon, { type: 'caret-' + status })
      )
    )
  );
};

exports.default = NumberInfo;