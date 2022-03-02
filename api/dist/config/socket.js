"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.send = send;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _socket = require("socket.io");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var io = null;

var _default = server => {
  io = new _socket.Server(server);
  io.on('connection', socket => {
    console.log("".concat(socket.id, " connected"));
    socket.on('check_db', () => {
      socket.emit('db_status', _mongoose.default.connection.readyState);
    });
  });
};

exports.default = _default;

function send(event, payload) {
  io.emit(event, payload);
}