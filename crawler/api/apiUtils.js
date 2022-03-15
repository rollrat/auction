// This source code is a part of Auction App.
// Copyright (C) 2022. rollrat. Licensed under the Apache-2.0 License.

const request = require("request");
const Iconv = require("iconv").Iconv;
const jschardet = require("jschardet");

function anyToUtf8(str) {
  const { encoding } = jschardet.detect(str);
  const iconv = new Iconv(encoding, "utf-8//translit//ignore");
  return iconv.convert(str).toString();
}

function anyToEUCKR(str) {
  const iconv = new Iconv("utf-8", "euc-kr");
  return escape(iconv.convert(str).toString("binary"));
}

function encodeForm(form) {
  var arrs = [];

  Object.keys(form).forEach((key) => {
    arrs.push(`${key}=${form[key]}`);
  });

  return arrs.join("&");
}

function doPost(options) {
  return new Promise(function (resolve, reject) {
    request.post(options, function (error, res, body) {
      if (!error && res.statusCode == 200) {
        resolve(anyToUtf8(body));
      } else {
        reject(error);
      }
    });
  });
}

function printChildNodeText(e) {
  var texts = [];
  for (const child of e.childNodes) {
    // https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType
    // if (child.nodeType === Node.TEXT_NODE) {
    if (child.nodeType === 3) {
      var text = child.textContent.trim();
      if (text != "") texts.push(text);
    } else {
      texts.push(...printChildNodeText(child));
    }
  }
  return texts;
}

module.exports = {
  anyToUtf8: anyToUtf8,
  anyToEUCKR: anyToEUCKR,
  encodeForm: encodeForm,
  doPost: doPost,
  printChildNodeText: printChildNodeText,
};
