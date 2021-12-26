"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _address = _interopRequireDefault(require("address"));

var _assert = _interopRequireDefault(require("assert"));

var _lodash = require("lodash");

var _path = require("path");

var _webpack = _interopRequireDefault(require("webpack"));

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

var localIpAddress = process.env.USE_REMOTE_IP ? _address.default.ip() : 'localhost';

function _default(api, options) {
  var _ref = options || {},
      _ref$registerRuntimeK = _ref.registerRuntimeKeyInIndex,
      registerRuntimeKeyInIndex = _ref$registerRuntimeK === void 0 ? false : _ref$registerRuntimeK,
      _ref$keepOriginalRout = _ref.keepOriginalRoutes,
      keepOriginalRoutes = _ref$keepOriginalRout === void 0 ? false : _ref$keepOriginalRout;

  api.addRuntimePlugin(require.resolve('./runtimePlugin'));

  if (!registerRuntimeKeyInIndex) {
    api.addRuntimePluginKey('qiankun');
  }

  var lifecyclePath = require.resolve('./lifecycles');

  var mountElementId = api.config.mountElementId || _common.defaultSlaveRootId; // eslint-disable-next-line import/no-dynamic-require, global-require

  var _require = require((0, _path.join)(api.cwd, 'package.json')),
      pkgName = _require.name;

  api.modifyDefaultConfig(function (memo) {
    return _objectSpread({}, memo, {
      // TODO 临时关闭，等这个 pr 合并 https://github.com/umijs/umi/pull/2866
      // disableGlobalVariables: true,
      base: "/" + pkgName,
      mountElementId: mountElementId,
      // 默认开启 runtimePublicPath，避免出现 dynamic import 场景子应用资源地址出问题
      runtimePublicPath: true
    });
  }); // 如果没有手动关闭 runtimePublicPath，则直接使用 qiankun 注入的 publicPath

  if (api.config.runtimePublicPath !== false) {
    api.modifyPublicPathStr("window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__ || \"" + ( // 开发阶段 publicPath 配置无效，默认为 /
    process.env.NODE_ENV !== 'development' ? api.config.publicPath || '/' : '/') + "\"");
  }

  var port = process.env.PORT;
  var protocol = process.env.HTTPS ? 'https' : 'http';
  api.modifyWebpackConfig(function (memo) {
    memo.output.libraryTarget = 'umd';
    (0, _assert.default)(api.pkg.name, 'You should have name in package.json');
    memo.output.library = api.pkg.name + "-[name]";
    memo.output.jsonpFunction = "webpackJsonp_" + api.pkg.name; // 配置 publicPath，支持 hot update

    if (process.env.NODE_ENV === 'development' && port) {
      memo.output.publicPath = protocol + "://" + localIpAddress + ":" + port + "/";
    }

    return memo;
  }); // umi bundle 添加 entry 标记

  api.modifyHTMLWithAST(function ($) {
    $('script').each(function (_, el) {
      var _scriptEl$attr;

      var scriptEl = $(el);
      var umiEntryJs = /\/?umi(\.\w+)?\.js$/g;

      if (umiEntryJs.test((_scriptEl$attr = scriptEl.attr('src')) !== null && _scriptEl$attr !== void 0 ? _scriptEl$attr : '')) {
        scriptEl.attr('entry', '');
      }
    });
    return $;
  }); // source-map 跨域设置

  if (process.env.NODE_ENV === 'development' && port) {
    // 变更 webpack-dev-server websocket 默认监听地址
    process.env.SOCKET_SERVER = protocol + "://" + localIpAddress + ":" + port + "/";
    api.chainWebpackConfig(function (memo) {
      // 禁用 devtool，启用 SourceMapDevToolPlugin
      memo.devtool(false);
      memo.plugin('source-map').use(_webpack.default.SourceMapDevToolPlugin, [{
        namespace: pkgName,
        append: "\n//# sourceMappingURL=" + protocol + "://" + localIpAddress + ":" + port + "/[url]",
        filename: '[file].map'
      }]);
    });
  }

  api.writeTmpFile('qiankunContext.js', "\nimport { createContext, useContext } from 'react';\n\nexport const Context = createContext(null);\nexport function useRootExports() {\n  return useContext(Context);\n};\n  ".trim());
  api.addUmiExports([{
    specifiers: ['useRootExports'],
    source: '@tmp/qiankunContext'
  }]);
  api.addEntryImport({
    source: lifecyclePath,
    specifier: '{ genMount as qiankun_genMount, genBootstrap as qiankun_genBootstrap, genUnmount as qiankun_genUnmount }'
  });
  api.addRendererWrapperWithModule(lifecyclePath);
  api.addEntryCode("\n    export const bootstrap = qiankun_genBootstrap(Promise.all(moduleBeforeRendererPromises), render);\n    export const mount = qiankun_genMount();\n    export const unmount = qiankun_genUnmount('" + mountElementId + "');\n\n    if (!window.__POWERED_BY_QIANKUN__) {\n      bootstrap().then(mount);\n    }\n    ");
  api.modifyRoutes(function (routes) {
    // 开启keepOriginalRoutes配置
    if (keepOriginalRoutes === true || (0, _lodash.isString)(keepOriginalRoutes)) {
      return (0, _common.addSpecifyPrefixedRoute)(routes, keepOriginalRoutes, pkgName);
    }

    return routes;
  });
}