// Copyright (c) 2019, the Dart project authors.  Please see the AUTHORS file
// for details. All rights reserved. Use of this source code is governed by a
// BSD-style license that can be found in the LICENSE file.

import 'package:flutter/material.dart';
import 'dart:math';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: const MyHomePage(title: 'Flutter Demo Home Page'),
    );
  }
}

class Settings {
  static bool isDarkTheme = false;
}

class MyHomePage extends StatefulWidget {
  final String title;

  const MyHomePage({
    Key? key,
    required this.title,
  }) : super(key: key);

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  int _counter = 0;

  void _incrementCounter() {
    setState(() {
      _counter++;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: SingleChildScrollView(
        scrollDirection: Axis.vertical,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Text(
              'You have pushed the button this many times:',
            ),
            Text(
              '$_counter',
              style: Theme.of(context).textTheme.headline4,
            ),
            AuctionSimpleItemWidget(CourtAuctionHeaderItemTest.items[0]),
            AuctionSimpleItemWidget(CourtAuctionHeaderItemTest.items[1]),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _incrementCounter,
        tooltip: 'Increment',
        child: const Icon(Icons.add),
      ),
    );
  }
}

class CourtAuctionHeaderItem {
  Map<dynamic, dynamic> result;
  CourtAuctionHeaderItem({required this.result});

  String? _getValueByName(String name) {
    if (result.containsKey(name)) {
      return result[name];
    }
    return null;
  }

  /// ????????????
  String? EVENT_NO() => _getValueByName('EVENT_NO');

  /// ???????????????
  String APPRAISED_VALUE() => _getValueByName('APPRAISED_VALUE') ?? '0';

  /// ??????????????????
  String MIN_SELLING_PRICE() => _getValueByName('MIN_SELLING_PRICE') ?? '0';

  /// ?????????
  String? LOCATION() => _getValueByName("LOCATION");

  /// ?????????
  String? THUMBNAIL() => _getValueByName("THUMBNAIL");

  /// ????????????
  String? SALE_DATE() => _getValueByName("SALE_DATE");

  /// ??????
  String? COURT_NAME() => _getValueByName("COURT_NAME");
}

class CourtAuctionHeaderItemTest {
  static List<CourtAuctionHeaderItem> items = [
    CourtAuctionHeaderItem(result: {
      "EVENT_NO": "2016??????1",
      "APPRAISED_VALUE": "120999999",
      "MIN_SELLING_PRICE": "60555555",
      "LOCATION": "??????????????? ?????????",
      "THUMBNAIL":
          "https://cdn.pixabay.com/photo/2016/05/05/02/37/sunset-1373171_960_720.jpg",
      "COURT_NAME": "??????????????????",
      "SALE_DATE": "2022??? 01??? 23???",
    }),
    CourtAuctionHeaderItem(result: {
      "EVENT_NO": "2016??????2",
      "APPRAISED_VALUE": "160999999",
      "MIN_SELLING_PRICE": "20555555",
      "LOCATION": "??????????????? ?????????",
      "THUMBNAIL":
          "https://cdn.pixabay.com/photo/2013/04/04/12/34/mountains-100367_960_720.jpg",
      "COURT_NAME": "??????????????????",
      "SALE_DATE": "2022??? 01??? 23???",
    }),
  ];
}

class GroupItemStyle extends StatelessWidget {
  final Widget? child;

  const GroupItemStyle({this.child});

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.fromLTRB(16, 0, 16, 8),
      width: double.infinity,
      decoration: BoxDecoration(
        color: Settings.isDarkTheme ? Colors.black26 : Colors.white,
        borderRadius: const BorderRadius.only(
          topLeft: Radius.circular(8),
          topRight: Radius.circular(8),
          bottomLeft: Radius.circular(8),
          bottomRight: Radius.circular(8),
        ),
        boxShadow: [
          BoxShadow(
            color: Settings.isDarkTheme
                ? Colors.black26
                : Colors.grey.withOpacity(0.1),
            spreadRadius: Settings.isDarkTheme ? 0 : 5,
            blurRadius: 7,
            offset: Offset(0, 3), // changes position of shadow
          ),
        ],
      ),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(8.0),
        child: Material(
          color: Settings.isDarkTheme ? Colors.black38 : Colors.white,
          child: child,
        ),
      ),
    );
  }
}

class DotsIndicator extends AnimatedWidget {
  DotsIndicator({
    required this.controller,
    required this.itemCount,
    required this.onPageSelected,
    this.color: Colors.white,
  }) : super(listenable: controller);

  /// The PageController that this DotsIndicator is representing.
  final PageController controller;

  /// The number of items managed by the PageController
  final int itemCount;

  /// Called when a dot is tapped
  final ValueChanged<int> onPageSelected;

  /// The color of the dots.
  ///
  /// Defaults to `Colors.white`.
  final Color color;

  // The base size of the dots
  static const double _kDotSize = 6.0;

  // The increase in the size of the selected dot
  static const double _kMaxZoom = 2.0;

  // The distance between the center of each dot
  static const double _kDotSpacing = 20.0;

  Widget _buildDot(int index) {
    double selectedness = Curves.easeOut.transform(
      max(
        0.0,
        1.0 - ((controller.page ?? controller.initialPage) - index).abs(),
      ),
    );
    double zoom = 1.0 + (_kMaxZoom - 1.0) * selectedness;
    return Container(
      width: _kDotSpacing,
      child: Center(
        child: Material(
          color:
              (Settings.isDarkTheme ? Colors.grey.shade100 : Color(0xFF353535))
                  .withAlpha((max(zoom - 1, 0.5) * 255).toInt()),
          type: MaterialType.circle,
          child: Container(
            width: _kDotSize * zoom,
            height: _kDotSize * zoom,
            child: InkWell(
              onTap: () => onPageSelected(index),
            ),
          ),
        ),
      ),
    );
  }

  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: List<Widget>.generate(itemCount, _buildDot),
    );
  }
}

class AuctionSimpleItemWidget extends StatelessWidget {
  final CourtAuctionHeaderItem item;
  final PageController _controller = PageController(
    initialPage: 0,
  );

  AuctionSimpleItemWidget(this.item);

  Padding _buildGroup(String name) {
    return Padding(
      padding: EdgeInsets.fromLTRB(20, 16, 20, 8),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: <Widget>[
          Text(name,
              style: TextStyle(
                color: Settings.isDarkTheme ? Colors.white : Colors.black87,
                fontSize: 24.0,
                letterSpacing: 1.0,
                fontWeight: FontWeight.w900,
              )),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final groupItem = GroupItemStyle(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Stack(
            children: [
              Image.network(item.THUMBNAIL() ?? ''),
              // Positioned(
              //   top: 8.0,
              //   left: 0.0,
              //   child: Container(
              //     color: Colors.black.withOpacity(0.5),
              //     child: Text('   ' + (item.EVENT_NO() ?? '') + ' ',
              //         style: TextStyle(
              //           color: Colors.white,
              //           fontSize: 20.0,
              //         )),
              //   ),
              // ),
            ],
          ),
          Container(
            padding: EdgeInsets.all(8.0),
            child: _GroupItemBody(item),
          ),
        ],
      ),
    );

    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        _buildGroup(item.EVENT_NO() ?? ''),
        Center(
          child: ScaleTranstionPressAnimationWidget(
            child: groupItem,
          ),
        ),
      ],
    );
  }
}

class ScaleTranstionPressAnimationWidget extends StatefulWidget {
  final Widget child;

  const ScaleTranstionPressAnimationWidget({Key? key, required this.child})
      : super(key: key);

  @override
  _ScaleTranstionPressAnimationWidgetState createState() =>
      _ScaleTranstionPressAnimationWidgetState();
}

class _ScaleTranstionPressAnimationWidgetState
    extends State<ScaleTranstionPressAnimationWidget>
    with TickerProviderStateMixin {
  late final AnimationController _controller = AnimationController(
      duration: const Duration(milliseconds: 300), vsync: this, value: 1.0);
  late final Animation<double> _animation = CurvedAnimation(
    parent: _controller,
    curve: Curves.easeInOut,
  );

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTapDown: (detail) {
        _controller.animateTo(0.95,
            duration: const Duration(milliseconds: 300),
            curve: Curves.easeInOut);
      },
      onTapUp: (detail) {
        _controller.animateTo(1.0,
            duration: const Duration(milliseconds: 300),
            curve: Curves.easeInOut);
      },
      onDoubleTap: () {},
      onTap: () {},
      child: ScaleTransition(
        scale: _animation,
        child: Container(child: widget.child),
      ),
    );
  }
}

class _GroupItemBody extends StatelessWidget {
  final CourtAuctionHeaderItem item;

  const _GroupItemBody(this.item);

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      child: Stack(
        children: [
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  Text((item.COURT_NAME() ?? ''),
                      style: TextStyle(
                        fontSize: 12.0,
                        color: Colors.grey,
                      )),
                ],
              ),
              Text(
                (item.LOCATION() ?? ''),
                style: TextStyle(fontWeight: FontWeight.w900, fontSize: 20.0),
                overflow: TextOverflow.ellipsis,
              ),
              Text(
                "????????????: " + (item.SALE_DATE() ?? ''),
                overflow: TextOverflow.ellipsis,
              ),
              Text(
                "????????????: " +
                    (item.MIN_SELLING_PRICE() ?? '') +
                    "???(${((int.parse(item.MIN_SELLING_PRICE()) / double.parse(item.APPRAISED_VALUE()) * 100.0)).round()}%)",
                overflow: TextOverflow.ellipsis,
              ),
            ],
          ),
          Positioned(
            bottom: 0,
            right: 0,
            child: Row(
              children: [
                IconButton(
                  onPressed: () {},
                  icon: Icon(
                    Icons.bookmark_border,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
