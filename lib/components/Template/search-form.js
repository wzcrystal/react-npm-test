'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _icons = require('@ant-design/icons');

var _compatible = require('@ant-design/compatible');

require('@ant-design/compatible/assets/index.css');

var _antd = require('antd');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _common = require('services/common');

var _common2 = _interopRequireDefault(_common);

require('./search-form.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import store from "../../index"

var FormItem = _compatible.Form.Item;

var AdvancedSearchForm = function (_React$Component) {
  _inherits(AdvancedSearchForm, _React$Component);

  function AdvancedSearchForm() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, AdvancedSearchForm);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = AdvancedSearchForm.__proto__ || Object.getPrototypeOf(AdvancedSearchForm)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      expand: false,
      options: {},
      defaultValue: {}
    }, _this.handleSearch = function (e) {
      e.preventDefault();
      _this.props.form.validateFields(function (err, values) {
        _this.props.search && _this.props.search(values);
      });
    }, _this.handleReset = function () {
      _this.props.form.resetFields();
    }, _this.toggle = function () {
      var expand = _this.state.expand;

      _this.setState({ expand: !expand });
    }, _this.clear = function () {
      _this.props.onClear && _this.props.onClear();
      _this.props.form.resetFields();
    }, _this.getOptions = function (item) {
      _common2.default.getInterface(item.url).then(function (res) {
        if (res.data) {
          _this.setState({ options: _extends({}, _this.state.options, _defineProperty({}, item.id, res.data)) }, function () {
            _this.getFields();
          });
        }
      });
    }, _this.renderItem = function (item) {
      var options = _this.state.options;


      switch (item.typeCode) {
        case 'input':
          return _react2.default.createElement(_antd.Input, { placeholder: item.placeholder });
        case 'switch':
          return _react2.default.createElement(_antd.Switch, {
            checkedChildren: _react2.default.createElement(_icons.CheckOutlined, null),
            unCheckedChildren: _react2.default.createElement(_icons.CloseOutlined, null)
          });
        case 'select':
          return _react2.default.createElement(
            _antd.Select,
            { placeholder: item.placeholder },
            options[item.id] && options[item.id].map(function (option) {
              return _react2.default.createElement(
                _antd.Select.Option,
                { key: option[item.valueKey] },
                option[item.labelKey]
              );
            })
          );
        default:
          return _react2.default.createElement(_antd.Input, { placeholder: item.placeholder });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(AdvancedSearchForm, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      if (this.props.getRef) {
        this.props.getRef(this);
      }
      var _props = this.props,
          _props$formItems = _props.formItems,
          formItems = _props$formItems === undefined ? [] : _props$formItems,
          dispatch = _props.dispatch;


      formItems.map(function (item, i) {
        if (!item.dataIndex) return;

        if (item.dataSource) {
          _this2.setState({ options: _extends({}, _this2.state.options, _defineProperty({}, item.id, JSON.parse(item.dataSource))) });
        } else if ((!item.options || !item.options.length) && item.url && !_this2.state.options[item.id]) {
          _this2.getOptions(item);
        }

        if (item.defaultValue) {

          var defaultValue = {};
          var key = "";
          item.defaultValue.replace(/\$\{(.+)\}/g, function (target, result) {
            key = result;
          });

          if (key) {
            var temp = _this2.getValue(_this2.props, key);
            if (temp && temp.length) {
              defaultValue[item.id] = temp[0];
            }
          }

          dispatch({
            type: "database/setData",
            payload: {
              moduleName: "priview",
              objName: _this2.props.code,
              key: item.dataIndex,
              value: defaultValue[item.id]
            }
          });

          _this2.setState({ defaultValue: defaultValue });
        }
      });
    }

    // componentWillReceiveProps(nextProps) {
    //   (nextProps);
    // }

  }, {
    key: 'getFields',


    // To generate mock Form.Item
    value: function getFields() {
      var _this3 = this;

      var getFieldDecorator = this.props.form.getFieldDecorator;
      var _props2 = this.props,
          _props2$formItems = _props2.formItems,
          formItems = _props2$formItems === undefined ? [] : _props2$formItems,
          dispatch = _props2.dispatch;

      var children = [];
      var count = this.state.expand ? formItems.length : 4;

      formItems.map(function (item, i) {
        if (!item.dataIndex) return;

        var options = {};

        if (_this3.state.defaultValue[item.id]) {
          options.initialValue = _this3.state.defaultValue[item.id];
        }

        children.push(_react2.default.createElement(
          _antd.Col,
          { span: item.colSpan || 6, key: item.dataIndex, style: { display: i < count ? 'block' : 'none' } },
          _react2.default.createElement(
            FormItem,
            { label: item.label },
            getFieldDecorator(item.dataIndex, options)(_this3.renderItem(item))
          )
        ));
      });

      return children;
    }
  }, {
    key: 'getValue',
    value: function getValue(data) {
      var res = JSON.stringify(data);

      for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      return args.map(function (item) {
        return new Function('try {return ' + res + '.' + item + ' } catch(e) {}')();
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _compatible.Form,
        { className: 'ant-advanced-search-form', onSubmit: this.handleSearch },
        _react2.default.createElement(
          _antd.Row,
          { gutter: 24 },
          this.getFields()
        ),
        _react2.default.createElement(
          _antd.Row,
          null,
          _react2.default.createElement(
            _antd.Col,
            { span: 24, style: { textAlign: 'right' } },
            _react2.default.createElement(
              _antd.Button,
              { type: 'primary', htmlType: 'submit' },
              '\u641C\u7D22'
            ),
            _react2.default.createElement(
              _antd.Button,
              { style: { marginLeft: 8 }, onClick: this.handleReset },
              '\u6E05\u7A7A'
            ),
            this.props.formItems && this.props.formItems.length > 4 && _react2.default.createElement(
              'a',
              { style: { marginLeft: 8, fontSize: 12 }, onClick: this.toggle },
              this.state.expand ? '收缩' : '展开',
              ' ',
              _react2.default.createElement(_compatible.Icon, { type: this.state.expand ? 'up' : 'down' })
            )
          )
        )
      );
    }
  }]);

  return AdvancedSearchForm;
}(_react2.default.Component);

function fieldsChange(props, fields) {

  if (JSON.stringify(fields) == "{}") {
    return;
  }

  var result = Object.keys(fields).map(function (key) {
    return {
      moduleName: "priview",
      objName: props.code,
      key: key,
      value: fields[key].value
    };
  });

  store.dispatch({
    type: "database/setData",
    payload: result[0]
  });
}

exports.default = _compatible.Form.create()(AdvancedSearchForm);