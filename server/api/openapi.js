// This source code is a part of Auction App.
// Copyright (C) 2022. rollrat. Licensed under the Apache-2.0 License.

const convert = require("xml-js");
const rp = require("request-promise");

// https://www.data.go.kr/data/15000851/openapi.do

async function requestOpenApi(url, serviceKey, params) {
  var queryParams = "?" + encodeURIComponent("serviceKey") + "=" + serviceKey;

  for (const [key, value] of Object.entries(params)) {
    queryParams +=
      "&" + encodeURIComponent(key) + "=" + encodeURIComponent(value);
  }

  var body = await rp({ url: url + queryParams, method: "GET" });
  return JSON.parse(convert.xml2json(body, { compact: true }));
}

/**
 * 캠코공매물건목록조회
 * 
 * https://www.data.go.kr/tcs/dss/selectApiDataDetailView.do?publicDataPk=15000851
 * 
 * 처분방식코드 등을 이용해 공고번호, 공매번호, 공매조건번호, 물건번호, 물건이력번호, 화면그룹코드, 용도명, 
 * 입찰번호, 물건명, 물건관리번호, 물건소재지(지번), 물건소재지(도로명), 처분방식코드, 처분방식코드명, 입찰방식명, 
 * 최저입찰가, 감정가, 최저입찰가율, 입찰시작일시, 입찰마감일시, 물건상태, 유찰횟수, 조회수 등을 조회하는 
 * 캠코공매물건목록조회 기능
 * @param {*} serviceKey 
 * @param {*} params 
   항목명(국문)			항목명(영문)			항목크기			항목구분			샘플데이터			항목설명
   인증키			serviceKey			100			필수			인증키 (URL- Encode)			공공데이터포털에서 발급받은 인증키
   페이지당 데이터 개수			numOfRows			2			필수			10			페이지당 데이터 개수
   페이지 번호			pageNo			5			필수			1			페이지 번호
   처분방식코드			DPSL_MTD_CD			VARCHAR2(4)			필수			0001			0001 매각 0002 임대
   카테고리상위ID			CTGR_HIRK_ID			VARCHAR2(20)			옵션			10000			코드조회 오퍼레이션 참조
   카테고리상위ID(중간)			CTGR_HIRK_ID_MID			VARCHAR2(20)			옵션			10100			코드조회 오퍼레이션 참조
   물건소재지(시도)			SIDO			VARCHAR2(100)			옵션			강원도			물건소재지(시도)
   물건소재지(시군구)			SGK			VARCHAR2(100)			옵션			인제군			물건소재지(시군구)
   물건소재지(읍면동)			EMD			VARCHAR2(100)			옵션			남면			물건소재지(읍면동)
   감정가하한			GOODS_PRICE_FROM			NUMBER(20)			옵션			522740000			감정가하한
   감정가상한			GOODS_PRICE_TO			NUMBER(20)			옵션			617393000			감정가상한
   최저입찰가하한			OPEN_PRICE_FROM			NUMBER(20)			옵션			522740000			최저입찰가하한
   최저입찰가상한			OPEN_PRICE_TO			NUMBER(20)			옵션			617393000			최저입찰가상한
   물건명			CLTR_NM			VARCHAR2(500)			옵션			종이팩			물건명
   입찰일자 From			PBCT_BEGN_DTM			VARCHAR2(8)			옵션			20171218			YYYYMMDD
   입찰일자 To			PBCT_CLS_DTM			VARCHAR2(8)			옵션			20171218			YYYYMMDD
   물건관리번호			CLTR_MNMT_NO			VARCHAR2(100)			옵션			2012-1141-001291			물건관리번호

 * @returns 
   항목명(국문)			항목명(영문)			항목크기			항목구분			샘플데이터			항목설명
   결과코드			resultCode			4			필수			00			결과코드
   결과메시지			resultMsg			50			필수			NORMAL SERVICE.			결과메시지
   한 페이지 결과 수			numOfRows			2			옵션			10			한 페이지 결과 수
   페이지 번호			pageNo			5			옵션			1			페이지 번호
   총 건수			TotalCount			7			옵션			1			조회데이터의 총 건수
   공고번호			PLNM_NO			NUMBER(22)			필수			394537			공고번호
   공매번호			PBCT_NO			NUMBER(22)			필수			438449			공매번호
   공매조건번호			PBCT_CDTN_NO			NUMBER(22)			필수			1500249			공매조건번호
   물건번호			CLTR_NO			NUMBER(22)			필수			498127			물건번호
   물건이력번호			CLTR_HSTR_NO			NUMBER(22)			필수			2060241			물건에 대한 이력번호
   화면그룹코드			SCRN_GRP_CD			VARCHAR2(4)			필수			0003			화면그룹코드
   용도명			CTGR_FULL_NM			VARCHAR2(100)			필수			토지 / 대지			용도명
   입찰번호			BID_MNMT_NO			VARCHAR2(50)			필수			097			입찰번호
   물건명			CLTR_NM			VARCHAR2(1000)			필수			서울 성동구 도선동 49			물건명
   물건관리번호			CLTR_MNMT_NO			VARCHAR2(50)			필수			2009-00042-001			물건관리번호
   물건소재지(지번)			LDNM_ADRS			VARCHAR2(1000)			필수			서울 성동구 도선동 49			물건소재지(지번)
   물건소재지(도로명)			NMRD_ADRS			VARCHAR2(1000)			필수			강원도 인제군 남면 가넷고개길 46			물건소재지(도로명)
   처분방식코드			DPSL_MTD_CD			VARCHAR2(10)			필수			0001			0001 매각 0002 임대
   처분방식코드명			DPSL_MTD_NM			VARCHAR2(100)			필수			매각			처분방식코드명
   입찰방식명			BID_MTD_NM			VARCHAR2(100)			필수			일반경쟁(최고가방식) / 총액			입찰방식명
   최저입찰가			MIN_BID_PRC			NUMBER(22)			필수			357724000			최저입찰가
   감정가			APSL_ASES_AVG_AMT			NUMBER(22)			필수			439192000			감정가
   최저입찰가율			FEE_RATE			VARCHAR2(10)			필수			(81%)			최저입찰가율
   입찰시작일시			PBCT_BEGN_DTM			VARCHAR2(14)			필수			20160524100000			YYYYMMDDHH24MISS
   입찰마감일시			PBCT_CLS_DTM			VARCHAR2(14)			필수			20160526170000			YYYYMMDDHH24MISS
   물건상태			PBCT_CLTR_STAT_NM			VARCHAR2(100)			필수			입찰준비중			물건상태
   유찰횟수			USCBD_CNT			NUMBER(22)			필수			81			유찰횟수
   조회수			IQRY_CNT			NUMBER(22)			필수			41			조회수
   물건상세정보			GOODS_NM			VARCHAR2(4000)			옵션			대지 213.2 ㎡			물건상세정보
   제조사			MANF			VARCHAR2(100)			옵션			케이에스피			제조사
   모델			MDL			VARCHAR2(100)			옵션			뉴체어맨CM500S레버런스			모델
   연월식			NRGT			VARCHAR2(100)			옵션			2016			연월식
   변속기			GRBX			VARCHAR2(100)			옵션			자동			변속기
   배기량			ENDPC			VARCHAR2(100)			옵션			14618			배기량
   주행거리			VHCL_MLGE			VARCHAR2(100)			옵션			50298			주행거리
   연료			FUEL			VARCHAR2(100)			옵션			경유			연료
   법인명			SCRT_NM			VARCHAR2(100)			옵션			특허권(IP지식재산/반도체도금 및 측정)			법인명
   업종			TPBZ			VARCHAR2(100)			옵션			유선 통신장비 제조업			업종
   종목명			ITM_NM			VARCHAR2(100)			옵션			(주)디지틀조선애드			종목명
   회원권명			MMB_RGT_NM			VARCHAR2(100)			옵션			윌리힐리파크 1308(제일저축)			회원권명
   물건이미지			CLTR_IMG_FILES			CLOB			옵션			<CLTR_IMG_FILE>...</CLTR_IMG_FILE><CLTR_IMG_FILE>...</CLTR_IMG_FILE>			물건이미지 다운로드 URL 리스트
 */
async function requestGetKamcoPbctCltrList(serviceKey, params) {
  const url =
    "http://openapi.onbid.co.kr/openapi/services/KamcoPblsalThingInquireSvc/getKamcoPbctCltrList";
  return await requestOpenApi(url, serviceKey, params);
}

module.exports = {
  requestGetKamcoPbctCltrList: requestGetKamcoPbctCltrList,
};
