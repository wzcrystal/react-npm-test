'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _dec3, _class, _desc, _value, _class2; /* eslint-disable */

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _icons = require('@ant-design/icons');

var _antd = require('antd');

var _debounce = require('lodash-decorators/debounce');

var _debounce2 = _interopRequireDefault(_debounce);

var _bind = require('lodash-decorators/bind');

var _bind2 = _interopRequireDefault(_bind);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

var _NoticeIcon = require('../NoticeIcon');

var _NoticeIcon2 = _interopRequireDefault(_NoticeIcon);

var _HeaderDropdown = require('../HeaderDropdown');

var _HeaderDropdown2 = _interopRequireDefault(_HeaderDropdown);

var _SelectLang = require('../SelectLang');

var _SelectLang2 = _interopRequireDefault(_SelectLang);

var _index = require('./index.less');

var _index2 = _interopRequireDefault(_index);

var _avatar = require('images/avatar.png');

var _avatar2 = _interopRequireDefault(_avatar);

var _sAuJeJzSKbUmHfBQRzmZ = require('images/sAuJeJzSKbUmHfBQRzmZ.svg');

var _sAuJeJzSKbUmHfBQRzmZ2 = _interopRequireDefault(_sAuJeJzSKbUmHfBQRzmZ);

var _wAhyIChODzsoKIOBHcBk = require('images/wAhyIChODzsoKIOBHcBk.svg');

var _wAhyIChODzsoKIOBHcBk2 = _interopRequireDefault(_wAhyIChODzsoKIOBHcBk);

var _umi = require('umi');

var _httpFetch = require('share/httpFetch');

var _httpFetch2 = _interopRequireDefault(_httpFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

var GlobalHeaderRight = (_dec = (0, _umi.connect)(function (_ref) {
  var user = _ref.user,
      messages = _ref.messages,
      menu = _ref.menu,
      languages = _ref.languages;
  return { user: user.currentUser, roles: user.currentUserRoles, currentRole: user.currentRole, messages: messages, funcList: menu.funcList, pageList: menu.pageList, languages: languages };
}), _dec2 = (0, _bind2.default)(), _dec3 = (0, _debounce2.default)(400), _dec(_class = (_class2 = function (_Component) {
  _inherits(GlobalHeaderRight, _Component);

  function GlobalHeaderRight() {
    var _ref2;

    var _temp, _this, _ret;

    _classCallCheck(this, GlobalHeaderRight);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref2 = GlobalHeaderRight.__proto__ || Object.getPrototypeOf(GlobalHeaderRight)).call.apply(_ref2, [this].concat(args))), _this), _this.state = {
      theme: '',
      total: 0,
      messagesList: [],
      messageTotal: 0,
      noticeTotal: 0,
      noticeList: [],
      funcList: [],
      messageLoading: false,
      switchFlag: _this.props.user.switchRolesFlag,
      selectedRole: _this.props.currentRole
    }, _this.getNoticeData = function () {
      var dispatch = _this.props.dispatch;

      _this.setState({ messageLoading: true });
      _httpFetch2.default.get(_config2.default.peripheralUrl + '/api/messages/query', {
        size: 9999,
        page: 0
      }).then(function (_ref3) {
        var data = _ref3.data;

        dispatch({
          type: 'messages/save',
          payload: {
            messagesList: (data.messagesList || []).filter(function (o) {
              return !o.readFlag;
            }).map(function (o) {
              return _extends({}, o, {
                description: _react2.default.createElement(
                  'p',
                  { style: { padding: 0, marginBottom: -8, whiteSpace: "normal", wordBreak: "break-all" } },
                  _react2.default.createElement('span', { style: { whiteSpace: "normal", wordBreak: "break-all" }, dangerouslySetInnerHTML: { __html: o.messageContent } }),
                  _react2.default.createElement(_antd.Divider, { style: { marginBottom: 12 } }),
                  _react2.default.createElement(
                    'span',
                    { style: { float: 'right' } },
                    (0, _moment2.default)(o.createdDate).format("YYYY-MM-DD HH:mm:ss")
                  )
                ),
                read: o.readFlag
              });
            }),
            noticeList: (data.noticeList || []).filter(function (o) {
              return !o.readFlag;
            }).map(function (o) {
              return _extends({}, o, {
                description: _react2.default.createElement(
                  'p',
                  { style: { padding: 0, marginBottom: -8, whiteSpace: "normal", wordBreak: "break-all" } },
                  _react2.default.createElement('span', { style: { whiteSpace: "normal", wordBreak: "break-all" }, dangerouslySetInnerHTML: { __html: o.messageContent } }),
                  _react2.default.createElement(_antd.Divider, { style: { marginBottom: 12 } }),
                  _react2.default.createElement(
                    'span',
                    { style: { float: "right" } },
                    (0, _moment2.default)(o.createdDate).format("YYYY-MM-DD HH:mm:ss")
                  )
                ),
                read: o.readFlag
              });
            }),
            messageTotal: Number((data.total || {}).messageTotal),
            noticeTotal: Number((data.total || {}).noticeTotal),
            total: Number((data.total || {}).total)
          }
        });
        _this.setState({ messageLoading: false });
      }).catch(function (err) {
        console.log(err);
        _this.setState({ messageLoading: false });
      });
    }, _this.gotoMessageNotice = function (props) {
      var num = props.title === _this.$t('common.notice') /** 通知 */ ? 1 : 0;
      _umi.history.push('/peripheral/peripheral_message_notice/peripheral_message_notice/' + num);
    }, _this.changeReadState = function (clickedItem, tabProps) {
      var _this$state = _this.state,
          messagesList = _this$state.messagesList,
          noticeList = _this$state.noticeList;
      var _this$state2 = _this.state,
          noticeTotal = _this$state2.noticeTotal,
          total = _this$state2.total,
          messageTotal = _this$state2.messageTotal;
      var id = clickedItem.id,
          read = clickedItem.read;

      if (read) return;

      _httpFetch2.default.post(_config2.default.peripheralUrl + '/api/messages/read/' + id).then(function () {
        _this.props.dispatch({
          type: 'messages/clear',
          payload: {
            title: tabProps.title,
            id: id
          }
        });
      });
    }, _this.toggleRoleModel = function (e) {
      var _this$props = _this.props,
          getMenus = _this$props.getMenus,
          dispatch = _this$props.dispatch,
          roles = _this$props.roles;
      // 正在开启角色切换功能...        // 正在关闭角色切换功能...

      _this.hideMessage = e ? _antd.message.loading(_this.$t("base.turning.on.role.switching"), 0) : _antd.message.loading(_this.$t("base.turning.off.role.switching"), 0);
      _httpFetch2.default.post(_config2.default.authUrl + '/api/role/setting?enabled=' + e).then(function (res) {
        if (e) {
          var selectRole = roles.find(function (item) {
            return item.id === res.data;
          });
          dispatch({
            type: "user/saveCurrentRole",
            payload: selectRole
          });
          _this.setState({ selectedRole: selectRole });
        }

        _antd.message.success(_this.$t('base.operation.successful1')); /** 操作成功！ */
        _this.setState({ switchFlag: e });
        _this.hideMessage();
        // window.location.reload();
        window.location.href = '/';
        // getMenus(e).then(() => {
        //   this.hideMessage();
        // }).catch(err => {
        //   this.hideMessage();
        // });
      });
    }, _this.onRoleClick = function (e) {
      var _this$props2 = _this.props,
          dispatch = _this$props2.dispatch,
          roles = _this$props2.roles,
          getMenus = _this$props2.getMenus;
      var _this$state3 = _this.state,
          switchFlag = _this$state3.switchFlag,
          selectedRole = _this$state3.selectedRole;

      if (selectedRole.roleCode === e.key) {
        return;
      }
      _this.hideMessage = _antd.message.loading(_this.$t("base.switching.roles"), 0); /** 正在切换角色... */

      var selectRole = roles.find(function (item) {
        return item.roleCode === e.key;
      });
      _httpFetch2.default.put(_config2.default.authUrl + '/api/user/role/switch?roleId=' + selectRole.id).then(function (res) {
        if (res.data) {
          _this.setState({ selectedRole: selectRole });
          dispatch({
            type: "user/saveCurrentRole",
            payload: selectRole
          });
          _this.hideMessage();
          //window.location.reload();
          window.location.href = '/';
        }
      });
    }, _this.onTenantClick = function (e) {
      var user = _this.props.user;

      if (user.tenantId === e.key) {
        return;
      }
      _this.hideMessage = _antd.message.loading(_this.$t("base.switching.tenants"), 0); /** 正在切换租户... */
      var tenant = user.tenantList.find(function (item) {
        return item.id === e.key;
      });
      _httpFetch2.default.put(_config2.default.authUrl + '/api/user/tenant/switch?tenantId=' + tenant.id + '&enabled=' + tenant.enabled).then(function (res) {
        if (res.data) {
          _this.hideMessage();
          //window.location.reload();
          window.location.href = '/';
        }
      }).catch(function () {
        _this.hideMessage();
      });
    }, _this.onMenuChange = function (value) {
      var pageList = _this.props.pageList;

      var page = pageList.find(function (o) {
        return o.pageId === value;
      });
      _umi.history.push(page.fullUrl);
    }, _this.popupVisibleChange = function (value) {
      if (value) {
        _this.getNoticeData();
      }
    }, _this.clearMessages = function (tabName) {
      _httpFetch2.default.post(_config2.default.peripheralUrl + '/api/messages/read/all?typeEnum=' + (tabName === _this.$t('base.news') /** 消息 */ ? 'MESSAGE' : 'NOTICE')).then(function () {
        _antd.message.success(_this.$t('base.operation.successful1')); /** 操作成功！ */
        var dispatch = _this.props.dispatch;

        dispatch({
          type: 'messages/clearAll',
          payload: {
            title: tabName
          }
        });
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(GlobalHeaderRight, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.getNoticeData();
      var funcList = this.props.funcList;

      this.setState({ funcList: (funcList || []).map(function (o) {
          return { value: o.pageId, text: o.functionName };
        }) });
    }

    // 路由到消息通知界面


    // 标记已读

    // 租户切换

  }, {
    key: 'search',
    value: function search(value) {
      var funcList = this.props.funcList;

      var funcs = [];
      if (value) {
        funcs = (funcList || []).filter(function (o) {
          return (o.functionName || "").indexOf(value) >= 0;
        }).map(function (o) {
          return { value: o.pageId, text: o.functionName };
        });
      } else {
        funcs = (funcList || []).map(function (o) {
          return { value: o.pageId, text: o.functionName };
        });
      }
      this.setState({ funcList: funcs });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          user = _props.user,
          fetchingMoreNotices = _props.fetchingMoreNotices,
          fetchingNotices = _props.fetchingNotices,
          loadedAllNotices = _props.loadedAllNotices,
          onNoticeVisibleChange = _props.onNoticeVisibleChange,
          onMenuClick = _props.onMenuClick,
          onNoticeClear = _props.onNoticeClear,
          skeletonCount = _props.skeletonCount,
          theme = _props.theme,
          currentUser = _props.currentUser,
          roles = _props.roles,
          currentRole = _props.currentRole;
      var _state = this.state,
          switchFlag = _state.switchFlag,
          selectedRole = _state.selectedRole;
      var _props$messages = this.props.messages,
          messagesList = _props$messages.messagesList,
          messageTotal = _props$messages.messageTotal,
          total = _props$messages.total,
          noticeTotal = _props$messages.noticeTotal,
          noticeList = _props$messages.noticeList;
      var _state2 = this.state,
          funcList = _state2.funcList,
          messageLoading = _state2.messageLoading;

      var menu = _react2.default.createElement(
        _antd.Menu,
        { className: _index2.default.menu, selectedKeys: [], onClick: onMenuClick },
        _react2.default.createElement(
          _antd.Menu.Item,
          { key: 'userCenter' },
          _react2.default.createElement(_icons.UserOutlined, null),
          this.$t("base.personal.center")
        ),
        user.enableSwitchRole && _react2.default.createElement(
          _antd.Menu.Item,
          { key: 'toggleMenu' },
          _react2.default.createElement(_icons.TeamOutlined, null),
          this.$t("base.role.switching:"),
          _react2.default.createElement(_antd.Switch, {
            size: 'small',
            style: { marginLeft: 4 },
            defaultChecked: switchFlag,
            onChange: this.toggleRoleModel
          })
        ),
        _react2.default.createElement(
          _antd.Menu.Item,
          { key: 'logout' },
          _react2.default.createElement(_icons.LogoutOutlined, null),
          this.$t("base.log.out")
        )
      );
      var loadMoreProps = {
        skeletonCount: skeletonCount,
        loadedAll: loadedAllNotices,
        loading: fetchingMoreNotices
      };
      var className = _index2.default.right;
      if (theme === 'dark') {
        className = _index2.default.right + '  ' + _index2.default.dark;
      }

      var rolesMenu = roles && roles.length > 0 ? _react2.default.createElement(
        _antd.Menu,
        { className: _index2.default.menu, selectedKeys: [], onClick: this.onRoleClick },
        roles.map(function (item) {
          return _react2.default.createElement(
            _antd.Menu.Item,
            { key: item.roleCode },
            _react2.default.createElement(_icons.TeamOutlined, null),
            item.roleName
          );
        })
      ) : null;
      var tenantListMenu = _react2.default.createElement(
        _antd.Menu,
        { className: _index2.default.menu, selectedKeys: [user.tenantId], onClick: this.onTenantClick },
        user.tenantList.map(function (item) {
          return _react2.default.createElement(
            _antd.Menu.Item,
            { key: item.id },
            _react2.default.createElement(_icons.TeamOutlined, null),
            item.tenantName
          );
        })
      );
      return _react2.default.createElement(
        'div',
        { className: className },
        user.tenantList != null && user.tenantList != undefined && user.tenantList.length > 1 ? _react2.default.createElement(
          _HeaderDropdown2.default,
          { overlay: tenantListMenu },
          _react2.default.createElement(
            'span',
            { style: { marginRight: 8 } },
            user.tenantName
          )
        ) : _react2.default.createElement(
          'span',
          { style: { marginRight: 8 } },
          user.tenantName
        ),
        _react2.default.createElement(
          _NoticeIcon2.default,
          {
            className: _index2.default.action,
            count: total,
            onViewMore: function onViewMore(props) {
              return _this2.gotoMessageNotice(props);
            },
            clearClose: true,
            onItemClick: this.changeReadState,
            onClear: this.clearMessages,
            locale: { emptyText: this.$t("base.no.news"), /** 没有消息 */clear: this.$t('common.clear'), /** 清空 */viewMore: this.$t("base.view.all") /** 查看全部 */ },
            onPopupVisibleChange: this.popupVisibleChange,
            loading: messageLoading
          },
          _react2.default.createElement(_NoticeIcon2.default.Tab, {
            count: messageTotal,
            list: messagesList.filter(function (o) {
              return !o.read;
            }),
            title: this.$t("base.news") /** 消息 */
            , emptyImage: _sAuJeJzSKbUmHfBQRzmZ2.default,
            showViewMore: true,
            emptyText: this.$t("base.you.have.read.all.the.messages") /** 您已读完所有消息 */
          }),
          _react2.default.createElement(_NoticeIcon2.default.Tab, {
            count: noticeTotal,
            list: noticeList.filter(function (o) {
              return !o.read;
            }),
            title: this.$t('common.notice') /** 通知 */
            , emptyImage: _wAhyIChODzsoKIOBHcBk2.default,
            showViewMore: true,
            emptyText: this.$t("base.you've.viewed.all.notifications") /** 你已查看所有通知 */
          })
        ),
        user.id ? _react2.default.createElement(
          _HeaderDropdown2.default,
          { overlay: menu },
          _react2.default.createElement(
            'span',
            { className: _index2.default.action + ' ' + _index2.default.account },
            _react2.default.createElement(_antd.Avatar, {
              size: 'small',
              className: _index2.default.avatar,
              src: user.iconUrl ? '' + _config2.default.fileUrl + user.iconUrl + '?access_token=' + sessionStorage.getItem('token') : _avatar2.default,
              alt: 'avatar'
            }),
            _react2.default.createElement(
              'span',
              { className: _index2.default.name },
              user.userName
            )
          )
        ) : _react2.default.createElement(_antd.Spin, { size: 'small', style: { marginLeft: 8, marginRight: 8 } }),
        switchFlag && selectedRole ? _react2.default.createElement(
          _HeaderDropdown2.default,
          { overlay: rolesMenu },
          _react2.default.createElement(
            'span',
            { style: { marginRight: 8 } },
            selectedRole.roleName
          )
        ) : null,
        _react2.default.createElement(_SelectLang2.default, { className: _index2.default.action })
      );
    }
  }]);

  return GlobalHeaderRight;
}(_react.Component), (_applyDecoratedDescriptor(_class2.prototype, 'search', [_dec2, _dec3], Object.getOwnPropertyDescriptor(_class2.prototype, 'search'), _class2.prototype)), _class2)) || _class);
exports.default = GlobalHeaderRight;