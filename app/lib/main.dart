// This source code is a part of Auction App.
// Copyright (C) 2022. rollrat. Licensed under the Apache-2.0 License.

import 'package:auctionapp/api/courtauction-test.dart';
import 'package:auctionapp/api/model/CourtAuctionDetailSrch.dart';
import 'package:flutter/material.dart';

import 'widgets/content/AuctionSimpleItemWidget.dart';

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

class TestItemListPage extends StatelessWidget {
  const TestItemListPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return FutureBuilder(
      future: CourtAuctionTest.testGetCourtAuctionDetailSrchList(),
      builder: (context, AsyncSnapshot<List<CourtAuctionDetailSrch>> snapshot) {
        if (!snapshot.hasData) return Container();
        return ListView.builder(
          itemBuilder: (context, index) =>
              AuctionSimpleItemWidget(snapshot.data![index]),
          itemCount: snapshot.data!.length,
        );
      },
    );
  }
}

class MainPage extends StatefulWidget {
  const MainPage({Key? key}) : super(key: key);

  @override
  _MainPageState createState() => _MainPageState();
}

class _MainPageState extends State<MainPage> {
  int _count = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Auction Test'),
      ),
      body: TestItemListPage(),
      floatingActionButton: FloatingActionButton(
        onPressed: () => setState(() => _count++),
        tooltip: 'Increment Counter',
        child: const Icon(Icons.add),
      ),
    );
  }
}

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  runApp(MaterialApp(
    home: MainPage(),
  ));
}
