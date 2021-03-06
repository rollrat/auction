// This source code is a part of Auction App.
// Copyright (C) 2022. rollrat. Licensed under the Apache-2.0 License.

import 'package:auctionapp/api/courtauction-test.dart';
import 'package:auctionapp/api/model/CourtAuctionDetailSrch.dart';
import 'package:auctionapp/pages/afterloading_page.dart';
import 'package:auctionapp/pages/debug/log_page.dart';
import 'package:flutter/material.dart';

import 'log/log.dart';

// class ItemImageSlider extends StatefulWidget {
//   final List<String> urls;

//   const ItemImageSlider(this.urls, {Key? key}) : super(key: key);

//   @override
//   _ItemImageSliderState createState() => _ItemImageSliderState();
// }

// class _ItemImageSliderState extends State<ItemImageSlider> {
//   @override
//   Widget build(BuildContext context) {
//     return Container(
//         child: CarouselSlider(
//       options: CarouselOptions(),
//       items: widget.urls
//           .map((item) => Image.network(
//                 item,
//                 fit: BoxFit.cover,
//               ))
//           .toList(),
//     ));
//   }
// }

// class MainPage extends StatefulWidget {
//   const MainPage({Key? key}) : super(key: key);

//   @override
//   _MainPageState createState() => _MainPageState();
// }

// class _MainPageState extends State<MainPage> {
//   @override
//   Widget build(BuildContext context) {
//     return Scaffold(
//       appBar: AppBar(
//         title: const Text('Auction Test'),
//       ),
//       body: TestItemListPage(),
//       floatingActionButton: FloatingActionButton(
//         onPressed: () {
//           PlatformNavigator.navigateSlide(context, LogPage());
//         },
//         tooltip: 'Log',
//         child: const Icon(Icons.receipt),
//       ),
//     );
//   }
// }

Future<void> recordFlutterError(FlutterErrorDetails flutterErrorDetails) async {
  Logger.error('[unhandled-error] E: ' +
      flutterErrorDetails.exceptionAsString() +
      '\n' +
      flutterErrorDetails.stack.toString());
}

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  FlutterError.onError = recordFlutterError;

  runApp(MaterialApp(
    home: AfterLoadingPage(),
  ));
}
