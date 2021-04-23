/*
 * @Author: zong.wang01@hand-china.com
 * @Date: 2021-04-04 10:05:27
 * @LastEditors: zong.wang01@hand-china.com
 * @LastEditTime: 2021-04-04 13:43:21
 * @Version: 1.0.0
 * @Description: 
 * @Copyright: Copyright (c) 2021, Hand-RongJing
 */
import React from 'react';
import { render} from 'react-dom';
import MyComponent from '../../src';
const App = () => (
 <MyComponent />
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