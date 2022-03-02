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
  phone: String,
  sex: String,
  address: String,
  registrationDate: Date,
  lastModified: Date,
  visited: Boolean,
  accepted: String,
  form: Object
});

var _default = model('Seeker', scheme);

exports.default = _default;