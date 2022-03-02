"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Flaw = void 0;
exports.error = error;

class Flaw extends Error {
  constructor(code, message) {
    super();
    this.code = code;
    this.name = 'CustomError';
    this.message = message;
  }

}

exports.Flaw = Flaw;

function error(flaw, res) {
  console.log(flaw.message);

  try {
    var {
      code,
      message
    } = flaw;
    if (res) res.status(isNaN(code) ? 500 : Number(code)).json({
      description: message
    });
  } catch (_unused) {
    if (res) res.sendStatus(500);
  }
}