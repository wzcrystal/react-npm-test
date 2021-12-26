'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _compatible = require('@ant-design/compatible');

var _icons = require('@ant-design/icons');

var _antd = require('antd');

var _utils = require('@/utils/utils');

var _reactCopyToClipboard = require('react-copy-to-clipboard');

var _dva = require('dva');

var _omit = require('omit.js');

var _omit2 = _interopRequireDefault(_omit);

var _index = require('./index.less');

var _index2 = _interopRequireDefault(_index);

var _ThemeColor = require('./ThemeColor');

var _ThemeColor2 = _interopRequireDefault(_ThemeColor);

var _BlockCheckbox = require('./BlockCheckbox');

var _BlockCheckbox2 = _interopRequireDefault(_BlockCheckbox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Option = _antd.Select.Option;


var Body = function Body(_ref) {
  var children = _ref.children,
      title = _ref.title,
      style = _ref.style;
  return _react2.default.createElement(
    'div',
    {
      style: _extends({}, style, {
        marginBottom: 24
      })
    },
    _react2.default.createElement(
      'h3',
      { className: _index2.default.title },
      title
    ),
    children
  );
};

var SettingDrawer = (_dec = (0, _dva.connect)(function (_ref2) {
  var setting = _ref2.setting;
  return { setting: setting };
}), _dec(_class = function (_PureComponent) {
  _inherits(SettingDrawer, _PureComponent);

  function SettingDrawer() {
    var _ref3;

    var _temp, _this, _ret;

    _classCallCheck(this, SettingDrawer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref3 = SettingDrawer.__proto__ || Object.getPrototypeOf(SettingDrawer)).call.apply(_ref3, [this].concat(args))), _this), _this.state = {
      collapse: false
    }, _this.getLayoutSetting = function () {
      var _this$props$setting = _this.props.setting,
          contentWidth = _this$props$setting.contentWidth,
          fixedHeader = _this$props$setting.fixedHeader,
          layout = _this$props$setting.layout,
          autoHideHeader = _this$props$setting.autoHideHeader,
          fixSiderbar = _this$props$setting.fixSiderbar;

      return [{
        title: (0, _utils.messages)({ id: 'app.setting.content-width' }),
        action: _react2.default.createElement(
          _antd.Select,
          {
            value: contentWidth,
            size: 'small',
            onSelect: function onSelect(value) {
              return _this.changeSetting('contentWidth', value);
            },
            style: { width: 80 }
          },
          layout === 'sidemenu' ? null : _react2.default.createElement(
            Option,
            { value: 'Fixed' },
            (0, _utils.messages)({ id: 'app.setting.content-width.fixed' })
          ),
          _react2.default.createElement(
            Option,
            { value: 'Fluid' },
            (0, _utils.messages)({ id: 'app.setting.content-width.fluid' })
          )
        )
      }, {
        title: (0, _utils.messages)({ id: 'app.setting.fixedheader' }),
        action: _react2.default.createElement(_antd.Switch, {
          size: 'small',
          checked: !!fixedHeader,
          onChange: function onChange(checked) {
            return _this.changeSetting('fixedHeader', checked);
          }
        })
      }, {
        title: (0, _utils.messages)({ id: 'app.setting.hideheader' }),
        disabled: !fixedHeader,
        disabledReason: (0, _utils.messages)({ id: 'app.setting.hideheader.hint' }),
        action: _react2.default.createElement(_antd.Switch, {
          size: 'small',
          checked: !!autoHideHeader,
          onChange: function onChange(checked) {
            return _this.changeSetting('autoHideHeader', checked);
          }
        })
      }, {
        title: (0, _utils.messages)({ id: 'app.setting.fixedsidebar' }),
        disabled: layout === 'topmenu',
        disabledReason: (0, _utils.messages)({ id: 'app.setting.fixedsidebar.hint' }),
        action: _react2.default.createElement(_antd.Switch, {
          size: 'small',
          checked: !!fixSiderbar,
          onChange: function onChange(checked) {
            return _this.changeSetting('fixSiderbar', checked);
          }
        })
      }];
    }, _this.changeSetting = function (key, value) {
      var setting = _this.props.setting;

      var nextState = _extends({}, setting);
      nextState[key] = value;
      if (key === 'layout') {
        nextState.contentWidth = value === 'topmenu' ? 'Fixed' : 'Fluid';
      } else if (key === 'fixedHeader' && !value) {
        nextState.autoHideHeader = false;
      }
      _this.setState(nextState, function () {
        var dispatch = _this.props.dispatch;

        dispatch({
          type: 'setting/changeSetting',
          payload: _this.state
        });
      });
    }, _this.togglerContent = function () {
      var collapse = _this.state.collapse;

      _this.setState({ collapse: !collapse });
    }, _this.renderLayoutSettingItem = function (item) {
      var action = _react2.default.cloneElement(item.action, {
        disabled: item.disabled
      });
      return _react2.default.createElement(
        _antd.Tooltip,
        { title: item.disabled ? item.disabledReason : '', placement: 'left' },
        _react2.default.createElement(
          _antd.List.Item,
          { actions: [action] },
          _react2.default.createElement(
            'span',
            { style: { opacity: item.disabled ? '0.5' : '' } },
            item.title
          )
        )
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(SettingDrawer, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var setting = this.props.setting;
      var navTheme = setting.navTheme,
          primaryColor = setting.primaryColor,
          layout = setting.layout,
          colorWeak = setting.colorWeak;
      var collapse = this.state.collapse;

      return _react2.default.createElement(
        _antd.Drawer,
        {
          visible: collapse,
          width: 300,
          onClose: this.togglerContent,
          placement: 'right',
          handler: _react2.default.createElement(
            'div',
            { className: _index2.default.handle },
            _react2.default.createElement(_compatible.Icon, {
              type: collapse ? 'close' : 'setting',
              style: {
                color: '#fff',
                fontSize: 20
              }
            })
          ),
          onHandleClick: this.togglerContent,
          style: {
            zIndex: 999
          }
        },
        _react2.default.createElement(
          'div',
          { className: _index2.default.content },
          _react2.default.createElement(
            Body,
            { title: (0, _utils.messages)({ id: 'app.setting.pagestyle' }) },
            _react2.default.createElement(_BlockCheckbox2.default, {
              list: [{
                key: 'dark',
                url: 'https://gw.alipayobjects.com/zos/rmsportal/LCkqqYNmvBEbokSDscrm.svg',
                title: (0, _utils.messages)({ id: 'app.setting.pagestyle.dark' })
              }, {
                key: 'light',
                url: 'https://gw.alipayobjects.com/zos/rmsportal/jpRkZQMyYRryryPNtyIC.svg',
                title: (0, _utils.messages)({ id: 'app.setting.pagestyle.light' })
              }],
              value: navTheme,
              onChange: function onChange(value) {
                return _this2.changeSetting('navTheme', value);
              }
            })
          ),
          _react2.default.createElement(_ThemeColor2.default, {
            title: (0, _utils.messages)({ id: 'app.setting.themecolor' }),
            value: primaryColor,
            onChange: function onChange(color) {
              return _this2.changeSetting('primaryColor', color);
            }
          }),
          _react2.default.createElement(_antd.Divider, null),
          _react2.default.createElement(
            Body,
            { title: (0, _utils.messages)({ id: 'app.setting.navigationmode' }) },
            _react2.default.createElement(_BlockCheckbox2.default, {
              list: [{
                key: 'sidemenu',
                url: 'https://gw.alipayobjects.com/zos/rmsportal/JopDzEhOqwOjeNTXkoje.svg',
                title: (0, _utils.messages)({ id: 'app.setting.sidemenu' })
              }, {
                key: 'topmenu',
                url: 'https://gw.alipayobjects.com/zos/rmsportal/KDNDBbriJhLwuqMoxcAr.svg',
                title: (0, _utils.messages)({ id: 'app.setting.topmenu' })
              }],
              value: layout,
              onChange: function onChange(value) {
                return _this2.changeSetting('layout', value);
              }
            })
          ),
          _react2.default.createElement(_antd.List, {
            split: false,
            dataSource: this.getLayoutSetting(),
            renderItem: this.renderLayoutSettingItem
          }),
          _react2.default.createElement(_antd.Divider, null),
          _react2.default.createElement(
            Body,
            { title: (0, _utils.messages)({ id: 'app.setting.othersettings' }) },
            _react2.default.createElement(
              _antd.List.Item,
              {
                actions: [_react2.default.createElement(_antd.Switch, {
                  size: 'small',
                  checked: !!colorWeak,
                  onChange: function onChange(checked) {
                    return _this2.changeSetting('colorWeak', checked);
                  }
                })]
              },
              (0, _utils.messages)({ id: 'app.setting.weakmode' })
            )
          ),
          _react2.default.createElement(_antd.Divider, null),
          _react2.default.createElement(
            _reactCopyToClipboard.CopyToClipboard,
            {
              text: JSON.stringify((0, _omit2.default)(setting, ['colorWeak']), null, 2),
              onCopy: function onCopy() {
                return _antd.message.success((0, _utils.messages)({ id: 'app.setting.copyinfo' }));
              }
            },
            _react2.default.createElement(
              _antd.Button,
              { block: true, icon: _react2.default.createElement(_icons.CopyOutlined, null) },
              (0, _utils.messages)({ id: 'app.setting.copy' })
            )
          ),
          _react2.default.createElement(_antd.Alert, {
            type: 'warning',
            className: _index2.default.productionHint,
            message: _react2.default.createElement(
              'div',
              null,
              (0, _utils.messages)({ id: 'app.setting.production.hint' }),
              ' ',
              _react2.default.createElement(
                'a',
                {
                  href: 'https://u.ant.design/pro-v2-default-settings',
                  target: '_blank',
                  rel: 'noopener noreferrer'
                },
                'src/defaultSettings.js'
              )
            )
          })
        )
      );
    }
  }]);

  return SettingDrawer;
}(_react.PureComponent)) || _class);
exports.default = SettingDrawer;