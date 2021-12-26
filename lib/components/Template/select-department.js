'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _dva = require('dva');

var _antd = require('antd');

var _httpFetch = require('share/httpFetch');

var _httpFetch2 = _interopRequireDefault(_httpFetch);

var _lodash = require('lodash.debounce');

var _lodash2 = _interopRequireDefault(_lodash);

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
var TreeNode = _antd.Tree.TreeNode;

var SelectDepartment = function (_React$Component) {
  _inherits(SelectDepartment, _React$Component);

  function SelectDepartment(props) {
    _classCallCheck(this, SelectDepartment);

    var _this = _possibleConstructorReturn(this, (SelectDepartment.__proto__ || Object.getPrototypeOf(SelectDepartment)).call(this, props));

    _this.useSearch = function (value) {
      if (!value) {
        _this.setState({ useDepartment: _this.state.useData, useSearchText: value });
      } else {
        var temp = _this.state.useData.filter(function (o) {
          return o.label.indexOf(value) >= 0;
        });

        _this.setState({ useDepartment: temp, useSearchText: value });
      }
    };

    _this.onSelect = function (selectedKeys, info) {
      _this.setState({ selectedKeys: selectedKeys });
    };

    _this.renderTreeNodes = function (data) {
      return data.map(function (item) {
        if (item.children) {
          return _react2.default.createElement(
            TreeNode,
            { title: item.title, key: item.key, dataRef: item },
            _this.renderTreeNodes(item.children)
          );
        }
        return _react2.default.createElement(TreeNode, _extends({}, item, { dataRef: item }));
      });
    };

    _this.onLoadData = function (treeNode) {
      return new Promise(function (resolve) {
        if (treeNode.props.children) {
          resolve();
          return;
        }

        var model = JSON.parse(treeNode.props.eventKey);
        var url = _config2.default.mdataUrl + '/api/DepartmentGroup/get/dept/by/id?status=102&id=' + model.id + '&name=';

        if (_this.props.mode == 'oid') {
          url = _config2.default.mdataUrl + '/api/department/child/' + model.id + '?flag=1001';
        }
        if (_this.props.entity) {
          url = _config2.default.mdataUrl + '/api/department/child/' + model.departmentOid + '?flag=1001';
        }

        _httpFetch2.default.get(url).then(function (res) {
          var temp = [];
          var selected = _this.state.toSelectList;

          res.data = res.data || [];

          res.data.map(function (item) {
            var obj = {
              id: item.id,
              name: item.name,
              path: item.name
            };

            if (_this.props.mode == 'oid') {
              obj = {
                name: item.name,
                path: item.path,
                id: item.departmentOid
              };
            }
            if (_this.props.entity) {
              obj = item;
            }
            var jsonStr = JSON.stringify(obj);

            if (_this.props.mode == 'oid') {
              if (_this.state.useData.findIndex(function (o) {
                return o.value == item.departmentOid;
              }) >= 0) {
                selected.push(jsonStr);
              }
            } else {
              if (_this.state.useData.findIndex(function (o) {
                return o.value == item.id;
              }) >= 0) {
                selected.push(jsonStr);
              }
            }

            temp.push({ title: item.name, key: jsonStr, isLeaf: !item.hasChildrenDepartments });
          });

          treeNode.dataRef.children = temp;

          _this.setState({
            toData: _this.state.toData.concat([]),
            toSelectList: selected
          });

          resolve();
        });
      });
    };

    _this.getList = function () {
      _this.setState({ loading: true });

      var url = _config2.default.mdataUrl + '/api/departments/root?flag=1002';

      _httpFetch2.default.get(url).then(function (res) {
        if (res.data && res.data.length) {
          _this.setState({ useDepartment: _this.state.useData });
          var temp = [];
          var selected = [];
          var use = [];
          res.data.map(function (item) {
            var obj = {
              id: item.id,
              name: item.name,
              path: item.name
            };

            if (_this.props.mode == 'oid') {
              obj = {
                name: item.name,
                path: item.path,
                id: item.departmentOid
              };
            }
            if (_this.props.entity) {
              obj = item;
            }
            var jsonStr = JSON.stringify(obj);

            if (_this.state.useData.findIndex(function (o) {
              return o.value == item.id;
            }) >= 0) {
              use.push(item.id);
              selected.push(jsonStr);
            }

            temp.push({ title: item.name, key: jsonStr, isLeaf: !item.hasChildrenDepartments });
          });
          _this.setState({ toData: temp, modalVisible: true, loading: false, toSelectList: selected, useSelectList: use });
        } else {
          _this.setState({ toData: [], modalVisible: true, loading: false, toSelectList: [] });
        }
      }).catch(function () {
        _this.setState({ modalVisible: true, loading: false });
      });
    };

    _this.onCheck = function (values, e) {
      var temp = [];
      values.checked.map(function (item) {
        var model = JSON.parse(item);
        temp.push({ label: model.path, value: model.id });
      });

      _this.setState({ toSelectList: values.checked });
    };

    _this.handleOk = function () {
      _this.props.onOk({
        checkedKeys: _this.state.useData.concat([])
      });
    };

    _this.addToUse = function () {
      var temp = [];

      var useData = _this.state.useData;

      _this.state.toSelectList.map(function (item) {
        var model = JSON.parse(item);

        if (useData.findIndex(function (o) {
          return o.value == model.id;
        }) >= 0) {
          return;
        }
        if (_this.props.entity) {
          var o = {
            departmentId: model.id,
            departmentOid: model.departmentOid,
            name: model.name,
            path: model.path,
            status: model.status,
            key: model.id,
            value: model.id,
            label: model.path
          };
          temp.push(o);
        } else {
          temp.push({ label: model.path, value: model.id, key: model.id });
        }
      });

      _this.setState({
        useData: useData.concat(temp),
        useDepartment: useData.concat(temp),
        useSearchText: ''
      });
    };

    _this.removeFromUse = function () {
      var useData = _this.state.useData;
      var toSelectList = _this.state.toSelectList;

      _this.state.useSelectList.map(function (item) {
        useData.splice(useData.findIndex(function (o) {
          return o.value == item;
        }), 1);
        toSelectList.splice(toSelectList.findIndex(function (o) {
          var model = JSON.parse(o);
          return model.id == item;
        }), 1);
      });

      _this.setState({
        useData: useData.concat([]),
        useSelectList: [],
        toSelectList: toSelectList.concat([]),
        useDepartment: useData
      });
    };

    _this.useCheckboxChange = function (values) {
      _this.setState({ useSelectList: values });
    };

    _this.onSearch = function (value) {
      if (!value) {
        _this.getList();
        return;
      }

      _this.setState({ loading: true });

      var url = _config2.default.mdataUrl + '/api/DepartmentGroup/selectDepartment/enabled?deptCode=&name=' + encodeURIComponent(value);
      if (_this.props.mode == 'oid') {
        url = _config2.default.mdataUrl + '/api/department/like?flag=1002&hasChildren=false&name=' + encodeURIComponent(value);
      }

      _httpFetch2.default.get(url).then(function (res) {
        if (res.data && res.data.length) {
          var temp = [];
          var selected = [];
          res.data = res.data || [];
          res.data.map(function (item) {
            var obj = {
              id: item.id,
              name: item.name,
              path: item.path
            };

            if (_this.props.mode == 'oid') {
              obj = {
                name: item.name,
                path: item.path,
                id: item.departmentOid
              };
            }
            var jsonStr = void 0;
            if (_this.props.entity) {
              jsonStr = JSON.stringify(item);
            } else {
              jsonStr = JSON.stringify(obj);
            }

            if (_this.props.mode == 'oid') {
              if (_this.state.useData.findIndex(function (o) {
                return o.value == item.departmentOid;
              }) >= 0) {
                selected.push(jsonStr);
              }
            } else {
              if (_this.state.useData.findIndex(function (o) {
                return o.value == item.id;
              }) >= 0) {
                selected.push(jsonStr);
              }
            }

            temp.push({ title: item.path, key: jsonStr, isLeaf: true });
          });

          _this.setState({ toData: temp, loading: false, toSelectList: selected });
        } else {
          _this.setState({ toData: [], loading: false, toSelectList: [] });
        }
      });
    };

    _this.onChange = function (value) {
      _this.setState({ toSearchText: value });
      _this.onSearch(value);
    };

    _this.state = {
      toData: [], //待选区的数据
      useData: [], //使用区的数据
      useDepartment: [], //使用区显示的数据
      expandedKeys: [],
      autoExpandParent: true,
      selectedKeys: [],
      loading: false,
      toSearchText: '',
      useSearchText: '',
      modalVisible: false,
      toSelectList: [], //待选区选中的列表
      useSelectList: [] //使用区选中的列表
    };
    _this.onSearch = (0, _lodash2.default)(_this.onSearch, 250);
    return _this;
  }

  _createClass(SelectDepartment, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      this.setState({ useData: this.props.selectedData ? this.props.selectedData : [] }, function () {
        _this2.getList();
      });
    }

    // componentWillReceiveProps(nextProps) {
    //   if (nextProps.visible) {
    //     this.setState({ useData: nextProps.selectedData ? nextProps.selectedData : [] }, () => {
    //       this.getList();
    //     });
    //   }
    // }

  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props = this.props,
          visible = _props.visible,
          _onCancel = _props.onCancel,
          afterClose = _props.afterClose;
      var _state = this.state,
          toData = _state.toData,
          useSelectList = _state.useSelectList,
          toSelectList = _state.toSelectList,
          useDepartment = _state.useDepartment,
          toSearchText = _state.toSearchText,
          useSearchText = _state.useSearchText,
          modalVisible = _state.modalVisible;


      return _react2.default.createElement(
        _antd.Modal,
        {
          title: '选择部门',
          visible: visible,
          onCancel: function onCancel() {
            _this3.setState({ toSelectList: [] });_onCancel();
          },
          afterClose: afterClose,
          width: '70%',
          onOk: this.handleOk,
          className: 'list-selector select-department select-employee-group '
        },
        modalVisible && _react2.default.createElement(
          _antd.Row,
          { gutter: 10, style: { height: '100%' } },
          _react2.default.createElement(
            _antd.Col,
            { span: 10, style: { height: '100%' } },
            _react2.default.createElement(
              _antd.Card,
              { title: '\u5F85\u9009\u533A' },
              _react2.default.createElement(Search, {
                style: { marginBottom: 8 },
                value: toSearchText,
                placeholder: this.$t('common.please.enter' /*请输入*/),
                onChange: function onChange(e) {
                  return _this3.onChange(e.target.value);
                }
              }),
              _react2.default.createElement(
                _antd.Tree,
                {
                  checkable: true,
                  loadData: this.onLoadData,
                  onCheck: this.onCheck,
                  checkStrictly: this.props.checkStrictly,
                  defaultCheckedKeys: toSelectList
                },
                this.renderTreeNodes(toData)
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
                  this.$t('select.employee.group.back.to.wait') /*回到待选*/
                )
              )
            )
          ),
          _react2.default.createElement(
            _antd.Col,
            { style: { height: '100%' }, span: 10 },
            _react2.default.createElement(
              _antd.Card,
              { title: this.$t('select.employee.group.use.list') /*使用列表*/ },
              _react2.default.createElement(Search, {
                value: useSearchText,
                placeholder: this.$t('common.please.enter') /*请输入*/,
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
                  options: useDepartment
                })
              )
            )
          )
        )
      );
    }
  }]);

  return SelectDepartment;
}(_react2.default.Component);

SelectDepartment.propTypes = {
  onCancel: _propTypes2.default.func,
  afterClose: _propTypes2.default.func,
  visible: _propTypes2.default.bool, //对话框是否可见
  onOk: _propTypes2.default.func, //点击OK后的回调，当有选择的值时会返回一个数组 [{label:"",value:""}]
  selectedData: _propTypes2.default.array, //默认选择的值id数组
  mode: _propTypes2.default.string, //模式 “oid” “id" 默认为id模式
  entity: _propTypes2.default.bool,
  checkStrictly: _propTypes2.default.bool //是否关联子部门，默认不关联
};

SelectDepartment.defaultProps = {
  mode: 'id',
  entity: false,
  checkStrictly: true
};

exports.default = SelectDepartment;