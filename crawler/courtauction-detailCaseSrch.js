// This source code is a part of Auction App.
// Copyright (C) 2022. rollrat. Licensed under the Apache-2.0 License.

const request = require("request");
const Iconv = require("iconv").Iconv;
const jschardet = require("jschardet");
const parser = require("node-html-parser");
const fs = require("fs");

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

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

async function detailCaseSrch(vJiwonNm, vSaNo, vMaemulSer, params) {
  return [
    await doPost({
      uri: "https://www.courtauction.go.kr/RetrieveRealEstDetailInqSaList.laf",
      body: encodeForm({
        jiwonNm: anyToEUCKR(vJiwonNm),
        saNo: encodeURI(vSaNo.trim()),
        maemulSer: encodeURI(vMaemulSer),
      }),
      headers: {
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36",
        accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "content-type": "application/x-www-form-urlencoded",
      },
      encoding: null,
    }),
    params,
  ];
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

function parse_detailCaseSrchHtml(html) {
  const root = parser.parse(html);

  var caseInfo = {};

  //
  //    1. images
  //
  var photo_urls = [];
  for (var k = 0; ; k++) {
    var imgs = root.querySelectorAll(`div#photo${k} img`);
    if (imgs.length == 0) break;
    for (var j = 0; j < imgs.length; j++) {
      photo_urls.push(imgs[j].attrs["src"]);
    }
  }

  caseInfo["photos"] = photo_urls;

  return objInfo;
}

var data = JSON.parse(fs.readFileSync("result.json"));
const dataLen = Object.keys(data).length;

var results = [];
var completed = 0;

(async () => {
  for (var i = 0; i < dataLen; i++) {
    if (i % 50 == 49) {
      await sleep(5000);
    }

    var param = data[i].param;
    detailSrch(param[0], param[1], param[2], data[i]).then((e) => {
      var objInfo = parse_detailSrchHtml(e[0]);
      var param = e[1].param;

      objInfo["header"] = e[1];

      console.log(`${++completed}/${dataLen}`);

      results.push(objInfo);

      fs.writeSync(
        fs.openSync(
          `result/result-params-${param[0]}-${param[1].trim()}-${
            param[2]
          }.json`,
          "w"
        ),
        JSON.stringify(objInfo)
      );
    });
  }

  fs.writeSync(fs.openSync(`result-params.json`, "w"), JSON.stringify(results));
})();
