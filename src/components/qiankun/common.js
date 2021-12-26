"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toArray = toArray;
exports.testPathWithPrefix = testPathWithPrefix;
exports.addSpecifyPrefixedRoute = exports.noop = exports.defaultHistoryMode = exports.defaultSlaveRootId = exports.defaultMasterRootId = exports.defaultMountContainerId = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _lodash = require("lodash");

var _pathToRegexp = _interopRequireDefault(require("path-to-regexp"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var defaultMountContainerId = 'root-subapp'; // 主应用跟子应用的默认 root id 区分开，避免冲突

exports.defaultMountContainerId = defaultMountContainerId;
var defaultMasterRootId = 'root-master';
exports.defaultMasterRootId = defaultMasterRootId;
var defaultSlaveRootId = 'root-slave';
exports.defaultSlaveRootId = defaultSlaveRootId;
var defaultHistoryMode = 'browser'; // @formatter:off

exports.defaultHistoryMode = defaultHistoryMode;

var noop = function noop() {}; // @formatter:on


exports.noop = noop;

function toArray(source) {
  return Array.isArray(source) ? source : [source];
}

function testPathWithStaticPrefix(pathPrefix, realPath) {
  if (pathPrefix.endsWith('/')) {
    return realPath.startsWith(pathPrefix);
  }

  var pathRegex = new RegExp("^".concat(pathPrefix, "(\\/|\\?)+.*$"), 'g');
  var normalizedPath = "".concat(realPath, "/");
  return pathRegex.test(normalizedPath);
}

function testPathWithDynamicRoute(dynamicRoute, realPath) {
  return !!(0, _pathToRegexp.default)(dynamicRoute, {
    strict: true
  }).exec(realPath);
}

function testPathWithPrefix(pathPrefix, realPath) {
  return testPathWithStaticPrefix(pathPrefix, realPath) || testPathWithDynamicRoute(pathPrefix, realPath);
}

var recursiveCoverRouter = function recursiveCoverRouter(source, nameSpacePath) {
  return source.map(function (router) {
    if (router.routes) {
      recursiveCoverRouter(router.routes, nameSpacePath);
    }

    if (router.path !== '/' && router.path) {
      return _objectSpread({}, router, {
        path: "".concat(nameSpacePath).concat(router.path)
      });
    }

    return router;
  });
};

var addSpecifyPrefixedRoute = function addSpecifyPrefixedRoute(originRoute, keepOriginalRoutes, pkgName) {
  var copyBase = originRoute.filter(function (_) {
    return _.path === '/';
  });

  if (!copyBase[0]) {
    return originRoute;
  }

  var nameSpaceRouter = (0, _lodash.cloneDeep)(copyBase[0]);
  var nameSpace = keepOriginalRoutes === true ? pkgName : keepOriginalRoutes;
  nameSpaceRouter.path = "/".concat(nameSpace);
  nameSpaceRouter.routes = recursiveCoverRouter(nameSpaceRouter.routes, "/".concat(nameSpace));
  return [nameSpaceRouter].concat((0, _toConsumableArray2.default)(originRoute));
};

exports.addSpecifyPrefixedRoute = addSpecifyPrefixedRoute;