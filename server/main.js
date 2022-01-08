// https://www.data.go.kr/data/15000851/openapi.do

const serviceKey = require("./service-key");
const convert = require("xml-js");
var request = require("request");

var url =
  "http://openapi.onbid.co.kr/openapi/services/KamcoPblsalThingInquireSvc/getKamcoPbctCltrList";
var queryParams =
  "?" + encodeURIComponent("serviceKey") + "=" + serviceKey; /* Service Key*/
queryParams +=
  "&" + encodeURIComponent("numOfRows") + "=" + encodeURIComponent("10"); /* */
queryParams +=
  "&" + encodeURIComponent("pageNo") + "=" + encodeURIComponent("1"); /* */
queryParams +=
  "&" +
  encodeURIComponent("DPSL_MTD_CD") +
  "=" +
  encodeURIComponent("0001"); /* */
// queryParams += '&' + encodeURIComponent('CTGR_HIRK_ID') + '=' + encodeURIComponent('10000'); /* */
// queryParams += '&' + encodeURIComponent('CTGR_HIRK_ID_MID') + '=' + encodeURIComponent('10100'); /* */
// queryParams += '&' + encodeURIComponent('SIDO') + '=' + encodeURIComponent('강원도'); /* */
// queryParams += '&' + encodeURIComponent('SGK') + '=' + encodeURIComponent('인제군'); /* */
// queryParams += '&' + encodeURIComponent('EMD') + '=' + encodeURIComponent('남면'); /* */
// queryParams += '&' + encodeURIComponent('GOODS_PRICE_FROM') + '=' + encodeURIComponent('522740000'); /* */
// queryParams += '&' + encodeURIComponent('GOODS_PRICE_TO') + '=' + encodeURIComponent('617393000'); /* */
// queryParams += '&' + encodeURIComponent('OPEN_PRICE_FROM') + '=' + encodeURIComponent('522740000'); /* */
// queryParams += '&' + encodeURIComponent('OPEN_PRICE_TO') + '=' + encodeURIComponent('617393000'); /* */
// queryParams += '&' + encodeURIComponent('CLTR_NM') + '=' + encodeURIComponent('종이팩'); /* */
// queryParams += '&' + encodeURIComponent('PBCT_BEGN_DTM') + '=' + encodeURIComponent('20171218'); /* */
// queryParams += '&' + encodeURIComponent('PBCT_CLS_DTM') + '=' + encodeURIComponent('20171218'); /* */
// queryParams += '&' + encodeURIComponent('CLTR_MNMT_NO') + '=' + encodeURIComponent('2012-1141-001291'); /* */

request(
  {
    url: url + queryParams,
    method: "GET",
  },
  function (error, response, body) {
    console.log("Status", response.statusCode);
    console.log("Headers", JSON.stringify(response.headers));
    var json = convert.xml2json(body, { compact: true, spaces: 4 });
    console.log("Reponse received", json);
  }
);
