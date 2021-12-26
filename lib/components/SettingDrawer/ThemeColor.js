'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _icons = require('@ant-design/icons');

var _antd = require('antd');

var _utils = require('@/utils/utils');

var _ThemeColor = require('./ThemeColor.less');

var _ThemeColor2 = _interopRequireDefault(_ThemeColor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Tag = function Tag(_ref) {
  var color = _ref.color,
      check = _ref.check,
      rest = _objectWithoutProperties(_ref, ['color', 'check']);

  return _react2.default.createElement(
    'div',
    _extends({}, rest, {
      style: {
        backgroundColor: color
      }
    }),
    check ? _react2.default.createElement(_icons.CheckOutlined, null) : ''
  );
};

var ThemeColor = function ThemeColor(_ref2) {
  var colors = _ref2.colors,
      title = _ref2.title,
      value = _ref2.value,
      onChange = _ref2.onChange;

  var colorList = colors;
  if (!colors) {
    colorList = [{
      key: 'dust',
      color: '#F5222D'
    }, {
      key: 'volcano',
      color: '#FA541C'
    }, {
      key: 'sunset',
      color: '#FAAD14'
    }, {
      key: 'cyan',
      color: '#13C2C2'
    }, {
      key: 'green',
      color: '#52C41A'
    }, {
      key: 'daybreak',
      color: '#1890FF'
    }, {
      key: 'geekblue',
      color: '#2F54EB'
    }, {
      key: 'purple',
      color: '#722ED1'
    }];
  }
  return _react2.default.createElement(
    'div',
    { className: _ThemeColor2.default.themeColor },
    _react2.default.createElement(
      'h3',
      { className: _ThemeColor2.default.title },
      title
    ),
    _react2.default.createElement(
      'div',
      { className: _ThemeColor2.default.content },
      colorList.map(function (_ref3) {
        var key = _ref3.key,
            color = _ref3.color;
        return _react2.default.createElement(
          _antd.Tooltip,
          { key: color, title: (0, _utils.messages)({ id: 'app.setting.themecolor.' + key }) },
          _react2.default.createElement(Tag, {
            className: _ThemeColor2.default.colorBlock,
            color: color,
            check: value === color,
            onClick: function onClick() {
              return onChange && onChange(color);
            }
          })
        );
      })
    )
  );
};

exports.default = ThemeColor;