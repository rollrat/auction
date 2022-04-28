// This source code is a part of Auction App.
// Copyright (C) 2022. rollrat. Licensed under the Apache-2.0 License.

class CourtAuctionDetailSrch {
  final Map<dynamic, dynamic> result;
  CourtAuctionDetailSrch({required this.result});

  /// 사진
  List<String> photos() {
    if ((result['photos'] as List<dynamic>).length == 0) return [];
    return (result['photos'] as List<dynamic>)
        .map((e) =>
            'https://www.courtauction.go.kr' +
            (e as String).replaceAll("=T_", "="))
        .toList();
  }

  /// 대표사진
  String? _thumbnailCache;
  String? thumbnail() {
    if (_thumbnailCache != null) return _thumbnailCache;
    var tphotos = photos();
    if (tphotos.length == 0) return null;
    return _thumbnailCache = tphotos[0];
  }

  /// 사건번호
  String eventNumber() {
    return result["header"]["s1"][1].toString();
  }

  /// 매각기일
  DateTime saleDate() {
    return DateTime.parse(
        result["header"]["s6"][1].toString().replaceAll('.', ''));
  }

  /// 최저매각가격
  int minSellingPrice() {
    return int.parse(result["header"]["s5"][1].toString().replaceAll(',', ''));
  }

  /// 감정평가액
  int appraisedValue() {
    return int.parse(result["header"]["s5"][0].toString().replaceAll(',', ''));
  }

  /// 법원이름
  String courtName() {
    return result["header"]["param"][0].toString();
  }

  /// 소재지
  String location() {
    return result["header"]["s3"][0].toString();
  }
}
