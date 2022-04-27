// This source code is a part of Auction App.
// Copyright (C) 2022. rollrat. Licensed under the Apache-2.0 License.

const request = require("request");
const Iconv = require("iconv").Iconv;
const jschardet = require("jschardet");
const parser = require("node-html-parser");

const apiUtils = require("./../apiUtils");

/* vJiwonNm 법원이름 */
async function searchBudongsan(vJiwonNm, targetRow, params) {
  return [
    await apiUtils.doPost({
      uri: "https://www.courtauction.go.kr/RetrieveRealEstMulDetailList.laf",
      body: apiUtils.encodeForm({
        realVowel: "00000_55203",
        bubwLocGubun: "1",
        jpDeptCd: "000000",
        jiwonNm: apiUtils.anyToEUCKR(vJiwonNm),
        saYear: encodeURI(2022),
        termStartDt: encodeURI("2022.04.27"),
        termEndDt: encodeURI("2022.05.11"),
        srnID: encodeURI("PNO102001"),
        mvRealGbncd: encodeURI("00031R"),
        ipchalGbncd: encodeURI(""),
        targetRow: encodeURI(targetRow),
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

function parse_searchBudongsan(html) {
  const root = parser.parse(html);

  var results = [];

  var ll = root.querySelectorAll(`.Ltbl_list tbody tr`);
  for (var i = 0; i < ll.length; i++) {
    var openScript = ll[i].querySelectorAll("td")[1].querySelector("a").attrs[
      "onclick"
    ];
    var scriptParams = openScript
      .replace(/\s\s+/g, " ")
      .split("(")[1]
      .split(")")[0]
      .split(",")
      .map((e) => e.replace(/'/gi, ""));

    var trs = ll[i].querySelectorAll("td");
    var 사건번호 = apiUtils.printChildNodeText(ll[i].querySelectorAll("td")[1]);
    var 물건번호 = apiUtils.printChildNodeText(ll[i].querySelectorAll("td")[2]);
    var 소재지 = apiUtils.printChildNodeText(ll[i].querySelectorAll("td")[3]);
    var 비고 = apiUtils.printChildNodeText(ll[i].querySelectorAll("td")[4]);
    var 감정평가액 = apiUtils.printChildNodeText(
      ll[i].querySelectorAll("td")[5]
    );
    var 진행상태 = apiUtils.printChildNodeText(ll[i].querySelectorAll("td")[6]);

    results.push({
      param: scriptParams,
      s1: 사건번호,
      s2: 물건번호,
      s3: 소재지,
      s4: 비고,
      s5: 감정평가액,
      s6: 진행상태,
    });
  }

  return results;
}

module.exports = {
  searchBudongsan: searchBudongsan,
  parse_searchBudongsan: parse_searchBudongsan,
};
