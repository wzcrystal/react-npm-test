import React, { PureComponent } from 'react';
import { messages as formatMessage } from '@/utils/utils';
import { qiankunStart } from 'umi';
import { GlobalOutlined } from '@ant-design/icons';
import { Menu, Modal, message } from 'antd';
import { connect } from 'dva';
import config from 'config'
import fetch from 'share/httpFetch';
import classNames from 'classnames';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';

@connect(({ languages }) => ({ languages }))
export default class SelectLang extends PureComponent {

  changeLang = ({ key: value }) => {
    Modal.confirm({
      title: this.$t("base.sure.to.switch.the.locale?"),
      content: this.$t("base.switch.the.locale.tip"),
      onOk: () => {
        const { dispatch, languages } = this.props;

        const hideMessage = message.loading(this.$t("base.language.switching.and.please.wait"), 0);
        // dispatch({
        //   type: 'languages/selectLanguage',
        //   payload: { languages: [], local: value },
        // });
        // eslint-disable-next-line prefer-template
        window.localStorage.removeItem('message_cache')
        fetch.post(`${config.authUrl}/api/user/language?lang=${value}`).then(() => {
          hideMessage();
          window.location.reload();
        });
      },
    });
  };

  render() {
    const { className, languages: { languageType, local } } = this.props;
    const languageIcons = {
      'zh_cn': '🇨🇳',
      'zh_tw': '🇭🇰',
      'en_us': '🇬🇧',
    };
    const langMenu = (
      <Menu className={styles.menu} selectedKeys={[local]} onClick={this.changeLang}>
        {languageType.map(locale => (
          <Menu.Item key={locale.language}>
            <span role="img" aria-label={locale.languageName}>
              {languageIcons[locale.language]}
            </span>{' '}
            {locale.languageName}
          </Menu.Item>
        ))}
      </Menu>
    );
    return (
      <HeaderDropdown overlay={langMenu} placement="bottomRight">
        <span style={{ lineHeight: '40px' }} className={classNames(styles.dropDown, className)}>
          <GlobalOutlined title={formatMessage({ id: 'navBar.lang' })} />
        </span>
      </HeaderDropdown>
    );
  }
}
