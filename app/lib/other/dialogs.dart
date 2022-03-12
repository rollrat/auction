// This source code is a part of Project Violet.
// Copyright (C) 2020-2022. violet-team. Licensed under the Apache-2.0 License.

import 'package:flutter/material.dart';

const defaultTitle = 'Auction App';

Future<void> showOkDialog(BuildContext context, String message,
    [String? title]) async {
  await showDialog(
    context: context,
    builder: (context) => AlertDialog(
      title: Text(title ?? defaultTitle),
      content: SelectableText(message),
      actions: [
        TextButton(
          onPressed: () {
            Navigator.pop(context);
          },
          child: Text('확인'),
        ),
      ],
    ),
  );
}

Future<bool> showOkCancelDialog({
  required BuildContext context,
  String? titleText,
  String? contentText,
  WidgetBuilder? contentBuilder,
  EdgeInsetsGeometry? contentPadding,
  String? okText,
  String? cancelText,
  VoidCallback? onOkPressed,
  VoidCallback? onCancelPressed,
  bool useRootNavigator = true,
}) async {
  assert((contentText != null && contentBuilder == null) ||
      (contentText == null && contentBuilder != null));

  return await showDialog(
    context: context,
    useRootNavigator: useRootNavigator,
    builder: (context) => AlertDialog(
      title: Text(titleText ?? defaultTitle),
      content: contentText != null
          ? Text(contentText)
          : Builder(builder: contentBuilder!),
      contentPadding: contentPadding!,
      actions: [
        TextButton(
          onPressed: () {
            if (onOkPressed != null) {
              onOkPressed();
            } else {
              Navigator.pop(context, true);
            }
          },
          child: Text(okText ?? '확인'),
        ),
        TextButton(
          onPressed: () {
            if (onCancelPressed != null) {
              onCancelPressed();
            } else {
              Navigator.pop(context, false);
            }
          },
          child: Text(cancelText ?? '취소'),
        ),
      ],
    ),
  );
}

Future<bool?> showYesNoDialog(BuildContext context, String message,
    [String? title]) async {
  return await showDialog<bool?>(
    context: context,
    builder: (context) => AlertDialog(
      title: Text(title ?? defaultTitle),
      content: Text(message),
      actions: [
        TextButton(
          onPressed: () {
            Navigator.pop(context, true);
          },
          child: Text('예'),
        ),
        TextButton(
          onPressed: () {
            Navigator.pop(context, false);
          },
          child: Text('아니오'),
        ),
      ],
    ),
  );
}
