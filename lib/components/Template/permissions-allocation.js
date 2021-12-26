'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

var _selectDepartment = require('components/Template/select-department');

var _selectDepartment2 = _interopRequireDefault(_selectDepartment);

var _selectEmployeeGroup = require('components/Template/select-employee-group');

var _selectEmployeeGroup2 = _interopRequireDefault(_selectEmployeeGroup);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RadioButton = _antd.Radio.Button;
var RadioGroup = _antd.Radio.Group;

/**
 * 权限分配组件
 */
var PermissionsAllocation = function (_React$Component) {
  _inherits(PermissionsAllocation, _React$Component);

  function PermissionsAllocation(props) {
    _classCallCheck(this, PermissionsAllocation);

    var _this = _possibleConstructorReturn(this, (PermissionsAllocation.__proto__ || Object.getPrototypeOf(PermissionsAllocation)).call(this, props));

    _this.onApplyEmployee = function (e) {
      _this.setState({ type: e.target.value, selectedList: [] }, function () {
        _this.setSelectEmployeeText();
        _this.onChange();
      });
    };

    _this.setSelectEmployeeText = function () {
      var text = '';
      if (_this.state.type === 'department') {
        text = _this.$t('common.selected.number.department', {
          number: _this.state.selectedList.length
        });
      } else if (_this.state.type === 'group') {
        text = _this.$t('common.selected.number.user.group', {
          number: _this.state.selectedList.length
        });
      } else if (_this.state.type === 'all') {
        text = _this.$t('common.all.type');
      }
      _this.setState({ selectEmployeeText: text });
    };

    _this.showSelectEmployeeGroup = function () {
      _this.refs.selectEmployeeGroup.blur();

      if (_this.state.type === 'department') {
        _this.setState({ showSelectDepartment: true });
      } else if (_this.state.type === 'group') {
        _this.setState({ showSelectEmployeeGroup: true });
      }
    };

    _this.handleListCancel = function () {
      _this.setState({ selectedList: [], showSelectEmployeeGroup: false, showSelectDepartment: false });
    };

    _this.handleListOk = function (values) {
      var value = values.checkedKeys.map(function (item) {
        return {
          label: item.label,
          key: item.value,
          value: item
        };
      });

      _this.setState({ selectedList: values.checkedKeys, value: value }, function () {
        _this.setSelectEmployeeText();
      });

      _this.onChange(values);
      _this.handleListCancel();
    };

    _this.onChange = function (values) {
      var list = !values ? [] : values.checkedKeys.map(function (item) {
        return {
          label: item.label,
          key: item.value,
          value: item.value
        };
      });

      var onChange = _this.props.onChange;

      if (onChange) {
        onChange({ type: _this.state.type, values: list });
      }
    };

    _this.state = {
      value: [],
      type: '',
      showSelectDepartment: false,
      showSelectEmployeeGroup: false,
      selectedList: [],
      selectEmployeeText: ''
    };
    return _this;
  }

  _createClass(PermissionsAllocation, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _this2 = this;

      var model = this.props.value;

      model && this.setState({ type: model.type, selectedList: model.values, value: model.values }, function () {
        _this2.setSelectEmployeeText();
      });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _this3 = this;

      var model = nextProps.value;

      model && this.setState({ type: model.type, selectedList: model.values, value: model.values }, function () {
        _this3.setSelectEmployeeText();
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var _state = this.state,
          value = _state.value,
          selectEmployeeText = _state.selectEmployeeText,
          type = _state.type,
          showSelectEmployeeGroup = _state.showSelectEmployeeGroup,
          showSelectDepartment = _state.showSelectDepartment,
          selectedList = _state.selectedList;
      var disabled = this.props.disabled;


      var textStyle = {
        position: 'absolute',
        top: 2,
        left: 10,
        right: 10,
        lineHeight: '30px',
        background: type === 'all' || disabled ? '#f5f5f5' : '#fff',
        color: type === 'all' || disabled ? 'rgba(0, 0, 0, 0.25)' : 'rgba(0, 0, 0, 0.65)',
        cursor: 'pointer'
      };

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          RadioGroup,
          { onChange: this.onApplyEmployee, value: type },
          this.props.hiddenComponents.indexOf('all') >= 0 || _react2.default.createElement(
            _antd.Radio,
            { disabled: disabled, value: 'all' },
            this.$t('common.all.user')
          ),
          this.props.hiddenComponents.indexOf('department') >= 0 || _react2.default.createElement(
            _antd.Radio,
            { disabled: disabled, value: 'department' },
            this.$t('common.add.by.department')
          ),
          this.props.hiddenComponents.indexOf('group') >= 0 || _react2.default.createElement(
            _antd.Radio,
            { disabled: disabled, value: 'group' },
            this.$t('common.add.by.user.group')
          )
        ),
        type && type !== 'all' && _react2.default.createElement(
          'div',
          { style: { position: 'relative', width: '100%' } },
          _react2.default.createElement(_antd.Select, {
            disabled: type === 'all' || this.props.disabled,
            value: value,
            ref: 'selectEmployeeGroup',
            onFocus: this.showSelectEmployeeGroup,
            dropdownStyle: { display: 'none' },
            labelInValue: true
          }),
          _react2.default.createElement(
            'div',
            {
              style: textStyle,
              onClick: function onClick() {
                !_this4.props.disabled && _this4.showSelectEmployeeGroup();
              }
            },
            selectEmployeeText
          )
        ),
        showSelectEmployeeGroup && _react2.default.createElement(_selectEmployeeGroup2.default, {
          visible: showSelectEmployeeGroup,
          onCancel: this.handleListCancel,
          onOk: this.handleListOk,
          single: true,
          selectedData: selectedList,
          mode: this.props.mode
        }),
        showSelectDepartment && _react2.default.createElement(_selectDepartment2.default, {
          visible: showSelectDepartment,
          onCancel: this.handleListCancel,
          onOk: this.handleListOk,
          single: true,
          selectedData: selectedList,
          mode: this.props.mode
        })
      );
    }
  }]);

  return PermissionsAllocation;
}(_react2.default.Component);

PermissionsAllocation.propTypes = {
  onChange: _propTypes2.default.func, //进行选择后的回调
  disabled: _propTypes2.default.bool, //是否可用
  value: _propTypes2.default.object, //已选择的值 {key: "",value: "",label:""}
  hiddenComponents: _propTypes2.default.array, //不需要显示的组件 ["all","department","group"] 表示这三个组件不需要显示 默认全部都显示
  mode: _propTypes2.default.string
};

PermissionsAllocation.defaultProps = {
  hiddenComponents: [],
  disabled: false,
  mode: 'id'
};

exports.default = PermissionsAllocation;