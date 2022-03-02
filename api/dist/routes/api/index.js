"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _session = _interopRequireDefault(require("./session"));

var _waitingList = _interopRequireDefault(require("./waiting-list"));

var _attendance = _interopRequireDefault(require("./attendance"));

var _report = _interopRequireDefault(require("./report"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();
router.use('/session', _session.default);
router.use('/waiting-list', _waitingList.default);
router.use('/attendance', _attendance.default);
router.use('/report', _report.default);
var _default = router;
exports.default = _default;