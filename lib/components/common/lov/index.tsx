/* eslint-disable react/jsx-filename-extension */
import { Button, Input } from 'antd';
import React, { Component } from 'react';
import { messages } from 'utils/utils';
import { IProps } from './interface';
import ListSelector from './list-selector';
import ClearIcon from './clear-icon';
import { SearchOutlined } from '@ant-design/icons';


// 示例
/* <Lov
code="company"
valueKey="id"
labelKey="name"
single
/> */


/**
 * 弹框组件
 */
interface IState {
  visible: boolean;
  value: string;
}
class Lov extends Component<IProps, IState> {
  static defaultProps = {
    placeholder: 'common.please.select',
    disabled: false,
    extraParams: {},
    single: false,
    allowClear: true,
    showDetail: true,
    lovType: 'lov',
    cancelDoubleClick: false,
  };

  input: any;

  constructor(props: IProps) {
    super(props);
    this.state = {
      visible: false,
      value: '',
    };
  }

  componentDidMount() {
    // @ts-ignore
    const { value, single, labelKey, lovType, valueText } = this.props;

    if (value) {
      if (!single) {
        this.setState({
          value: messages("base.has.choose.count", { count: value.length }),
        });
      } else { // 单选情况下且类型为chooser时，value是个数组
        this.setState({
          value: lovType !== 'lov' && Array.isArray(value) && value[0]
            ? this.getDataLabel(value[0], labelKey)
            : this.getDataLabel(value, labelKey),
        });
      }
    } else {
      this.setState({
        value: valueText || ``,
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { value, single, labelKey, lovType, valueText } = nextProps;
    if (value) {
      if (!single) {
        this.setState({
          value: messages("base.has.choose.count", { count: nextProps.value.length }),
        });
      } else {
        this.setState({
          value: lovType !== 'lov' && Array.isArray(value) && value[0]
            ? this.getDataLabel(value[0], labelKey)
            : this.getDataLabel(value, labelKey),
        });
      }
    } else {
      this.setState({
        value: valueText || ``,
      });
    }
  }

  // 处理labelKey,以便 传入 `${userCode}-${userName}`这种格式的labelKey可以获取到值
  getDataLabel = (data: any, key: string) => {
    let isMatch = false;
    let keys = key;
    keys = keys.replace(/\$\{(.*?)\}/g, (target, value) => {
      isMatch = true;
      return data[value] || '';
    });

    if (isMatch) {
      return keys;
    } else {
      const value = data[keys];
      return [undefined, null, ''].includes(value) ? '' : value.toString();
    }
  }

  // 输入框获取焦点，显示弹出框
  focusHandle = () => {
    const { disabled, single } = this.props;
    if (single && disabled) { return; }
    this.input.blur();
    this.setState({ visible: true });
  };

  // 确定的回调
  okHandle = (values: any[] | any | null): void => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(values);
      this.setState({ visible: false });
    }
  };

  // 取消的回调
  cancelHandle = () => {
    this.setState({ visible: false });
  };

  // 清除
  onChange = (e) => {
    if (!e.target.value) {
      const { single } = this.props;
      if (single) {
        this.okHandle(null);
      } else {
        this.okHandle(null);
      }
    }
  }

  render() {
    const { visible, value } = this.state;
    /* @ts-ignore */
    const { allowClear, placeholder, disabled, single, customChooserTextValue } = this.props;
    return (
      <div className="lov-wrap">
        <div style={{ position: 'relative' }}>
          <Input
            value={value}
            title={value}
            ref={ref => { this.input = ref }}
            onFocus={this.focusHandle}
            // allowClear={!disabled && allowClear}
            placeholder={messages(placeholder)}
            disabled={disabled}
            onChange={this.onChange}
            className="ant-input-search"
            addonAfter={(
              <Button
                className="ant-btn-icon-only ant-input-search-button"
                disabled={(single && disabled) || !!customChooserTextValue}
                onClick={this.focusHandle}
              >
                {/* @ts-ignore  */}
                <SearchOutlined />
              </Button>
            )}
          />
          {
            !disabled && allowClear && (
              <span
                className="ant-select-selection__clear"
                style={(!value || (value && value.length === 0)) ? { opacity: 0, display: 'none', lineHeight: '32px' } : { position: 'absolute', right: 42, lineHeight: '32px', zIndex: 1 }}
                onClick={() => {
                  if (value && value.length) { this.onChange({ target: { value: '' } }) }
                }}
              >
                <ClearIcon />
              </span>
            )
          }
        </div>
        <ListSelector
          onOk={this.okHandle}
          onCancel={this.cancelHandle}
          visible={visible}
          {...this.props}
        />
      </div>
    );
  }
}

export default Lov;
