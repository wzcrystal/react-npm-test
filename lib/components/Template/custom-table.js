'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

var _table = require('widget/table');

var _table2 = _interopRequireDefault(_table);

var _httpFetch = require('share/httpFetch');

var _httpFetch2 = _interopRequireDefault(_httpFetch);

var _common = require('services/common');

var _common2 = _interopRequireDefault(_common);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import columnTemplate from '../../column-template/index';


var CustomTable = function (_Component) {
  _inherits(CustomTable, _Component);

  function CustomTable(props) {
    _classCallCheck(this, CustomTable);

    var _this = _possibleConstructorReturn(this, (CustomTable.__proto__ || Object.getPrototypeOf(CustomTable)).call(this, props));

    _this.search = function (params) {
      var pagination = _this.state.pagination;
      pagination.current = 1;
      _this.setState({ page: 0, pagination: pagination, searchParams: params }, function () {
        _this.getList();
      });
    };

    _this.reload = function () {
      var pagination = _this.state.pagination;
      pagination.current = 1;
      _this.setState({ page: 0, pagination: pagination, searchParams: {} }, _this.getList);
    };

    _this.getList = function () {
      if (!_this.props.url) return;

      var _this$state = _this.state,
          page = _this$state.page,
          size = _this$state.size,
          searchParams = _this$state.searchParams;


      if (_this.props.url.indexOf('/') >= 0) {
        _this.setState({ loading: true });
        _httpFetch2.default.get(_this.props.url, _extends({ page: page, size: size }, searchParams)).then(function (res) {
          var pagination = _extends({}, _this.state.pagination, {
            total: Number(res.headers['x-total-count']) || 0
          });
          _this.setState({ dataSource: res.data, loading: false, pagination: pagination });
        });
        return;
      }

      _this.setState({ loading: true });
      _common2.default.getInterface(_this.props.url, _extends({ page: page, size: size }, searchParams)).then(function (res) {

        var pagination = _extends({}, _this.state.pagination, {
          total: Number(res.headers['x-total-count']) || 0
        });

        _this.setState({ dataSource: res.data, loading: false, pagination: pagination });
      });
    };

    _this.indexChange = function (page, size) {
      var pagination = _this.state.pagination;
      pagination.current = page;
      _this.setState({ page: page - 1, pagination: pagination }, _this.getList);
    };

    _this.sizeChange = function (page, size) {
      var pagination = _this.state.pagination;
      pagination.current = 1;
      pagination.pageSize = size;
      _this.setState({ page: 0, size: size, pagination: pagination }, _this.getList);
    };

    _this.showTotal = function (total, range) {
      return '\u5171\u6709 ' + total + ' \u6761\u6570\u636E';
    };

    _this.state = {
      dataSource: [],
      columns: [],
      url: '',
      pagination: {
        total: 0,
        showTotal: _this.showTotal,
        showSizeChanger: true,
        showQuickJumper: true,
        pageSize: 10,
        current: 1,
        onChange: _this.indexChange,
        onShowSizeChange: _this.sizeChange,
        pageSizeOptions: ['10', '20', '30', '40']
      },
      loading: false,
      page: 0,
      size: 10,
      searchParams: {}
    };
    return _this;
  }

  _createClass(CustomTable, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      if (this.props.getRef) {
        this.props.getRef(this);
      }

      this.getList();

      var _props$columns = this.props.columns,
          columns = _props$columns === undefined ? [] : _props$columns;


      var tableColumns = [];

      columns.map(function (item) {
        if (item.template) {
          var templateStr = String(item.template).split('.');
          item.render = columnTemplate[templateStr[0]][templateStr[1]];
        } else {
          if (item.typeCode === 'date') {
            item.render = function (value, record, index) {
              if (!value) return '-';
              return _react2.default.createElement(
                'span',
                null,
                (0, _moment2.default)(value).format('YYYY-MM-DD')
              );
            };
            item.width = item.width || 110;
            item.align = item.align || 'center';
          } else if (item.typeCode === 'money') {
            item.render = function (value, record, index) {
              return _react2.default.createElement(
                'span',
                null,
                _this2.filterMoney(value)
              );
            };
            item.width = item.width || 110;
            item.align = item.align || 'center';
          } else if (item.typeCode === 'currency') {
            item.render = function (value, record, index) {
              return _react2.default.createElement(
                'span',
                null,
                value
              );
            };
            item.width = item.width || 110;
            item.align = item.align || 'center';
          } else if (item.typeCode === 'name') {
            item.render = function (value, record, index) {
              return _react2.default.createElement(
                'span',
                null,
                value
              );
            };
            item.width = item.width || 100;
            item.align = item.align || 'center';
          } else if (item.typeCode === 'progress') {
            item.render = function (value, record, index) {
              return _react2.default.createElement(_antd.Badge, { status: _this2.$statusList[value].state, text: _this2.$statusList[value].label });
            };
            item.width = item.width || 120;
            item.align = item.align || 'center';
          } else {
            if (item.showTooltip) {
              item.render = function (value, record, index) {
                return _react2.default.createElement(
                  _antd.Tooltip,
                  { title: value },
                  value
                );
              };
            }
          }
        }

        if (item.width) {
          item.width = parseInt(item.width);
        }

        tableColumns.push(item);
      });

      this.setState({ columns: tableColumns });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.url !== this.props.url) {
        this.getList();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _state = this.state,
          dataSource = _state.dataSource,
          pagination = _state.pagination,
          loading = _state.loading,
          columns = _state.columns;


      return _react2.default.createElement(_table2.default, {
        rowKey: function rowKey(record) {
          return record.id;
        },
        loading: loading,
        dataSource: dataSource,
        columns: columns || [],
        pagination: pagination,
        size: 'middle',
        bordered: true,
        onRow: function onRow(record) {
          return {
            onClick: function onClick() {
              _this3.props.onRowClick && _this3.props.onRowClick(record);
            }
          };
        }
      });
    }
  }]);

  return CustomTable;
}(_react.Component);

exports.default = CustomTable;