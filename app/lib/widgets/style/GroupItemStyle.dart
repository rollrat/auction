// This source code is a part of Auction App.
// Copyright (C) 2022. rollrat. Licensed under the Apache-2.0 License.

import 'package:auctionapp/settings/settings.dart';
import 'package:flutter/material.dart';

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
