'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _compatible = require('@ant-design/compatible');

var _antd = require('antd');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by 13576 on 2018/1/25.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


/**
 * 审批历史
 */
var ApproveHistoryWorkFlow = function (_React$Component) {
  _inherits(ApproveHistoryWorkFlow, _React$Component);

  function ApproveHistoryWorkFlow(props) {
    _classCallCheck(this, ApproveHistoryWorkFlow);

    var _this = _possibleConstructorReturn(this, (ApproveHistoryWorkFlow.__proto__ || Object.getPrototypeOf(ApproveHistoryWorkFlow)).call(this, props));

    _this.state = {
      historyData: []
    };
    return _this;
  }

  _createClass(ApproveHistoryWorkFlow, [{
    key: 'getHistory',
    value: function getHistory() {
      var _this2 = this;

      var historyData = this.props.infoData;
      var children = [];
      historyData.map(function (item, i) {
        children.push(_this2.getHistoryRender(item, i));
      });
      return children;
    }
  }, {
    key: 'getColor',
    value: function getColor(value) {
      var model = {};

      switch (value.operationType) {
        case 1000:
          if (value.operation === 1001) {
            model.color = 'cyan';
            model.text = this.$t('common.create'); //新建
          } else if (value.operation === 1002) {
            model.color = 'blue';
            model.text = this.$t('common.submit');
            model.dot = 'up-circle-o';
          } else if (value.operation === 1003) {
            model.color = 'red';
            model.text = this.$t('common.withdraw'); //撤回
            model.dot = 'down-circle-o';
          } else if (value.operation === 1004) {
            model.color = 'green';
            model.text = this.$t('common.approve.pass'); // 审批通过
            model.dot = 'check-circle-o';
          } else if (value.operation === 1005) {
            model.color = 'red';
            model.text = this.$t('common.approve.rejected'); //审批驳回
            model.dot = 'close-circle-o';
          } else if (value.operation === 6001) {
            model.color = 'yellow';
            model.text = this.$t('my.zan.gua'); //暂挂中
          } else if (value.operation === 6002) {
            model.color = 'red';
            model.text = this.$t('common.cancel'); //已取消
          } else if (value.operation === 6003) {
            model.color = 'green';
            model.text = this.$t('my.contract.state.finish'); //已完成
          } else if (value.operation === 6004) {
            model.color = 'green';
            model.text = this.$t('my.contract.cancel.hold'); //取消暂挂
          } else if (value.operation === 9001) {
            model.color = 'blue';
            model.text = this.$t('menu.pay'); //支付
            model.dot = 'pay-circle-o';
          } else if (value.operation === 9002) {
            model.color = 'blue';
            model.text = this.$t('acp.payment.return'); //退款
            model.dot = 'down-circle-o';
          } else if (value.operation === 9003) {
            model.color = 'blue';
            model.text = this.$t('acp.payment.refund'); //退票
            model.dot = 'down-circle-o';
          } else if (value.operation === 9004) {
            model.color = 'blue';
            model.text = this.$t('acp.payment.reserved'); //反冲
            model.dot = 'clock-circle-o';
          } else {
            model.color = 'grey';
            model.text = this.$t('expense.invoice.type.unknown'); //未知
          }
          break;

        case 1001:
          if (value.operation === 1001) {
            model.color = 'blue';
            model.text = this.$t('common.submit'); //提交
            model.dot = 'up-circle-o';
          } else if (value.operation === 1002) {
            model.color = 'red';
            model.text = this.$t('common.withdraw'); //撤回
            model.dot = 'down-circle-o';
          } else if (value.operation === 5004) {
            model.color = 'blue';
            model.text = this.$t('my.return.submit'); //还款提交
            model.dot = 'up-circle-o';
          } else if (value.operation === 2001) {
            model.color = 'green';
            model.text = this.$t('common.approve.pass'); //审批通过
            model.dot = 'check-circle-o';
          } else if (value.operation === 5009) {
            model.color = 'grey';
            model.text = this.$t('my.add.hui.qian'); //添加会签
            model.dot = 'check-circle-o';
          }
          break;
        case 1002:
          if (value.operation === 2001) {
            model.color = 'green';
            model.text = this.$t('common.approve.pass'); //审批通过
            model.dot = 'check-circle-o';
          } else if (value.operation === 2002) {
            model.color = 'red';
            model.text = this.$t('common.approve.rejected'); //审批驳回
            model.dot = 'close-circle-o';
          } else if (value.operation === 2004) {
            model.color = 'red';
            model.text = this.$t('common.approve.return'); //审批驳回
            model.dot = 'close-circle-o';
          } else if (value.operation === 5009) {
            model.color = 'grey';
            model.text = this.$t('my.add.hui.qian'); //添加会签
            model.dot = 'check-circle-o';
          }
          break;
        case 1003:
          if (value.operation === 3001) {
            model.color = 'green';
            model.text = this.$t('batch.print.approved'); //审核通过
            model.dot = 'check-circle-o';
          } else if (value.operation === 4001) {
            model.color = 'grey';
            model.text = this.$t('constants.approvelHistory.auditPay'); //财务付款
          } else if (value.operation === 3002) {
            model.color = 'red';
            model.text = this.$t('constants.documentStatus.audit.rejected'); //审核驳回
            model.dot = 'close-circle-o';
          } else if (value.operation === 4001) {
            model.color = 'grey';
            model.text = this.$t('constants.approvelHistory.auditPay'); //财务付款
          } else if (value.operation === 4000) {
            model.color = 'grey';
            model.text = this.$t('constants.approvelHistory.auditPaying'); //财务付款中
          } else if (value.operation === 7001) {
            model.color = 'grey';
            model.text = this.$t('constants.approvelHistory.amountEdit'); //核定金额修改
          } else if (value.operation === 7002) {
            model.color = 'grey';
            model.text = this.$t('constants.approvelHistory.rateEdit'); //核定汇率修改
          } else if (value.operation === 7003) {
            model.color = 'grey';
            model.text = this.$t('constants.approvelHistory.amountAndRateEdit'); //核定金额和汇率修改
          } else if (value.operation === 5009) {
            model.color = 'grey';
            model.text = this.$t('my.add.hui.qian'); //添加会签
            model.dot = 'close-circle-o';
          }
          break;
        case 1004:
          if (value.operation === 4011) {
            model.color = 'green';
            model.text = this.$t('constants.documentStatus.invoice.pass'); //开票通过
            model.dot = 'check-circle-o';
          } else if (value.operation === 4002) {
            model.color = 'red';
            model.text = this.$t('constants.approvelHistory.invoiceFail'); //开票驳回
          } else if (value.operation === 3002) {
            model.color = 'grey';
            model.text = this.$t('my.add.hui.qian');
          }
        //工作台日志记录
        case 1009:
          if (value.operation === 1000) {
            model.color = 'green';
            model.text = this.$t('workflow.workbench.log.enterPool'); //工作台--入池
          } else if (value.operation === 1001) {
            model.color = 'red';
            model.text = this.$t('workflow.workbench.log.distribute'); //工作台--分配
            model.dot = 'down-circle-o';
          } else if (value.operation === 1002) {
            model.color = 'grey';
            model.text = this.$t('workflow.workbench.log.approve'); // 工作台--通过
            model.dot = 'down-circle-o';
          } else if (value.operation === 1003) {
            model.color = 'grey';
            model.text = this.$t('workflow.workbench.log.returnFrontNode'); // 工作台--退回至上一节点
            model.dot = 'down-circle-o';
          } else if (value.operation === 1004) {
            model.color = 'grey';
            model.dot = 'down-circle-o';
            model.text = this.$t('workflow.workbench.log.reject'); // 工作台--退回至申请人
          } else if (value.operation === 1005) {
            model.dot = 'down-circle-o';
            model.color = 'grey';
            model.text = this.$t('workflow.workbench.log.hold'); // 工作台--暂挂
          } else if (value.operation === 1006) {
            model.dot = 'down-circle-o';
            model.color = 'grey';
            model.text = this.$t('workflow.workbench.log.cancelHold'); // 工作台--取消暂挂
          } else if (value.operation === 1007) {
            model.dot = 'down-circle-o';
            model.color = 'grey';
            model.text = this.$t('workflow.workbench.log.applyReturn'); //工作台--申请退回
          } else if (value.operation === 1008) {
            model.dot = 'down-circle-o';
            model.color = 'grey';
            model.text = this.$t('workflow.workbench.log.applyReturnApprve'); //工作台--申请退回通过
          } else if (value.operation === 1009) {
            model.dot = 'down-circle-o';
            model.color = 'grey';
            model.text = this.$t('workflow.workbench.log.applyReturnReject'); //工作台--申请退回驳回
          } else if (value.operation === 1010) {
            model.dot = 'down-circle-o';
            model.color = 'grey';
            model.text = this.$t('workflow.workbench.log.forceApplyReturn'); // 工作台--强制申请退回
          }
      }
      return model;
    }
  }, {
    key: 'getHistoryRender',
    value: function getHistoryRender(item, i) {
      if (item) {
        var model = this.getColor(item);
        return _react2.default.createElement(
          _antd.Timeline.Item,
          { dot: model.dot ? _react2.default.createElement(_compatible.Icon, { type: model.dot }) : '', color: model.color, key: i },
          _react2.default.createElement(
            _antd.Row,
            null,
            _react2.default.createElement(
              _antd.Col,
              { span: 3 },
              _react2.default.createElement(
                'div',
                { style: { fontWeight: 'bold' } },
                model.text
              )
            ),
            _react2.default.createElement(
              _antd.Col,
              { span: 4 },
              _react2.default.createElement(
                'div',
                { style: { color: 'rgba(0,0,0,0.5)' } },
                (0, _moment2.default)(item.lastModifiedDate).format('YYYY-MM-DD HH:mm:ss')
              )
            ),
            _react2.default.createElement(
              _antd.Col,
              { span: 5 },
              _react2.default.createElement(
                'div',
                { style: {} },
                ' ',
                item.employeeName,
                '-',
                item.employeeID,
                ' '
              )
            ),
            _react2.default.createElement(
              _antd.Col,
              { span: 12 },
              _react2.default.createElement(
                'div',
                null,
                item.operationDetail
              )
            )
          )
        );
      }
      return '';
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _antd.Spin,
        { spinning: this.props.loading },
        _react2.default.createElement(
          'div',
          { className: 'approve-history' },
          _react2.default.createElement(
            'div',
            { className: 'collapse' },
            _react2.default.createElement(
              _antd.Collapse,
              { bordered: false, defaultActiveKey: ['1'] },
              _react2.default.createElement(
                _antd.Collapse.Panel,
                { header: this.$t('expense.approval.history'), key: '1' },
                _react2.default.createElement(
                  'div',
                  { style: { paddingTop: 10, paddingLeft: 15 } },
                  this.props.infoData.length ? _react2.default.createElement(
                    _antd.Timeline,
                    null,
                    this.getHistory()
                  ) : _react2.default.createElement(
                    'div',
                    { style: { textAlign: 'center' } },
                    this.$t('acp.no.data')
                  )
                )
              )
            )
          )
        )
      );
    }
  }]);

  return ApproveHistoryWorkFlow;
}(_react2.default.Component);

ApproveHistoryWorkFlow.propTypes = {
  infoData: _propTypes2.default.array.isRequired, //传入的基础信息值
  loading: _propTypes2.default.bool //是否显示正在加载中图标
};

ApproveHistoryWorkFlow.defaultProps = {
  infoData: [],
  loading: false
};

exports.default = ApproveHistoryWorkFlow;