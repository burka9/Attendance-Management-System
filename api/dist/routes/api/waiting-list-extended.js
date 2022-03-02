"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _expressFileupload = _interopRequireDefault(require("express-fileupload"));

var _client = require("../../database/controller/client");

var _seeker = require("../../database/controller/seeker");

var _error = require("../../logic/error");

var _files = require("../../config/files");

var _generateMuntahaID = _interopRequireDefault(require("../../logic/generateMuntahaID"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var router = (0, _express.Router)();
router.route('/visit').get( /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res) {
    try {
      res.status(200).json({
        list: yield (0, _seeker.findSeeker)({
          visited: true,
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
}()).put((0, _expressFileupload.default)(), /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    try {
      var attachment = req.files;
      var {
        id,
        birthday,
        maritalStatus,
        children,
        spouse,
        jobStatus,
        rent,
        health,
        remark
      } = req.body;
      var user = yield (0, _seeker.findSeeker)({
        _id: id
      });
      if (!user[0]) throw new _error.Flaw(406, 'No user found');
      user = user[0];
      var attachments = [];
      var name = '';

      if (attachment != null) {
        attachment = attachment.attachment;
        name = (0, _files.generateName)(attachment.name);
        attachments = [{
          name,
          size: attachment.size,
          type: attachment.mimetype
        }];
      }

      try {
        spouse = JSON.parse(spouse);
      } catch (_unused) {}

      try {
        children = JSON.parse(children);
      } catch (_unused2) {}

      user.visited = true;
      user.lastModified = new Date().getTime();
      user['form'] = {
        birthday,
        maritalStatus,
        children,
        spouse,
        jobStatus,
        rent,
        health,
        remark,
        formDate: new Date().getTime(),
        attachments
      };

      if (attachment == null) {
        var success = yield (0, _seeker.updateSeeker)({
          _id: id
        }, user);
        res.status(200).json({
          success
        });
      } else {
        attachment.mv((0, _files.uploadPath)(name), /*#__PURE__*/function () {
          var _ref3 = _asyncToGenerator(function* (err) {
            if (err) throw new _error.Flaw(500, 'Failed to upload attachment');
            var success = yield (0, _seeker.updateSeeker)({
              _id: id
            }, user);
            res.status(200).json({
              success
            });
          });

          return function (_x5) {
            return _ref3.apply(this, arguments);
          };
        }());
      }
    } catch (e) {
      (0, _error.error)(e, res);
    }
  });

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
router.route('/accept').get( /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(function* (req, res) {
    try {
      res.status(200).json({
        list: yield (0, _client.findClient)(req.query.filter)
      });
    } catch (e) {
      (0, _error.error)(e, res);
    }
  });

  return function (_x6, _x7) {
    return _ref4.apply(this, arguments);
  };
}()).put( /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(function* (req, res) {
    try {
      var {
        id
      } = req.body;
      var user = yield (0, _seeker.findSeeker)({
        _id: id
      });
      if (!user[0]) throw new _error.Flaw(406, 'No user found');
      user = user[0];
      user.accepted = true;
      var success = yield (0, _seeker.updateSeeker)({
        _id: id
      }, user);
      var {
        name,
        phone,
        sex,
        address,
        registrationDate,
        form
      } = user;
      var {
        birthday,
        maritalStatus,
        children,
        spouse,
        jobStatus,
        rent,
        health,
        remark,
        formDate,
        attachments
      } = form;
      success = yield (0, _client.createClient)({
        muntahaID: yield (0, _generateMuntahaID.default)(),
        name,
        phone,
        sex,
        address,
        registrationDate,
        birthday,
        maritalStatus,
        children,
        spouse,
        jobStatus,
        rent,
        health,
        remark,
        acceptedDate: new Date().getTime(),
        formDate,
        attachments,
        temp: {
          checked: false,
          hasReason: false,
          reason: ''
        },
        attendance: {}
      });
      res.status(200).json({
        success
      });
    } catch (e) {
      (0, _error.error)(e, res);
    }
  });

  return function (_x8, _x9) {
    return _ref5.apply(this, arguments);
  };
}());
var _default = router;
exports.default = _default;