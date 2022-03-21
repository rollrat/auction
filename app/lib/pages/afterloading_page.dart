import 'dart:io';

import 'package:auctionapp/pages/map_page.dart';
import 'package:auctionapp/pages/search_page.dart';
import 'package:flutter/material.dart';
import 'package:material_design_icons_flutter/material_design_icons_flutter.dart';

import 'main_page.dart';

class AfterLoadingPage extends StatefulWidget {
  const AfterLoadingPage({Key? key}) : super(key: key);

  @override
  State<AfterLoadingPage> createState() => _AfterLoadingPageState();
}

class _AfterLoadingPageState extends State<AfterLoadingPage>
    with WidgetsBindingObserver {
  static int defaultInitialPage = 0;
  final PageController _pageController =
      PageController(initialPage: defaultInitialPage);
  int get _currentPage => _pageController.hasClients
      ? _pageController.page!.round()
      : defaultInitialPage;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance!.addObserver(this);
  }

  Widget _buildBottomNavigationBar(BuildContext context) {
    BottomNavigationBarItem buildItem(IconData iconData, String lable) {
      return BottomNavigationBarItem(
        icon: Icon(iconData),
        label: lable,
      );
    }

    Widget result = Theme(
      data: Theme.of(context).copyWith(canvasColor: null),
      child: BottomNavigationBar(
        // showUnselectedLabels: false,
        // type: BottomNavigationBarType.shifting,
        showSelectedLabels: false,
        showUnselectedLabels: false,
        type: BottomNavigationBarType.fixed,
        currentIndex: _currentPage,
        unselectedItemColor: Colors.black,
        fixedColor: Colors.blue,
        onTap: (index) {
          // _pageController.animateToPage(
          //   index,
          //   duration: const Duration(milliseconds: 250),
          //   curve: Curves.easeInOut,
          // );
          _pageController.jumpToPage(index);
        },
        items: <BottomNavigationBarItem>[
          buildItem(MdiIcons.homeOutline, '홈'),
          buildItem(MdiIcons.magnify, '검색'),
          buildItem(MdiIcons.map, '맵'),
          buildItem(Icons.settings, '설정'),
        ],
      ),
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
      bottomNavigationBar: _buildBottomNavigationBar(context),
      body: PageView(
        physics: const NeverScrollableScrollPhysics(),
        controller: _pageController,
        onPageChanged: (newPage) {
          setState(() {});
        },
        children: const [
          MainPage(),
          SearchPage(),
          MapPage(),
          SearchPage(),
        ],
      ),
    );
  }
}
