"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.expectRoutes = exports.originRoutes = exports.expectCoverRoute = exports.originSingleRoute = void 0;
var originSingleRoute = [{
  path: '/',
  exact: true,
  _title: 'app2',
  _title_default: 'app2'
}, {
  path: '/user',
  exact: true,
  _title: 'app2',
  _title_default: 'app2'
}, {
  _title: 'app2',
  _title_default: 'app2'
}];
exports.originSingleRoute = originSingleRoute;
var expectCoverRoute = [{
  path: '/',
  exact: true,
  _title: 'app2',
  _title_default: 'app2'
}, {
  path: '/test/user',
  exact: true,
  _title: 'app2',
  _title_default: 'app2'
}, {
  _title: 'app2',
  _title_default: 'app2'
}];
exports.expectCoverRoute = expectCoverRoute;
var originRoutes = [{
  path: '/',
  routes: [{
    path: '/',
    exact: true,
    _title: 'app2',
    _title_default: 'app2'
  }, {
    path: '/user',
    exact: true,
    _title: 'app2',
    _title_default: 'app2'
  }, {
    _title: 'app2',
    _title_default: 'app2'
  }],
  _title: 'app2',
  _title_default: 'app2'
}, {
  _title: 'app2',
  _title_default: 'app2'
}];
exports.originRoutes = originRoutes;
var expectRoutes = [{
  path: '/app2',
  routes: [{
    path: '/',
    exact: true,
    _title: 'app2',
    _title_default: 'app2'
  }, {
    path: '/test/user',
    exact: true,
    _title: 'app2',
    _title_default: 'app2'
  }, {
    _title: 'app2',
    _title_default: 'app2'
  }],
  _title: 'app2',
  _title_default: 'app2'
}, {
  path: '/',
  routes: [{
    path: '/',
    exact: true,
    _title: 'app2',
    _title_default: 'app2'
  }, {
    path: '/user',
    exact: true,
    _title: 'app2',
    _title_default: 'app2'
  }, {
    _title: 'app2',
    _title_default: 'app2'
  }],
  _title: 'app2',
  _title_default: 'app2'
}, {
  _title: 'app2',
  _title_default: 'app2'
}];
exports.expectRoutes = expectRoutes;