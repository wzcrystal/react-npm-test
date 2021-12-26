'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _dva = require('dva');

var _antd = require('antd');

var _httpFetch = require('share/httpFetch');

var _httpFetch2 = _interopRequireDefault(_httpFetch);

var _searchArea = require('components/Widget/search-area');

var _searchArea2 = _interopRequireDefault(_searchArea);

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

require('styles/contract/my-contract/select-contract.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Search = _antd.Input.Search;
var CheckboxGroup = _antd.Checkbox.Group;

var SelectEmployeeGroup = function (_React$Component) {
  _inherits(SelectEmployeeGroup, _React$Component);

  function SelectEmployeeGroup(props) {
    _classCallCheck(this, SelectEmployeeGroup);

    var _this = _possibleConstructorReturn(this, (SelectEmployeeGroup.__proto__ || Object.getPrototypeOf(SelectEmployeeGroup)).call(this, props));

    _this.renderLabel = function (item) {
      return _react2.default.createElement(
        'span',
        null,
        item.name,
        !item.enabled && _react2.default.createElement(
          'span',
          { style: { color: '#FF0000', opacity: 0.5 } },
          '\xA0\xA0\xA0',
          _this.$t('common.disabled' /*禁用*/)
        )
      );
    };

    _this.getList = function () {
      var isOid = _this.props.mode === 'oid';

      var url = _config2.default.mdataUrl + '/api/user/groups/company?page=0&size=1000';

      _httpFetch2.default.get(url).then(function (res) {
        if (_this.state.selectedData && _this.state.selectedData.length) {
          var temp = [];
          var list = [];
          var tempSelect = [];
          res.data.map(function (item) {
            var valueItem = isOid ? item.userGroupOid : item.id;
            if (_this.state.selectedData.findIndex(function (o) {
              return o.value === valueItem;
            }) >= 0) {
              var labelShow = _this.renderLabel(item);
              list.push({ label: labelShow, value: valueItem });
              tempSelect.push(valueItem);
            } else {
              var _labelShow = _this.renderLabel(item);
              temp.push({ label: _labelShow, value: valueItem });
            }
          });
          _this.setState({
            userGroup: temp,
            toData: temp.concat([]),
            useData: list.concat([]),
            useUserGroup: list,
            useSelectList: tempSelect,
            userUserGroupEntity: res.data
          });
        } else {
          var _temp = [];
          res.data.map(function (item) {
            var valueItem = isOid ? item.userGroupOid : item.id;
            var labelShow = _this.renderLabel(item);
            _temp.push({ label: labelShow, value: valueItem });
          });
          _this.setState({
            userGroup: _temp,
            toData: _temp.concat([]),
            useData: [],
            useUserGroup: [],
            userUserGroupEntity: res.data
          });
        }
      });
    };

    _this.checkboxChange = function (values) {
      _this.setState({ toSelectList: values });
    };

    _this.useCheckboxChange = function (values) {
      _this.setState({ useSelectList: values });
    };

    _this.addToUse = function () {
      var array = [];
      var temp = _this.state.userGroup.concat([]);
      var toData = _this.state.toData.concat([]);
      _this.state.toSelectList.map(function (item) {
        temp.splice(temp.findIndex(function (o) {
          return o.value == item;
        }), 1);
        toData.splice(toData.findIndex(function (o) {
          return o.value == item;
        }), 1);

        var record = _this.state.userGroup.find(function (o) {
          return o.value == item;
        });
        if (record) {
          array.push(record);
        }
      });
      _this.setState({
        useUserGroup: _this.state.useUserGroup.concat(array),
        useData: _this.state.useData.concat(array),
        toData: toData,
        userGroup: temp,
        toSelectList: []
      }, function () {
        _this.useSearch(_this.state.useSearchText);
      });
    };

    _this.removeFromUse = function () {
      var temp = _this.state.useUserGroup.concat([]);
      var useData = _this.state.useData.concat([]);

      var array = [];

      _this.state.useSelectList.map(function (item) {
        var record = _this.state.useUserGroup.find(function (o) {
          return o.value == item;
        });
        if (record) {
          array.push(record);
        }

        temp.splice(temp.findIndex(function (o) {
          return o.value == item;
        }), 1);
        useData.splice(useData.findIndex(function (o) {
          return o.value == item;
        }), 1);
      });

      _this.setState({
        useUserGroup: temp,
        useData: useData,
        useSelectList: [],
        userGroup: _this.state.userGroup.concat(array),
        toData: _this.state.toData.concat(array)
      }, function () {
        _this.toSearch(_this.state.toSearchText);
      });
    };

    _this.onCheckAllChange = function (e) {
      _this.setState({
        toSelectList: e.target.checked ? _this.state.userGroup.map(function (o) {
          return o.value;
        }) : []
      });
    };

    _this.onUseCheckAllChange = function (e) {
      _this.setState({
        useSelectList: e.target.checked ? _this.state.useUserGroup.map(function (o) {
          return o.value;
        }) : []
      });
    };

    _this.toSearch = function (value) {
      if (!value) {
        _this.setState({ userGroup: _this.state.toData, toSearchText: value });
      } else {
        // let temp = this.state.toData.filter(o => o.label.indexOf(value) >= 0);
        var temp = _this.state.toData.filter(function (o) {
          return o.label.props.children[0].indexOf(value) >= 0;
        });
        _this.setState({ userGroup: temp, toSearchText: value });
      }
    };

    _this.useSearch = function (value) {
      if (!value) {
        _this.setState({ useUserGroup: _this.state.useData, useSearchText: value });
      } else {
        // let temp = this.state.useData.filter(o => o.label.indexOf(value) >= 0);
        var temp = _this.state.useData.filter(function (o) {
          return o.label.props.children[0].indexOf(value) >= 0;
        });
        _this.setState({ useUserGroup: temp, useSearchText: value });
      }
    };

    _this.handleOk = function () {
      if (_this.props.entity) {
        var temp = [];
        _this.state.useData.map(function (o) {
          _this.state.userUserGroupEntity.map(function (u) {
            if (o.value === (_this.props.mode === 'oid' ? u.userGroupOid : u.id)) {
              temp.push(u);
            }
          });
        });
        _this.props.onOk({ checkedEntites: temp });
      } else {
        _this.props.onOk({ checkedKeys: _this.state.useData });
      }
    };

    _this.state = {
      loading: true,
      toData: [],
      useData: [],
      userGroup: [],
      useUserGroup: [],
      userUserGroupEntity: [],
      toSelectList: [], //待选区已经选中的列表
      useSelectList: [], //使用区以选中的列表
      toSearchText: '',
      useSearchText: '',
      selectedData: []
    };
    return _this;
  }

  _createClass(SelectEmployeeGroup, [{
    key: 'componentDidMount',
    value: function componentDidMount() {}
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _this2 = this;

      this.setState({ selectedData: nextProps.selectedData }, function () {
        if (nextProps.visible) {
          _this2.getList();
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props = this.props,
          visible = _props.visible,
          onCancel = _props.onCancel,
          afterClose = _props.afterClose;
      var _state = this.state,
          data = _state.data,
          pagination = _state.pagination,
          loading = _state.loading,
          userGroup = _state.userGroup,
          toSelectList = _state.toSelectList,
          useUserGroup = _state.useUserGroup,
          useSelectList = _state.useSelectList;

      return _react2.default.createElement(
        _antd.Modal,
        {
          title: this.$t('select.employee.group.option' /*选择人员组*/),
          visible: visible,
          onCancel: onCancel,
          afterClose: afterClose,
          width: '70%',
          onOk: this.handleOk,
          className: 'list-selector select-employee-group'
        },
        _react2.default.createElement(
          _antd.Row,
          { gutter: 10, style: { height: '100%' } },
          _react2.default.createElement(
            _antd.Col,
            { span: 10, style: { height: '100%' } },
            _react2.default.createElement(
              _antd.Card,
              {
                title: _react2.default.createElement(
                  _antd.Checkbox,
                  {
                    onChange: this.onCheckAllChange,
                    checked: !!toSelectList.length && toSelectList.length === userGroup.length,
                    indeterminate: !!toSelectList.length && toSelectList.length < userGroup.length
                  },
                  toSelectList.length,
                  '/',
                  userGroup.length
                ),
                extra: _react2.default.createElement(
                  'span',
                  null,
                  this.$t('select.employee.group.wait.option' /*待选区*/)
                )
              },
              _react2.default.createElement(Search, {
                placeholder: this.$t('common.please.enter' /*请输入*/),
                onChange: function onChange(e) {
                  return _this3.toSearch(e.target.value);
                }
              }),
              _react2.default.createElement(
                'div',
                { style: { margin: '10px 15px' } },
                _react2.default.createElement(CheckboxGroup, {
                  value: toSelectList,
                  onChange: this.checkboxChange,
                  options: userGroup
                })
              )
            )
          ),
          _react2.default.createElement(
            _antd.Col,
            { span: 4, style: { height: '100%' } },
            _react2.default.createElement(
              'div',
              {
                style: {
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }
              },
              _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                  _antd.Button,
                  {
                    disabled: !toSelectList.length,
                    onClick: this.addToUse,
                    size: 'small',
                    type: 'primary'
                  },
                  this.$t('select.employee.group.join.use' /*加入使用*/),
                  '>'
                ),
                _react2.default.createElement('br', null),
                _react2.default.createElement(
                  _antd.Button,
                  {
                    disabled: !useSelectList.length,
                    onClick: this.removeFromUse,
                    style: { marginTop: 15 },
                    size: 'small',
                    type: 'primary'
                  },
                  '<',
                  this.$t('common.back' /*回到代选*/)
                )
              )
            )
          ),
          _react2.default.createElement(
            _antd.Col,
            { span: 10, style: { height: '100%' } },
            _react2.default.createElement(
              _antd.Card,
              {
                title: _react2.default.createElement(
                  _antd.Checkbox,
                  {
                    onChange: this.onUseCheckAllChange,
                    checked: !!useSelectList.length && useSelectList.length === useUserGroup.length,
                    indeterminate: !!useSelectList.length && useSelectList.length < useUserGroup.length
                  },
                  useSelectList.length,
                  '/',
                  useUserGroup.length
                ),
                extra: _react2.default.createElement(
                  'span',
                  null,
                  this.$t('select.employee.group.use.list' /*使用列表*/)
                )
              },
              _react2.default.createElement(Search, {
                placeholder: this.$t('common.please.enter' /*请输入*/),
                onChange: function onChange(e) {
                  return _this3.useSearch(e.target.value);
                }
              }),
              _react2.default.createElement(
                'div',
                { style: { margin: '10px 15px' } },
                _react2.default.createElement(CheckboxGroup, {
                  value: useSelectList,
                  onChange: this.useCheckboxChange,
                  options: useUserGroup
                })
              )
            )
          )
        )
      );
    }
  }]);

  return SelectEmployeeGroup;
}(_react2.default.Component);

SelectEmployeeGroup.propTypes = {
  visible: _propTypes2.default.bool, //对话框是否可见
  onOk: _propTypes2.default.func, //点击OK后的回调，当有选择的值时会返回一个数组 [{label:"",value:""}]
  selectedData: _propTypes2.default.array, //默认选择的值id数组
  mode: _propTypes2.default.string, //模式 “oid” “id" 默认为id模式
  entity: _propTypes2.default.bool //entity如果为true返回对象数组 false返回id数组
};

SelectEmployeeGroup.defaultProps = {
  mode: 'id',
  entity: false
};

function mapStateToProps(state) {
  return {
    company: state.user.company
  };
}

exports.default = (0, _dva.connect)(mapStateToProps)(SelectEmployeeGroup);