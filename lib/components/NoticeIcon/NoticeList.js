'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _NoticeList = require('./NoticeList.less');

var _NoticeList2 = _interopRequireDefault(_NoticeList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function NoticeList(_ref) {
  var _ref$data = _ref.data,
      data = _ref$data === undefined ? [] : _ref$data,
      _onClick = _ref.onClick,
      onClear = _ref.onClear,
      title = _ref.title,
      locale = _ref.locale,
      emptyText = _ref.emptyText,
      emptyImage = _ref.emptyImage,
      _ref$onViewMore = _ref.onViewMore,
      onViewMore = _ref$onViewMore === undefined ? null : _ref$onViewMore,
      _ref$showClear = _ref.showClear,
      showClear = _ref$showClear === undefined ? true : _ref$showClear,
      _ref$showViewMore = _ref.showViewMore,
      showViewMore = _ref$showViewMore === undefined ? false : _ref$showViewMore;

  if (data.length === 0) {
    return _react2.default.createElement(
      _react2.default.Fragment,
      null,
      _react2.default.createElement(
        'div',
        { className: _NoticeList2.default.notFound },
        emptyImage ? _react2.default.createElement('img', { src: emptyImage, alt: 'not found' }) : null,
        _react2.default.createElement(
          'div',
          null,
          emptyText || locale.emptyText
        )
      ),
      _react2.default.createElement(
        'div',
        { className: _NoticeList2.default.bottomBar },
        showClear ? _react2.default.createElement(
          'div',
          { onClick: onClear },
          locale.clear,
          ' ',
          locale[title] || title
        ) : null,
        showViewMore ? _react2.default.createElement(
          'div',
          { onClick: onViewMore },
          locale.viewMore
        ) : null
      )
    );
  }
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      _antd.List,
      { className: _NoticeList2.default.list },
      data.map(function (item, i) {
        var itemCls = (0, _classnames2.default)(_NoticeList2.default.item, _defineProperty({}, _NoticeList2.default.read, item.read));
        // eslint-disable-next-line no-nested-ternary
        var leftIcon = item.avatar ? typeof item.avatar === 'string' ? _react2.default.createElement(_antd.Avatar, { className: _NoticeList2.default.avatar, src: item.avatar }) : _react2.default.createElement(
          'span',
          { className: _NoticeList2.default.iconElement },
          item.avatar
        ) : null;

        return _react2.default.createElement(
          _antd.List.Item,
          { className: itemCls, key: item.key || i, onClick: function onClick() {
              return _onClick(item);
            } },
          _react2.default.createElement(_antd.List.Item.Meta, {
            className: _NoticeList2.default.meta,
            avatar: leftIcon,
            title: _react2.default.createElement(
              'div',
              { className: _NoticeList2.default.title },
              item.title,
              _react2.default.createElement(
                'div',
                { className: _NoticeList2.default.extra },
                item.extra
              )
            ),
            description: _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement(
                'div',
                { className: _NoticeList2.default.description },
                item.description
              ),
              _react2.default.createElement(
                'div',
                { className: _NoticeList2.default.datetime },
                item.datetime
              )
            )
          })
        );
      })
    ),
    _react2.default.createElement(
      'div',
      { className: _NoticeList2.default.bottomBar },
      showClear ? _react2.default.createElement(
        'div',
        { onClick: onClear },
        locale.clear,
        ' ',
        locale[title] || title
      ) : null,
      showViewMore ? _react2.default.createElement(
        'div',
        { onClick: onViewMore },
        locale.viewMore
      ) : null
    )
  );
}
exports.default = NoticeList;