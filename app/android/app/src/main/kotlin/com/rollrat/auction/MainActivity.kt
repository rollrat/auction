package com.rollat.auction

import android.os.Bundle
import io.flutter.embedding.android.FlutterActivity
import io.flutter.plugins.GeneratedPluginRegistrant
import com.naver.maps.map.NaverMapSdk
import com.naver.maps.map.NaverMapSdk.NaverCloudPlatformClient


class MainActivity: FlutterActivity() {
  // if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
  //   if (checkSelfPermission(Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
  //       requestPermissions(new String[]{Manifest.permission.ACCESS_FINE_LOCATION}, 0);
  //   }
  // }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        NaverMapSdk.getInstance(this).setClient(
                NaverCloudPlatformClient("eh9sp32x4b"))
    }
}
