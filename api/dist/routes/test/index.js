"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _faker = require("@faker-js/faker");

var _express = require("express");

var _path = _interopRequireDefault(require("path"));

var _client = require("../../database/controller/client");

var _error = require("../../logic/error");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var router = (0, _express.Router)();
router.get('/admin', (req, res) => res.sendFile(_path.default.resolve('public', 'index.html')));
router.get('/faker', (req, res) => {
  var item = '';

  switch (req.query.type) {
    case 'name':
      item = _faker.faker.name.findName();
      break;

    case 'phone':
      item = _faker.faker.phone.phoneNumber();
      break;

    case 'address':
      item = "".concat(_faker.faker.address.city(), ", ").concat(_faker.faker.address.country());
      break;

    case 'birthday':
      var date = new Date(_faker.faker.date.past()).toISOString().slice(0, 10);
      item = date;
      break;

    case 'maritalStatus':
      // item = faker.
      break;

    case 'jobStatus':
      item = _faker.faker.word.noun();
      break;

    case 'rent':
      item = _faker.faker.commerce.price();
      break;

    case 'health':
      item = _faker.faker.lorem.sentence();
      break;

    case 'remark':
      item = _faker.faker.lorem.sentences(4, '.');
      break;

    case 'schooling':
      item = _faker.faker.random.word();
      break;

    default:
  }

  res.json({
    item
  });
});
router.post('/reset-client-timestamp', /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res) {
    try {
      var clients = yield (0, _client.findClient)();
      clients.forEach( /*#__PURE__*/function () {
        var _ref2 = _asyncToGenerator(function* (client) {
          client.temp = {};
          client.attendance = {};
          yield (0, _client.updateClient)({
            _id: client._id
          }, client);
        });

        return function (_x3) {
          return _ref2.apply(this, arguments);
        };
      }());
      res.sendStatus(200);
    } catch (e) {
      (0, _error.error)(e, res);
    }
  });

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
router.post('/drop-collection', /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (req, res) {
    try {
      var {
        seeker,
        client
      } = req.body;
      if (seeker) seeker = _mongoose.default.models.Seeker.collection.drop();
      if (client) client = _mongoose.default.models.Client.collection.drop();
      res.json({
        seeker,
        client
      });
    } catch (e) {
      (0, _error.error)(e, res);
    }
  });

  return function (_x4, _x5) {
    return _ref3.apply(this, arguments);
  };
}());
var _default = router;
exports.default = _default;