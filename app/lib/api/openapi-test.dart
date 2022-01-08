// This source code is a part of Auction App.
// Copyright (C) 2022. rollrat. Licensed under the Apache-2.0 License.

import 'dart:convert';
import 'dart:io';

import 'package:auctionapp/api/model/KamcoPbctCltrList.dart';
import 'package:flutter/services.dart';

class OepnApiTest {
  static Future<List<KamcoPbctCltrList>> testGetKamcoPbctCltrList() async {
    String data;

    if (Platform.environment.containsKey('FLUTTER_TEST')) {
      var file =
          File('/home/ubuntu/auction/app/assets/tests/test-data-0001.json');
      data = await file.readAsString();
    } else
      data = await rootBundle.loadString('assets/tests/test-data-0001.json');

    return (json.decode(data)['response']['body']['items']['item']
            as List<dynamic>)
        .map((e) => KamcoPbctCltrList(result: e))
        .toList();
  }
}
