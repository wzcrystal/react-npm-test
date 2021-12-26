'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SlideFrame = function (_React$Component) {
  _inherits(SlideFrame, _React$Component);

  function SlideFrame(props) {
    _classCallCheck(this, SlideFrame);

    var _this = _possibleConstructorReturn(this, (SlideFrame.__proto__ || Object.getPrototypeOf(SlideFrame)).call(this, props));

    _this.onClose = function () {
      _this.setState({ visible: false }, function () {
        _this.props.close && _this.props.close();
      });
    };

    _this.show = function (values) {
      _this.setState({ visible: true }, function () {
        _this.props.onShow && _this.props.onShow(values);
      });
    };

    _this.close = function () {
      _this.setState({ visible: false }, function () {
        _this.props.onClose && _this.props.onClose();
      });
    };

    _this.state = {
      visible: false
    };
    return _this;
  }

  _createClass(SlideFrame, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.getRef) {
        this.props.getRef(this);
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.visible != this.props.visible) {
        this.setState({ visible: nextProps.visible });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          title = _props.title,
          _props$width = _props.width,
          width = _props$width === undefined ? '50vw' : _props$width;
      var visible = this.state.visible;


      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _antd.Drawer,
          {
            title: this.$t(title),
            placement: 'right',
            onClose: this.onClose,
            visible: visible,
            width: width
          },
          visible && this.props.children
        )
      );
    }
  }]);

  return SlideFrame;
}(_react2.default.Component);

exports.default = SlideFrame;