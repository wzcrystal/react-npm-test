"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.expectRoutes = exports.originRoutes = exports.expectCoverRoute = exports.originSingleRoute = void 0;
const originSingleRoute = [{
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
const expectCoverRoute = [{
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
const originRoutes = [{
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
const expectRoutes = [{
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