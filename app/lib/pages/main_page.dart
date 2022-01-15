// This source code is a part of Auction App.
// Copyright (C) 2022. rollrat. Licensed under the Apache-2.0 License.

import 'dart:io';

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
  static int defaultInitialPage = 0;

  PageController _pageController =
      PageController(initialPage: defaultInitialPage);

  int get _currentPage => _pageController.hasClients
      ? _pageController.page!.round()
      : defaultInitialPage;

  Widget _buildBottomNavigationBar(BuildContext context) {
    BottomNavigationBarItem buildItem(IconData iconData, String key) {
      return BottomNavigationBarItem(
        backgroundColor: Settings.isDarkTheme
            ? Colors.grey.shade900.withOpacity(0.90)
            : Colors.grey.shade50,
        icon: Icon(iconData),
        label: key,
      );
    }

    Widget result = BottomNavigationBar(
      showUnselectedLabels: false,
      type: BottomNavigationBarType.shifting,
      fixedColor: Colors.blue,
      unselectedItemColor: Settings.isDarkTheme ? Colors.white : Colors.black,
      currentIndex: _currentPage,
      onTap: (index) {
        _pageController.animateToPage(
          index,
          duration: const Duration(milliseconds: 250),
          curve: Curves.easeInOut,
        );
      },
      items: <BottomNavigationBarItem>[
        buildItem(MdiIcons.home, 'main'),
      ],
    );

    if (Platform.isAndroid) {
      final mediaQuery = MediaQuery.of(context);
      result = MediaQuery(
        data: mediaQuery.copyWith(
          padding: mediaQuery.padding +
              mediaQuery.viewInsets +
              const EdgeInsets.only(bottom: 6),
        ),
        child: result,
      );
    }

    return result;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Auction Test'),
      ),
      bottomNavigationBar: _buildBottomNavigationBar(context),
      body: PageView(
        controller: _pageController,
        onPageChanged: (newPage) {
          setState(() {});
        },
        children: <Widget>[
          SearchPage(),
        ],
      ),
    );
  }
}
