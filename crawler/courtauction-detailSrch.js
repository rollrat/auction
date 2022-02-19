// This source code is a part of Auction App.
// Copyright (C) 2022. rollrat. Licensed under the Apache-2.0 License.

const request = require("request");
const Iconv = require("iconv").Iconv;
const jschardet = require("jschardet");

// var ii = new iconv.Iconv("euc-kr", "utf-8");

function anyToUtf8(str) {
  const { encoding } = jschardet.detect(str);
  const iconv = new Iconv(encoding, "utf-8//translit//ignore");
  return iconv.convert(str).toString();
}

function anyToEUCKR(str) {
  const { encoding } = jschardet.detect(str);
  const iconv = new Iconv("utf-8", "euc-kr");
  return escape(iconv.convert(str).toString("binary"));
}

function encodeForm(form) {
  var arrs = [];

  Object.keys(form).forEach((key) => {
    arrs.push(`${key}=${form[key]}`);
  });

  console.log(arrs.join("&"));

  return arrs.join("&");
}

async function detailSrch(vJiwonNm, vSaNo, vMaemulSer) {
  request.post(
    {
      uri: "https://www.courtauction.go.kr/RetrieveRealEstCarHvyMachineMulDetailInfo.laf",
      body: encodeForm({
        jiwonNm: anyToEUCKR(vJiwonNm),
        saNo: encodeURI(vSaNo.trim()),
        maemulSer: encodeURI(vMaemulSer),
        // _NEXT_SRNID: "PNO102015",

        // jiwonNm: %BC%AD%BF%EF%C1%DF%BE%D3%C1%F6%B9%E6%B9%FD%BF%F8
        // saNo: 20210130100084
        // maemulSer: 1
        // mokmulSer: "",
        // _NAVI_CMD: "RetrieveMainInfo.laf%5EInitMulSrch.laf",
        // _NAVI_SRNID: "PNO102000%5EPNO102001",
        // _SRCH_SRNID: "PNO102001",
        // _CUR_CMD: "RetrieveRealEstMulDetailList.laf",
        // _CUR_SRNID: "PNO102002",
        // _NEXT_CMD: "RetrieveRealEstCarHvyMachineMulDetailInfo.laf",
        // _NEXT_SRNID: "PNO102015",
        // _PRE_SRNID: "",
        // _LOGOUT_CHK: "",
        // _FORM_YN: "Y",
        // _C_srnID: "PNO102000",
        // _C_jiwonNm: "%BC%AD%BF%EF%C1%DF%BE%D3%C1%F6%B9%E6%B9%FD%BF%F8",
        // _C_bubwLocGubun: 1,
        // _C_jibhgwanOffMgakPlcGubun: "",
        // _C_mvmPlaceSidoCd: "",
        // _C_mvmPlaceSiguCd: "",
        // _C_roadPlaceSidoCd: "",
        // _C_roadPlaceSiguCd: "",
        // _C_daepyoSidoCd: "",
        // _C_daepyoSiguCd: "",
        // _C_daepyoDongCd: "",
        // _C_rd1Cd: "",
        // _C_rd2Cd: "",
        // _C_rd3Rd4Cd: "",
        // _C_roadCode: "",
        // _C_notifyLoc: 1,
        // _C_notifyRealRoad: 1,
        // _C_notifyNewLoc: 1,
        // _C_mvRealGbncd: 1,
        // _C_jiwonNm1: "%BC%AD%BF%EF%C1%DF%BE%D3%C1%F6%B9%E6%B9%FD%BF%F8",
        // _C_jiwonNm2: "%BC%AD%BF%EF%C1%DF%BE%D3%C1%F6%B9%E6%B9%FD%BF%F8",
        // _C_mDaepyoSidoCd: "",
        // _C_mvDaepyoSidoCd: "",
        // _C_mDaepyoSiguCd: "",
        // _C_mvDaepyoSiguCd: "",
        // _C_realVowel: "00000_55203",
        // _C_vowelSel: "00000_55203",
        // _C_mDaepyoDongCd: "",
        // _C_mvmPlaceDongCd: "",
      }),
      //         "jiwonNm=%EC%84%9C%EC%9A%B8%EC%A4%91%EC%95%99%EC%A7%80%EB%B0%A9%EB%B2%95%EC%9B%90&saNo=2020210130100084&maemulSer=1&mokmulSer=&_NAVI_CMD=RetrieveMainInfo.laf%5EInitMulSrch.laf&_NAVI_SRNID=PNO102000%5EPNO102001&_SRCH_SRNID=PNO102001&_CUR_CMD=RetrieveRealEstMulDetailList.laf&_CUR_SRNID=PNO102002&_NEXT_CMD=RetrieveRealEstCarHvyMachineMulDetailInfo.laf&_NEXT_SRNID=PNO102015&_PRE_SRNID=&_LOGOUT_CHK=&_FORM_YN=Y&_C_srnID=PNO102000&_C_jiwonNm=%BC%AD%BF%EF%C1%DF%BE%D3%C1%F6%B9%E6%B9%FD%BF%F8&_C_bubwLocGubun=1&_C_jibhgwanOffMgakPlcGubun=&_C_mvmPlaceSidoCd=&_C_mvmPlaceSiguCd=&_C_roadPlaceSidoCd=&_C_roadPlaceSiguCd=&_C_daepyoSidoCd=&_C_daepyoSiguCd=&_C_daepyoDongCd=&_C_rd1Cd=&_C_rd2Cd=&_C_rd3Rd4Cd=&_C_roadCode=&_C_notifyLoc=1&_C_notifyRealRoad=1&_C_notifyNewLoc=1&_C_mvRealGbncd=1&_C_jiwonNm1=%BC%AD%BF%EF%C1%DF%BE%D3%C1%F6%B9%E6%B9%FD%BF%F8&_C_jiwonNm2=%BC%AD%BF%EF%C1%DF%BE%D3%C1%F6%B9%E6%B9%FD%BF%F8&_C_mDaepyoSidoCd=&_C_mvDaepyoSidoCd=&_C_mDaepyoSiguCd=&_C_mvDaepyoSiguCd=&_C_realVowel=00000_55203&_C_vowelSel=00000_55203&_C_mDaepyoDongCd=&_C_mvmPlaceDongCd="
      //   body: "jiwonNm=%BC%AD%BF%EF%C1%DF%BE%D3%C1%F6%B9%E6%B9%FD%BF%F8&saNo=20210130100084&maemulSer=1&mokmulSer=&_NAVI_CMD=RetrieveMainInfo.laf%5EInitMulSrch.laf&_NAVI_SRNID=PNO102000%5EPNO102001&_SRCH_SRNID=PNO102001&_CUR_CMD=RetrieveRealEstMulDetailList.laf&_CUR_SRNID=PNO102002&_NEXT_CMD=RetrieveRealEstCarHvyMachineMulDetailInfo.laf&_NEXT_SRNID=PNO102015&_PRE_SRNID=&_LOGOUT_CHK=&_FORM_YN=Y&_C_srnID=PNO102000&_C_jiwonNm=%BC%AD%BF%EF%C1%DF%BE%D3%C1%F6%B9%E6%B9%FD%BF%F8&_C_bubwLocGubun=1&_C_jibhgwanOffMgakPlcGubun=&_C_mvmPlaceSidoCd=&_C_mvmPlaceSiguCd=&_C_roadPlaceSidoCd=&_C_roadPlaceSiguCd=&_C_daepyoSidoCd=&_C_daepyoSiguCd=&_C_daepyoDongCd=&_C_rd1Cd=&_C_rd2Cd=&_C_rd3Rd4Cd=&_C_roadCode=&_C_notifyLoc=1&_C_notifyRealRoad=1&_C_notifyNewLoc=1&_C_mvRealGbncd=1&_C_jiwonNm1=%BC%AD%BF%EF%C1%DF%BE%D3%C1%F6%B9%E6%B9%FD%BF%F8&_C_jiwonNm2=%BC%AD%BF%EF%C1%DF%BE%D3%C1%F6%B9%E6%B9%FD%BF%F8&_C_mDaepyoSidoCd=&_C_mvDaepyoSidoCd=&_C_mDaepyoSiguCd=&_C_mvDaepyoSiguCd=&_C_realVowel=00000_55203&_C_vowelSel=00000_55203&_C_mDaepyoDongCd=&_C_mvmPlaceDongCd=",
      headers: {
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36",
        accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "content-type": "application/x-www-form-urlencoded",
        cookie:
          "WMONID=G1elsQlYpTn; JSESSIONID=ephPJY9QpvO5scLbaB7WHN7YqOVh5aBCsz4PoqSw4zIgbgCG75xdOxnaQzx2VZN9.amV1c19kb21haW4vYWlzMg==; realJiwonNm=%BC%AD%BF%EF%C1%DF%BE%D3%C1%F6%B9%E6%B9%FD%BF%F8; daepyoSidoCd=; daepyoSiguCd=; mvmPlaceSidoCd=; mvmPlaceSiguCd=; rd1Cd=; rd2Cd=; realVowel=35207_45207; roadPlaceSidoCd=; roadPlaceSiguCd=; vowelSel=35207_45207; toMul=%BC%AD%BF%EF%C1%DF%BE%D3%C1%F6%B9%E6%B9%FD%BF%F8%2C20210130100084%2C1%2C20220302%2CB%5E%BC%AD%BF%EF%C1%DF%BE%D3%C1%F6%B9%E6%B9%FD%BF%F8%2C20200130005373%2C4%2C20220302%2CB%5E%BC%AD%BF%EF%C1%DF%BE%D3%C1%F6%B9%E6%B9%FD%BF%F8%2C20200130110930%2C1%2C20220302%2CB%5E%BC%AD%BF%EF%C1%DF%BE%D3%C1%F6%B9%E6%B9%FD%BF%F8%2C20200130108517%2C1%2C20220302%2CB%5E%BC%AD%BF%EF%C1%DF%BE%D3%C1%F6%B9%E6%B9%FD%BF%F8%2C20200130004899%2C1%2C20220302%2CB%5E%BC%AD%BF%EF%C1%DF%BE%D3%C1%F6%B9%E6%B9%FD%BF%F8%2C20200130004462%2C1%2C20220302%2CB%5E; locIdx=202101301000841",
      },
      encoding: null,
    },
    function (err, httpResponse, body) {
      console.log(anyToUtf8(body));
    }
  );
}

detailSrch("서울중앙지방법원", " 20210130100084", "1");
