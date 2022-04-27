
const searchBudongsan = require('./api/courtauction/searchBudongsan');

(async () => {
  var results = [];

  for (var i = 0; i < 10000; i++) {
    try {
      var v = await searchBudongsan.searchBudongsan('전체', 1 + i * 20, null);
      console.log(searchBudongsan.parse_searchBudongsan(v[0]));
      results.push(searchBudongsan.parse_searchBudongsan(v[0]));
    } catch (e) {
      console.log(e);
      break;
    }
    console.log(i);
  } 

  fs.writeSync(fs.openSync("result.json", "w"), JSON.stringify(results));
})();