/* eslint-disable */

import React, { Component } from 'react';
import { LogoutOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import { Spin, Menu, Avatar, message, Divider, Switch } from 'antd';
import Debounce from 'lodash-decorators/debounce';
import Bind from 'lodash-decorators/bind';
import moment from 'moment';
import config from 'config';
import NoticeIcon from '../NoticeIcon';
import HeaderDropdown from '../HeaderDropdown';
import SelectLang from '../SelectLang';
import styles from './index.less';
import userIcon from 'images/avatar.png'
import image1 from 'images/sAuJeJzSKbUmHfBQRzmZ.svg';
import image2 from 'images/wAhyIChODzsoKIOBHcBk.svg';
import { history, connect } from 'umi'
import fetch from 'share/httpFetch';

@connect(({ user, messages, menu, languages }) => ({ user: user.currentUser, roles: user.currentUserRoles, currentRole: user.currentRole, messages, funcList: menu.funcList, pageList: menu.pageList, languages }))
class GlobalHeaderRight extends Component {
  state = {
    theme: '',
    total: 0,
    messagesList: [],
    messageTotal: 0,
    noticeTotal: 0,
    noticeList: [],
    funcList: [],
    messageLoading: false,
    switchFlag: this.props.user.switchRolesFlag,
    selectedRole: this.props.currentRole,
  }

  componentDidMount() {
    this.getNoticeData();
    const { funcList } = this.props;
    this.setState({ funcList: (funcList || []).map(o => ({ value: o.pageId, text: o.functionName })) })
  }

  getNoticeData = () => {
    const { dispatch } = this.props;
    this.setState({ messageLoading: true });
    fetch
      .get(`${config.peripheralUrl}/api/messages/query`, {
        size: 9999,
        page: 0,
      })
      .then(({ data }) => {
        dispatch({
          type: 'messages/save',
          payload: {
            messagesList: (data.messagesList || []).filter(o => !o.readFlag).map(o => ({
              ...o,
              description:
                (
                  <p style={{ padding: 0, marginBottom: -8, whiteSpace: "normal", wordBreak: "break-all" }}>
                    <span style={{ whiteSpace: "normal", wordBreak: "break-all" }} dangerouslySetInnerHTML={{ __html: o.messageContent }} />
                    <Divider style={{ marginBottom: 12 }} />
                    <span style={{ float: 'right' }}>{moment(o.createdDate).format("YYYY-MM-DD HH:mm:ss")}</span>
                  </p>
                ),
              read: o.readFlag,
            })),
            noticeList: (data.noticeList || []).filter(o => !o.readFlag).map(o => ({
              ...o,
              description:
                (
                  <p style={{ padding: 0, marginBottom: -8, whiteSpace: "normal", wordBreak: "break-all" }}>
                    <span style={{ whiteSpace: "normal", wordBreak: "break-all" }} dangerouslySetInnerHTML={{ __html: o.messageContent }} />
                    <Divider style={{ marginBottom: 12 }} />
                    <span style={{ float: "right" }}>{moment(o.createdDate).format("YYYY-MM-DD HH:mm:ss")}</span>
                  </p>
                ),
              read: o.readFlag,
            })),
            messageTotal: Number((data.total || {}).messageTotal),
            noticeTotal: Number((data.total || {}).noticeTotal),
            total: Number((data.total || {}).total),
          }
        })
        this.setState({ messageLoading: false });
      })
      .catch(err => {
        console.log(err);
        this.setState({ messageLoading: false });
      });
  };

  // 路由到消息通知界面
  gotoMessageNotice = (props) => {
    const num = props.title === this.$t('common.notice') /** 通知 */ ? 1 : 0;
    history.push(
      `/peripheral/peripheral_message_notice/peripheral_message_notice/${num}`
    );
  };

  // 标记已读
  changeReadState = (clickedItem, tabProps) => {
    const { messagesList, noticeList } = this.state;
    let { noticeTotal, total, messageTotal } = this.state;
    const { id, read } = clickedItem;
    if (read) return;

    fetch.post(`${config.peripheralUrl}/api/messages/read/` + id).then(() => {
      this.props.dispatch({
        type: 'messages/clear',
        payload: {
          title: tabProps.title,
          id: id
        }
      });
    });
  };

  toggleRoleModel = e => {
    const { getMenus, dispatch, roles } = this.props;
    // 正在开启角色切换功能...        // 正在关闭角色切换功能...
    this.hideMessage = e ? message.loading(this.$t("base.turning.on.role.switching"), 0) : message.loading(this.$t("base.turning.off.role.switching"), 0);
    fetch
      .post(
        `${config.authUrl}/api/role/setting?enabled=${e}`
      )
      .then((res) => {
        if (e) {
          const selectRole = roles.find(item => item.id === res.data);
          dispatch({
            type: "user/saveCurrentRole",
            payload: selectRole
          });
          this.setState({ selectedRole: selectRole })
        }

        message.success(this.$t('base.operation.successful1')); /** 操作成功！ */
        this.setState({ switchFlag: e });
        this.hideMessage();
        // window.location.reload();
        window.location.href = '/';
        // getMenus(e).then(() => {
        //   this.hideMessage();
        // }).catch(err => {
        //   this.hideMessage();
        // });
      });

  };

  onRoleClick = e => {
    const { dispatch, roles, getMenus } = this.props;
    const { switchFlag, selectedRole } = this.state;
    if (selectedRole.roleCode === e.key) {
      return;
    }
    this.hideMessage = message.loading(this.$t("base.switching.roles"), 0); /** 正在切换角色... */

    const selectRole = roles.find(item => item.roleCode === e.key);
    fetch
      .put(
        `${config.authUrl}/api/user/role/switch?roleId=${selectRole.id}`
      )
      .then((res) => {
        if (res.data) {
          this.setState({ selectedRole: selectRole })
          dispatch({
            type: "user/saveCurrentRole",
            payload: selectRole
          });
          this.hideMessage();
          //window.location.reload();
          window.location.href = '/';
        }
      });


  };
  // 租户切换
  onTenantClick = e => {
    const { user } = this.props;
    if (user.tenantId === e.key) {
      return;
    }
    this.hideMessage = message.loading(this.$t("base.switching.tenants"), 0); /** 正在切换租户... */
    const tenant = user.tenantList.find(item => item.id === e.key);
    fetch
      .put(
        `${config.authUrl}/api/user/tenant/switch?tenantId=${tenant.id}&enabled=${tenant.enabled}`
      )
      .then((res) => {
        if (res.data) {
          this.hideMessage();
          //window.location.reload();
          window.location.href = '/';
        }
      }).catch(() => {
        this.hideMessage();
      });
  }

  @Bind()
  @Debounce(400)
  search(value) {
    const { funcList } = this.props;
    let funcs = [];
    if (value) {
      funcs = (funcList || []).filter(o => (o.functionName || "").indexOf(value) >= 0).map(o => ({ value: o.pageId, text: o.functionName }));
    } else {
      funcs = (funcList || []).map(o => ({ value: o.pageId, text: o.functionName }));
    }
    this.setState({ funcList: funcs });
  }

  onMenuChange = value => {
    const { pageList } = this.props;
    const page = pageList.find(o => o.pageId === value);
    history.push(page.fullUrl)
  }

  popupVisibleChange = (value) => {
    if (value) {
      this.getNoticeData();
    }
  }

  clearMessages = tabName => {
    fetch
      .post(
        `${config.peripheralUrl}/api/messages/read/all?typeEnum=` +
        (tabName === this.$t('base.news') /** 消息 */ ? 'MESSAGE' : 'NOTICE')
      )
      .then(() => {
        message.success(this.$t('base.operation.successful1')); /** 操作成功！ */
        const { dispatch } = this.props;
        dispatch({
          type: 'messages/clearAll',
          payload: {
            title: tabName,
          },
        })
      });
  };

  render() {
    const {
      user,
      fetchingMoreNotices,
      fetchingNotices,
      loadedAllNotices,
      onNoticeVisibleChange,
      onMenuClick,
      onNoticeClear,
      skeletonCount,
      theme,
      currentUser,
      roles,
      currentRole
    } = this.props;

    const { switchFlag, selectedRole } = this.state;

    const { messagesList, messageTotal, total, noticeTotal, noticeList } = this.props.messages;
    const { funcList, messageLoading } = this.state;
    const menu = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
        <Menu.Item key="userCenter">
          <UserOutlined />
          {/* 个人中心 */}
          {this.$t("base.personal.center")}
        </Menu.Item>
        {user.enableSwitchRole &&
          <Menu.Item key="toggleMenu">
            <TeamOutlined />
            {/* 角色切换： */}
            {this.$t("base.role.switching:")}
            <Switch
              size="small"
              style={{ marginLeft: 4 }}
              defaultChecked={switchFlag}
              onChange={this.toggleRoleModel}
            />
          </Menu.Item>
        }
        <Menu.Item key="logout">
          <LogoutOutlined />
          {/* 退出登录 */}
          {this.$t("base.log.out")}
        </Menu.Item>
      </Menu>
    );
    const loadMoreProps = {
      skeletonCount,
      loadedAll: loadedAllNotices,
      loading: fetchingMoreNotices,
    };
    let className = styles.right;
    if (theme === 'dark') {
      className = `${styles.right}  ${styles.dark}`;
    }

    const rolesMenu =
      roles && roles.length > 0 ? (
        <Menu className={styles.menu} selectedKeys={[]} onClick={this.onRoleClick}>
          {roles.map(item => {
            return (
              <Menu.Item key={item.roleCode}>
                <TeamOutlined />
                {item.roleName}
              </Menu.Item>
            );
          })}
        </Menu>
      ) : null;
    const tenantListMenu = (
      <Menu className={styles.menu} selectedKeys={[user.tenantId]} onClick={this.onTenantClick}>
        {user.tenantList.map(item => {
          return (
            <Menu.Item key={item.id}>
              <TeamOutlined />
              {item.tenantName}
            </Menu.Item>
          );
        })}
      </Menu>
    );
    return (
      <div className={className}>
        {/* <HeaderSearch
          className={`${styles.action} ${styles.search}`}
          placeholder="功能搜索"
          dataSource={funcList}
          onSearch={this.search}
          onSelect={this.onMenuChange}
        /> */}
        {/* <Tooltip title={formatMessage({ id: 'component.globalHeader.help' })}>
          <a
            target="_blank"
            href="https://pro.ant.design/docs/getting-started"
            rel="noopener noreferrer"
            className={styles.action}
          >
            <Icon type="question-circle-o" />
          </a>
        </Tooltip> */}
        {(user.tenantList != null && user.tenantList != undefined && user.tenantList.length > 1) ?
          <HeaderDropdown overlay={tenantListMenu}>
            <span style={{ marginRight: 8 }}>{user.tenantName}</span>
          </HeaderDropdown>
          : <span style={{ marginRight: 8 }}>{user.tenantName}</span>
        }
        <NoticeIcon
          className={styles.action}
          count={total}
          onViewMore={(props) => this.gotoMessageNotice(props)}
          clearClose
          onItemClick={this.changeReadState}
          onClear={this.clearMessages}
          locale={{ emptyText: this.$t("base.no.news"), /** 没有消息 */ clear: this.$t('common.clear'), /** 清空 */ viewMore: this.$t("base.view.all") /** 查看全部 */ }}
          onPopupVisibleChange={this.popupVisibleChange}
          loading={messageLoading}
        >
          <NoticeIcon.Tab
            count={messageTotal}
            list={messagesList.filter(o => !o.read)}
            title={this.$t("base.news")} /** 消息 */
            emptyImage={image1}
            showViewMore
            emptyText={this.$t("base.you.have.read.all.the.messages")} /** 您已读完所有消息 */
          />
          <NoticeIcon.Tab
            count={noticeTotal}
            list={noticeList.filter(o => !o.read)}
            title={this.$t('common.notice')} /** 通知 */
            emptyImage={image2}
            showViewMore
            emptyText={this.$t("base.you've.viewed.all.notifications")} /** 你已查看所有通知 */
          />
        </NoticeIcon>
        {user.id ? (
          <HeaderDropdown overlay={menu}>
            <span className={`${styles.action} ${styles.account}`}>
              <Avatar
                size="small"
                className={styles.avatar}
                src={user.iconUrl ? `${config.fileUrl}${user.iconUrl}?access_token=${sessionStorage.getItem('token')}` : userIcon}
                alt="avatar"
              />
              <span className={styles.name}>{user.userName}</span>
            </span>
          </HeaderDropdown>
        ) : (
          <Spin size="small" style={{ marginLeft: 8, marginRight: 8 }} />
        )}

        {(switchFlag && selectedRole) ? (
          <HeaderDropdown overlay={rolesMenu}>
            <span style={{ marginRight: 8 }}>{selectedRole.roleName}</span>
          </HeaderDropdown>
        ) : null}

        <SelectLang className={styles.action} />
      </div>
    );
  }
}
export default GlobalHeaderRight
