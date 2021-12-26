'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @Author: zong.wang01@hand-china.com
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @Date: 2021-04-04 10:02:14
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @LastEditors: zong.wang01@hand-china.com
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @LastEditTime: 2021-04-26 15:27:07
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @Version: 1.0.0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @Description: 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @Copyright: Copyright (c) 2021, Hand-RongJing
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


// import './styles.css';


var MyComponent = function (_Component) {
  _inherits(MyComponent, _Component);

  function MyComponent(props) {
    _classCallCheck(this, MyComponent);

    var _this = _possibleConstructorReturn(this, (MyComponent.__proto__ || Object.getPrototypeOf(MyComponent)).call(this, props));

    _this.clickName = function () {
      console.log('点击了我');
    };

    _this.state = {
      name: '我的第一个react组件'
    };
    return _this;
  }

  _createClass(MyComponent, [{
    key: 'render',
    value: function render() {
      var name = this.state.name;

      return _react2.default.createElement(
        'h1',
        { onClick: this.clickName },
        name
      );
    }
  }]);

  return MyComponent;
}(_react.Component);

exports.default = MyComponent;