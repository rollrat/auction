// This source code is a part of Auction App.
// Copyright (C) 2022. rollrat. Licensed under the Apache-2.0 License.

import 'package:auctionapp/api/model/KamcoPbctCltrList.dart';
import 'package:auctionapp/api/openapi-test.dart';
import 'package:carousel_slider/carousel_slider.dart';
import 'package:flutter/material.dart';

class ItemImageSlider extends StatefulWidget {
  final List<String> urls;

  const ItemImageSlider(this.urls, {Key key}) : super(key: key);

  @override
  _ItemImageSliderState createState() => _ItemImageSliderState();
}

class _ItemImageSliderState extends State<ItemImageSlider> {
  @override
  Widget build(BuildContext context) {
    return Container(
        child: CarouselSlider(
      options: CarouselOptions(),
      items: widget.urls
          .map((item) => Image.network(
                item,
                fit: BoxFit.cover,
              ))
          .toList(),
    ));
  }
}

class TestItemListPage extends StatelessWidget {
  const TestItemListPage({Key key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return FutureBuilder(
      future: OepnApiTest.testGetKamcoPbctCltrList(),
      builder: (context, AsyncSnapshot<List<KamcoPbctCltrList>> snapshot) {
        if (!snapshot.hasData) return Container();
        return ListView.builder(
          itemBuilder: (context, index) {
            var e = snapshot.data[index];
            return Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                if (e.CLTR_IMG_FILES() != null)
                  ItemImageSlider(e.CLTR_IMG_FILES()),
                Container(
                  padding: EdgeInsets.all(8.0),
                  child: Column(
                    children: [
                      Text(
                        '물건관리번호: ' + (e.CLTR_MNMT_NO() ?? ''),
                        overflow: TextOverflow.ellipsis,
                      ),
                      Text(
                        '처분방식: ' + (e.DPSL_MTD_NM() ?? ''),
                        overflow: TextOverflow.ellipsis,
                      ),
                      Text(
                        '소재지: ' + (e.NMRD_ADRS() ?? ''),
                        overflow: TextOverflow.ellipsis,
                      ),
                    ],
                  ),
                ),
              ],
            );
          },
          itemCount: snapshot.data.length,
        );
      },
    );
  }
}

class MainPage extends StatefulWidget {
  const MainPage({Key key}) : super(key: key);

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
