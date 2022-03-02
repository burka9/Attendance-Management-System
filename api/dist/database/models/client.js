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
var schema = new Schema({
  muntahaID: String,
  name: String,
  phone: String,
  sex: String,
  address: String,
  registrationDate: Date,
  birthday: Date,
  maritalStatus: String,
  children: [{
    name: String,
    age: String,
    schooling: String
  }],
  spouse: [{
    name: String,
    jobType: String
  }],
  jobStatus: String,
  rent: String,
  health: String,
  remark: String,
  acceptedDate: Date,
  formDate: Date,
  attachments: Array,
  temp: {
    checked: Boolean,
    hasReason: Boolean,
    reason: String
  },
  attendance: {}
  /*
    {
      "yyyy-mm-dd": {
        checked: Boolean,
        hasReason: Boolean,
        reason: String
      }
    }
  */

});

var _default = new model('Client', schema);

exports.default = _default;