// This source code is a part of Auction App.
// Copyright (C) 2022. rollrat. Licensed under the Apache-2.0 License.

import 'package:auctionapp/api/model/CourtAuctionDetailSrch.dart';
import 'package:auctionapp/settings/settings.dart';
import 'package:auctionapp/widgets/style/GroupItemStyle.dart';
import 'package:auctionapp/widgets/style/ScaleTranstionPressAnimationWidget.dart';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

class AuctionSimpleItemWidget extends StatelessWidget {
  final CourtAuctionDetailSrch item;
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
                fontSize: 16.0,
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
              if (item.thumbnail() != null)
                GridView.count(
                  padding: EdgeInsets.zero,
                  primary: false,
                  crossAxisCount: 2,
                  shrinkWrap: true,
                  childAspectRatio: 16 / 9,
                  children:
                      item.photos().take(4).map((e) => _imageUnit(e)).toList(),
                ),
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
        _buildGroup(item.eventNumber()),
        ScaleTranstionPressAnimationWidget(
          child: groupItem,
          onTap: () {},
        ),
      ],
    );
  }

  Widget _imageUnit(url) {
    return Image.network(
      url,
      fit: BoxFit.cover,
      loadingBuilder: (context, child, loadingProgress) {
        if (loadingProgress == null) {
          return child;
        }

        return SizedBox(
          height: 300.0,
          child: Center(
            child: CircularProgressIndicator(
              value: loadingProgress.expectedTotalBytes != null
                  ? loadingProgress.cumulativeBytesLoaded /
                      loadingProgress.expectedTotalBytes!
                  : null,
            ),
          ),
        );
      },
    );
  }
}

RegExp reg = RegExp(r'(\d{1,3})(?=(\d{3})+(?!\d))');
String Function(Match) mathFunc = (Match match) => '${match[1]},';
String toStringWithComma(String value) {
  return value.replaceAllMapped(reg, mathFunc);
}

class _GroupItemBody extends StatelessWidget {
  final CourtAuctionDetailSrch item;
  static DateFormat koreanFormatter = DateFormat("yyyy년 MM월 dd일");

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
                  Text(item.courtName(),
                      style: TextStyle(
                        fontSize: 12.0,
                        color: Colors.grey,
                      )),
                ],
              ),
              Padding(
                padding: EdgeInsets.only(top: 4.0),
              ),
              Text(
                item.location().split(' ').take(2).join(' '),
                style: TextStyle(fontWeight: FontWeight.w900, fontSize: 20.0),
                overflow: TextOverflow.ellipsis,
              ),
              Text(
                "매각기일: " + koreanFormatter.format(item.saleDate()),
                overflow: TextOverflow.ellipsis,
              ),
              Text(
                "입찰가격: " +
                    toStringWithComma(item.minSellingPrice().toString()) +
                    "원(${toStringWithComma(((item.minSellingPrice() / item.appraisedValue().toDouble() * 100.0)).round().toString())}%)",
                overflow: TextOverflow.ellipsis,
              ),
            ],
          ),
          Positioned(
            bottom: 0,
            right: 0,
            child: Row(
              children: [
                _BookmarkButtonWidget(item: item),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class _BookmarkButtonWidget extends StatefulWidget {
  final CourtAuctionDetailSrch item;

  _BookmarkButtonWidget({Key? key, required this.item}) : super(key: key);

  @override
  State<_BookmarkButtonWidget> createState() => __BookmarkButtonWidgetState();
}

class __BookmarkButtonWidgetState extends State<_BookmarkButtonWidget> {
  bool toggle = false;

  @override
  Widget build(BuildContext context) {
    return IconButton(
      onPressed: _onPressed,
      icon: Icon(
        toggle ? Icons.bookmark : Icons.bookmark_border,
      ),
    );
  }

  _onPressed() {
    setState(() {
      toggle = !toggle;
    });
  }
}
