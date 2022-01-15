// This is a basic Flutter widget test.
//
// To perform an interaction with a widget in your test, use the WidgetTester
// utility that Flutter provides. For example, you can send tap and scroll
// gestures. You can also use WidgetTester to find child widgets in the widget
// tree, read text, and verify that the values of widget properties are correct.

import 'package:auctionapp/api/openapi-test.dart';
import 'package:flutter_test/flutter_test.dart';

void main() {
  test('OepnApi Test', () async {
    var res = await OepnApiTest.testGetKamcoPbctCltrList();

    expect(res[0].CLTR_MNMT_NO(), '2021-07457-255');
    expect(res[0].CLTR_IMG_FILES()![0],
        'https://www.onbid.co.kr/op/common/downloadFile.do?atchFilePtcsNo=12194437&atchSeq=2');
  });
}
