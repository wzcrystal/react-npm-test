'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('@/utils/utils');

var _umi = require('umi');

var _icons = require('@ant-design/icons');

var _antd = require('antd');

var _dva = require('dva');

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

var _httpFetch = require('share/httpFetch');

var _httpFetch2 = _interopRequireDefault(_httpFetch);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _HeaderDropdown = require('../HeaderDropdown');

var _HeaderDropdown2 = _interopRequireDefault(_HeaderDropdown);

var _index = require('./index.less');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SelectLang = (_dec = (0, _dva.connect)(function (_ref) {
  var languages = _ref.languages;
  return { languages: languages };
}), _dec(_class = function (_PureComponent) {
  _inherits(SelectLang, _PureComponent);

  function SelectLang() {
    var _ref2;

    var _temp, _this, _ret;

    _classCallCheck(this, SelectLang);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref2 = SelectLang.__proto__ || Object.getPrototypeOf(SelectLang)).call.apply(_ref2, [this].concat(args))), _this), _this.changeLang = function (_ref3) {
      var value = _ref3.key;

      _antd.Modal.confirm({
        title: _this.$t("base.sure.to.switch.the.locale?"),
        content: _this.$t("base.switch.the.locale.tip"),
        onOk: function onOk() {
          var _this$props = _this.props,
              dispatch = _this$props.dispatch,
              languages = _this$props.languages;


          var hideMessage = _antd.message.loading(_this.$t("base.language.switching.and.please.wait"), 0);
          // dispatch({
          //   type: 'languages/selectLanguage',
          //   payload: { languages: [], local: value },
          // });
          // eslint-disable-next-line prefer-template
          window.localStorage.removeItem('message_cache');
          _httpFetch2.default.post(_config2.default.authUrl + '/api/user/language?lang=' + value).then(function () {
            hideMessage();
            window.location.reload();
          });
        }
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(SelectLang, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          className = _props.className,
          _props$languages = _props.languages,
          languageType = _props$languages.languageType,
          local = _props$languages.local;

      var languageIcons = {
        'zh_cn': '🇨🇳',
        'zh_tw': '🇭🇰',
        'en_us': '🇬🇧'
      };
      var langMenu = _react2.default.createElement(
        _antd.Menu,
        { className: _index2.default.menu, selectedKeys: [local], onClick: this.changeLang },
        languageType.map(function (locale) {
          return _react2.default.createElement(
            _antd.Menu.Item,
            { key: locale.language },
            _react2.default.createElement(
              'span',
              { role: 'img', 'aria-label': locale.languageName },
              languageIcons[locale.language]
            ),
            ' ',
            locale.languageName
          );
        })
      );
      return _react2.default.createElement(
        _HeaderDropdown2.default,
        { overlay: langMenu, placement: 'bottomRight' },
        _react2.default.createElement(
          'span',
          { style: { lineHeight: '40px' }, className: (0, _classnames2.default)(_index2.default.dropDown, className) },
          _react2.default.createElement(_icons.GlobalOutlined, { title: (0, _utils.messages)({ id: 'navBar.lang' }) })
        )
      );
    }
  }]);

  return SelectLang;
}(_react.PureComponent)) || _class);
exports.default = SelectLang;