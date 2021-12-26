/*
 * @Author: zong.wang01@hand-china.com
 * @Date: 2021-04-04 10:05:27
 * @LastEditors: zong.wang01@hand-china.com
 * @LastEditTime: 2021-05-07 17:30:58
 * @Version: 1.0.0
 * @Description: 
 * @Copyright: Copyright (c) 2021, Hand-RongJing
 */
import React from 'react';
import { render} from 'react-dom';
import {MyComponent, Ellipsis} from '../../src';

const article = <p>There were injuries alleged in three <a href="#cover">cases in 2015</a>, and a fourth incident in September, according to the safety recall report. After meeting with US regulators in October, the firm decided to issue a voluntary recall.</p>;
  
const App = () => (
 <div>
  <MyComponent />
  <div style={{ width: 200 }}>
    <Ellipsis tooltip lines={3}>{article}</Ellipsis>
  </div>
  </div>
);
render(<App />, document.getElementById("root"));

// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// ReactDOM.render(
//   <React.StrictMode>
//      <MyComponent />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();