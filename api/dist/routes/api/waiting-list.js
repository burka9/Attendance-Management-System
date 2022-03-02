"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _seeker = require("../../database/controller/seeker");

var _error = require("../../logic/error");

var _waitingListExtended = _interopRequireDefault(require("./waiting-list-extended"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var router = (0, _express.Router)();
router.use('/', _waitingListExtended.default);
router.route('/').get( /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res) {
    try {
      res.status(200).json({
        list: yield (0, _seeker.findSeeker)({
          visited: false,
          accepted: null
        })
      });
    } catch (e) {
      (0, _error.error)(e, res);
    }
  });

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}()).post( /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    try {
      var {
        name,
        address,
        phone,
        sex
      } = req.body;
      var now = new Date().getTime();
      var success = yield (0, _seeker.createSeeker)({
        name,
        address,
        phone,
        sex,
        registrationDate: now,
        lastModified: now,
        visited: false,
        accepted: null
      });
      res.status(200).json({
        success
      });
    } catch (e) {
      (0, _error.error)(e, res);
    }
  });

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}()).put( /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (req, res) {
    try {
      var {
        name,
        address,
        phone,
        sex,
        id
      } = req.body;
      var item = yield (0, _seeker.findSeeker)({
        _id: id
      });
      if (!item[0]) throw new _error.Flaw(406, 'Invalid item');
      item = {
        name,
        address,
        phone,
        sex,
        lastModified: new Date().getTime()
      };
      var success = yield (0, _seeker.updateSeeker)({
        _id: id
      }, item);
      res.status(200).json({
        success
      });
    } catch (e) {
      (0, _error.error)(e, res);
    }
  });

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
var _default = router;
exports.default = _default;