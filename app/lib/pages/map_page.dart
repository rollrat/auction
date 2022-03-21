// This source code is a part of Auction App.
// Copyright (C) 2022. rollrat. Licensed under the Apache-2.0 License.

import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter_naver_map/flutter_naver_map.dart';

class MapPage extends StatefulWidget {
  const MapPage({Key? key}) : super(key: key);

  @override
  State<MapPage> createState() => _MapPageState();
}

class _MapPageState extends State<MapPage> {
  @override
  Widget build(BuildContext context) {
    return Container(
      child: NaverMap(
        useSurface: kReleaseMode,
        // initialCameraPosition: CameraPosition(
        //   target: LatLng(37.566570, 126.978442),
        //   zoom: 17,
        // ),
        // onMapCreated: onMapCreated,
        // mapType: _mapType,
        // initLocationTrackingMode: _trackingMode,
        // locationButtonEnable: true,
        // indoorEnable: true,
        // onCameraChange: _onCameraChange,
        // onCameraIdle: _onCameraIdle,
        // onMapTap: _onMapTap,
        // onMapLongTap: _onMapLongTap,
        // onMapDoubleTap: _onMapDoubleTap,
        // onMapTwoFingerTap: _onMapTwoFingerTap,
        // onSymbolTap: _onSymbolTap,
        // maxZoom: 17,
        // minZoom: 15,
      ),
    );
  }
}
