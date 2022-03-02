"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSeeker = createSeeker;
exports.findSeeker = findSeeker;
exports.updateSeeker = updateSeeker;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _main = require("./main");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function findSeeker(_x) {
  return _findSeeker.apply(this, arguments);
}

function _findSeeker() {
  _findSeeker = _asyncToGenerator(function* (filter) {
    return yield (0, _main.find)(_mongoose.default.models.Seeker, filter);
  });
  return _findSeeker.apply(this, arguments);
}

function createSeeker(_x2) {
  return _createSeeker.apply(this, arguments);
}

function _createSeeker() {
  _createSeeker = _asyncToGenerator(function* (data) {
    return yield (0, _main.create)(_mongoose.default.models.Seeker, data);
  });
  return _createSeeker.apply(this, arguments);
}

function updateSeeker(_x3, _x4, _x5) {
  return _updateSeeker.apply(this, arguments);
}

function _updateSeeker() {
  _updateSeeker = _asyncToGenerator(function* (filter, data, options) {
    return yield (0, _main.update)(_mongoose.default.models.Seeker, filter, data, options);
  });
  return _updateSeeker.apply(this, arguments);
}