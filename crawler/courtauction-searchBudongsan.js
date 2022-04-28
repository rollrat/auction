// This source code is a part of Auction App.
// Copyright (C) 2022. rollrat. Licensed under the Apache-2.0 License.

const searchBudongsan = require('./api/courtauction/searchBudongsan');
const fs = require("fs");

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

(async () => {
  var results = [];

  for (var i = 0; i < 1000; i++) {
    try {
      var v = await searchBudongsan.searchBudongsan('전체', 1 + i * 20, null);
      var x = searchBudongsan.parse_searchBudongsan(v[0]);
      if (x == null)
        break;
      results = [...results, ...x];
      console.log(i);
    } catch (e) {
      console.log(e);
      break;
    }
    console.log(i);
  } 

  fs.writeSync(fs.openSync("result.json", "w"), JSON.stringify(results));
})();