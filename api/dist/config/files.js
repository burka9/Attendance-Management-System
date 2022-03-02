"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateName = generateName;
exports.uploadPath = uploadPath;
exports.uploadsFolderPath = void 0;

var _fs = require("fs");

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var uploadsFolderPath = _path.default.resolve('uploads');

exports.uploadsFolderPath = uploadsFolderPath;

function uploadPath(name) {
  return _path.default.resolve(uploadsFolderPath, name);
}

function generateName(base) {
  var counter = 1;
  var name = base;

  while ((0, _fs.existsSync)(uploadPath(name))) {
    name = "".concat(counter, "_").concat(base);
    counter++;
  }

  return name;
}