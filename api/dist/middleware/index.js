"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _cors = _interopRequireDefault(require("cors"));

var _express = require("express");

var _routes = _interopRequireDefault(require("../routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = app => {
  app.use((0, _express.static)(_path.default.resolve('public')));
  app.use('/attachments/recordings', (0, _express.static)(_path.default.resolve('uploads')));
  app.use((0, _express.json)());
  app.use((0, _express.urlencoded)({
    extended: false
  }));
  app.use(_routes.default);
  app.use((0, _cors.default)());
};

exports.default = _default;