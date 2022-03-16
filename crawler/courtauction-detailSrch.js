// This source code is a part of Auction App.
// Copyright (C) 2022. rollrat. Licensed under the Apache-2.0 License.

const fs = require("fs");
const detailSrch = require('./api/courtauction/detailSrch');

var data = JSON.parse(fs.readFileSync("result.json"));
const dataLen = Object.keys(data).length;

var results = [];
var completed = 0;

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

(async () => {
  for (var i = 0; i < dataLen; i++) {
    if (i % 50 == 49) {
      await sleep(5000);
    }

    var param = data[i].param;
    detailSrch.requestDetailSrch(param[0], param[1], param[2], data[i]).then((e) => {
      var objInfo = detailSrch.parseDetailSrchHtml(e[0]);
      var param = e[1].param;

      objInfo["header"] = e[1];

      console.log(`${++completed}/${dataLen}`);

      results.push(objInfo);

      fs.writeSync(
        fs.openSync(
          `result/result-params-${param[0]}-${param[1].trim()}-${
            param[2]
          }.json`,
          "w"
        ),
        JSON.stringify(objInfo)
      );
    });
  }

  fs.writeSync(
    fs.openSync(`result-params.json`, "w"),
    JSON.stringify(results)
  );
})();
