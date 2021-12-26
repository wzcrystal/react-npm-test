/*
 * @Author: zong.wang01@hand-china.com
 * @Date: 2021-04-04 10:02:14
 * @LastEditors: zong.wang01@hand-china.com
 * @LastEditTime: 2021-04-26 15:27:07
 * @Version: 1.0.0
 * @Description: 
 * @Copyright: Copyright (c) 2021, Hand-RongJing
 */
import React, { Component } from 'react';
// import './styles.css';


class MyComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '我的第一个react组件'
    }
  }

  clickName = () => {
    console.log('点击了我')
  }

  render () {
    const {name} = this.state;
    return (
      <h1 onClick={this.clickName}>{name}</h1>
    );
  }
}
export default MyComponent;
