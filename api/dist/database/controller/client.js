"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createClient = createClient;
exports.findClient = findClient;
exports.updateClient = updateClient;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _main = require("./main");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function findClient(_x) {
  return _findClient.apply(this, arguments);
}

function _findClient() {
  _findClient = _asyncToGenerator(function* (filter) {
    return yield (0, _main.find)(_mongoose.default.models.Client, filter);
  });
  return _findClient.apply(this, arguments);
}

function createClient(_x2) {
  return _createClient.apply(this, arguments);
}

function _createClient() {
  _createClient = _asyncToGenerator(function* (data) {
    return yield (0, _main.create)(_mongoose.default.models.Client, data);
  });
  return _createClient.apply(this, arguments);
}

function updateClient(_x3, _x4, _x5) {
  return _updateClient.apply(this, arguments);
}

function _updateClient() {
  _updateClient = _asyncToGenerator(function* (filter, data, options) {
    return yield (0, _main.update)(_mongoose.default.models.Client, filter, data, options);
  });
  return _updateClient.apply(this, arguments);
}