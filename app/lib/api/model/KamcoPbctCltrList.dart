// This source code is a part of Auction App.
// Copyright (C) 2022. rollrat. Licensed under the Apache-2.0 License.

class KamcoPbctCltrList {
  Map<dynamic, dynamic> result;
  KamcoPbctCltrList({this.result});

  String _getValueByName(String name) {
    if (result.containsKey(name)) {
      var item = result[name];
      if (item is Map<dynamic, dynamic>) {
        if (item.containsKey("_text")) {
          return item["_text"];
        }
      }
    }
    return null;
  }

  /// 공고번호
  String PLNM_NO() => _getValueByName('PLNM_NO');

  /// 공매번호
  String PBCT_NO() => _getValueByName('PBCT_NO');

  /// 공매조건번호
  String PBCT_CDTN_NO() => _getValueByName('PBCT_CDTN_NO');

  /// 물건번호
  String CLTR_NO() => _getValueByName('CLTR_NO');

  /// 물건이력번호
  String CLTR_HSTR_NO() => _getValueByName('CLTR_HSTR_NO');

  /// 화면그룹코드
  String SCRN_GRP_CD() => _getValueByName('SCRN_GRP_CD');

  /// 용도명
  String CTGR_FULL_NM() => _getValueByName('CTGR_FULL_NM');

  /// 입찰번호
  String BID_MNMT_NO() => _getValueByName('BID_MNMT_NO');

  /// 물건명
  String CLTR_NM() => _getValueByName('CLTR_NM');

  /// 물건관리번호
  String CLTR_MNMT_NO() => _getValueByName('CLTR_MNMT_NO');

  /// 물건소재지(지번)
  String LDNM_ADRS() => _getValueByName('LDNM_ADRS');

  /// 물건소재지(도로명)
  String NMRD_ADRS() => _getValueByName('NMRD_ADRS');

  /// 처분방식코드
  String DPSL_MTD_CD() => _getValueByName('DPSL_MTD_CD');

  /// 처분방식코드명
  String DPSL_MTD_NM() => _getValueByName('DPSL_MTD_NM');

  /// 입찰방식명
  String BID_MTD_NM() => _getValueByName('BID_MTD_NM');

  /// 최저입찰가
  String MIN_BID_PRC() => _getValueByName('MIN_BID_PRC');

  /// 감정가
  String APSL_ASES_AVG_AMT() => _getValueByName('APSL_ASES_AVG_AMT');

  /// 최저입찰가율
  String FEE_RATE() => _getValueByName('FEE_RATE');

  /// 입찰시작일시
  String PBCT_BEGN_DTM() => _getValueByName('PBCT_BEGN_DTM');

  /// 입찰마감일시
  String PBCT_CLS_DTM() => _getValueByName('PBCT_CLS_DTM');

  /// 물건상태
  String PBCT_CLTR_STAT_NM() => _getValueByName('PBCT_CLTR_STAT_NM');

  /// 유찰횟수
  String USCBD_CNT() => _getValueByName('USCBD_CNT');

  /// 조회수
  String IQRY_CNT() => _getValueByName('IQRY_CNT');

  /// 물건상세정보
  String GOODS_NM() => _getValueByName('GOODS_NM');

  /// 제조사
  String MANF() => _getValueByName('MANF');

  /// 모델
  String MDL() => _getValueByName('MDL');

  /// 연월식
  String NRGT() => _getValueByName('NRGT');

  /// 변속기
  String GRBX() => _getValueByName('GRBX');

  /// 배기량
  String ENDPC() => _getValueByName('ENDPC');

  /// 주행거리
  String VHCL_MLGE() => _getValueByName('VHCL_MLGE');

  /// 연료
  String FUEL() => _getValueByName('FUEL');

  /// 법인명
  String SCRT_NM() => _getValueByName('SCRT_NM');

  /// 업종
  String TPBZ() => _getValueByName('TPBZ');

  /// 종목명
  String ITM_NM() => _getValueByName('ITM_NM');

  /// 회원권명
  String MMB_RGT_NM() => _getValueByName('MMB_RGT_NM');

  /// 물건이미지
  List<String> CLTR_IMG_FILES() {
    if (result.containsKey('CLTR_IMG_FILES')) {
      var item = result['CLTR_IMG_FILES'];
      if (item is Map<dynamic, dynamic>) {
        if (item.containsKey('CLTR_IMG_FILE')) {
          return (item['CLTR_IMG_FILE'] as List<dynamic>)
              .map((e) => e['_text'] as String)
              .toList();
        }
      }
    }
    return null;
  }
}
