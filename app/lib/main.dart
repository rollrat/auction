// This source code is a part of Auction App.
// Copyright (C) 2022. rollrat. Licensed under the Apache-2.0 License.

import 'package:auctionapp/api/model/KamcoPbctCltrList.dart';
import 'package:auctionapp/api/openapi-test.dart';
import 'package:flutter/material.dart';

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
            return Card(
              child: Column(
                children: [
                  if (e.CLTR_IMG_FILES() != null)
                    Image.network(e.CLTR_IMG_FILES().first),
                  Text(e.NMRD_ADRS() ?? ''),
                ],
              ),
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
