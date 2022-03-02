"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var {
  Schema,
  model
} = _mongoose.default;
var scheme = new Schema({
  name: String,
  username: {
    type: String,
    lowercase: true
  },
  password: String,
  type: {
    type: String,
    uppercase: true
  }
});

var _default = model('AdminUser', scheme);

exports.default = _default;