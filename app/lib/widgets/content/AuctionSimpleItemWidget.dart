// This source code is a part of Auction App.
// Copyright (C) 2022. rollrat. Licensed under the Apache-2.0 License.

import 'package:auctionapp/api/model/CourtAuctionHeaderItem.dart';
import 'package:auctionapp/settings/settings.dart';
import 'package:auctionapp/widgets/content/DotIndicator.dart';
import 'package:auctionapp/widgets/style/GroupItemStyle.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';

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
    return Column(
      children: [
        _buildGroup(item.EVENT_NO() ?? ''),
        GroupItemStyle(
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
              DotsIndicator(
                itemCount: 3,
                controller: _controller,
                onPageSelected: (page) {},
              ),
              Container(
                padding: EdgeInsets.all(8.0),
                child: _GroupItemBody(item),
              ),
            ],
          ),
        ),
      ],
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
                "매각기일: " + (item.SALE_DATE() ?? ''),
                overflow: TextOverflow.ellipsis,
              ),
              Text(
                "입찰가격: " +
                    (item.MIN_SELLING_PRICE() ?? '') +
                    "원(${((int.parse(item.MIN_SELLING_PRICE() ?? '0') / double.parse(item.APPRAISED_VALUE() ?? '1') * 100.0)).round()}%)",
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
