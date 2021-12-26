"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.render = render;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _qiankunDefer = require("@tmp/qiankunDefer.js");

require("@tmp/qiankunRootExports.js");

var _subAppsConfig = _interopRequireDefault(require("@tmp/subAppsConfig.json"));

var _assert = _interopRequireDefault(require("assert"));

var _qiankun = require("qiankun");

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _common = require("../common");

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });keys.push.apply(keys, symbols);
  }return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        (0, _defineProperty2.default)(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }return target;
}

function getMasterRuntime() {
  return _getMasterRuntime.apply(this, arguments);
}

function _getMasterRuntime() {
  _getMasterRuntime = (0, _asyncToGenerator2.default)(
  /* #__PURE__ */
  _regenerator.default.mark(function _callee() {
    var plugins = void 0;var config = void 0;var master = void 0;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // eslint-disable-next-line import/no-extraneous-dependencies, global-require
            plugins = require('umi/_runtimePlugin');
            _context.next = 3;
            return plugins.mergeConfigAsync('qiankun');

          case 3:
            _context.t0 = _context.sent;

            if (_context.t0) {
              _context.next = 6;
              break;
            }

            _context.t0 = {};

          case 6:
            config = _context.t0;
            master = config.master;
            return _context.abrupt("return", master || config);

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getMasterRuntime.apply(this, arguments);
}

function render(_x) {
  return _render.apply(this, arguments);
}

function _render() {
  _render = (0, _asyncToGenerator2.default)(
  /* #__PURE__ */
  _regenerator.default.mark(function _callee2(oldRender) {
    var cache = void 0;var isAppActive1 = void 0;var isAppActive = void 0;var runtimeConfig = void 0;var _ref = void 0;var apps = void 0;var _ref$jsSandbox = void 0;var jsSandbox = void 0;var _ref$prefetch = void 0;var prefetch = void 0;var _ref$defer = void 0;var defer = void 0;var lifeCycles = void 0;var masterHistory = void 0;var otherConfigs = void 0;

    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            isAppActive = function _ref5(location, history, base, mountElementId) {
              var baseConfig = (0, _common.toArray)(base);

              switch (history) {
                case 'hash':
                  {
                    return isAppActive1(location, history, base, mountElementId);
                  }

                case 'browser':
                  return baseConfig.some(function (pathPrefix) {
                    return (0, _common.testPathWithPrefix)(pathPrefix, location.pathname);
                  });

                default:
                  return false;
              }
            };

            isAppActive1 = function _ref4(location, history, base, mountElementId) {
              var baseConfig = (0, _common.toArray)(base);
              var flag = baseConfig.some(function (pathPrefix) {
                return (0, _common.testPathWithPrefix)("#".concat(pathPrefix), location.hash);
              });

              if (cache.includes(base)) {
                var node = document.getElementById('mountElementId');

                if (node) {
                  node.style.display = !flag ? 'none' : 'block';
                }

                return true;
              }

              if (flag) {
                cache.push(base);
              }

              return flag;
            };

            oldRender();
            cache = [];
            _context2.next = 6;
            return getMasterRuntime();

          case 6:
            runtimeConfig = _context2.sent;
            _ref = _objectSpread({}, _subAppsConfig.default, {}, runtimeConfig), apps = _ref.apps, _ref$jsSandbox = _ref.jsSandbox, jsSandbox = _ref$jsSandbox === void 0 ? false : _ref$jsSandbox, _ref$prefetch = _ref.prefetch, prefetch = _ref$prefetch === void 0 ? true : _ref$prefetch, _ref$defer = _ref.defer, defer = _ref$defer === void 0 ? false : _ref$defer, lifeCycles = _ref.lifeCycles, masterHistory = _ref.masterHistory, otherConfigs = (0, _objectWithoutProperties2.default)(_ref, ["apps", "jsSandbox", "prefetch", "defer", "lifeCycles", "masterHistory"]);
            (0, _assert.default)(apps && apps.length, 'sub apps must be config when using umi-plugin-qiankun');
            (0, _qiankun.registerMicroApps)(apps.map(function (_ref2) {
              var name = _ref2.name;
              var entry = _ref2.entry;
              var base = _ref2.base;

              var _ref2$history = _ref2.history;
              var history = _ref2$history === void 0 ? masterHistory : _ref2$history;
              var _ref2$mountElementId = _ref2.mountElementId;
              var mountElementId = _ref2$mountElementId === void 0 ? _common.defaultMountContainerId : _ref2$mountElementId;
              var props = _ref2.props;

              return {
                name: name,
                entry: entry,
                activeRule: function activeRule(location) {
                  return isAppActive(location, history, base, mountElementId);
                },
                render: function render(_ref3) {
                  var appContent = _ref3.appContent;
                  var loading = _ref3.loading;


                  if (process.env.NODE_ENV === 'development') {
                    console.info("app ".concat(name, " loading ").concat(loading));
                  }

                  if (mountElementId) {
                    var container = document.getElementById(mountElementId);

                    if (container) {
                      var subApp = _react.default.createElement('div', {
                        dangerouslySetInnerHTML: {
                          __html: appContent
                        }
                      });

                      _reactDom.default.render(subApp, container);
                    }
                  }
                },
                props: _objectSpread({
                  base: base,
                  history: history
                }, props)
              };
            }), lifeCycles, _objectSpread({}, otherConfigs));

            if (!defer) {
              _context2.next = 13;
              break;
            }

            _context2.next = 13;
            return _qiankunDefer.deferred.promise;

          case 13:
            (0, _qiankun.start)(_objectSpread({
              jsSandbox: jsSandbox,
              prefetch: prefetch
            }, otherConfigs, {
              singular: false
            }));

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _render.apply(this, arguments);
}