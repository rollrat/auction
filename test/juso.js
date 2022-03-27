const convert = require("xml-js");
const rp = require("request-promise");
const token = require("./private/token");

async function requestOpenApi(url, confmKey, params) {
  var queryParams = "?" + encodeURIComponent("confmKey") + "=" + confmKey;

  for (const [key, value] of Object.entries(params)) {
    queryParams +=
      "&" + encodeURIComponent(key) + "=" + encodeURIComponent(value);
  }

  var body = await rp({ url: url + queryParams, method: "GET" });
  return JSON.parse(body);
}

async function requestAddrLinkApi(confmKey, params) {
  const url = "https://www.juso.go.kr/addrlink/addrLinkApi.do";
  return await requestOpenApi(url, confmKey, params);
}

async function requestAddrCoordApi(confmKey, params) {
  const url = "https://www.juso.go.kr/addrlink/addrCoordApi.do";
  return await requestOpenApi(url, confmKey, params);
}

(async () => {
  let result1 = await requestAddrLinkApi(token.addrLinkApi, {
    resultType: "json",
    currentPage: 1,
    countPerPage: 5,
    keyword: "인천시 미추홀구 경원대로 717",
  });

  console.log(JSON.stringify(result1, null, 4));

  let pick = result1.results.juso[0];

  console.log(pick);

  let result2 = await requestAddrCoordApi(token.addrCoordApi, {
    resultType: "json",
    admCd: pick.admCd,
    rnMgtSn: pick.rnMgtSn,
    udrtYn: pick.udrtYn,
    buldMnnm: pick.buldMnnm,
    buldSlno: pick.buldSlno,
  });

  console.log(JSON.stringify(result2, null, 4));
})();
