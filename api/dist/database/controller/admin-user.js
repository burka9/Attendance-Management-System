"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findAdminUser = findAdminUser;
exports.initAdmin = initAdmin;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _crypt = require("../../logic/crypt");

var _main = require("./main");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function initAdmin() {
  return _initAdmin.apply(this, arguments);
}

function _initAdmin() {
  _initAdmin = _asyncToGenerator(function* () {
    try {
      var admin = yield (0, _main.find)(_mongoose.default.models.AdminUser, {
        type: 'ADMIN'
      });
      var regOff = yield (0, _main.find)(_mongoose.default.models.AdminUser, {
        type: 'REG_OFF'
      });

      if (!admin[0]) {
        if (yield (0, _main.create)(_mongoose.default.models.AdminUser, {
          name: 'Administrator',
          username: 'admin',
          password: (0, _crypt.encrypt)('admin'),
          type: 'admin'
        })) console.log('admin account initialized');
      }

      if (!regOff[0]) if (yield (0, _main.create)(_mongoose.default.models.AdminUser, {
        name: 'Registration Officer',
        username: 'reg',
        password: (0, _crypt.encrypt)('reg'),
        type: 'reg_off'
      })) console.log('registration officer account initialized');
    } catch (e) {
      console.log('admin creation failed: ', e);
    }
  });
  return _initAdmin.apply(this, arguments);
}

function findAdminUser(_x) {
  return _findAdminUser.apply(this, arguments);
}

function _findAdminUser() {
  _findAdminUser = _asyncToGenerator(function* (filter) {
    return yield (0, _main.find)(_mongoose.default.models.AdminUser, filter);
  });
  return _findAdminUser.apply(this, arguments);
}