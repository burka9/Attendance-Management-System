"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.decrypt = decrypt;
exports.encrypt = encrypt;

function encrypt(word) {
  var temp = '',
      tmp = '';
  var div = 2;

  for (var i = 0; i < word.length; i++) {
    tmp = word.charCodeAt(i);
    if (tmp < 100) tmp = tmp.toString() + ',';
    temp += tmp;
  }

  var x = temp.indexOf(',');
  var spt = temp.split(',')[0];
  var rem = x != -1 ? temp.slice(x) : '';

  while (spt % div != 0) {
    div++;
  }

  spt = Number(spt / div);
  spt += div;
  spt *= div;
  div = div.toString();

  while (div.length < 5) {
    div += 'x';
  }

  return ''.concat(spt).concat(rem).concat(div);
}

function decrypt(word) {
  var temp = '';
  var d = word.slice(word.length - 5);
  word = word.slice(0, word.length - 5);
  var div = '';

  for (var i = 0; i < d.length; i++) {
    div += d[i] !== 'x' ? d[i] : '';
  }

  div = Number(div);
  var x = word.indexOf(',');
  var spt = word.split(',')[0];
  var rem = x != -1 ? word.slice(x) : '';
  spt /= div;
  spt -= div;
  spt *= div;
  word = ''.concat(spt).concat(rem);
  var tmp = '';

  for (var _i = 0; _i < word.length; _i += 3) {
    tmp = word.slice(_i, _i + 3);
    tmp = tmp.split(',')[0];
    temp += String.fromCharCode(tmp);
  }

  return temp;
}