"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _error = require("../../logic/error");

var _client = require("../../database/controller/client");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var router = (0, _express.Router)();
router.route('/check').post( /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res) {
    try {
      var {
        id,
        checked,
        hasReason,
        reason
      } = req.body;
      var client = (yield (0, _client.findClient)({
        _id: id
      }))[0];
      client.temp = {
        checked,
        hasReason,
        reason
      };
      var success = yield (0, _client.updateClient)({
        _id: id
      }, client);
      res.json({
        success
      });
    } catch (e) {
      (0, _error.error)(e, res);
    }
  });

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
var _default = router;
exports.default = _default;