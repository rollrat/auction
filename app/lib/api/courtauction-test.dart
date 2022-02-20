// This source code is a part of Auction App.
// Copyright (C) 2022. rollrat. Licensed under the Apache-2.0 License.

import 'dart:convert';
import 'dart:io';

import 'package:flutter/services.dart';

import 'model/CourtAuctionDetailSrch.dart';

class CourtAuctionTest {
  static Future<List<CourtAuctionDetailSrch>>
      testGetCourtAuctionDetailSrchList() async {
    String data;

    if (Platform.environment.containsKey('FLUTTER_TEST')) {
      var file =
          File('/home/ubuntu/auction/app/assets/tests/test-data-0002.json');
      data = await file.readAsString();
    } else
      data = await rootBundle.loadString('assets/tests/test-data-0002.json');

    return (json.decode(data) as List<dynamic>)
        .map((e) => CourtAuctionDetailSrch(result: e))
        .toList();
  }
}
