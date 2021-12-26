'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp, _initialiseProps;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash.debounce');

var _lodash2 = _interopRequireDefault(_lodash);

var _icons = require('@ant-design/icons');

var _antd = require('antd');

require('styles/components/template/expense-type-selector.less');

var _base = require('share/base.service');

var _base2 = _interopRequireDefault(_base);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Search = _antd.Input.Search;
var ExpenseTypeSelector = (_temp = _class = function (_React$Component) {
  _inherits(ExpenseTypeSelector, _React$Component);

  function ExpenseTypeSelector(props) {
    _classCallCheck(this, ExpenseTypeSelector);

    var _this = _possibleConstructorReturn(this, (ExpenseTypeSelector.__proto__ || Object.getPrototypeOf(ExpenseTypeSelector)).call(this, props));

    _initialiseProps.call(_this);

    _this.state = {
      loading: true,
      sourceCategory: [],
      selectedExpenseType: {},
      selectedExpenseTypeArr: [],
      filterCategory: [],
      isShowHistoryExpenseType: true, //是否展示费用选择历史，搜索的时候不展示
      historyExpenseType: [] //费用选择历史记录
    };
    _this.handleSearch = (0, _lodash2.default)(_this.handleSearch, 500);
    return _this;
  }

  _createClass(ExpenseTypeSelector, [{
    key: 'componentWillMount',
    value: function componentWillMount() {}
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.getExpenseType(this.props);
      this.getExpenseTypeHistory(this.props);
      if (this.props.single) {
        this.setState({ selectedExpenseType: this.props.value || {} });
      } else if (!this.props.single) {
        this.setState({ selectedExpenseTypeArr: this.props.value || [] });
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var nextExpenseType = nextProps.value;
      if (nextProps.single && nextExpenseType && nextExpenseType.id && nextExpenseType.id !== this.state.selectedExpenseType.id) {
        this.setState({ selectedExpenseType: nextExpenseType });
      } else if (!nextProps.single && nextExpenseType && nextExpenseType.length !== this.state.selectedExpenseTypeArr.length) {
        this.setState({ selectedExpenseTypeArr: nextExpenseType });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _state = this.state,
          loading = _state.loading,
          filterCategory = _state.filterCategory,
          selectedExpenseType = _state.selectedExpenseType,
          selectedExpenseTypeArr = _state.selectedExpenseTypeArr,
          isShowHistoryExpenseType = _state.isShowHistoryExpenseType,
          historyExpenseType = _state.historyExpenseType;

      var resultLength = 0;
      var typeLength = filterCategory.length - 1;
      return _react2.default.createElement(
        'div',
        { className: 'expense-type-selector' },
        _react2.default.createElement(
          _antd.Spin,
          { spinning: loading },
          _react2.default.createElement(Search, {
            onChange: function onChange(value) {
              _this2.handleSearch(value.target.value);
            },
            placeholder: this.$t('expense.invoice.search.expenseType')
          }),
          isShowHistoryExpenseType && historyExpenseType.length > 0 && _react2.default.createElement(
            'div',
            { className: 'category-area' },
            _react2.default.createElement(
              'div',
              { className: 'category-name' },
              this.$t('common.select.history') /*历史选择*/
            ),
            _react2.default.createElement(
              _antd.Row,
              { gutter: 10 },
              historyExpenseType.map(function (expenseType) {
                var className = '';
                if (_this2.props.single) {
                  expenseType.expenseTypeOid === selectedExpenseType.expenseTypeOid && (className = 'selected');
                } else {
                  selectedExpenseTypeArr.map(function (expenseTypeItem) {
                    expenseTypeItem.expenseTypeOid === expenseType.expenseTypeOid && (className = 'selected');
                  });
                }
                return _react2.default.createElement(
                  _antd.Col,
                  {
                    span: 8,
                    key: expenseType.expenseTypeOid,
                    onClick: function onClick() {
                      _this2.handleSelect(expenseType);
                    }
                  },
                  _react2.default.createElement(
                    _antd.Card,
                    { className: 'expense-card ' + className },
                    _react2.default.createElement(_icons.CheckCircleOutlined, { className: 'selected-icon' }),
                    _react2.default.createElement('img', { src: expenseType.iconURL }),
                    _react2.default.createElement(
                      _antd.Popover,
                      { content: expenseType.name },
                      _react2.default.createElement(
                        'div',
                        { className: 'expense-name' },
                        expenseType.name
                      )
                    )
                  )
                );
              })
            )
          ),
          filterCategory.length > 0 ? filterCategory.map(function (expenseTypeCategory, index) {
            expenseTypeCategory.expenseType && (resultLength += expenseTypeCategory.expenseType.length);
            if (index === typeLength && resultLength === 0) {
              return _react2.default.createElement(
                'div',
                { className: 'search-no-expense' },
                _this2.$t('expense.invoice.no.expenseType') /*暂无费用类型*/
              );
            }
            return expenseTypeCategory.expenseType && expenseTypeCategory.expenseType.length > 0 ? _react2.default.createElement(
              'div',
              { className: 'category-area', key: expenseTypeCategory.expenseTypeCategoryOid },
              _react2.default.createElement(
                'div',
                { className: 'category-name' },
                expenseTypeCategory.name
              ),
              _react2.default.createElement(
                _antd.Row,
                { gutter: 10 },
                expenseTypeCategory.expenseType.map(function (expenseType) {
                  var className = '';
                  if (_this2.props.single) {
                    expenseType.expenseTypeOid === selectedExpenseType.expenseTypeOid && (className = 'selected');
                  } else {
                    selectedExpenseTypeArr.map(function (expenseTypeItem) {
                      expenseTypeItem.expenseTypeOid === expenseType.expenseTypeOid && (className = 'selected');
                    });
                  }
                  return _react2.default.createElement(
                    _antd.Col,
                    {
                      span: 8,
                      key: expenseType.expenseTypeOid,
                      onClick: function onClick() {
                        _this2.handleSelect(expenseType);
                      }
                    },
                    _react2.default.createElement(
                      _antd.Card,
                      { className: 'expense-card ' + className },
                      _react2.default.createElement(_icons.CheckCircleOutlined, { className: 'selected-icon' }),
                      _react2.default.createElement('img', { src: expenseType.iconURL }),
                      _react2.default.createElement(
                        _antd.Popover,
                        { content: expenseType.name },
                        _react2.default.createElement(
                          'div',
                          { className: 'expense-name' },
                          expenseType.name
                        )
                      )
                    )
                  );
                })
              )
            ) : null;
          }) : _react2.default.createElement(
            'div',
            { className: 'no-expense-type' },
            this.$t('expense.invoice.no.expenseType') /*暂无费用类型*/
          )
        )
      );
    }
  }]);

  return ExpenseTypeSelector;
}(_react2.default.Component), _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this.getExpenseTypeHistory = function (props) {
    var source = props.source,
        param = props.param;

    if (source === 'formV2') {
      _base2.default.getExpenseTypesHistoryByFormOid({ formOid: param.formOid }).then(function (res) {
        _this3.setState({
          historyExpenseType: res.data
        });
      });
    }
  };

  this.getSourceCategory = function () {
    var _props = _this3.props,
        source = _props.source,
        param = _props.param;

    var setOfBooksId = null;
    if (source === 'formV2' || source === 'form') {
      setOfBooksId = param.setOfBooksId;
    }
    if (_this3.state.sourceCategory.length === 0) return _base2.default.getExpenseTypeCategory(setOfBooksId).then(function (res) {
      _this3.setState({
        sourceCategory: res.data ? res.data : [],
        filterCategory: res.data ? res.data : []
      });
      return res.data ? res.data : [];
    });else return new Promise(function (resolve) {
      return resolve(_this3.state.sourceCategory);
    });
  };

  this.getExpenseType = function (props) {
    _this3.setState({ loading: true });
    var source = props.source,
        param = props.param,
        filter = props.filter;

    var listKey = void 0;
    _this3.getSourceCategory().then(function (sourceCategory) {
      var request = void 0;
      switch (source) {
        case 'company':
          request = _base2.default.getExpenseTypeByCompanyOid;
          break;
        case 'form':
          request = _base2.default.getExpenseTypesByFormOid;
          listKey = 'expenseTypes';
          break;
        case 'formV2':
          request = _base2.default.getExpenseTypesByFormOidV2;
          listKey = 'expenseTypes';
          break;
      }
      request && request(param).then(function (res) {
        var target = res.data;
        if (listKey) target = res.data[listKey];
        target = target.filter(filter);
        if (source !== 'formV2') target = target.filter(function (expenseType) {
          return expenseType.isAbleToCreatedManually;
        });
        target.map(function (expenseType) {
          if (expenseType.expenseTypeCategoryOid) {
            sourceCategory.map(function (item) {
              if (item.expenseTypeCategoryOid === expenseType.expenseTypeCategoryOid) {
                if (!item.expenseType) item.expenseType = [];
                item.expenseType.push(expenseType);
                return item;
              }
            });
          } else {
            //费用类型的expenseTypeCategoryOid为null时, add by mengsha.wang@huilianyi.com
            var nullCategoryItem = void 0;
            var nullCategoryOidExist = false;
            sourceCategory.map(function (item) {
              if (item.expenseTypeCategoryOid === '0000-0000-0000-0000-0000') {
                nullCategoryItem = item;
                nullCategoryOidExist = true;
                item.expenseType.push(expenseType);
                return item;
              }
            });
            if (!nullCategoryOidExist) {
              nullCategoryItem = {
                expenseTypeCategoryOid: '0000-0000-0000-0000-0000',
                name: _this3.$t('common.other'),
                expenseType: [expenseType]
              };
              sourceCategory.push(nullCategoryItem);
            }
          }
        });
        _this3.setState({ sourceCategory: sourceCategory, filterCategory: sourceCategory, loading: false });
      });
    });
  };

  this.handleSearch = function (value) {
    _this3.getSourceCategory().then(function (sourceCategory) {
      if (value === '') _this3.setState({ filterCategory: sourceCategory, isShowHistoryExpenseType: true });else {
        var result = [];
        sourceCategory.map(function (category, index) {
          result.push(Object.assign({}, category));
          result[index].expenseType = [];
          if (category.expenseType) {
            category.expenseType.map(function (expenseType) {
              if (expenseType.name.toLowerCase().indexOf(value.toLowerCase()) > -1) {
                result[index].expenseType.push(expenseType);
              }
            });
          }
        });
        _this3.setState({ filterCategory: result, isShowHistoryExpenseType: false });
      }
    });
  };

  this.handleSelect = function (expenseType) {
    if (_this3.props.single) {
      _this3.setState({
        selectedExpenseType: expenseType.expenseTypeOid === _this3.state.selectedExpenseType.expenseTypeOid ? {} : expenseType
      }, function () {
        _this3.props.onSelect(_this3.state.selectedExpenseType);
      });
    } else {
      var selectedExpenseTypeArr = _this3.state.selectedExpenseTypeArr;
      var expenseIndex = -1;
      selectedExpenseTypeArr.map(function (item, index) {
        item.expenseTypeOid === expenseType.expenseTypeOid && (expenseIndex = index);
      });
      expenseIndex !== -1 ? selectedExpenseTypeArr.splice(expenseIndex, 1) : selectedExpenseTypeArr.push(expenseType);
      _this3.setState({ selectedExpenseTypeArr: selectedExpenseTypeArr }, function () {
        _this3.props.onSelect(_this3.state.selectedExpenseTypeArr);
      });
    }
  };
}, _temp);


ExpenseTypeSelector.propTypes = {
  onSelect: _propTypes2.default.func.isRequired,
  source: _propTypes2.default.string,
  param: _propTypes2.default.any,
  value: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.array]), //single为false时，需要传入数组
  single: _propTypes2.default.bool, //是否为单选 add by mengsha.wang@huilianyi.com
  filter: _propTypes2.default.func
};

ExpenseTypeSelector.defaultProps = {
  single: true,
  filter: function filter() {
    return true;
  }
};

exports.default = ExpenseTypeSelector;