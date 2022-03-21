// This source code is a part of Auction App.
// Copyright (C) 2022. rollrat. Licensed under the Apache-2.0 License.

import 'dart:io';

import 'package:auctionapp/main.dart';
import 'package:auctionapp/other/platform_navigator.dart';
import 'package:auctionapp/pages/debug/log_page.dart';
import 'package:auctionapp/pages/search_page.dart';
import 'package:auctionapp/settings/settings.dart';
import 'package:flutter/material.dart';
import 'package:material_design_icons_flutter/material_design_icons_flutter.dart';

class MainPage extends StatefulWidget {
  const MainPage({Key? key}) : super(key: key);
  @override
  _MainPageState createState() => _MainPageState();
}

class _MainPageState extends State<MainPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Auction Test'),
      ),
      body: TestItemListPage(),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          PlatformNavigator.navigateSlide(context, LogPage());
        },
        tooltip: 'Log',
        child: const Icon(Icons.receipt),
      ),
    );
  }
}
