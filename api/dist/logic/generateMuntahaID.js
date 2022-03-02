"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = generateMuntahaID;

var _client = require("../database/controller/client");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function generateMuntahaID() {
  return _generateMuntahaID.apply(this, arguments);
}

function _generateMuntahaID() {
  _generateMuntahaID = _asyncToGenerator(function* () {
    var clients = yield (0, _client.findClient)();
    var ids = [];
    clients.forEach(client => ids.push(client.muntahaID));
    var counter = clients.length;
    var id;

    do {
      counter++;
      id = "Mun-".concat(counter);
    } while (clients.findIndex(c => c.muntahaID == id) != -1);

    return id;
  });
  return _generateMuntahaID.apply(this, arguments);
}