'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _icons = require('@ant-design/icons');

var _compatible = require('@ant-design/compatible');

require('@ant-design/compatible/assets/index.css');

var _antd = require('antd');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./search-form.less');

var _common = require('services/common');

var _common2 = _interopRequireDefault(_common);

var _dva = require('dva');

var _customChooser = require('components/Template/custom-chooser');

var _customChooser2 = _interopRequireDefault(_customChooser);

var _permissionsAllocation = require('components/Template/permissions-allocation');

var _permissionsAllocation2 = _interopRequireDefault(_permissionsAllocation);

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

var _index = require('../../methods/index');

var _index2 = _interopRequireDefault(_index);

var _httpFetch = require('@/share/httpFetch');

var _httpFetch2 = _interopRequireDefault(_httpFetch);

var _index3 = require('../../index');

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FormItem = _compatible.Form.Item;

var AdvancedSearchForm = (_dec = (0, _dva.connect)(function (state) {
  return state;
}), _dec(_class = function (_React$Component) {
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
      loading: false,
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
    }, _this.setValues = function (values) {
      var data = _this.props.form.getFieldsValue();

      Object.keys(data).map(function (key) {
        _this.props.form.setFieldsValue(_defineProperty({}, key, values[key]));
      });
    }, _this.getOptions = function (item) {
      _common2.default.getInterface(item.url).then(function (res) {
        if (res.data) {
          _this.setState({ options: _extends({}, _this.state.options, _defineProperty({}, item.id, res.data)) }, function () {
            _this.getFields();
          });
        }
      });
    }, _this.getDataByPath = function (path, data) {
      var key = "";
      path.replace(/\$\{(.+)\}/g, function (target, result) {
        key = result;
      });

      if (key) {
        var temp = _this.getValue(data, key);
        if (temp && temp.length) {
          return temp[0];
        }
      }
    }, _this.onChange = function (item, value) {
      if (item.onChange) {
        _this.exec(item.onChange, value);
      }
    }, _this.exec = function (key, values) {
      var keys = String(key).split('.');
      var func = null;
      if (keys[0] == 0) {
        func = _index2.default[keys[1]][keys[2]];
      } else {
        func = window.instances[keys[1]][keys[2]];
      }
      func && func(values);
    }, _this.formatDefaultValue = function () {}, _this.renderItem = function (item) {
      var options = _this.state.options;


      var disabled = true;
      if (item.disabled) {
        var key = "";
        String(item.disabled).replace(/\$\{(.+)\}/g, function (target, result) {
          key = result;
        });

        if (key) {
          var temp = _this.getValue(_this.props, key);
          if (temp && temp.length) {
            disabled = temp[0];
          }
        }
      }

      switch (item.typeCode) {
        case 'input':
          return _react2.default.createElement(_antd.Input, { placeholder: item.placeholder, disabled: !disabled });
        case 'switch':
          return _react2.default.createElement(_antd.Switch, {
            disabled: !disabled,
            checkedChildren: _react2.default.createElement(_icons.CheckOutlined, null),
            unCheckedChildren: _react2.default.createElement(_icons.CloseOutlined, null)
          });
        case 'select':
          return _react2.default.createElement(
            _antd.Select,
            { disabled: !disabled, allowClear: item.allowClear, placeholder: item.placeholder },
            options[item.id] && options[item.id].map(function (option) {
              return _react2.default.createElement(
                _antd.Select.Option,
                { key: option[item.valueKey] },
                option[item.labelKey]
              );
            })
          );
        case 'date-picker':
          return _react2.default.createElement(DatePicker, { disabled: disabled, allowClear: item.allowClear, placeholder: item.placeholder });
        case 'custom-chooser':
          return _react2.default.createElement(_customChooser2.default, { disabled: disabled, type: item.chooserType, valueKey: item.valueKey, labelKey: item.labelKey, placeholder: item.placeholder });
        case 'permissions-allocation':
          return _react2.default.createElement(_permissionsAllocation2.default, { disabled: !disabled, type: item.chooserType, valueKey: item.valueKey, labelKey: item.labelKey, placeholder: item.placeholder });
        default:
          return _react2.default.createElement(_antd.Input, { disabled: disabled, placeholder: item.placeholder });

      }
    }, _this.submit = function (e) {

      e.preventDefault();
      _this.props.form.validateFields(function (err, values) {
        if (err) return;

        _this.setState({ loading: true });

        if (_this.props.onSubmit) {
          _this.props.onSubmit(values, function (flag) {
            _this.setState({ loading: false });
            if (flag) {
              _this.props.onSuccess && _this.props.onSuccess();
            } else {
              _this.props.onError && _this.props.onError();
            }
          });
          return;
        }

        if (!_this.props.url) return;

        _httpFetch2.default.get(_config2.default.baseUrl + '/api/interface/query/' + _this.props.url).then(function (_ref2) {
          var res = _ref2.data;

          _httpFetch2.default.post(res.reqUrl, values).then(function (response) {
            _this.setState({ loading: false });
            _this.props.onSuccess && _this.props.onSuccess();
          }).catch(function (err) {
            _this.setState({ loading: false });
            _this.props.onError && _this.props.onError();
          });
        });
      });
    }, _this.cancel = function () {
      _this.props.onCancel && _this.props.onCancel();
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


      var defaultValue = {};

      formItems.map(function (item, i) {
        if (!item.dataIndex) return;

        if (item.dataSource) {
          _this2.setState({ options: _extends({}, _this2.state.options, _defineProperty({}, item.id, JSON.parse(item.dataSource))) });
        } else if ((!item.options || !item.options.length) && item.url && !_this2.state.options[item.id]) {
          _this2.getOptions(item);
        }

        if (item.defaultValue) {

          defaultValue[item.id] = item.defaultValue;

          var result = _this2.getDataByPath(item.defaultValue, _this2.props);

          if (result) {
            defaultValue[item.id] = result;
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
        } else {
          dispatch({
            type: "database/setData",
            payload: {
              moduleName: "priview",
              objName: _this2.props.code,
              key: item.dataIndex,
              value: ""
            }
          });
        }
      });

      this.setState({ defaultValue: defaultValue });
    }
  }, {
    key: 'getFields',


    // To generate mock Form.Item
    value: function getFields() {
      var _this3 = this;

      var getFieldDecorator = this.props.form.getFieldDecorator;
      var _props$formItems2 = this.props.formItems,
          formItems = _props$formItems2 === undefined ? [] : _props$formItems2;

      var children = [];

      formItems.map(function (item, i) {
        if (!item.dataIndex) return;

        if (item.visible) {
          var result = _this3.getDataByPath(item.visible, _this3.props);
          if (!result) return;
        }

        var formItemLayout = {
          labelCol: {
            xs: { span: 24 },
            sm: { span: 7 }
          },
          wrapperCol: {
            xs: { span: 24 },
            sm: { span: 10 }
          }
        };

        var options = {};

        if (_this3.state.defaultValue[item.id]) {
          if (item.typeCode == "switch") {
            if (_this3.state.defaultValue[item.id] == "false") {
              options.initialValue = false;
            } else {
              options.initialValue = Boolean(_this3.state.defaultValue[item.id]);
            }
          } else if (item.typeCode == "custom-chooser") {
            if (_this3.state.defaultValue[item.id]) {} else {
              options.initialValue = { radioValue: true, chooserValue: [] };
            }
          } else {
            options.initialValue = _this3.state.defaultValue[item.id];
          }
        } else if (item.typeCode == "custom-chooser") {
          options.initialValue = { radioValue: true, chooserValue: [] };
        }

        if (item.typeCode == "switch") {
          options.valuePropName = "checked";
        }

        children.push(_react2.default.createElement(
          _antd.Col,
          { span: 24, key: i },
          _react2.default.createElement(
            FormItem,
            _extends({}, formItemLayout, { label: item.label }),
            getFieldDecorator(item.dataIndex, _extends({
              rules: [{ required: item.required, message: item.message || '不能为空' }]
            }, options))(_this3.renderItem(item))
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
      var loading = this.state.loading;

      return _react2.default.createElement(
        _compatible.Form,
        null,
        _react2.default.createElement(
          _antd.Row,
          null,
          this.getFields()
        ),
        _react2.default.createElement(
          _antd.Row,
          { style: { textAlign: 'center' } },
          _react2.default.createElement(
            _antd.Button,
            { loading: loading, type: 'primary', onClick: this.submit },
            '\u786E\u5B9A'
          ),
          _react2.default.createElement(
            _antd.Button,
            { style: { marginLeft: 20 }, onClick: this.cancel },
            '\u53D6\u6D88'
          )
        )
      );
    }
  }]);

  return AdvancedSearchForm;
}(_react2.default.Component)) || _class);


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

  _index4.default.dispatch({
    type: "database/setData",
    payload: result[0]
  });
}

exports.default = _compatible.Form.create({ onFieldsChange: fieldsChange })(AdvancedSearchForm);