"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connect = connect;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _socket = require("../config/socket");

var _crypt = require("../logic/crypt");

var _adminUser = require("./controller/admin-user");

var _models = _interopRequireDefault(require("./models"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// models
var database = (0, _crypt.decrypt)('9506,11611610111010097,11099,10197xxx');
var password = (0, _crypt.decrypt)('102,11711410797,10997,1102xxxx');
var uriObject = {
  online: "mongodb+srv://burka:".concat(password, "@cluster0.ja273.mongodb.net/").concat(database, "?retryWrites=true&w=majority"),
  local: "mongodb://127.0.0.1:27017/".concat(database)
};
var URI = uriObject['local'];

function connect() {
  var func = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : err => {
    if (err) {
      console.log("failed to connect ".concat(err));
      (0, _socket.send)('db_connection_failed');
      return;
    }

    console.log("connected to ".concat(database));
    (0, _socket.send)('db_connected');
    _mongoose.default.models = _models.default;
    (0, _adminUser.initAdmin)();
  };

  _mongoose.default.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, func);
}