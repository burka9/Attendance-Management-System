"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startServer = startServer;

var _http = require("http");

var _express = _interopRequireDefault(require("express"));

var _database = require("../database");

var _middleware = _interopRequireDefault(require("../middleware"));

var _fs = require("fs");

var _files = require("./files");

var _socket = _interopRequireDefault(require("./socket"));

var _attendance = _interopRequireDefault(require("../logic/attendance"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _fs.stat)(_files.uploadsFolderPath, err => {
  if (err) (0, _fs.mkdir)(_files.uploadsFolderPath, () => console.log('uploads folder created'));
});
var app = (0, _express.default)();
(0, _middleware.default)(app);
var server = (0, _http.createServer)(app);

function startServer() {
  var port = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 3000 || process.env.PORT;
  server.listen(port, () => {
    console.log("Server started on port ".concat(port));
    (0, _socket.default)(server);
    (0, _attendance.default)();
  });
  (0, _database.connect)();
}