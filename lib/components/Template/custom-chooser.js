'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

var _lov = require('components/common/lov');

var _lov2 = _interopRequireDefault(_lov);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RadioGroup = _antd.Radio.Group;

var CustomChooser = function (_Component) {
  _inherits(CustomChooser, _Component);

  function CustomChooser(props) {
    _classCallCheck(this, CustomChooser);

    var _this = _possibleConstructorReturn(this, (CustomChooser.__proto__ || Object.getPrototypeOf(CustomChooser)).call(this, props));

    _this.radioChange = function (e) {
      var _this$props$value = _this.props.value,
          value = _this$props$value === undefined ? {} : _this$props$value;

      value.radioValue = e.target.value;
      value.chooserValue = [];
      _this.props.onChange && _this.props.onChange(value);
    };

    _this.chooserChange = function (values) {
      var _this$props$value2 = _this.props.value,
          value = _this$props$value2 === undefined ? {} : _this$props$value2;

      value.chooserValue = values || [];
      _this.props.onChange && _this.props.onChange(value);
    };

    _this.state = {
      isAll: true
    };
    return _this;
  }

  _createClass(CustomChooser, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          RadioGroup,
          {
            onChange: this.radioChange,
            value: this.props.value ? this.props.value.radioValue : true,
            className: 'custom-chooser-wrapper ' + (this.props.className || ''),
            disabled: this.props.disabled ? this.props.disabled : false,
            style: { marginBottom: 12 }
          },
          _react2.default.createElement(
            _antd.Radio,
            { value: true },
            this.props.allText ? this.props.allText : '全部类型'
          ),
          _react2.default.createElement(
            _antd.Radio,
            { value: false },
            this.props.someText ? this.props.someText : '部分类型'
          )
        ),
        _react2.default.createElement(_lov2.default, {
          code: this.props.type,
          single: !!this.props.single,
          placeholder: this.$t('common.please.select'),
          requestBody: this.props.requestBody,
          method: this.props.method,
          labelKey: this.props.labelKey,
          valueKey: this.props.valueKey,
          disabled: this.props.value ? this.props.value.radioValue : true,
          onChange: this.chooserChange,
          selectorItem: this.props.selectorItem,
          value: this.props.value ? this.props.value.chooserValue : [],
          listExtraParams: this.props.params,
          showNumber: true,
          showDetail: this.props.showDetail,
          allText: this.props.allText,
          customChooserTextValue: this.props.value && this.props.value.radioValue,
          lovType: 'chooser'
        })
      );
    }
  }]);

  return CustomChooser;
}(_react.Component);

exports.default = CustomChooser;