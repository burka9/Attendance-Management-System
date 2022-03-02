"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = create;
exports.find = find;
exports.remove = remove;
exports.update = update;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function find(_x, _x2) {
  return _find.apply(this, arguments);
}

function _find() {
  _find = _asyncToGenerator(function* (model, filter) {
    try {
      return yield model.find(filter).lean();
    } catch (e) {
      console.log(e);
      return [];
    }
  });
  return _find.apply(this, arguments);
}

function create(_x3, _x4) {
  return _create.apply(this, arguments);
}

function _create() {
  _create = _asyncToGenerator(function* (model, data) {
    try {
      return yield model.create(data);
    } catch (e) {
      console.log(e);
      return false;
    }
  });
  return _create.apply(this, arguments);
}

function update(_x5, _x6, _x7, _x8) {
  return _update.apply(this, arguments);
}

function _update() {
  _update = _asyncToGenerator(function* (model, filter, data, options) {
    try {
      return yield model.updateOne(filter, data, options);
    } catch (e) {
      console.log(e);
      return false;
    }
  });
  return _update.apply(this, arguments);
}

function remove(_x9, _x10) {
  return _remove.apply(this, arguments);
}

function _remove() {
  _remove = _asyncToGenerator(function* (model, filter) {
    try {
      return (yield model.remove(filter)).deletedCount;
    } catch (e) {
      console.log(e);
      return false;
    }
  });
  return _remove.apply(this, arguments);
}