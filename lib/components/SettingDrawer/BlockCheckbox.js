'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _icons = require('@ant-design/icons');

var _antd = require('antd');

var _index = require('./index.less');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BlockChecbox = function BlockChecbox(_ref) {
  var value = _ref.value,
      onChange = _ref.onChange,
      list = _ref.list;
  return _react2.default.createElement(
    'div',
    { className: _index2.default.blockChecbox, key: value },
    list.map(function (item) {
      return _react2.default.createElement(
        _antd.Tooltip,
        { title: item.title, key: item.key },
        _react2.default.createElement(
          'div',
          { className: _index2.default.item, onClick: function onClick() {
              return onChange(item.key);
            } },
          _react2.default.createElement('img', { src: item.url, alt: item.key }),
          _react2.default.createElement(
            'div',
            {
              className: _index2.default.selectIcon,
              style: {
                display: value === item.key ? 'block' : 'none'
              }
            },
            _react2.default.createElement(_icons.CheckOutlined, null)
          )
        )
      );
    })
  );
};

exports.default = BlockChecbox;