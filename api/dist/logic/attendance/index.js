"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _check = _interopRequireDefault(require("./check"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ATTENDANCE_CHECK_DELAY = 1000; // * 3600 // every hour

var attendance_is_checked = false;
var now;

var _default = () => {
  // check attendance every ${attendance_check_delay} moment
  setInterval(() => {
    now = new Date(); // set current time
    // if current time is 9PM - 3AM && !attendance_is_checked
    // if (now.getHours()>=21 && now.getHours()<3 && !attendance_is_checked) {

    if (now.getSeconds() % 10 == 0) (0, _check.default)(now); //   attendance_is_checked = true
    // } else if (now.getHours()<21 && now.getHours()>=3 && attendance_is_checked)
    //   attendance_is_checked = false
  }, ATTENDANCE_CHECK_DELAY);
};

exports.default = _default;