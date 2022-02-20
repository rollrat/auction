// This source code is a part of Auction App.
// Copyright (C) 2022. rollrat. Licensed under the Apache-2.0 License.

import 'package:auctionapp/api/model/CourtAuctionDetailSrch.dart';
import 'package:auctionapp/settings/settings.dart';
import 'package:auctionapp/widgets/content/DotIndicator.dart';
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
              item.thumbnail() != null
                  ? Hero(
                      tag: item.thumbnail()!,
                      child: Image.network(item.thumbnail()!))
                  : Container(),
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
