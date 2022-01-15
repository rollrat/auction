// This source code is a part of Auction App.
// Copyright (C) 2022. rollrat. Licensed under the Apache-2.0 License.

class CourtAuctionHeaderItem {
  final Map<dynamic, dynamic> result;
  CourtAuctionHeaderItem({required this.result});

  String? _getValueByName(String name) {
    if (result.containsKey(name)) {
      return result[name];
    }
    return null;
  }

  /// 사건번호
  String? EVENT_NO() => _getValueByName('EVENT_NO');

  /// 감정평가액
  String? APPRAISED_VALUE() => _getValueByName('APPRAISED_VALUE');

  /// 최저매각가격
  String? MIN_SELLING_PRICE() => _getValueByName('MIN_SELLING_PRICE');

  /// 소재지
  String? LOCATION() => _getValueByName("LOCATION");

  /// 썸네일
  String? THUMBNAIL() => _getValueByName("THUMBNAIL");

  /// 매각기일
  String? SALE_DATE() => _getValueByName("SALE_DATE");

  /// 법원
  String? COURT_NAME() => _getValueByName("COURT_NAME");
}

class CourtAuctionHeaderItemTest {
  static List<CourtAuctionHeaderItem> items = [
    CourtAuctionHeaderItem(result: {
      "EVENT_NO": "2016헌나1",
      "APPRAISED_VALUE": "120999999",
      "MIN_SELLING_PRICE": "60555555",
      "LOCATION": "서울특별시 여의도",
      "THUMBNAIL":
          "https://cdn.pixabay.com/photo/2016/05/05/02/37/sunset-1373171_960_720.jpg",
      "COURT_NAME": "서울지방법원",
      "SALE_DATE": "2022년 01월 23일",
    }),
    CourtAuctionHeaderItem(result: {
      "EVENT_NO": "2016헌나2",
      "APPRAISED_VALUE": "160999999",
      "MIN_SELLING_PRICE": "20555555",
      "LOCATION": "서울특별시 강화도",
      "THUMBNAIL":
          "https://cdn.pixabay.com/photo/2013/04/04/12/34/mountains-100367_960_720.jpg",
      "COURT_NAME": "서울지방법원",
      "SALE_DATE": "2022년 01월 23일",
    }),
  ];
}
