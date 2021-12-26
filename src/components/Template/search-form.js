import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Form, Icon as LegacyIcon } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Row, Col, Input, Button, Switch, Select } from 'antd';
import React from 'react';
import commonService from 'services/common';

import './search-form.less';

// import store from "../../index"

const FormItem = Form.Item;

class AdvancedSearchForm extends React.Component {
  state = {
    expand: false,
    options: {},
    defaultValue: {},
  };

  componentDidMount() {

    if (this.props.getRef) {
      this.props.getRef(this);
    }
    const { formItems = [], dispatch } = this.props;

    formItems.map((item, i) => {
      if (!item.dataIndex) return;

      if (item.dataSource) {
        this.setState({ options: { ...this.state.options, [item.id]: JSON.parse(item.dataSource) } });
      } else if ((!item.options || !item.options.length) && item.url && !this.state.options[item.id]) {
          this.getOptions(item);
        }

      if (item.defaultValue) {

        const defaultValue = {};
        let key = "";
        item.defaultValue.replace(/\$\{(.+)\}/g, (target, result) => {
          key = result;
        });

        if (key) {
          const temp = this.getValue(this.props, key);
          if (temp && temp.length) {
            defaultValue[item.id] = temp[0];
          }
        }

        dispatch({
          type: "database/setData",
          payload: {
            moduleName: "priview",
            objName: this.props.code,
            key: item.dataIndex,
            value: defaultValue[item.id],
          },
        })

        this.setState({ defaultValue });
      }
    })

  }

  // componentWillReceiveProps(nextProps) {
  //   (nextProps);
  // }

  handleSearch = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      this.props.search && this.props.search(values);
    });
  };

  handleReset = () => {
    this.props.form.resetFields();
  };

  toggle = () => {
    const { expand } = this.state;
    this.setState({ expand: !expand });
  };

  clear = () => {
    this.props.onClear && this.props.onClear();
    this.props.form.resetFields();
  }

  getOptions = item => {
    commonService.getInterface(item.url).then(res => {
      if (res.data) {
        this.setState({ options: { ...this.state.options, [item.id]: res.data } }, () => {
          this.getFields();
        });
      }
    });
  };

  // To generate mock Form.Item
  getFields() {
    const { getFieldDecorator } = this.props.form;
    const { formItems = [], dispatch } = this.props;
    const children = [];
    const count = this.state.expand ? formItems.length : 4;

    formItems.map((item, i) => {
      if (!item.dataIndex) return;

      const options = {};

      if (this.state.defaultValue[item.id]) {
        options.initialValue = this.state.defaultValue[item.id];
      }

      children.push(
        <Col span={item.colSpan || 6} key={item.dataIndex} style={{ display: i < count ? 'block' : 'none' }}>
          <FormItem label={item.label}>
            {getFieldDecorator(item.dataIndex, options)(this.renderItem(item))}
          </FormItem>
        </Col>
      );
    });

    return children;
  }

  getValue(data, ...args) {
    const res = JSON.stringify(data);
    return args.map((item) => (new Function(`try {return ${res}.${item} } catch(e) {}`))());
  }

  renderItem = item => {

    const { options } = this.state;

    switch (item.typeCode) {
      case 'input':
        return <Input placeholder={item.placeholder} />;
      case 'switch':
        return (
          <Switch
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
          />
        );
      case 'select':
        return (
          <Select placeholder={item.placeholder}>
            {options[item.id] &&
              options[item.id].map(option => {
                return <Select.Option key={option[item.valueKey]}>{option[item.labelKey]}</Select.Option>;
              })}
          </Select>
        );
      default:
        return <Input placeholder={item.placeholder} />;
    }
  };

  render() {
    return (
      <Form className="ant-advanced-search-form" onSubmit={this.handleSearch}>
        <Row gutter={24}>{this.getFields()}</Row>
        <Row>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button type="primary" htmlType="submit">
              搜索
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
              清空
            </Button>
            {this.props.formItems &&
              this.props.formItems.length > 4 && (
                <a style={{ marginLeft: 8, fontSize: 12 }} onClick={this.toggle}>
                  {this.state.expand ? '收缩' : '展开'}{' '}
                  <LegacyIcon type={this.state.expand ? 'up' : 'down'} />
                </a>
              )}
          </Col>
        </Row>
      </Form>
    );
  }
}

function fieldsChange(props, fields) {


  if (JSON.stringify(fields) == "{}") {
    return;
  }

  const result = Object.keys(fields).map(key => {
    return {
      moduleName: "priview",
      objName: props.code,
      key,
      value: fields[key].value,
    }
  })

  store.dispatch({
    type: "database/setData",
    payload: result[0],
  })

}

export default Form.create()(AdvancedSearchForm);






