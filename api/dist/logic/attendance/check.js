"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _client = require("../../database/controller/client");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = now => {
  (0, _client.findClient)().then(clients => {
    clients.forEach(client => {
      client.attendance = _objectSpread(_objectSpread({}, client.attendance), {
        [now.toLocaleTimeString()]: {
          checked: client.temp.checked,
          hasReason: client.temp.hasReason,
          reason: client.temp.reason
        }
      });
      client.temp = {
        checked: false,
        hasReason: false,
        reason: ''
      };
      var _id = client._id;
      delete client._id;
      (0, _client.updateClient)({
        _id
      }, client);
    });
  });
};

exports.default = _default;