

const _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.rootContainer = rootContainer;

const _react = _interopRequireDefault(require("react"));

function rootContainer(container) {
  const value = window.g_rootExports; // eslint-disable-next-line global-require

  const _require = require('@tmp/qiankunContext');
      const {Context} = _require;

  return _react.default.createElement(Context.Provider, {
    value,
  }, container);
}