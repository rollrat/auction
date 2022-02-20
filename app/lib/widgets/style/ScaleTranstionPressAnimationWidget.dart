// This source code is a part of Auction App.
// Copyright (C) 2022. rollrat. Licensed under the Apache-2.0 License.

import 'package:flutter/material.dart';

class ScaleTranstionPressAnimationWidget extends StatefulWidget {
  final Widget child;
  final VoidCallback? onTap;

  const ScaleTranstionPressAnimationWidget(
      {Key? key, required this.child, this.onTap})
      : super(key: key);

  @override
  _ScaleTranstionPressAnimationWidgetState createState() =>
      _ScaleTranstionPressAnimationWidgetState();
}

class _ScaleTranstionPressAnimationWidgetState
    extends State<ScaleTranstionPressAnimationWidget>
    with TickerProviderStateMixin {
  late final AnimationController _controller = AnimationController(
      duration: const Duration(milliseconds: 300), vsync: this, value: 1.0);
  late final Animation<double> _animation = CurvedAnimation(
    parent: _controller,
    curve: Curves.easeInOut,
  );

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTapDown: (detail) => _controller.animateTo(0.95),
      onTapUp: (detail) => _controller.animateTo(1.0),
      onTap: widget.onTap,
      child: ScaleTransition(
        scale: _animation,
        child: Container(child: widget.child),
      ),
    );
  }
}
