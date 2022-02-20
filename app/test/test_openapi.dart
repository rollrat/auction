// This is a basic Flutter widget test.
//
// To perform an interaction with a widget in your test, use the WidgetTester
// utility that Flutter provides. For example, you can send tap and scroll
// gestures. You can also use WidgetTester to find child widgets in the widget
// tree, read text, and verify that the values of widget properties are correct.

import 'package:auctionapp/api/courtauction-test.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:intl/intl.dart';

void main() {
  test('CourtAuction Test', () async {
    var res = await CourtAuctionTest.testGetCourtAuctionDetailSrchList();

    DateFormat koreanFormatter = DateFormat("yyyy년 MM월 dd일");
    print(koreanFormatter.format(res[0].saleDate()));
    print(res[0].thumbnail());
    print(res[0].eventNumber());
    print(res[0].minSellingPrice());
    print(res[0].appraisedValue());
    print(res[0].courtName());
    print(res[0].location());

    expect(res[0].photos()[0],
        'https://www.courtauction.go.kr/DownFront?spec=default&dir=kj/2020/1112&filename=B000210202001300048991.jpg&downloadfilename=B000210202001300048991.jpg');
  });
}
