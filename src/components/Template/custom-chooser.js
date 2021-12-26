import React, { Component } from 'react';
import { Radio } from 'antd';

import Lov from 'components/common/lov';

const RadioGroup = Radio.Group;

class CustomChooser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAll: true,
    };
  }

  radioChange = e => {
    let { value = {} } = this.props;
    value.radioValue = e.target.value;
    value.chooserValue = [];
    this.props.onChange && this.props.onChange(value);
  };

  chooserChange = values => {
    let { value = {} } = this.props;
    value.chooserValue = values || [];
    this.props.onChange && this.props.onChange(value);
  };

  render() {
    return (
      <div>
        <RadioGroup
          onChange={this.radioChange}
          value={this.props.value ? this.props.value.radioValue : true}
          className={`custom-chooser-wrapper ${this.props.className || ''}`}
          disabled={this.props.disabled ? this.props.disabled : false}
          style={{marginBottom:12}}
        >
          <Radio value={true}>{this.props.allText ? this.props.allText : '全部类型'}</Radio>
          <Radio value={false}>{this.props.someText ? this.props.someText : '部分类型'}</Radio>
        </RadioGroup>
        <Lov
          code={this.props.type}
          single={!!this.props.single}
          placeholder={this.$t('common.please.select')}
          requestBody={this.props.requestBody}
          method={this.props.method}
          labelKey={this.props.labelKey}
          valueKey={this.props.valueKey}
          disabled={this.props.value ? this.props.value.radioValue : true}
          onChange={this.chooserChange}
          selectorItem={this.props.selectorItem}
          value={this.props.value ? this.props.value.chooserValue : []}
          listExtraParams={this.props.params}
          showNumber
          showDetail={this.props.showDetail}
          allText={this.props.allText}
          customChooserTextValue={this.props.value && this.props.value.radioValue}
          lovType="chooser"
        />
      </div>
    );
  }
}

export default CustomChooser;
