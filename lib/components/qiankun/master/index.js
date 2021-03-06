"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _fs = require("fs");

var _path = require("path");

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

function _default(api, options) {
  var _ref = options || {},
      _ref$registerRuntimeK = _ref.registerRuntimeKeyInIndex,
      registerRuntimeKeyInIndex = _ref$registerRuntimeK === void 0 ? false : _ref$registerRuntimeK;

  api.addRuntimePlugin(require.resolve('./runtimePlugin'));

  if (!registerRuntimeKeyInIndex) {
    api.addRuntimePluginKey('qiankun');
  }

  api.modifyDefaultConfig(function (config) {
    return _objectSpread({}, config, {
      mountElementId: _common.defaultMasterRootId,
      disableGlobalVariables: true
    });
  });
  var _api$config$history = api.config.history,
      history = _api$config$history === void 0 ? _common.defaultHistoryMode : _api$config$history; // apps ????????????????????????

  var _ref2 = options || {},
      _ref2$apps = _ref2.apps,
      apps = _ref2$apps === void 0 ? [] : _ref2$apps;

  if (apps.length) {
    // ???????????????????????? basePath ??????????????????
    var findRouteWithPrefix = function findRouteWithPrefix(routes, basePath) {
      // eslint-disable-next-line no-restricted-syntax
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = routes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var route = _step.value;
          if (route.path && (0, _common.testPathWithPrefix)(basePath, route.path)) return route;

          if (route.routes && route.routes.length) {
            return findRouteWithPrefix(route.routes, basePath);
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return null;
    };

    var modifyAppRoutes = function modifyAppRoutes(masterHistory) {
      api.modifyRoutes(function (routes) {
        var newRoutes = routes.map(function (route) {
          if (route.path === '/' && route.routes && route.routes.length) {
            apps.forEach(function (_ref3) {
              var _ref3$history = _ref3.history,
                  slaveHistory = _ref3$history === undefined ? history : _ref3$history,
                  base = _ref3.base;

              // ??????????????? history mode ??????????????????????????????????????? 404 ?????????????????????????????? path ??? ????????? rule ?????? div ????????????
              if (slaveHistory === masterHistory) {
                var baseConfig = (0, _common.toArray)(base);
                baseConfig.forEach(function (basePath) {
                  var routeWithPrefix = findRouteWithPrefix(routes, basePath); // ??????????????????????????? basePath ?????????????????????????????? mock ?????????

                  if (!routeWithPrefix) {
                    route.routes.unshift({
                      path: basePath,
                      exact: false,
                      component: "() => {\n                        if (process.env.NODE_ENV === 'development') {\n                          console.log('" + basePath + " 404 mock rendered');\n                        }\n\n                        return React.createElement('div');\n                      }"
                    });
                  } else {
                    // ?????????????????????????????? base ??????????????????????????????????????? exact ????????? false??????????????????????????????????????????????????????
                    routeWithPrefix.exact = false;
                  }
                });
              }
            });
          }

          return route;
        });
        return newRoutes;
      });
    };

    modifyAppRoutes(history);
  }

  var rootExportsFile = (0, _path.join)(api.paths.absSrcPath, 'rootExports.js');
  api.addPageWatcher(rootExportsFile);
  api.onGenerateFiles(function () {
    var rootExports = ("\nwindow.g_rootExports = " + ((0, _fs.existsSync)(rootExportsFile) ? "require('@/rootExports')" : "{}") + ";\n    ").trim();
    api.writeTmpFile('qiankunRootExports.js', rootExports);
    api.writeTmpFile('subAppsConfig.json', JSON.stringify(_objectSpread({
      masterHistory: history
    }, options)));
  });
  api.writeTmpFile('qiankunDefer.js', "\n      class Deferred {\n        constructor() {\n          this.promise = new Promise(resolve => this.resolve = resolve);\n        }\n      }\n      export const deferred = new Deferred();\n      export const qiankunStart = deferred.resolve;\n    ".trim());
  api.addUmiExports([{
    specifiers: ['qiankunStart'],
    source: '@tmp/qiankunDefer'
  }]);
}