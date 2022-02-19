// This source code is a part of Auction App.
// Copyright (C) 2022. rollrat. Licensed under the Apache-2.0 License.

const request = require("request");
const Iconv = require("iconv").Iconv;
const jschardet = require("jschardet");
const parser = require("node-html-parser");

// var ii = new iconv.Iconv("euc-kr", "utf-8");

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

async function detailSrch(vJiwonNm, vSaNo, vMaemulSer) {
  return await doPost({
    uri: "https://www.courtauction.go.kr/RetrieveRealEstCarHvyMachineMulDetailInfo.laf",
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

function parse_detailSrchHtml(html) {
  const root = parser.parse(html);

  var objInfo = {};

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

  objInfo["photos"] = photo_urls;

  //
  //    2. 물건기본정보 표
  //
  {
    var tables = root.querySelectorAll(`table.Ltbl_dt`);
    // [물건기본정보 표, 물건기본정보 표2, 사진, 감정평가요항표]
    {
      //
      //  2-1. 물건기본정보 표
      //
      {
        var trs = tables[0].querySelectorAll("tr");
        var t1 = printChildNodeText(trs[0]); // 사건번호, 물건번호, 물건종류
        var t2 = printChildNodeText(trs[1]); // 감정평가액, 최저매각가격, 입찰방법
        var t3 = printChildNodeText(trs[2]); // 매각기일
        var t4 = printChildNodeText(trs[3]); // 물건비고
        var t5 = printChildNodeText(trs[4]); // 목록1 소재지
        var t6 = printChildNodeText(trs[5]); // 담당

        objInfo["binfo1"] = [t1, t2, t3, t4, t5, t6];
      }

      //
      //  2-2. 물건기본정보 표2
      //
      {
        var trs = tables[1].querySelectorAll("tr");
        var t1 = printChildNodeText(trs[0]); // 사건접수, 경매개시일
        var t2 = printChildNodeText(trs[1]); // 배당요구종기, 청구금액

        objInfo["binfo2"] = [t1, t2];
      }

      //
      //  2-3. 감정평가요항표
      //
      {
        var trs = tables[1].querySelectorAll("tr");
        var eve = [];

        for (var trsi = 0; trsi < trs.length; trsi++) {
          eve.push(printChildNodeText(trs[trsi]));
        }

        objInfo["eve"] = [eve];
      }
    }
  }

  //
  //  3. 기일내역
  //
  {
    var table = root.querySelectorAll("table.Ltbl_list")[0];
    // 기일, 기일종류, 기일장소, 최저매각가격, 기일결과
    var trs = table.querySelectorAll("tr");
    var dal = [];

    for (var trsi = 0; trsi < trs.length; trsi++) {
      dal.push(printChildNodeText(trs[trsi]));
    }

    objInfo["dal"] = dal;
  }

  return objInfo;
}

detailSrch("서울중앙지방법원", " 20210130100084", "1").then((e) => {
  //   console.log(e);
  console.log(parse_detailSrchHtml(e));
});
